import React from 'react';
import { useContext } from "react";
import { DataContext } from '../providers/DataProvider';

export default function TextPaletteEdit({focusedIndex}: {focusedIndex: number}){
    // タブのデータを管理するcontext
    const {
        tabArray,
        setHoleText
    } = useContext(DataContext);

    return (
        <div
            style={{
                width: "300px",
                height: "200px"
            }}
        >
            <textarea
                rows={10}
                style={{
                    resize: "none",
                    width: "100%",
                    height: "100%",
                    boxSizing: "border-box",
                    borderRadius: "0",
                    backgroundColor: "#3B3B3B",
                    color: "white"
                }}
                value={tabArray[focusedIndex].holeText}
                onChange={(e) => {setHoleText(e.target.value, focusedIndex)}}
            />
        </div>
    );
}