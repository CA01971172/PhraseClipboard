import React, { useState } from 'react';

type TabInfo = { tabName:string, texts:string };
function tabArray(){
const [ tabArray, setTabArray] = useState<TabInfo[]>([
{ tabName:"tabName1", texts:"texts1" }])
return ( 
<div></div> 
)
}

export default tabArray