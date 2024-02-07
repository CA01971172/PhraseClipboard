import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState, useContext, useRef, RefObject, Dispatch, SetStateAction } from 'react'; 
import { DataContext } from "../providers/DataProvider";
import DropdownMenu from "./DropdownMenu"
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

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

export default function TestTabs({
  focusedIndex,
  setFocusedIndex,
  isEditing,
  setIsEditing
}: {
  focusedIndex: number;
  setFocusedIndex: React.Dispatch<React.SetStateAction<number>>;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) {

  const [isopen, setisopen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [opens, setOpens] = useState<boolean[]>([]);
  
  const anchors: React.MutableRefObject<React.RefObject<HTMLDivElement>[]> = useRef<RefObject<HTMLDivElement>[]>([]);

  const handleChange = (event: React.SyntheticEvent, nextIndex: number) => {
    setFocusedIndex(nextIndex);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggle = () => {
    setisopen(!isopen);
  };

  const {
    tabArray,
    addTab
  }= useContext(DataContext);

  console.log(isopen, isEditing)

  return (
    <div>
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
          value={focusedIndex}
          onChange={handleChange}
          onClick={toggle}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
        {Object.values(tabArray).map((tabData, index) => (
        <Tab
            ref={anchors.current[index]}
            key={index}
            label={tabData.tabName}
            {...a11yProps(index)}
            
        />
        ))}
        {isEditing && <IconButton onClick={() => addTab()}><AddIcon/></IconButton>}
        </Tabs>
      </Box>

        {Object.values(tabArray).map((tabData, index) => (
        (isopen && isEditing && index === focusedIndex 
        &&<DropdownMenu 
        open={opens[index]}
        num={index}
        anchors={anchors}
        handleTabChange={handleChange}
        focusedIndex={focusedIndex}
        setFocusedIndex={setFocusedIndex}
        />)
        ))}
    </Box>
    </div>
  );
}
