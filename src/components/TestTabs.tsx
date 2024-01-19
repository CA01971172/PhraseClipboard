import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, { useState, useContext, useRef, RefObject, createRef, useEffect, useCallback } from 'react';
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

export default function TestTabs(props: {
  focusedIndex: number;
  setFocusedIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const {
    focusedIndex,
    setFocusedIndex
  } = props;

  const [text, setText] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // メニューを閉めるハンドル
  const [closeHandlers, setCloseHandlers] = useState<(() => Promise<void>)[]>([]); 
  const [opens, setOpens] = useState<boolean[]>([]); // メニューの開閉を管理
  const anchors: React.MutableRefObject<React.RefObject<HTMLDivElement>[]> = useRef<RefObject<HTMLDivElement>[]>([])
  
  const {
    tabArray,
    addTab,
    renameTab,
  }= useContext(DataContext);

  const handleChange = (event: React.SyntheticEvent, nextIndex: number) => {
    setFocusedIndex(nextIndex);
  };

  const toggleMenu = () => {
    // メニューをトグルする
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if(tabArray){
        const newOpens: boolean[] = [];
        const newCloseHandlers: (() => Promise<void>)[] = [];
        
        for(let i: number = 0; i < tabArray.length; i++){
            // opensを初期化する
            newOpens[i] = (false);
            // anchorsを初期化する
            tabArray.forEach((_, index) => {
                anchors.current[index] = createRef<HTMLDivElement>()
            })
            console.log(i)
            // closeHandlersを初期化する
            newCloseHandlers[i] = (() =>
                new Promise<void>((resolve, reject) => {
                    const copyOpens: boolean[] = [...opens];
                    copyOpens[i]=(false);
                    setOpens(copyOpens);
                    console.log(i,
                      anchors.current[i].current)
                    resolve();
                }
            ));
        }
        setOpens(newOpens);
        setCloseHandlers(newCloseHandlers);
    }
}, [tabArray]);

  return (
    <div>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={focusedIndex} onChange={handleChange} onClick={toggleMenu}
        aria-label="basic tabs example">
        {Object.values(tabArray).map((tabData, index) => (
          <Tab
            ref={anchors.current[index]}
            key={index}
            label={tabData.tabName}
            {...a11yProps(index)}
          />
        ))}
        </Tabs>
      </Box>

      {Object.values(tabArray).map((tabData, index) => (
          (isMenuOpen && <DropdownMenu 
            key={index}
            num={index}
            open
            anchors={anchors}
            handleTabChange={handleChange}
            handleClose={closeHandlers[index]}
            focusedIndex={focusedIndex}
            setFocusedIndex={setFocusedIndex}
          />)
      ))}
    </Box>
    <button onClick={() => addTab()}>+</button>
  </div>
  );
}