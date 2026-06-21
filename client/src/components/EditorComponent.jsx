import Editor from "@monaco-editor/react"
import { useEffect, useState } from "react"
import EditorButton from "./EditorButton";

function EditorComponent() {
    const [editorState, setEditorState] = useState(null);

    async function downloadTheme() {
        const response = await fetch('/Dracula.json');
        const data = await response.json();
        setEditorState({ ...editorState, theme: data });
    }
    function handleEditorTheme(editor, monaco) {
        monaco.editor.defineTheme('dracula', editorState.theme);
        monaco.editor.setTheme('dracula');
    }

    useEffect(() => {
        downloadTheme();
    }, []);
    return (
        <>
            {
                editorState &&
                <Editor
                    height={'80vh'}
                    width={'100%'}
                    defaultLanguage="javascript"
                    defaultValue="// Welcome to the playground"
                    options={{
                        fontSize: 18,
                        fontFamily: 'monospace'
                    }}
                    onMount={handleEditorTheme}
                />
            }
            <EditorButton isActive={true} />
            <EditorButton isActive={false} />
        </>
    )
}

export default EditorComponent