import React, {Dispatch, SetStateAction,useState} from 'react';
import ModeSwitchingButton from "./ModeSwitchingButton";
import TestTabs from "./TestTabs";

export default function Header({
    isEditing,
    setIsEditing
}: {
    isEditing: boolean;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
}){
    const [focusedIndex, setFocusedIndex] = useState<number>(0);
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid white"
            }}
        >
            <div><TestTabs 
            focusedIndex={focusedIndex}
            setFocusedIndex={setFocusedIndex}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            />
            </div> {/* タブ要素をここに配置する予定 */}
            <ModeSwitchingButton
                isEditing={isEditing}
                setIsEditing={setIsEditing}
            />
        </div>
    );
}