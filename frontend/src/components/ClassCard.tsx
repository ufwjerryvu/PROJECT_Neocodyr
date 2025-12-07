import { ChevronRight } from 'lucide-react';

interface ClassCardProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    gradientFrom?: string;
    gradientTo?: string;
}

const ClassCard = ({ title, description, icon, gradientFrom = "from-purple-600", gradientTo = "to-blue-600" }: ClassCardProps) => {
    return (
        <div className="group relative cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition"></div>

            <div className="relative bg-gradient-to-br from-slate-900/90 to-indigo-950/90 backdrop-blur-xl rounded-xl overflow-hidden border border-purple-500/40 shadow-xl p-6 hover:border-purple-400/60 transition h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-lg flex items-center justify-center shadow-lg shadow-purple-900/60`}>
                        {icon}
                    </div>
                    <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm line-clamp-2">{description}</p>
            </div>
        </div>
    );
};

export default ClassCard;