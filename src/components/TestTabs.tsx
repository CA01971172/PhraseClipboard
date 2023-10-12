import React, { useState, useContext } from 'react';
import { DataContext } from "../providers/DataProvider" 

export default function TestTabs (){
    const { tabArray }= useContext(DataContext);
    const [tabs, setTabArray] = useState(['タブ'])
    
    const addTab = (tabName = 'タブ') => {
        setTabArray([...tabs, tabName]);
    }

    return (
       <div>
        <button onClick={() => addTab()}>+</button>
        <ul>
            {Object.values(tabArray).map((tabData) => (
                <li>{tabData.tabName}</li>
            ))}
            {tabs.map((tab, index) => (
                <li key={index}>{tab}</li>
           ))}
        </ul>
       </div>
    );
  }