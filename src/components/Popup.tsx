import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Header from "./Header"
import TextPaletteEdit from "./TextPaletteEdit"
import TextPaletteView from "./TextPaletteView"

export default function Popup(){
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#FFFFFF',
                light: '#8d6964',
                dark: '#341714'
            }
        }  
    })

    // フォーカス中のタブのindex
    const [focusedIndex, setFocusedIndex] = useState<number>(0);

    const [isEditing, setIsEditing] = useState<boolean>(false);

    return (
        <ThemeProvider theme={darkTheme}>
            <div
                style={{
                    width: "fit-content"
                }}
            >
                <Header
                    focusedIndex={focusedIndex}
                    setFocusedIndex={setFocusedIndex}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                />
                {isEditing ? (
                    <TextPaletteEdit focusedIndex={focusedIndex}/>
                ) : (
                    <TextPaletteView focusedIndex={focusedIndex}/>
                )}
                
            </div>
        </ThemeProvider>
    );
}