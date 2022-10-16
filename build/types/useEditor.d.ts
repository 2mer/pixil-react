/// <reference types="react" />
import { Editor, EditorOptions } from '@sgty/pixil';
export interface UseEditorOptions {
    onCreated?: (editor: Editor) => void | (() => void);
}
/**
 * Hook to create an editor
 * @param options the options to pass onto the editor
 * @param hookOptions hook options
 * @returns [ref for HTMLCanvasElement, Editor instance, boolean is the editor ready]
 */
export default function useEditor(options: EditorOptions, hookOptions: UseEditorOptions): readonly [import("react").MutableRefObject<any>, Editor, boolean];
