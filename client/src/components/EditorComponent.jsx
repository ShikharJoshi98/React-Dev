import Editor from "@monaco-editor/react"
import { useEffect, useState } from "react"
import EditorButton from "./EditorButton";
import { useDispatch, useSelector } from "react-redux";
import { useActiveFileTab } from "../context/ActiveFileTabContext";

function EditorComponent() {
    const [editorState, setEditorState] = useState(null);
    const { editorSocket } = useSelector(state => state.editor);
    const { activeFileTab, setActiveFileTab } = useActiveFileTab();

    async function downloadTheme() {
        const response = await fetch('/Dracula.json');
        const data = await response.json();
        setEditorState({ ...editorState, theme: data });
    }
    function handleEditorTheme(editor, monaco) {
        monaco.editor.defineTheme('dracula', editorState.theme);
        monaco.editor.setTheme('dracula');
    }

    editorSocket?.on("readFileSuccess", (data) => {
        setActiveFileTab(data.path, data.value);
    });

    useEffect(() => {
        downloadTheme();
    }, []);
    return (
        <>
            {
                editorState &&
                <Editor
                    height={'100vh'}
                    width={'100%'}
                    defaultLanguage="javascript"
                    value={activeFileTab?.value ? activeFileTab.value : ""}
                    options={{
                        fontSize: 18,
                        fontFamily: 'monospace'
                    }}
                    onMount={handleEditorTheme}
                />
            }
        </>
    )
}

export default EditorComponent