import React from 'react';
import ReactDOM from 'react-dom';
import "./style/popup.scss";
import Popup from "./components/Popup";
import { DataProvider } from "./providers/DataProvider";


ReactDOM.render(
    <React.StrictMode>
        <DataProvider>
            <Popup/>
        </DataProvider>
    </React.StrictMode>,
    document.getElementById('root')
);