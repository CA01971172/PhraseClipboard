import React, {Dispatch, SetStateAction} from 'react';
import ModeSwitchingButton from "./ModeSwitchingButton";

export default function Header({
    isEditing,
    setIsEditing
}: {
    isEditing: boolean;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
}){
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid white"
            }}
        >
            <div/> {/* タブ要素をここに配置する予定 */}
            <ModeSwitchingButton
                isEditing={isEditing}
                setIsEditing={setIsEditing}
            />
        </div>
    );
}