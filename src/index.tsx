import React from 'react';
import { createRoot } from 'react-dom/client';
import "./style/popup.scss";
import Popup from "./components/Popup";
import { DataProvider } from "./providers/DataProvider";

const container = document.getElementById("root") as Element;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <DataProvider>
            <Popup/>
        </DataProvider>
    </React.StrictMode>
);