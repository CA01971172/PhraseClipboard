import React, { useState, useContext } from 'react';
import { DataContext } from "../providers/DataProvider" 

export default function TestTabs (){
    const [text, setText] = useState<string>("");
    const {
        tabArray,
        addTab,
        renameTab
    }= useContext(DataContext);

    return (
       <div>
            <button onClick={() => addTab()}>+</button>

            <input
                type="text"
                value={text}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const newText: string = event.target.value;
                    console.log(`変更されました:`, newText);
                    setText(newText);
                }}
            />
            <button onClick={() => {
                renameTab(text, 0);
            }}>出力</button>

            <ul>
                {Object.values(tabArray).map((tabData, index) => (
                    <li key={index}>{tabData.tabName}</li>
                ))}
            </ul>
       </div>
    );
  }