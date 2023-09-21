import React, { createContext, useState, useEffect, ReactNode } from 'react';

/* 型定義 */
// storageから取得する、データ全体の型
type DataInfo = {
    data?: {
        tabs: TabInfo[];
    };
};

// 個別タブの型
type TabInfo = {
    tabName: string;
    messages: string[];
};

/* 関数定義 */
// chrome.storageからタブのデータを取得する関数
async function getData(): Promise<TabInfo[]>{
    let initialData: TabInfo[] = []; //デフォルト値
    return new Promise<TabInfo[]>((resolve, reject) => {
        chrome.storage.local.get(["data"], function(response: DataInfo){
            try{
                const tabs: TabInfo[] = response["data"]?.["tabs"] as TabInfo[] || [];
                resolve(tabs);
            }catch(error) {
                resolve(initialData);
            }
        });
    });
}

// 複数行のテキストを行ごとに配列に変換する関数
function convertTextToArray(text: string): string[]{
    return text.split(/\n/);
}

// 文字列型配列を複数行のテキストに変換する関数
export function convertArrayToText(textArray: string[]): string{
    return textArray.join("\n");
}

/* Provider定義 */
type DataContextInfo = {
    tabArray: TabInfo[];
    addTab: (tabName: string) => void;
    deleteTab: (tabIndex: number) => void;
    renameTab: (tabName: string, tabIndex: number) => void;
    setMessages: (text: string, tabIndex: number) => void;
}

const initialContext: DataContextInfo = {
    tabArray: [],
    addTab: () => {},
    deleteTab: () => {},
    renameTab: () => {},
    setMessages: () => {}
};

export const DataContext = createContext<DataContextInfo>(initialContext);

export function DataProvider({children}: {children: ReactNode}){
    // タブのデータを管理するstate
    const [tabArray, setTabArray] = useState<TabInfo[]>([]);

    // storageのデータを取得し、タブのデータを初期化する
    useEffect(() => {
        getData().then((response: TabInfo[]) => {
            setTabArray(response);
        });
    }, []);

    // タブを追加する関数
    function addTab(tabName: string): void{
        const newTab: TabInfo = {
            tabName,
            messages: []
        };
        setTabArray([...tabArray, newTab]);
    }

    // タブを削除する関数
    function deleteTab(tabIndex: number): void{
        setTabArray(
            tabArray.splice(tabIndex, 1)
        )
    }

    // タブ名を変更する関数
    function renameTab(tabName: string, tabIndex: number): void{
        setTabArray(
            tabArray.map((tab, index) => {
                if(index === tabIndex){
                    tab.tabName = tabName;
                }
                return tab;
            })
        )
    }

    // 文字列を受け取って、文字列型配列としてタブのmessagesに代入する関数
    function setMessages(text: string, tabIndex: number): void{
        const messages: string[] = convertTextToArray(text);
        setTabArray(
            tabArray.map((tab, index) => {
                if(index === tabIndex){
                    tab.messages = messages;
                }
                return tab;
            })
        )
    }

    return (
        <DataContext.Provider
            value={{
                tabArray,
                addTab,
                deleteTab,
                renameTab,
                setMessages
            }}
        >
            {children}
        </DataContext.Provider>
    );
}