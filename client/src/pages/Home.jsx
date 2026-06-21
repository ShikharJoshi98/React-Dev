import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { clearProjectState, createProjectRequest } from "../features/project/projectAction";
import { useNavigate } from "react-router-dom";

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, message, projectId } = useSelector(state => state.project.createProject);
    const [projectData, setProjectData] = useState({
        name: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData((prev) => ({
            ...prev,
            [name]: value
        }));
    }
    const handleCreateProject = (e) => {
        e.preventDefault();
        dispatch(createProjectRequest(projectData));
    }

    useEffect(() => {
        if (projectId) {
            navigate(`/project/${projectId}`)
            dispatch(clearProjectState());
        }
    }, [projectId]);

    return (
        <main>
            <form onSubmit={handleCreateProject} className="flex flex-col gap-4 mt-10 w-fit">
                <input onChange={handleChange} name="name" value={projectData.name} className="border border-gray-500 w-fit" required />
                <input onChange={handleChange} name="description" value={projectData.description} className="border border-gray-500 w-fit" required />
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default Home