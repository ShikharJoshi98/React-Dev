import { createContext, useContext, useState } from "react";

const FileContextMenuContext = createContext();

export const FileMenuProvider = ({ children }) => {
    const [X, setX] = useState(null);
    const [Y, setY] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isFile, setIsFile] = useState(null);

    const setXCoordinate = (incomingX) => {
        setX(incomingX);
    }
    const setYCoordinate = (incomingY) => {
        setY(incomingY);
    }
    const setOpen = (incomingIsOpen) => {
        setIsOpen(incomingIsOpen);
    }
    const setFile = (incomingFile) => {
        setIsFile(incomingFile);
    }
    return (
        <FileContextMenuContext.Provider
            value={{
                X,
                Y,
                setXCoordinate,
                setYCoordinate,
                setOpen,
                isOpen,
                setFile,
                isFile
            }}
        >
            {children}
        </FileContextMenuContext.Provider>
    )
}

export const useFileContextMenu = () => {
    const context = useContext(FileContextMenuContext);

    if (!context) {
        throw new Error(
            "useFileContextMenu must be used inside FileMenuProvider"
        );
    }

    return context;
}