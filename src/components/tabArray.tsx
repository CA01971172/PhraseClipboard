import React, { useContext } from 'react';
import { DataContext } from "../providers/DataProvider" 

export default function TabArray (){
    const TabContext = useContext(DataContext);
    const { tabArray } = TabContext;
    
    return (
       <ul>
            {Object.values(tabArray).map((tabData) => (
                <li>{tabData.tabName}</li>
            ))}
       </ul>
    );
  }