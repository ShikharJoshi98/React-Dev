function EditorButton({ isActive }) {
    function handleClick() {

    }
    return (
        <button
            onClick={handleClick}
            className={`${isActive ? "text-white border-t-2 border-[#f7b9dd] bg-[#282a36] font-semibold" : "text-white/40 bg-[#282a36]/70"} py-2 px-4 min-w-25 outline-none rounded-md`}>
            file.js
        </button>
    )
}

export default EditorButton