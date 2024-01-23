import React, {Dispatch, SetStateAction} from 'react';
import { useContext } from "react";
import { DataContext } from '../providers/DataProvider';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Create';
import CancelIcon from '@mui/icons-material/Clear';

export default function ModeSwitchingButton({
    isEditing,
    setIsEditing
}: {
    isEditing: boolean;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
}){
    // タブのデータを管理するcontext
    const {
        tabArray,
        addTab,
        deleteTab,
        renameTab,
        setTexts,
        setHoleText,
        copyText,
        saveTabData
    } = useContext(DataContext);

    return (
        <div
            style={{
                width: "fit-content",
                border: "1px solid black"
            }}
        >
            <IconButton
                onClick={() => {
                    setIsEditing((prev) => !prev);
                }}
            >
                {isEditing ? (
                    <CancelIcon/>
                ) : (
                    <EditIcon/>
                )}
            </IconButton>
        </div>
    );
}