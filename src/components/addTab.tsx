import React, { useState } from "react";

function AddTabClick(){
    const [tabArray, setTabArray] = useState(['タブ'])
    
    const addTab = (tabName = 'タブ') => {
        setTabArray([...tabArray, tabName]);
    }
    
      return (
    <div>
      <ul>
        {tabArray.map((tab, index) => (
          <li key={index}>{tab}</li>
        ))}
      </ul>

      <button onClick={() => addTab()}>+</button>
    </div>
  );
}