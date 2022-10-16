import { useEffect, useRef, useState } from 'react';
import { Editor, EditorOptions } from '@sgty/pixil';

export interface UseEditorOptions {
	// gets called when the editor is created, if this callback returns a function, it will be called on useEditor hook unmount
	onCreated?: (editor: Editor) => void | (() => void);
}

/**
 * Hook to create an editor
 * @param options the options to pass onto the editor
 * @param hookOptions hook options
 * @returns [ref for HTMLCanvasElement, Editor instance, boolean is the editor ready]
 */
export default function useEditor(
	options: EditorOptions,
	hookOptions: UseEditorOptions
) {
	const ref = useRef<any>();
	const [editor, setEditor] = useState<Editor>();
	const { onCreated } = hookOptions;

	useEffect(() => {
		const ed = new Editor(options);

		const node = ref.current;

		node.appendChild(ed.app.view);

		setEditor(ed);
		const cleanup = onCreated?.(ed);

		return () => {
			node.removeChild(ed.app.view);
			ed.app.destroy();

			if (cleanup) {
				cleanup();
			}
		};
	}, []);

	const isReady = Boolean(editor);

	return [ref, editor as Editor, isReady] as const;
}
