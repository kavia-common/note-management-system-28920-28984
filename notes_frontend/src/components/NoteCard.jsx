import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * NoteCard displays a note summary with actions.
 */
const NoteCard = ({ note, onDelete }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="card" role="article">
      <h3>{note.title || 'Untitled'}</h3>
      <div className="meta">Updated {new Date(note.updatedAt).toLocaleString()}</div>
      <p>{(note.content || '').slice(0,160)}</p>
      <div className="actions">
        <button className="btn" onClick={()=>navigate(`/notes/${note.id}`, { state: { backgroundLocation: location } })}>View</button>
        <button className="btn" onClick={()=>navigate(`/notes/${note.id}`, { state: { backgroundLocation: location } })}>Edit</button>
        <button className="btn" onClick={()=>onDelete(note.id)} aria-label={`Delete ${note.title}`}>Delete</button>
      </div>
    </div>
  );
};
export default NoteCard;
