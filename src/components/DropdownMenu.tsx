import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useState, useContext } from 'react';
import { DataContext } from "../providers/DataProvider" 
import { ids } from 'webpack';

type NumProps = {
  num: number
}

export default function DropdownMenu(props:NumProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [text, setText] = useState<string>("");
  const {
    renameTab,
    deleteTab
  }= useContext(DataContext);
  
 
  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
      ▼
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
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
              <MenuItem onClick={() => deleteTab(props.num)}>削除</MenuItem>
              <MenuItem onClick={() => renameTab(text,props.num)}>名前を変更</MenuItem>
            </li>
      </Menu>
    </div>
  );
}