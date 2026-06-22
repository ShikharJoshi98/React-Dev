import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import EditorIcon from "./EditorIcon";

function TreeNode({ fileFolderData }) {
    const [visibility, setVisibility] = useState({});

    function toggleVisibility(name) {
        setVisibility({
            ...visibility,
            [name]: !visibility[name]
        })
    }
    function computeExtension(fileFolderData) {
        const names = fileFolderData.name.split(".");
        return names[names.length - 1];
    }

    return (
        fileFolderData &&
        <div className="pl-4">
            {
                fileFolderData.children ? (
                    <button
                        onClick={() => toggleVisibility(fileFolderData.name)}
                        className="border-none cursor-pointer outline-none pt-4 flex items-center gap-1">
                        {visibility[fileFolderData.name] ? <IoIosArrowDown /> : <IoIosArrowForward />}
                        {fileFolderData.name}
                    </button>
                ) :
                    (
                        <div className="flex items-center pt-2.5">
                            <EditorIcon extension={computeExtension(fileFolderData)} />
                            <p className="cursor-pointer ml-1">{fileFolderData.name}</p>
                        </div>
                    )
            }
            {
                visibility[fileFolderData.name] && fileFolderData.children && (
                    fileFolderData.children.map((child) => (
                        <TreeNode
                            fileFolderData={child}
                            key={child.name}
                        />
                    ))
                )
            }
        </div>
    )
}

export default TreeNode