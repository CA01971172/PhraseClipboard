import React, { useState } from 'react';
import { useContext } from "react";
import { DataContext } from '../providers/DataProvider';
import Header from "./Header"
import TextPaletteEdit from "./TextPaletteEdit"
import TextPaletteView from "./TextPaletteView"

export default function Popup(){
    // フォーカス中のタブのindex
    const [focusedIndex, setFocusedIndex] = useState<number>(0);

    const [isEditing, setIsEditing] = useState<boolean>(false);

    return (
        <div
            style={{
                width: "fit-content"
            }}
        >
            <Header
                isEditing={isEditing}
                setIsEditing={setIsEditing}
            />
            {isEditing ? (
                <TextPaletteEdit focusedIndex={focusedIndex}/>
            ) : (
                <TextPaletteView focusedIndex={focusedIndex}/>
            )}
            
        </div>
    );
}