import React, { useState, useContext } from 'react';
import { DataContext } from "../providers/DataProvider" 
import { rename } from 'fs';
import DropdownMenu from './DropdownMenu';

export default function TestTabs (){
    const [text, setText] = useState<string>("");
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    
    const {
        tabArray,
        addTab,
        renameTab,
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
                    <li key={index} >
                        <span
                            onClick ={() => {
                                renameTab(text, index)
                            }}
                        >
                            {tabData.tabName}
                        </span>
                        {tabData.tabName}
                        <button
                            onClick = {() => {
                                setIsMenuOpen(!isMenuOpen);
                            }}
                        >
                            <DropdownMenu num={index} />
                        </button>
                        {isMenuOpen}
                    </li>
                ))}
            
            </ul>
       </div>
    );
  }