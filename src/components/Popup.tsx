import React, { useState } from 'react';
// import { useContext } from "react";
// import { DataContext } from '../providers/DataProvider';
import TestTabs from "./TestTabs"

export default function Popup(){
    // フォーカス中のタブのindex
    const [focusedIndex, setFocusedIndex] = useState<number>(0);

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
            <TestTabs
                focusedIndex={focusedIndex}
                setFocusedIndex={setFocusedIndex}
            />
        </div>
    );
}