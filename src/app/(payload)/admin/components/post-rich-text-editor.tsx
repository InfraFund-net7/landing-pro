'use client';

import { Extension } from '@tiptap/core';
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo2,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import styles from './post-editor.module.css';

const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() {
    return { types: ['textStyle'] };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) =>
              element.style.fontSize?.replace(/['"]+/g, '') ?? null,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }) =>
          chain().setMark('textStyle', { fontSize }).run(),
      unsetFontSize:
        () =>
        ({ chain }) =>
          chain()
            .setMark('textStyle', { fontSize: null })
            .removeEmptyTextStyle()
            .run(),
    };
  },
});

const TEXT_TYPES = [
  { label: 'Normal text', value: 'paragraph' },
  { label: 'Heading 1', value: 'h1' },
  { label: 'Heading 2', value: 'h2' },
  { label: 'Heading 3', value: 'h3' },
];

const FONT_SIZES = ['12px', '14px', '16px', '18px', '20px', '24px', '32px'];

type PostRichTextEditorProps = {
  name?: string;
  defaultValue?: string;
  onChange?: (html: string) => void;
};

export default function PostRichTextEditor({
  name,
  defaultValue = '',
  onChange,
}: PostRichTextEditorProps) {
  const [html, setHtml] = useState(defaultValue);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'editor-link' },
      }),
      Image.configure({ inline: false }),
      TextStyle,
      FontSize,
      Color,
      Placeholder.configure({
        placeholder: 'Write your content here...',
      }),
    ],
    content: defaultValue,
    editorProps: {
      attributes: {
        class: 'tiptap',
      },
    },
    onUpdate: ({ editor: ed }) => {
      const next = ed.getHTML();
      setHtml(next);
      onChange?.(next);
    },
  });

  useEffect(() => {
    if (!editor || !defaultValue) return;
    if (editor.isEmpty) {
      editor.commands.setContent(defaultValue);
      setHtml(defaultValue);
    }
  }, [editor, defaultValue]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('Enter URL', previousUrl ?? 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('alt', file.name.replace(/\.[^.]+$/, '') || 'Blog image');

      try {
        const response = await fetch('/admin/api/media/upload', {
          method: 'POST',
          credentials: 'same-origin',
          body: formData,
        });

        const data = await response.json().catch(() => null);
        if (!response.ok || !data?.url) {
          window.alert(
            typeof data?.message === 'string'
              ? data.message
              : 'Unable to upload image. Please try again.'
          );
          return;
        }

        editor
          .chain()
          .focus()
          .setImage({ src: data.url, alt: data.alt || file.name })
          .run();
      } catch {
        window.alert('Network error while uploading image.');
      }
    };
    input.click();
  }, [editor]);

  const getCurrentTextType = () => {
    if (!editor) return 'paragraph';
    if (editor.isActive('heading', { level: 1 })) return 'h1';
    if (editor.isActive('heading', { level: 2 })) return 'h2';
    if (editor.isActive('heading', { level: 3 })) return 'h3';
    return 'paragraph';
  };

  const setTextType = (value: string) => {
    if (!editor) return;
    const chain = editor.chain().focus();
    if (value === 'paragraph') {
      chain.setParagraph().run();
      return;
    }
    const level = Number(value.replace('h', '')) as 1 | 2 | 3;
    chain.setHeading({ level }).run();
  };

  if (!editor) return null;

  return (
    <div className={styles.editorWrapper}>
      {name ? <input type="hidden" name={name} value={html} readOnly /> : null}
      <div className={styles.toolbar}>
        <div className={styles.toolbarGroup}>
          <button
            type="button"
            className={styles.toolbarBtn}
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            aria-label="Undo"
          >
            <Undo2 size={16} />
          </button>
          <button
            type="button"
            className={styles.toolbarBtn}
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            aria-label="Redo"
          >
            <Redo2 size={16} />
          </button>
        </div>

        <div className={styles.toolbarDivider} />

        <select
          className={styles.toolbarSelect}
          value={getCurrentTextType()}
          onChange={(e) => setTextType(e.target.value)}
          aria-label="Text type"
        >
          {TEXT_TYPES.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <select
          className={styles.toolbarSelect}
          defaultValue="16px"
          onChange={(e) =>
            editor.chain().focus().setFontSize(e.target.value).run()
          }
          aria-label="Font size"
        >
          {FONT_SIZES.map((size) => (
            <option key={size} value={size}>
              {size.replace('px', '')}
            </option>
          ))}
        </select>

        <div className={styles.toolbarDivider} />

        <input
          type="color"
          className={styles.colorInput}
          defaultValue="#ffffff"
          onChange={(e) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
          aria-label="Text color"
          title="Text color"
        />

        <div className={styles.toolbarDivider} />

        <div className={styles.toolbarGroup}>
          <button
            type="button"
            className={`${styles.toolbarBtn} ${editor.isActive('bold') ? styles.toolbarBtnActive : ''}`}
            onClick={() => editor.chain().focus().toggleBold().run()}
            aria-label="Bold"
          >
            <Bold size={16} />
          </button>
          <button
            type="button"
            className={`${styles.toolbarBtn} ${editor.isActive('italic') ? styles.toolbarBtnActive : ''}`}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            aria-label="Italic"
          >
            <Italic size={16} />
          </button>
          <button
            type="button"
            className={`${styles.toolbarBtn} ${editor.isActive('underline') ? styles.toolbarBtnActive : ''}`}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            aria-label="Underline"
          >
            <UnderlineIcon size={16} />
          </button>
          <button
            type="button"
            className={`${styles.toolbarBtn} ${editor.isActive('strike') ? styles.toolbarBtnActive : ''}`}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            aria-label="Strikethrough"
          >
            <Strikethrough size={16} />
          </button>
        </div>

        <div className={styles.toolbarDivider} />

        <div className={styles.toolbarGroup}>
          <button
            type="button"
            className={`${styles.toolbarBtn} ${editor.isActive({ textAlign: 'left' }) ? styles.toolbarBtnActive : ''}`}
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            aria-label="Align left"
          >
            <AlignLeft size={16} />
          </button>
          <button
            type="button"
            className={`${styles.toolbarBtn} ${editor.isActive({ textAlign: 'center' }) ? styles.toolbarBtnActive : ''}`}
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            aria-label="Align center"
          >
            <AlignCenter size={16} />
          </button>
          <button
            type="button"
            className={`${styles.toolbarBtn} ${editor.isActive({ textAlign: 'right' }) ? styles.toolbarBtnActive : ''}`}
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            aria-label="Align right"
          >
            <AlignRight size={16} />
          </button>
          <button
            type="button"
            className={`${styles.toolbarBtn} ${editor.isActive({ textAlign: 'justify' }) ? styles.toolbarBtnActive : ''}`}
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            aria-label="Justify"
          >
            <AlignJustify size={16} />
          </button>
        </div>

        <div className={styles.toolbarDivider} />

        <div className={styles.toolbarGroup}>
          <button
            type="button"
            className={`${styles.toolbarBtn} ${editor.isActive('bulletList') ? styles.toolbarBtnActive : ''}`}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            aria-label="Bullet list"
          >
            <List size={16} />
          </button>
          <button
            type="button"
            className={`${styles.toolbarBtn} ${editor.isActive('orderedList') ? styles.toolbarBtnActive : ''}`}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            aria-label="Numbered list"
          >
            <ListOrdered size={16} />
          </button>
        </div>

        <div className={styles.toolbarDivider} />

        <div className={styles.toolbarGroup}>
          <button
            type="button"
            className={`${styles.toolbarBtn} ${editor.isActive('link') ? styles.toolbarBtnActive : ''}`}
            onClick={setLink}
            aria-label="Insert link"
          >
            <Link2 size={16} />
          </button>
          <button
            type="button"
            className={styles.toolbarBtn}
            onClick={addImage}
            aria-label="Insert image"
          >
            <ImageIcon size={16} />
          </button>
          <button
            type="button"
            className={`${styles.toolbarBtn} ${editor.isActive('codeBlock') ? styles.toolbarBtnActive : ''}`}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            aria-label="Code block"
          >
            <Code size={16} />
          </button>
          <button
            type="button"
            className={`${styles.toolbarBtn} ${editor.isActive('blockquote') ? styles.toolbarBtnActive : ''}`}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            aria-label="Blockquote"
          >
            <Quote size={16} />
          </button>
          <button
            type="button"
            className={styles.toolbarBtn}
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            aria-label="Horizontal rule"
          >
            <Minus size={16} />
          </button>
        </div>
      </div>
      <EditorContent editor={editor} className={styles.editorContent} />
    </div>
  );
}
