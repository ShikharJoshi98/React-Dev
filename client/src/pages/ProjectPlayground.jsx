import { useParams } from "react-router-dom"
import EditorComponent from "../components/EditorComponent";

function ProjectPlayground() {
    const { projectId } = useParams();
    return (
        <main>
            {
                projectId
            }
            <EditorComponent />
        </main>
    )
}

export default ProjectPlayground