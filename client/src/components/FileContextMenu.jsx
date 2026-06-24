import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProjectTreeRequest } from "../features/project/projectAction";
import { useEffect } from "react";
import { useFileContextMenu } from "../context/FileContextMenuContext";

const FileContextMenu = forwardRef(function FileContextMenu({ x, y, path }, ref) {
    const { editorSocket } = useSelector((state) => state.editor);
    const { projectId } = useParams();
    const dispatch = useDispatch();
    const { setOpen: setFileContextOpen } = useFileContextMenu();

    function handleDeleteFile(e) {
        e.preventDefault();

        editorSocket.emit("deleteFile", {
            pathToFileOrFolder: path,
        });

    }

    function handleRenameFile(e) {
        e.preventDefault();
        e.stopPropagation();

        console.log("rename file", path);
    }

    useEffect(() => {
        if (!editorSocket) return;

        const handleDeleteSuccess = () => {
            dispatch(getProjectTreeRequest(projectId));
            setFileContextOpen(false);
        };

        editorSocket.on("deleteFileSuccess", handleDeleteSuccess);


        return () => {
            editorSocket.off("deleteFileSuccess", handleDeleteSuccess);
        };
    }, [projectId, editorSocket, dispatch]);

    return (
        <div
            ref={ref}
            style={{ top: `${y}px`, left: `${x}px` }}
            className="w-28 z-50 absolute bg-[#363545] border border-black rounded-md text-sm"
        >
            <button
                onClick={handleDeleteFile}
                className="outline-none hover:bg-[#323241] cursor-pointer w-full h-8"
            >
                Delete File
            </button>
            <button
                onClick={handleRenameFile}
                className="outline-none hover:bg-[#323241] cursor-pointer w-full h-8"
            >
                Rename File
            </button>
        </div>
    );
});

export default FileContextMenu;