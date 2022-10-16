import { useEffect, useRef, useState } from 'react';
import { Editor } from '@sgty/pixil';
/**
 * Hook to create an editor
 * @param options the options to pass onto the editor
 * @param hookOptions hook options
 * @returns [ref for HTMLCanvasElement, Editor instance, boolean is the editor ready]
 */
export default function useEditor(options, hookOptions) {
    const ref = useRef();
    const [editor, setEditor] = useState();
    const { onCreated } = hookOptions;
    useEffect(() => {
        const ed = new Editor(options);
        const node = ref.current;
        node.appendChild(ed.app.view);
        setEditor(ed);
        const cleanup = onCreated === null || onCreated === void 0 ? void 0 : onCreated(ed);
        return () => {
            node.removeChild(ed.app.view);
            ed.app.destroy();
            if (cleanup) {
                cleanup();
            }
        };
    }, []);
    const isReady = Boolean(editor);
    return [ref, editor, isReady];
}
