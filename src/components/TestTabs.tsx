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

            <ul>
                {Object.values(tabArray).map((tabData, index) => (
                    <li key={index}  >
                        <span
                            onClick ={() => {
                                renameTab(text, index)
                            }}
                        >
                            {tabData.tabName}
                        </span>
                        <button onClick={() => {
                            deleteTab(index)
                        }}>削除</button>
                    </li>
                ))}
            </ul>
       </div>
    );
  }