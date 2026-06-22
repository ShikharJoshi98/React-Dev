import { FaCss3Alt, FaHtml5, FaReact } from "react-icons/fa";
import { GrJs } from "react-icons/gr";

function EditorIcon({ extension }) {

    const iconStyle = {
        height: "20px",
        width: "20px"
    };

    const iconMapper = {
        "js": <GrJs className="text-yellow-300 h-5 w-5" />,
        "jsx": <FaReact className="text-blue-500 h-5 w-5" />,
        "css": <FaCss3Alt className="text-purple-500 h-5 w-5" />,
        "html": <FaHtml5 className="text-orange-500 h-5 w-5" />
    }

    return (
        <>
            {iconMapper[extension]}
        </>
    )
}

export default EditorIcon