import { useParams } from "react-router-dom"
import EditorComponent from "../components/EditorComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getProjectTreeRequest } from "../features/project/projectAction";
import TreeNode from "../components/TreeNode";
import { createEditorConnection } from "../features/editorSocket/editorAction";
import { io } from "socket.io-client";
import { useFileContextMenu } from "../context/FileContextMenuContext";
import FileContextMenu from "../components/FileContextMenu";
import { useFolderContextMenu } from "../context/FolderContextMenuContext";
import FolderContextMenu from "../components/FolderContextMenu";

function ProjectPlayground() {
    const { projectId } = useParams();
    const dispatch = useDispatch();
    const [visibility, setVisibility] = useState({});
    const { loading, error, projectTree } = useSelector(state => state.project.projectTree);
    const { isFile: file, X: fileContextX, Y: fileContextY, isOpen: isFileContextOpen, setOpen: setFileContextOpen } = useFileContextMenu();
    const { isFolder: folder, X: folderContextX, Y: folderContextY, isOpen: isFolderContextOpen, setOpen: setFolderContextOpen
    } = useFolderContextMenu();
    const fileMenuRef = useRef(null);
    const folderMenuRef = useRef(null);

    useEffect(() => {
        dispatch(getProjectTreeRequest(projectId));
    }, [projectId])

    useEffect(() => {
        if (projectId) {
            const editorSocketConn = io(`${import.meta.env.VITE_API_URL}/editor`, {
                query: {
                    projectId
                }
            });
            dispatch(createEditorConnection(editorSocketConn));

            return () => {
                editorSocketConn.disconnect();
            };
        }
    }, [projectId, dispatch]);

    useEffect(() => {
        function handleOutsideClick(e) {
            if (
                isFileContextOpen &&
                fileMenuRef.current &&
                !fileMenuRef.current.contains(e.target)
            ) {
                setFileContextOpen(false);
            }

            if (
                isFolderContextOpen &&
                folderMenuRef.current &&
                !folderMenuRef.current.contains(e.target)
            ) {
                setFolderContextOpen(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [
        isFileContextOpen,
        isFolderContextOpen,
        setFileContextOpen,
        setFolderContextOpen,
    ]);

    return (
        <main className="flex">
            <div className="w-[25%] sticky top-0 h-screen bg-[#252a39] border-r border-white/60 text-white overflow-y-auto scrollbar-none">
                {isFileContextOpen && fileContextX != null && fileContextY != null && (
                    <FileContextMenu
                        x={fileContextX}
                        y={fileContextY}
                        path={file}
                        ref={fileMenuRef}
                    />
                )}
                {isFolderContextOpen && folderContextX != null && folderContextY != null && (
                    <FolderContextMenu
                        x={folderContextX}
                        y={folderContextY}
                        path={folder}
                        ref={folderMenuRef}
                    />
                )}
                <TreeNode
                    fileFolderData={projectTree}
                    visibility={visibility}
                    setVisibility={setVisibility}
                />
            </div>
            <div className="w-[75%] min-h-screen">
                <EditorComponent />
            </div>
        </main>
    )
}

export default ProjectPlayground