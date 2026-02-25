export default function StatCard({ label, value }: any) {
    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-400">{label}</p>
            <p className="font-semibold text-white">{value}</p>
        </div>
    );
}
