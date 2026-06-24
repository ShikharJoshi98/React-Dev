import { forwardRef, useEffect } from "react";
import { useFolderContextMenu } from "../context/FolderContextMenuContext";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProjectTreeRequest } from "../features/project/projectAction";

const FolderContextMenu = forwardRef(function FolderContextMenu({ x, y, path }, ref) {
    const { editorSocket } = useSelector((state) => state.editor);
    const { projectId } = useParams();
    const dispatch = useDispatch();
    const { setOpen: setFolderContextOpen } = useFolderContextMenu();

    function handleDeleteFolder(e) {
        e.preventDefault();

        editorSocket.emit("deleteFolder", {
            pathToFileOrFolder: path,
        });

    }

    function handleRenameFolder(e) {
        e.preventDefault();
        e.stopPropagation();

        console.log("rename folder", path);
    }

    useEffect(() => {
        if (!editorSocket) return;

        const handleDeleteSuccess = () => {
            dispatch(getProjectTreeRequest(projectId));
            setFolderContextOpen(false);
        };

        editorSocket.on("deleteFolderSuccess", handleDeleteSuccess);


        return () => {
            editorSocket.off("deleteFolderSuccess", handleDeleteSuccess);
        };
    }, [projectId, editorSocket, dispatch]);

    return (
        <div
            ref={ref}
            style={{ top: `${y}px`, left: `${x}px` }}
            className="w-32 z-50 absolute bg-[#363545] border border-black rounded-md text-sm"
        >
            <button
                onClick={handleDeleteFolder}
                className="outline-none hover:bg-[#323241] cursor-pointer w-full h-8"
            >
                Delete Folder
            </button>
            <button
                onClick={handleRenameFolder}
                className="outline-none hover:bg-[#323241] cursor-pointer w-full h-8"
            >
                Rename Folder
            </button>
        </div>
    );
});

export default FolderContextMenu;