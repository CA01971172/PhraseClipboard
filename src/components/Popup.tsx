import React from 'react';
import DropdownMenu from './DropdownMenu'
// import { useContext } from "react";
// import { DataContext } from '../providers/DataProvider';
import TestTabs from "./TestTabs"

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
        <div><DropdownMenu/>,<TestTabs/></div>
    );
}