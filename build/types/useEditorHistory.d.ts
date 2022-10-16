import { Editor, HistoryEntry } from '@sgty/pixil';
export default function useEditorHistory(editor: Editor, { enabled, limit }?: {
    enabled?: boolean;
    limit?: number;
}): {
    entries: HistoryEntry[];
    index: number;
    history: import("@sgty/pixil/build/types").History;
};
