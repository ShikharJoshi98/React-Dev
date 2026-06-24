import { createContext, useContext, useState } from "react";

const FolderContextMenuContext = createContext();

export const FolderMenuProvider = ({ children }) => {
    const [X, setX] = useState(null);
    const [Y, setY] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isFolder, setIsFolder] = useState(null);

    const setXCoordinate = (incomingX) => {
        setX(incomingX);
    }
    const setYCoordinate = (incomingY) => {
        setY(incomingY);
    }
    const setOpen = (incomingIsOpen) => {
        setIsOpen(incomingIsOpen);
    }
    const setFolder = (incomingFolder) => {
        setIsFolder(incomingFolder);
    }
    return (
        <FolderContextMenuContext.Provider
            value={{
                X,
                Y,
                setXCoordinate,
                setYCoordinate,
                setOpen,
                isOpen,
                setFolder,
                isFolder
            }}
        >
            {children}
        </FolderContextMenuContext.Provider>
    )
}

export const useFolderContextMenu = () => {
    const context = useContext(FolderContextMenuContext);

    if (!context) {
        throw new Error(
            "useFolderContextMenu must be used inside FolderMenuProvider"
        );
    }

    return context;
}