import { createContext, useContext, useState } from "react";

const ActiveFileTabContext = createContext();

export const ActiveFileTabProvider = ({ children }) => {
    const [activeFileTab, setActiveFileTabState] = useState(null);

    const setActiveFileTab = (path, value, extension) => {
        setActiveFileTabState({
            path,
            value,
            extension
        });
    }

    return (
        <ActiveFileTabContext.Provider
            value={{
                activeFileTab,
                setActiveFileTab
            }}
        >
            {children}
        </ActiveFileTabContext.Provider>
    )
}

export const useActiveFileTab = () => {
    const context = useContext(ActiveFileTabContext);

    if (!context) {
        throw new Error(
            "useActiveFileTab must be used inside ActiveFileTabProvider"
        );
    }

    return context;
};