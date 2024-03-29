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
        saveTabData,
        generateHoleTexts
    } = useContext(DataContext);

    return (
        <div
            style={{
                width: "fit-content"
            }}
        >
            <IconButton
                color="primary"
                onClick={() => {
                    if(isEditing){
                        // 編集モードを終了する場合、すべてのテキストを文字列型配列に変換してstateに代入する
                        saveTabData();
                    }else{
                        // 編集モードに移行する場合、すべての文字列型配列をテキストに変換してstateに代入する
                        generateHoleTexts();
                    }

                    // 閲覧/編集モードを切り替える
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