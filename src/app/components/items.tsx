import { TrashIcon } from "@heroicons/react/16/solid";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

export default function Items({item, deleteItem, updateStatus}: ItemProps) {

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        updateStatus(item?.id, isChecked);
    }
    // This function controls the visual output for the DB status of each list item
    
    const CheckboxIcon: React.FC<CheckboxIconProps> = ({ checked, onChange }) => (
        <label className="flex h-7 w-7 cursor-pointer">
        <input
            type="checkbox"
            className="hidden"
            checked={checked}
            onChange={onChange}
        />
        {checked ? (
            <CheckBadgeIcon className="text-green-400 h-7 w-7 fill-white hover:fill-gray-200"/>
            ) : (
            <CheckBadgeIcon className="text-gray-400 h-7 w-7 hover:fill-white"/>
            )}
        </label>
    );

    return (
        <div className="flex self-center justify-center items-center text-start p-1 m-1">
            <label className="w-4/5 flex gap-2 items-center m-2">
                <CheckboxIcon 
                    checked={item?.completed}
                    onChange={handleCheckboxChange}/>
                <p> {item?.task}</p>
            </label>
            <TrashIcon onClick={() => deleteItem(item?.id)} className="h-7 w-7 text-red-600 cursor-pointer hover:text-red-500" />
        </div>
    );
}
