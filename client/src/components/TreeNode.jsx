import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

function TreeNode({ fileFolderData }) {
    const [visibility, setVisibility] = useState({});

    function toggleVisibility(name) {
        setVisibility({
            ...visibility,
            [name]: !visibility[name]
        })
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
                        <p className="pt-2.5 cursor-pointer ml-1">{fileFolderData.name}</p>
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