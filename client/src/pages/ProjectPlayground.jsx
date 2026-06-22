import { useParams } from "react-router-dom"
import EditorComponent from "../components/EditorComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProjectTreeRequest } from "../features/project/projectAction";
import TreeNode from "../components/TreeNode";

function ProjectPlayground() {
    const { projectId } = useParams();
    const dispatch = useDispatch();
    const { loading, error, projectTree } = useSelector(state => state.project.projectTree);

    useEffect(() => {
        dispatch(getProjectTreeRequest(projectId));
    }, [dispatch, projectId])

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