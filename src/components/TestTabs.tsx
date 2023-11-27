import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, { useState, useContext, useRef, RefObject } from 'react';
import DropdownMenu from './DropdownMenu';
import { DataContext } from "../providers/DataProvider" 

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TestTabs() {
  const [value, setValue] = React.useState(0);
  const [text, setText] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const anchors: React.MutableRefObject<React.RefObject<HTMLDivElement>[]> = useRef<RefObject<HTMLDivElement>[]>([])
  const {
    tabArray,
    addTab,
    renameTab,
  }= useContext(DataContext);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const toggleMenu = () => {
    // メニューをトグルする
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} onClick={toggleMenu} 
        aria-label="basic tabs example">
        {Object.values(tabArray).map((tabData, index) => (
        <Tab key={index} label={tabData.tabName} {...a11yProps(index)} />
        ))}
        </Tabs>
      </Box>

      {Object.values(tabArray).map((tabData, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
        {isMenuOpen && <DropdownMenu 
        num={index}
        anchors={anchors}
        open
        handleTabChange={handleChange}
        />}
        </CustomTabPanel>
      ))}
    </Box>
    
    <button onClick={() => addTab()}>+</button>
    
    <button onClick={() => {
      renameTab(text, 0);
    }}>出力</button>

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
  );
}