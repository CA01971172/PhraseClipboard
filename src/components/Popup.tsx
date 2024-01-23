import React, { useState } from 'react';
import { useContext } from "react";
import { DataContext } from '../providers/DataProvider';
import Header from "./Header"
import TextPaletteEdit from "./TextPaletteEdit"

export default function Popup(){
    // フォーカス中のタブのindex
    const [focusedIndex, setFocusedIndex] = useState<number>(0);

    // // タブのデータを管理するcontext
    const {
        tabArray,
        addTab,
        deleteTab,
        renameTab,
        setTexts,
        copyText,
        saveTabData
    } = useContext(DataContext);

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
            <TextPaletteEdit focusedIndex={focusedIndex}/>
        </div>
    );
}