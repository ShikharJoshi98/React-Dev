import Editor from "@monaco-editor/react"
import { useEffect, useState } from "react"
import EditorButton from "./EditorButton";
import { useDispatch, useSelector } from "react-redux";
import { useActiveFileTab } from "../context/ActiveFileTabContext";
import { extensionToFileType } from "../utils/extensionFileType";

function EditorComponent() {
    const [editorState, setEditorState] = useState(null);
    const { editorSocket } = useSelector(state => state.editor);
    const { activeFileTab, setActiveFileTab } = useActiveFileTab();
    let timerId = null;

    async function downloadTheme() {
        const response = await fetch('/Dracula.json');
        const data = await response.json();
        setEditorState({ ...editorState, theme: data });
    }
    function handleEditorTheme(editor, monaco) {
        monaco.editor.defineTheme('dracula', editorState.theme);
        monaco.editor.setTheme('dracula');
    }
    function handleChange(value) {
        if (timerId != null) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            const editorContent = value;
            editorSocket.emit("writeFile", {
                data: editorContent,
                pathToFileOrFolder: activeFileTab.path
            })
        }, 2000);
    }

    useEffect(() => {
        downloadTheme();
    }, []);

    useEffect(() => {
        if (!editorSocket) return;

        const handleReadFileSuccess = (data) => {
            const fileExtension = data.path.split('.').pop();
            setActiveFileTab(data.path, data.value, fileExtension);
        };

        editorSocket.on("readFileSuccess", handleReadFileSuccess);

        return () => {
            editorSocket.off("readFileSuccess", handleReadFileSuccess);
        };
    }, [editorSocket, setActiveFileTab]);

    return (
        <>
            {
                editorState &&
                <Editor
                    height={'100vh'}
                    width={'100%'}
                    defaultLanguage={undefined}
                    language={extensionToFileType(activeFileTab?.extension)}
                    value={activeFileTab?.value ? activeFileTab.value : ""}
                    options={{
                        fontSize: 18,
                        fontFamily: 'monospace'
                    }}
                    onChange={handleChange}
                    onMount={handleEditorTheme}
                />
            }
        </>
    )
}

export default EditorComponent