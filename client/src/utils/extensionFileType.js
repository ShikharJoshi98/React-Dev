const extensionTypeMap = {
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'html': 'html',
    'css': 'css',
    'md': 'markdown',
    'json': 'json',
    'yml': 'yaml',
    'svg': 'svg'
};

export const extensionToFileType = (extension) => {
    if (!extension) return undefined;
    return extensionTypeMap[extension];
}