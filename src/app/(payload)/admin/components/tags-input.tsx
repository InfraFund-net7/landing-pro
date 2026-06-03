'use client';

import { KeyboardEvent, useState } from 'react';
import styles from './post-editor.module.css';

type TagsInputProps = {
  name: string;
  defaultTags?: string[];
  placeholder?: string;
};

export default function TagsInput({
  name,
  defaultTags = [],
  placeholder = 'Add tags...',
}: TagsInputProps) {
  const [tags, setTags] = useState<string[]>(defaultTags);
  const [input, setInput] = useState('');

  const addTag = (raw: string) => {
    const value = raw.trim();
    if (!value || tags.includes(value)) return;
    setTags((prev) => [...prev, value]);
    setInput('');
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((item) => item !== tag));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      addTag(input);
    } else if (event.key === 'Backspace' && !input && tags.length > 0) {
      setTags((prev) => prev.slice(0, -1));
    }
  };

  return (
    <>
      <input type="hidden" name={name} value={tags.join(', ')} readOnly />
      <div
        className={styles.tagsInput}
        onClick={(e) => {
          const target = e.currentTarget.querySelector('input');
          target?.focus();
        }}
      >
        {tags.map((tag) => (
          <span key={tag} className={styles.tagPill}>
            {tag}
            <button
              type="button"
              className={styles.tagRemove}
              onClick={() => removeTag(tag)}
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          className={styles.tagField}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(input)}
          placeholder={tags.length === 0 ? placeholder : ''}
        />
      </div>
    </>
  );
}
