import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import EditorIcon from "./EditorIcon";
import { useSelector } from "react-redux";
import { useFileContextMenu } from "../context/FileContextMenuContext";
import { useFolderContextMenu } from "../context/FolderContextMenuContext";

function TreeNode({ fileFolderData, visibility = {}, setVisibility }) {
    const { editorSocket } = useSelector(state => state.editor);
    const { setXCoordinate, setYCoordinate, setFile, setOpen: setFileContextOpen } = useFileContextMenu();
    const { setXCoordinate: setFolderXCoordinate, setYCoordinate: setFolderYCoordinate, setFolder, setOpen: setFolderContextOpen } = useFolderContextMenu();

    function toggleVisibility(name) {
        setVisibility(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    }
    function computeExtension(fileFolderData) {
        const names = fileFolderData.name.split(".");
        return names[names.length - 1];
    }
    function handleFileClick(fileFolderData) {
        editorSocket.emit("readFile", {
            pathToFileOrFolder: fileFolderData.path
        })
    }
    function handleContextMenuForFiles(e, path) {
        e.preventDefault();
        setFile(path);
        setXCoordinate(e.clientX);
        setYCoordinate(e.clientY);
        setFileContextOpen(true)
    }
    function handleContextMenuForFolder(e, path) {
        e.preventDefault();
        setFolder(path);
        setFolderXCoordinate(e.clientX);
        setFolderYCoordinate(e.clientY);
        setFolderContextOpen(true)
    }

    return (
        fileFolderData &&
        <div className="pl-4">
            {
                fileFolderData.children ? (
                    <button
                        onClick={() => toggleVisibility(fileFolderData.name)}
                        onContextMenu={(e) => handleContextMenuForFolder(e, fileFolderData.path)}
                        className="border-none cursor-pointer outline-none pt-4 flex items-center gap-1">
                        {visibility[fileFolderData.name] ? <IoIosArrowDown /> : <IoIosArrowForward />}
                        {fileFolderData.name}
                    </button>
                ) :
                    (
                        <div className="flex items-center pt-2.5">
                            <EditorIcon extension={computeExtension(fileFolderData)} />
                            <p
                                onClick={() => handleFileClick(fileFolderData)}
                                onContextMenu={(e) => handleContextMenuForFiles(e, fileFolderData.path)}
                                className="cursor-pointer ml-1">{fileFolderData.name}</p>
                        </div>
                    )
            }
            {
                visibility[fileFolderData.name] && fileFolderData.children && (
                    fileFolderData.children.map((child) => (
                        <TreeNode
                            fileFolderData={child}
                            key={child.path}
                            visibility={visibility}
                            setVisibility={setVisibility}
                        />
                    ))
                )
            }
        </div>
    )
}

export default TreeNode