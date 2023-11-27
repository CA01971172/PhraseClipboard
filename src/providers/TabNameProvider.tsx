import React, { createContext, useState, ReactNode } from 'react';

export const TabNameContext = createContext<[string[], React.Dispatch<React.SetStateAction<string[]>>] | null>(null)

export function TabNameProvider({children}: {children: ReactNode}){
    const [tabNames, setTabNames] = useState<string[]>([]);

    return (
        <TabNameContext.Provider value={[tabNames, setTabNames]}>
            {children}
        </TabNameContext.Provider>
    );
}