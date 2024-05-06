import { createContext, useState } from "react";

const ActiveTabContext = createContext({});

export const ActiveTabProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState('students');
    return (
        <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </ActiveTabContext.Provider>
    )
}

export default ActiveTabContext;