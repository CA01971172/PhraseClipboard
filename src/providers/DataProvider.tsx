import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from "uuid";

/* 型定義 */
// storageから取得する、データ全体の型
type DataInfo = {
    data?: {
        tabs: TabInfo[];
    };
};

// 個別タブの型
type TabInfo = {
    id: string;
    tabName: string;
    texts: string[];
};

/* 関数定義 */
// chrome.storageからタブのデータを取得する関数
async function getTabData(): Promise<TabInfo[]>{
    let initialData: TabInfo[] = []; //デフォルト値
    return new Promise<TabInfo[]>((resolve, reject) => {
        try{
            chrome.storage.local.get(["data"], function(response: DataInfo){
                try{
                    const tabs: TabInfo[] = response["data"]?.["tabs"] as TabInfo[] || [];
                    resolve(tabs);
                }catch(error) {
                    // データが存在しない場合、デフォルトデータを代わりに取得する
                    resolve(initialData);
                }
            });
        }catch(error){
            // chrome.storageへアクセスできない場合のエラーハンドリング
            console.error("chrome.storageへのアクセスに失敗しました\n", error);
            resolve(initialData);
        }
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

// クリップボードにテキストをコピーする関数
function copyToClipboard(text: string): void{
    if(navigator.clipboard){
        navigator.clipboard.writeText(text);
    }
}

/* Provider定義 */
type DataContextInfo = {
    tabArray: TabInfo[];
    addTab: (tabName?: string) => void;
    deleteTab: (tabIndex: number) => void;
    renameTab: (tabName: string, tabIndex: number) => void;
    swapTab(index: number, leftOrRight: 1 | -1): void;
    setTexts: (text: string, tabIndex: number) => void;
    copyText: (tabIndex: number, textIndex: number) => void;
    saveTabData: () => Promise<DataInfo>;
}

const initialContext: DataContextInfo = {
    tabArray: [],
    addTab: () => {},
    deleteTab: () => {},
    renameTab: () => {},
    swapTab: () => {},
    setTexts: () => {},
    copyText: () => {},
    saveTabData: () => Promise.resolve({})
};

export const DataContext = createContext<DataContextInfo>(initialContext);

export function DataProvider({children}: {children: ReactNode}){
    // タブのデータを管理するstate
    const [tabArray, setTabArray] = useState<TabInfo[]>([]);

    // storageのデータを取得し、タブのデータを初期化する
    useEffect(() => {
        getTabData().then((response: TabInfo[]) => {
            setTabArray(response);
        });
    }, []);

    // タブを追加する関数
    function addTab(tabName: string = "タブ"): void{
        const newTab: TabInfo = {
            id: uuidv4(),
            tabName,
            texts: []
        };
        setTabArray([...tabArray, newTab]);
    }

    // タブを削除する関数
    function deleteTab(tabIndex: number): void{
        setTabArray(prev => {
            // 新しい配列を作成し、指定したindexの要素を削除
            const newArray: TabInfo[] = [...prev];
            newArray.splice(tabIndex, 1);
            return newArray;
        });
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

    // タブの順番を入れ替える関数
    function swapTab(index: number, leftOrRight: 1|-1): void{
        const newData: TabInfo[] = tabArray.slice();
        
        const nextIndex: number = index + leftOrRight;
        if((0 > nextIndex) || (newData.length <= nextIndex)) throw new Error("これ以上は配列を動かせません");

        // タブを入れ替える
        const temp: TabInfo = newData[index];
        newData[index] = newData[nextIndex];
        newData[nextIndex] = temp;

        // 入れ替えたタブのstateを更新
        setTabArray(newData);
    }

    // 文字列を受け取って、文字列型配列としてタブのtextsに代入する関数
    function setTexts(text: string, tabIndex: number): void{
        const texts: string[] = convertTextToArray(text);
        setTabArray(
            tabArray.map((tab, index) => {
                if(index === tabIndex){
                    tab.texts = texts;
                }
                return tab;
            })
        )
    }

    // クリップボードにテキストをコピーする関数
    function copyText(tabIndex: number, textIndex: number): void{
        const text: string = tabArray[tabIndex].texts[textIndex];
        copyToClipboard(text);
    }

    // chrome.storageに現在のデータを保存する関数
    async function saveTabData(): Promise<DataInfo>{
        return new Promise<DataInfo>((resolve, reject) => {
            try{
                // chrome.storageに現在のデータを保存する
                const sendData: DataInfo = {
                    data: {
                        tabs: tabArray
                    }
                };
                chrome.storage.local.set(sendData, function() {
                    resolve(sendData);
                });
            }catch(error){
                throw error;
            }
        });
    }

    return (
        <DataContext.Provider
            value={{
                tabArray,
                addTab,
                deleteTab,
                renameTab,
                swapTab,
                setTexts,
                copyText,
                saveTabData
            }}
        >
            {children}
        </DataContext.Provider>
    );
}