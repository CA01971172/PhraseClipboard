import React, { createContext, useState, useEffect, ReactNode } from 'react';

export const TextContext = createContext<[string[], React.Dispatch<React.SetStateAction<string[]>>] | null>(null)

export function TextProvider({children}: {children: ReactNode}){
    const [texts, setTexts] = useState<string[]>([]);

    return (
        <TextContext.Provider value={[texts, setTexts] }>
            {children}
        </TextContext.Provider>
    );
}