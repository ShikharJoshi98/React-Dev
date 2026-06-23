import { useParams } from "react-router-dom"
import EditorComponent from "../components/EditorComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProjectTreeRequest } from "../features/project/projectAction";
import TreeNode from "../components/TreeNode";
import { createEditorConnection } from "../features/editorSocket/editorAction";
import { io } from "socket.io-client";

function ProjectPlayground() {
    const { projectId } = useParams();
    const dispatch = useDispatch();
    const { loading, error, projectTree } = useSelector(state => state.project.projectTree);

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

    return (
        <main className="flex">
            <div className="w-[25%] sticky top-0 h-screen bg-[#252a39] border-r border-white/60 text-white overflow-y-auto scrollbar-none">
                <TreeNode
                    fileFolderData={projectTree}
                />
            </div>
            <div className="w-[75%] min-h-screen">
                <EditorComponent />
            </div>
        </main>
    )
}

export default ProjectPlayground