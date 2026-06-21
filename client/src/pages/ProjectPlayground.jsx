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
        <main>
            {
                projectId
            }
            <TreeNode
                fileFolderData={projectTree}
            />
            <EditorComponent />
        </main>
    )
}

export default ProjectPlayground