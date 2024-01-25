import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useState, useContext } from 'react';
import { DataContext } from "../providers/DataProvider" 
import { formGroupClasses } from '@mui/material';

type Props = {
  num: number;
  open: boolean;
  anchors: React.MutableRefObject<React.RefObject<HTMLDivElement>[]>;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  handleClose: () => Promise<void>;
  focusedIndex: number;
  setFocusedIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function DropdownMenu({
  num,
  open,
  anchors,
  handleTabChange,
  handleClose,
  focusedIndex,
  setFocusedIndex
}: Props) {
  const [text, setText] = useState<string>("");
  
  const {
    tabArray,
    addTab,
    swapTab
  } = useContext(DataContext) || [];
  
  const {
    renameTab,
    deleteTab
  } = useContext(DataContext);

  return (
    <div>
      <Menu
        anchorEl={anchors.current[num]?.current}
        open={open} // メニューの出現を管理
        disableAutoFocusItem={false}
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        TransitionComponent={Fade}
        onClose={async() => {
          await handleClose();
        }}
      >

        <div>
        <input
            type="text"
            value={text}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const newText: string = event.target.value;
              console.log(`変更されました:`, );
              setText(newText);
          }}
        />
        </div>
          <MenuItem onClick={() => deleteTab(focusedIndex)}>削除</MenuItem>
          <MenuItem onClick={() => {
            renameTab(text,focusedIndex)
            handleClose();
          }}>
          名前を変更
          </MenuItem>
          
          <MenuItem
            onClick={(event: React.SyntheticEvent) => {
              swapTab(focusedIndex, -1); // 現在タブを左に移動する
              handleTabChange(event,focusedIndex - 1)
              handleClose();
            }}
            disabled={(0 > focusedIndex - 1) ? true : false}
          >
          左に移動
          </MenuItem>

          <MenuItem
            onClick={(event: React.SyntheticEvent) => {
            swapTab(focusedIndex, 1); // 現在タブを右に移動する
            handleTabChange(event,focusedIndex + 1)
            handleClose();
            }}
            disabled={(tabArray.length <= focusedIndex + 1) ? true : false}
          >
          右に移動
          </MenuItem>

          <MenuItem
            onClick={(event: React.SyntheticEvent) => {
              handleClose();
            }}
            >
              Menuを閉じる
          </MenuItem>
        </Menu>
      </div>
  );
}