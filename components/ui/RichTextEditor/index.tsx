"use client";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./styles.css";
import { Toggle } from "../toggle";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Brush,
  Code,
  CodeXml,
  Eraser,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  MessageSquareQuote,
  Pilcrow,
  Redo,
  Ruler,
  Strikethrough,
  Undo,
  WrapText,
} from "lucide-react";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { Separator } from "../separator";

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-sm px-1 py-1 mb-1 bg-white max-w-fit">
      <div className="flex items-center flex-wrap">
        <Toggle
          pressed={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          <Bold />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          pressed={editor.isActive("italic")}
        >
          <Italic />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          pressed={editor.isActive("strike")}
        >
          <Strikethrough />
        </Toggle>
        <Separator orientation="vertical" className="mx-3" />
        <Toggle
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          pressed={editor.isActive("code")}
        >
          <CodeXml />
        </Toggle>
        <Toggle onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          <Eraser />
        </Toggle>
        <Toggle
          pressed={editor.isActive("paragraph")}
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          <Pilcrow />
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          pressed={editor.isActive("heading", { level: 1 })}
        >
          <Heading1 />
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          pressed={editor.isActive("heading", { level: 2 })}
        >
          <Heading2 />
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          pressed={editor.isActive("heading", { level: 3 })}
        >
          <Heading3 />
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          pressed={editor.isActive("heading", { level: 4 })}
        >
          <Heading4 />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          pressed={editor.isActive("bulletList")}
        >
          <List />
        </Toggle>
        <Toggle
          pressed={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered />
        </Toggle>
        <Toggle
          pressed={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeft />
        </Toggle>
        <Toggle
          pressed={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenter />
        </Toggle>
        <Toggle
          pressed={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <AlignRight />
        </Toggle>

        <Toggle
          pressed={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <Code />
        </Toggle>
        <Toggle
          pressed={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <MessageSquareQuote />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Ruler />
        </Toggle>
        <Toggle onClick={() => editor.chain().focus().setHardBreak().run()}>
          <WrapText />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo />
        </Toggle>
        <Toggle
          pressed={editor.isActive("textStyle", { color: "#958DF1" })}
          onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        >
          <Brush className="text-[#958DF1]" />
        </Toggle>
        <Toggle
          pressed={editor.isActive("highlight")}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
        >
          <Highlighter />
        </Toggle>
      </div>
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle,
  StarterKit.configure({
    bulletList: {
      // keepMarks: true,
      // keepAttributes: true,
      HTMLAttributes: {
        class: "list-disc ml-5",
      }, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      // keepMarks: true,
      // keepAttributes: false,
      HTMLAttributes: {
        class: "list-decimal ml-3",
      }, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Highlight,
];

interface RichTextEditorProps {
  content?: string;
  onUpdate: (html: string) => void;
}

const RichTextEditor = ({ onUpdate, content }: RichTextEditorProps) => {
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content={content || ""}
      onUpdate={({ editor }) => onUpdate(editor.getHTML())}
      editorProps={{
        attributes: {
          class:
            "focus:outline-none max-h-96 overflow-y-auto overflow-x-auto border rounded-md  py-2 px-3 bg-white ",
        },
      }}
    >
      <div className="editor-content" />
    </EditorProvider>
  );
};

export default RichTextEditor;
