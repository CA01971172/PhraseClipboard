import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState, useContext, useRef, RefObject } from 'react'; 
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
  const [isopen, setisopen] = useState(false);
  const anchors: React.MutableRefObject<React.RefObject<HTMLDivElement>[]> = useRef<RefObject<HTMLDivElement>[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const {
    tabArray,
  }= useContext(DataContext);

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs>
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
    </Box>
  );
}
