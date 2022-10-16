import React from 'react';
import { Editor, HistoryEntry } from '@sgty/pixil';

export default function useEditorHistory(
	editor: Editor,
	{ enabled = true, limit = undefined as undefined | number } = {}
) {
	const [entries, setEntries] = React.useState([] as HistoryEntry[]);
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
			editor.history.limit = limit ?? 0;
		}
	}, [editor, limit]);

	return React.useMemo(
		() => ({ entries, index, history: editor?.history }),
		[entries, index]
	);
}
