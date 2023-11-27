import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useState, useContext } from 'react';
import { DataContext } from "../providers/DataProvider" 
import { TabNameContext } from "../providers/TabNameProvider"
import { TextContext } from "../providers/TextProvider"
import TestTabs from './TestTabs';

type NumProps = {
  num: number
  open: boolean
  anchors: React.MutableRefObject<React.RefObject<HTMLDivElement>[]>
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void,
}

interface StringArrayStates{
  data: string[] | undefined,
  setData: React.Dispatch<React.SetStateAction<string[]>> | undefined
}

export default function DropdownMenu({num, handleTabChange, open, anchors}:NumProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [text, setText] = useState<string>("");
  const [tabNames, setTabNames] = useContext(TabNameContext) || [];
  const [texts, setTexts] = useContext(TextContext) || [];
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const {
    renameTab,
    deleteTab
  }= useContext(DataContext);

  function swapStringArrayStates(states: StringArrayStates, leftOrRight: 1|-1): void{ // useStateで管理された文字列型配列の順番を入れ替える関数
    if(states.data && states.setData){
        const data: string[] = states.data.slice();
        const setData: React.Dispatch<React.SetStateAction<string[]>> = states.setData;
        const nextIndex: number = num + leftOrRight;
        if((0 > nextIndex) || (data.length <= nextIndex)) throw new Error("これ以上は配列を動かせません");
        const temp: string = data[num]
        data[num] = data[nextIndex];
        data[nextIndex] = temp;
        setData(data);
    }
}

function swapTabData(event: React.SyntheticEvent, leftOrRight: 1|-1){ // タブの順番を入れ替える関数
    const nextIndex: number = num + leftOrRight;
    if(!tabNames || !setTabNames || !texts || !setTexts) throw new Error("データが存在しません");
    if(tabNames.length !== texts.length) throw new Error("tabNames と texts の数が違います");
    if((0 > nextIndex) || (tabNames.length <= nextIndex)) throw new Error("これ以上はタブを動かせません");
    swapStringArrayStates({data: tabNames, setData: setTabNames}, leftOrRight)
    swapStringArrayStates({data: texts, setData: setTexts}, leftOrRight)
    handleTabChange(event, num + leftOrRight)
}

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
        onClose={handleClose}
        TransitionComponent={Fade}
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
            <li>
              <MenuItem onClick={() => deleteTab(num)}>削除</MenuItem>
              <MenuItem onClick={() => renameTab(text,num)}>名前を変更</MenuItem>
              <MenuItem
                onClick={(event: React.SyntheticEvent) => {
                    swapTabData(event, -1); // 現在タブを左に移動する
                    handleClose();
                }}
                disabled={(tabNames && (0 > num - 1)) ? true : false}
                >
                    左に移動
                </MenuItem>
                <MenuItem
                onClick={(event: React.SyntheticEvent) => {
                    swapTabData(event, 1); // 現在タブを右に移動する
                    handleClose();
                }}
                disabled={(tabNames && (tabNames?.length <= num + 1)) ? true : false}
                >
                    右に移動
                </MenuItem>
            </li>
      </Menu>
    </div>
  );
}