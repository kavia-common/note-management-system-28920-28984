import React, { useState } from 'react';
import { useNotes } from '../state/NotesContext';

/**
 * PUBLIC_INTERFACE
 * Navbar with brand and search box that updates notes query in context.
 */
const Navbar = () => {
  const { query, setSearch } = useNotes();
  const [value, setValue] = useState(query);
  return (
    <div className="navbar">
      <div className="navbar-inner container">
        <div className="brand"><span className="brand-badge" /> Notes</div>
        <div className="search">
          <input
            aria-label="Search notes"
            placeholder="Search notes..."
            value={value}
            onChange={(e)=>{ setValue(e.target.value); setSearch(e.target.value); }}
          />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
