import { Check, X } from "lucide-react";


const StatusBox = ({ type, text }: { type: "success" | "error", text: string }) => {
    if (type === "success") {
        return (
            <div className="bg-green-500/10 border border-green-500/30 backdrop-blur-xl rounded-2xl shadow-2xl p-6 my-4">
                <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-3">
                        <Check className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="text-green-300 text-center">{text}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-red-500/10 border border-red-500/30 backdrop-blur-xl rounded-2xl shadow-2xl p-6 my-4">
            <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mb-3">
                    <X className="w-6 h-6 text-red-400" />
                </div>
                <div className="text-red-300 text-center">
                    {text.split("\n").map((line, i) => (
                        <div key={i}>{line}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StatusBox;