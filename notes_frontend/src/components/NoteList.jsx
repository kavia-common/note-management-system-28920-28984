import React, { useState } from 'react';
import { useNotes } from '../state/NotesContext';
import NoteCard from './NoteCard';
import EmptyState from './EmptyState';
import FAB from './FAB';

/**
 * PUBLIC_INTERFACE
 * NoteList lists notes with search filter and delete handling.
 */
const NoteList = () => {
  const { notes, loading, error, removeNote, query } = useNotes();
  const [confirmId, setConfirmId] = useState(null);

  const filtered = notes.filter(n => {
    const q = (query || '').toLowerCase();
    return !q || (n.title || '').toLowerCase().includes(q) || (n.content || '').toLowerCase().includes(q);
  });

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">Error: {String(error)}</div>;
  if (!filtered.length) return <><EmptyState /><FAB /></>;

  return (
    <div className="container">
      <div className="grid">
        {filtered.map(n => (
          <NoteCard key={n.id} note={n} onDelete={(id)=>setConfirmId(id)} />
        ))}
      </div>
      <FAB />
      {confirmId && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal" style={{maxWidth:480}}>
            <div className="modal-header"><strong>Delete note</strong></div>
            <div className="modal-body"><p>Are you sure you want to delete this note?</p></div>
            <div className="modal-actions">
              <button className="btn" onClick={()=>setConfirmId(null)}>Cancel</button>
              <button className="btn primary" onClick={()=>{ removeNote(confirmId); setConfirmId(null); }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default NoteList;
