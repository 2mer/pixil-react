import React from 'react';
export default function useEditorHistory(editor, { enabled = true, limit = undefined } = {}) {
    const [entries, setEntries] = React.useState([]);
    const [index, setIndex] = React.useState(-1);
    React.useEffect(() => {
        if (editor) {
            setEntries([...editor.history.entries]);
            setIndex(editor.history.index);
            return editor.history.onHistoryChanged.sub(({ history }) => {
                setEntries([...history.entries]);
                setIndex(history.index);
            });
        }
    }, [editor]);
    React.useEffect(() => {
        if (editor) {
            editor.history.enabled = enabled;
        }
    }, [editor, enabled]);
    React.useEffect(() => {
        if (editor) {
            editor.history.limit = limit !== null && limit !== void 0 ? limit : 0;
        }
    }, [editor, limit]);
    return React.useMemo(() => ({ entries, index, history: editor === null || editor === void 0 ? void 0 : editor.history }), [entries, index]);
}
