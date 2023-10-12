import React from 'react';
// import { useContext } from "react";
// import { DataContext } from '../providers/DataProvider';
import TabArray from "./TabArray"

export default function Popup(){
    // // タブのデータを管理するcontext
    // const {
    //     tabArray,
    //     addTab,
    //     deleteTab,
    //     renameTab,
    //     setTexts,
    //     copyText,
    //     saveTabData
    // } = useContext(DataContext);

    return (
        <div>
            <TabArray/>
        </div>
    );
}