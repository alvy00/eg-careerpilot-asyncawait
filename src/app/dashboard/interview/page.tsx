"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import InterviewPrepLoader from "@/components/Interview/InterviewPrepLoader";
import { useRouter } from "next/navigation";
import { interviewer, vapi } from "@/utils/vapi.sdk";
import { toast } from "react-toastify";
import InterviewSetup from "@/components/Interview/InterviewSetup";
import { CallStatus, SavedMessages } from "@/utils/interfaces";
import InterviewSession from "@/components/Interview/InterviewSession";
import AnalysisLoader from "@/components/Interview/components/AnalysisLoader";

const MockInterview = () => {
    const { user } = useAuth();

    const router = useRouter();

    const [isSpeaking, setIsSpeaking] = useState(false);
    const [feedbackGenerated, setFeedbackGenerated] = useState(false);
    const [callStatus, setCallStatus] = useState<CallStatus>(
        CallStatus.INACTIVE,
    );
    const [messages, setMessages] = useState<SavedMessages[]>([]);

    const [progress, setProgress] = useState(0);
    const [time, setTime] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const [step, setStep] = useState(0);
    const [isCalling, setIsCalling] = useState(false);

    const [selectedRoadmap, setSelectedRoadmap] = useState<any | null>(null);
    const [userInput, setUserInput] = useState("");
    const [pdfUploaded, setPdfUploaded] = useState(false);
    const [config, setConfig] = useState({
        difficulty: "",
        topic: "",
        interviewType: "",
    });
    const [genData, setGenData] = useState({
        interviewId: "",
        questions: [],
    });

    /* ================= VAPI ================= */

    useEffect(() => {
        vapi.stop();
        setCallStatus(CallStatus.INACTIVE);

        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
        const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

        const onMessage = (message: any) => {
            if (
                message.type === "transcript" &&
                message.transcriptType === "final"
            ) {
                const newMessage = {
                    role: message.role,
                    content: message.transcript,
                };
                setMessages((prev) => [...prev, newMessage]);
            }
        };

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);
        const onError = (err: Error) => console.log("Error", err);

        vapi.on("call-start", onCallStart);
        vapi.on("call-end", onCallEnd);
        vapi.on("message", onMessage);
        vapi.on("speech-start", onSpeechStart);
        vapi.on("speech-end", onSpeechEnd);
        vapi.on("error", (err: any) => {
            console.log("VAPI Error:", err);

            if (err.type === "ejected") {
                toast.info("Your interview session has ended.");
                setCallStatus(CallStatus.FINISHED);
            }
        });

        return () => {
            vapi.off("call-start", onCallStart);
            vapi.off("call-end", onCallEnd);
            vapi.off("message", onMessage);
            vapi.off("speech-start", onSpeechStart);
            vapi.off("speech-end", onSpeechEnd);
            vapi.off("error", onError);
        };
    }, []);

    const generateInterview = async () => {
        setLoading(true);
        if (isLoading) return;

        try {
            setLoading(true);
            setProgress(0);

            const res = await axios.post(
                "/api/interview/vapi",
                {
                    userId: user?.uid,
                    userEmail: user?.email,
                    roadmapObj: selectedRoadmap,
                    userInput,
                    difficulty: config.difficulty,
                    topic: config.topic,
                },
                {
                    onDownloadProgress: (progressEvent) => {
                        const percent = Math.round(
                            (progressEvent.loaded * 100) /
                                (progressEvent.total || 1),
                        );
                        setProgress(percent);
                    },
                },
            );

            console.log("interview generated", res.data);
            setGenData({
                interviewId: res.data.interviews[0]._id,
                questions: res.data.questions,
            });

            // Reset selections
            setSelectedRoadmap(null);
            setUserInput("");
            setPdfUploaded(false);
            setConfig({ difficulty: "", topic: "", interviewType: "" });

            // console.log(
            //     "Gen data",
            //     res.data.interviews[0]._id,
            //     res.data.questions,
            // );

            setStep(5);
        } catch (error) {
            console.log(error);

            if (axios.isAxiosError(error) && error.response?.status === 429) {
                toast.error(
                    "Encountered an API error, please try again after 2 minutes",
                );
            } else {
                toast.error("Something went wrong. Please try again.");
            }

            setSelectedRoadmap(null);
            setUserInput("");
            setPdfUploaded(false);
            setConfig({ difficulty: "", topic: "", interviewType: "" });

            setStep(0);
        } finally {
            setProgress(100);
            setTimeout(() => setLoading(false), 200);
        }
    };

    const generateFeedback = async (messages: SavedMessages[]) => {
        setIsAnalyzing(true);
        setProgress(0);

        try {
            const res = await axios.post(
                "/api/interview/feedback",
                {
                    userId: user?.uid,
                    interviewId: genData.interviewId,
                    messages,
                },
                {
                    onDownloadProgress: (p) => {
                        const percent = Math.round(
                            (p.loaded * 100) / (p.total || 1),
                        );
                        setProgress(percent);
                    },
                },
            );

            if (res.data.feedback?.success) {
                setProgress(100);
                // Small delay so they see 100%
                setTimeout(() => {
                    router.push(
                        `/dashboard/interview/feedback/${res.data.feedbackId}`,
                    );
                }, 800);
            }
        } catch (error) {
            setIsAnalyzing(false);
            toast.error("Analysis failed. Please check your dashboard later.");
        }
    };

    useEffect(() => {
        if (
            callStatus === CallStatus.FINISHED &&
            genData.interviewId &&
            !feedbackGenerated
        ) {
            generateFeedback(messages);
            setFeedbackGenerated(true);
        }
    }, [callStatus, genData.interviewId, messages, feedbackGenerated]);

    const handleCallConnect = async () => {
        setCallStatus(CallStatus.CONNECTING);

        let formattedQuestions = "";
        if (genData.questions) {
            formattedQuestions = genData?.questions
                ?.map((q) => `- ${q}`)
                .join("\n");
        }

        await vapi.start(interviewer, {
            variableValues: {
                questions: formattedQuestions,
            },
        });
    };

    const handleCallDisconnect = () => {
        setCallStatus(CallStatus.FINISHED);
        vapi.stop();

        setTime(0);
        setStep(0);
    };

    /* ================= GSAP ================= */

    const isCallInactiveOrFinished =
        callStatus === CallStatus.INACTIVE ||
        callStatus === CallStatus.FINISHED;

    return (
        <div className="bg-[#050505] text-slate-100 mesh-bg font-display min-h-screen">
            {isLoading && (
                <InterviewPrepLoader
                    progress={progress}
                    setProgress={setProgress}
                    loading={isLoading}
                    onFinish={() => console.log("Loader finished")}
                />
            )}

            {isAnalyzing && <AnalysisLoader progress={progress} />}

            {step < 5 ? (
                <InterviewSetup
                    step={step}
                    setStep={setStep}
                    selectedRoadmap={selectedRoadmap}
                    setSelectedRoadmap={setSelectedRoadmap}
                    userInput={userInput}
                    setUserInput={setUserInput}
                    pdfUploaded={pdfUploaded}
                    setPdfUploaded={setPdfUploaded}
                    config={config}
                    setConfig={setConfig}
                    generateInterview={generateInterview}
                />
            ) : (
                <InterviewSession
                    time={time}
                    setTime={setTime}
                    messages={messages}
                    isSpeaking={isSpeaking}
                    callStatus={callStatus}
                    handleCallConnect={handleCallConnect}
                    handleCallDisconnect={handleCallDisconnect}
                />
            )}
        </div>
    );
};

export default MockInterview;
