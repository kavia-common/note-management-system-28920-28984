import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotes } from '../state/NotesContext';
import { validateNote } from '../utils/validators';

/**
 * PUBLIC_INTERFACE
 * NoteEditorModal provides a modal dialog to create or edit a note.
 */
const NoteEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes, createNote, updateNote, getById } = useNotes();
  const isEdit = Boolean(id);
  const existing = useMemo(()=> (id ? getById(id) : null), [id, notes]);
  const [title, setTitle] = useState(existing?.title || '');
  const [content, setContent] = useState(existing?.content || '');
  const [error, setError] = useState('');

  useEffect(()=>{ if(existing){ setTitle(existing.title || ''); setContent(existing.content || ''); } }, [existing]);

  const onClose = ()=> navigate(-1);
  const onSave = async ()=>{
    const val = validateNote({ title, content });
    if(!val.ok){ setError(val.message); return; }
    if(isEdit){ await updateNote(existing.id, { title, content }); }
    else { await createNote({ title, content }); }
    onClose();
  };

  const modalRoot = document.getElementById('modal-root') || document.body;
  return createPortal(
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-header">
          <strong>{isEdit ? 'Edit note' : 'Create note'}</strong>
          <button className="btn" aria-label="Close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {error && <div className="badge" role="status">{error}</div>}
          <div style={{display:'grid', gap:'.75rem'}}>
            <input className="input" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
            <textarea className="input" placeholder="Write your note..." rows={10} value={content} onChange={e=>setContent(e.target.value)} />
          </div>
        </div>
        <div className="modal-actions">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn primary" onClick={onSave}>{isEdit ? 'Save' : 'Create'}</button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};
export default NoteEditor;
