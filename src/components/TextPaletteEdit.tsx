import React from 'react';
import { useContext } from "react";
import { DataContext } from '../providers/DataProvider';

export default function TextPaletteEdit({focusedIndex}: {focusedIndex: number}){
    // タブのデータを管理するcontext
    const {
        tabArray,
        addTab,
        deleteTab,
        renameTab,
        setTexts,
        setHoleText,
        copyText,
        saveTabData
    } = useContext(DataContext);

    return (
        <div>
            <textarea
                rows={10}
                style={{
                    resize: "none",
                    width: "300px",
                    height: "200px",
                    borderRadius: "0"
                }}
                value={tabArray[focusedIndex].holeText}
                onChange={(e) => {setHoleText(e.target.value, focusedIndex)}}
            />
        </div>
    );
}