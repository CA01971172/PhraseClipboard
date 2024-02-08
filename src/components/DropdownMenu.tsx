import * as React from 'react';
import { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { DataContext } from "../providers/DataProvider"

type Props = {
  open: boolean,
  num:number,
  anchors: React.MutableRefObject<React.RefObject<HTMLDivElement>[]>;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  focusedIndex: number;
  setFocusedIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function DropdownMenu(
  {
  open,
  num,
  anchors,
  handleTabChange,
  focusedIndex,
  setFocusedIndex
  }: Props) {

  const {
    swapTab
  } = useContext(DataContext) || [];

  const {
    renameTab,
    deleteTab,
  } = useContext(DataContext);

  return (
    <PopupState variant="popover" popupId="demo-popup-menu" >
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
            Drop
          </Button>
          <Menu 
            anchorEl={anchors.current[num]?.current}
            {...bindMenu(popupState)}
          >
          <MenuItem onClick={() =>{
            const text = prompt("新しい名前を入力してください。")
            if(text === null) return 
            renameTab(text,focusedIndex)
          }}>
          名前を変更
          </MenuItem>
            <MenuItem onClick={()=>deleteTab(focusedIndex)}>削除</MenuItem>
            
            <MenuItem onClick={(event: React.SyntheticEvent) => {
              swapTab(focusedIndex, -1); // 現在タブを左に移動する
              handleTabChange(event,focusedIndex - 1)
            }}
            disabled={(0 > focusedIndex - 1) ? true : false}
            >
            左に移動
            </MenuItem>
            
            <MenuItem
            onClick={(event: React.SyntheticEvent) => {
            swapTab(focusedIndex, 1); // 現在タブを右に移動する
            handleTabChange(event,focusedIndex + 1)
            }}
            disabled={(0 > focusedIndex + 1) ? true : false}
            >
            右に移動
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}