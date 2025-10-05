"use client";

import React, { useEffect, useRef } from 'react';
import styles from './ConfirmDialog.module.css';

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};


/**
 * A ConfirmDialog component for displaying a confirmation dialog with a title, description and two action buttons.
 *
 * @param {boolean} open - Whether the dialog is open or not.
 * @param {string} title - The title of the dialog.
 * @param {string} description - The description of the dialog.
 * @param {string} confirmText - The text of the confirm button. Defaults to 'Confirm'.
 * @param {string} cancelText - The text of the cancel button. Defaults to 'Cancel'.
 * @param {function} onConfirm - A callback function to be called when the confirm button is clicked.
 * @param {function} onCancel - A callback function to be called when the cancel button is clicked.
 *
 * @returns {JSX.Element | null} The dialog component or null if open is false.
 */

export function ConfirmDialog({
  open,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstFocusableRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusableRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    // focus first button when opened
    firstFocusableRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCancel();
      }
      if (e.key === 'Tab') {
        // basic focus trap
        const focusable = [firstFocusableRef.current, lastFocusableRef.current].filter(
          Boolean
        ) as HTMLElement[];
        if (focusable.length === 2) {
          if (e.shiftKey && document.activeElement === firstFocusableRef.current) {
            e.preventDefault();
            lastFocusableRef.current?.focus();
          } else if (!e.shiftKey && document.activeElement === lastFocusableRef.current) {
            e.preventDefault();
            firstFocusableRef.current?.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className={styles.overlay} role="presentation" onClick={onCancel}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby={description ? 'confirm-desc' : undefined}
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="confirm-title" className={styles.title}>{title}</h2>
        {description && (
          <p id="confirm-desc" className={styles.description}>{description}</p>
        )}
        <div className={styles.actions}>
          <button
            ref={firstFocusableRef}
            type="button"
            className={styles.cancel}
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            ref={lastFocusableRef}
            type="button"
            className={styles.confirm}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}


