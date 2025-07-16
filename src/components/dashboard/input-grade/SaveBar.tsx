interface Props {
     onSave: () => void;
}

export const SaveBar = ({ onSave }: Props) => {
     return (
          <div className="flex justify-end">
               <button onClick={onSave} className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                    Simpan Nilai
               </button>
          </div>
     );
};
