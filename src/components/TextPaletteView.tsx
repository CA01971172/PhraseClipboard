import React, { useContext } from 'react';
import { DataContext } from '../providers/DataProvider';

export default function TextPaletteView({focusedIndex}: {focusedIndex: number}){
    // // タブのデータを管理するcontext
    const {
        tabArray
    } = useContext(DataContext);

    return (
        <div
            style={{
                width: "300px",
                height: "200px",
                overflowY: "auto"
            }}
        >
            {tabArray[focusedIndex].texts.map((text, index) => (
                <div
                    style={{
                        borderBottom: "solid 1px black"
                    }}
                >
                    {text}
                </div>
            ))}
        </div>
    );
}