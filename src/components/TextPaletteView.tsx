import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../providers/DataProvider';

export default function TextPaletteView({focusedIndex}: {focusedIndex: number}){
    // // タブのデータを管理するcontext
    const {
        tabArray,
        copyText
    } = useContext(DataContext);

    // マウスがhoverしている行を管理する
    const [hoveredRow, setHoveredRow] = useState<number>(-1);
    // マウスがclickしている行を管理する
    const [clickedRow, setClickedRow] = useState<number>(-1);

    // 適切なbackgroundColorを取得する
    function getBackgroundColor(index: number): string{
        const isHovered: boolean = (hoveredRow === index);
        const isClicked: boolean = (clickedRow === index);
        if(isClicked){
            return "rgba(255, 255, 255, 0.4)";
        }else if(isHovered){
            return "rgba(255, 255, 255, 0.08)";
        }else{
            return "";
        }
    }

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
                    key={index}
                    style={{
                        borderTop: ((index === 0) ? "" : "solid 1px white"),
                        minHeight: "0.5rem",
                        backgroundColor: getBackgroundColor(index),
                        userSelect: "none"
                    }}
                    onMouseDown={() => setClickedRow(index)}
                    onMouseUp={() => setClickedRow(-1)}
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => {
                        setClickedRow(-1);
                        setHoveredRow(-1);
                    }}
                    onClick={() => copyText(focusedIndex, index)}
                >
                    {text}
                </div>
            ))}
        </div>
    );
}