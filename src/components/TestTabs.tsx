import React, { useState, useContext } from 'react';
import { DataContext } from "../providers/DataProvider" 
import { rename } from 'fs';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

export default function TestTabs (){
    const [text, setText] = useState<string>("");
    
    const {
        tabArray,
        addTab,
        renameTab,
        deleteTab
    }= useContext(DataContext);

    return (
        <div>
            <button onClick={() => addTab()}>+</button>
            <input
                type="text"
                value={text}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const newText: string = event.target.value;
                    console.log(`変更されました:`, );
                    setText(newText);
                }}
            />
            <button onClick={() => {
                renameTab(text, 0);
            }}>出力</button>

            <button onClick={() => {
                deleteTab(0)
            }}>削除</button>
            <ul>
                {Object.values(tabArray).map((tabData, index) => (
                    <li key={index} onClick ={() => renameTab(text, index)}
                    { ...() => deleteTab(index)} >
                    {tabData.tabName}
                    </li>
                ))}
            </ul>
       </div>
    );
  }