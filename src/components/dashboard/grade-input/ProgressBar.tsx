interface ProgressBarProps {
     done: number;
     total: number;
}

export const ProgressBar = ({ done, total }: ProgressBarProps) => {
     const percent = total > 0 ? Math.round((done / total) * 100) : 0;
     const barColor = percent === 100 ? "bg-green-500" : "bg-blue-500";

     return (
          <div className="my-4 space-y-1">
               <div className="flex justify-between text-sm font-medium text-gray-700">
                    <span>Progress Input Nilai</span>
                    <span>
                         {done} / {total} mahasiswa ({percent}%)
                    </span>
               </div>
               <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-300 ${barColor}`} style={{ width: `${percent}%` }} />
               </div>
          </div>
     );
};
