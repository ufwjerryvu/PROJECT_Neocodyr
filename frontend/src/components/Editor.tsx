import React, { useRef, useState } from "react";
import { Bold, Italic, List, ListOrdered } from "lucide-react";

interface RichTextEditorProps {
  onSubmit: (content: string) => void;
  onCancel?: () => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  onSubmit,
  onCancel,
  placeholder = "Write your response...",
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    bulletList: false,
    orderedList: false,
  });

  const updateFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      bulletList: document.queryCommandState("insertUnorderedList"),
      orderedList: document.queryCommandState("insertOrderedList"),
    });
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateFormats();
  };

  const handleSubmit = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      if (content.trim() !== "" && content !== "<br>") {
        onSubmit(content);
        editorRef.current.innerHTML = "";
      }
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl overflow-hidden backdrop-blur-sm shadow-lg">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-3 border-b border-slate-700/50 bg-slate-800/50">
        <button
          onClick={() => execCommand("bold")}
          onMouseDown={(e) => e.preventDefault()}
          className={`p-2 rounded-lg hover:bg-slate-700/50 transition-all ${
            activeFormats.bold
              ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              : "text-slate-300"
          }`}
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          onClick={() => execCommand("italic")}
          onMouseDown={(e) => e.preventDefault()}
          className={`p-2 rounded-lg hover:bg-slate-700/50 transition-all ${
            activeFormats.italic
              ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              : "text-slate-300"
          }`}
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <button
          onClick={() => execCommand("insertUnorderedList")}
          onMouseDown={(e) => e.preventDefault()}
          className={`p-2 rounded-lg hover:bg-slate-700/50 transition-all ${
            activeFormats.bulletList
              ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              : "text-slate-300"
          }`}
          title="Bullet List"
        >
          <List size={16} />
        </button>
        <button
          onClick={() => execCommand("insertOrderedList")}
          onMouseDown={(e) => e.preventDefault()}
          className={`p-2 rounded-lg hover:bg-slate-700/50 transition-all ${
            activeFormats.orderedList
              ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              : "text-slate-300"
          }`}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={updateFormats}
        onKeyUp={updateFormats}
        onMouseUp={updateFormats}
        className="min-h-[120px] max-h-[25vh] scrollview overflow-y-auto p-4 text-slate-200 focus:outline-none prose prose-invert prose-sm max-w-none"
        style={{
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
        data-placeholder={placeholder}
      />

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 p-4 border-t border-slate-700/50 bg-slate-800/30">
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-5 py-2.5 text-sm text-slate-300 hover:text-slate-100 hover:bg-slate-800/50 rounded-lg transition-all"
          >
            Cancel
          </button>
        )}
        <button
          onClick={handleSubmit}
          className="px-6 py-2.5 text-sm bg-blue-600 hover:bg-blue-500 rounded-lg transition-all font-medium shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
        >
          Submit
        </button>
      </div>

      <style>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: rgb(100 116 139);
          pointer-events: none;
        }
        [contenteditable] {
          outline: none;
        }
        [contenteditable] ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        [contenteditable] ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        [contenteditable] li {
          margin: 0.25rem 0;
        }
        [contenteditable] strong {
          font-weight: 700;
        }
        [contenteditable] em {
          font-style: italic;
        }
      `}</style>
    </div>
  );
};
export default RichTextEditor;
