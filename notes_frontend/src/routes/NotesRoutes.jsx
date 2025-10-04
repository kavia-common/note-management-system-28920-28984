import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NoteList from '../components/NoteList';
import NoteEditorModal from '../components/NoteEditorModal';

/**
 * PUBLIC_INTERFACE
 * NotesRoutes renders the main layout and sets up modal routes for creating and editing notes.
 */
export const NotesRoutes = () => {
  const location = useLocation();
  const state = location.state;
  const background = state && state.backgroundLocation;

  return (
    <>
      <Navbar />
      <Routes location={background || location}>
        <Route path="/" element={<NoteList />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/create" element={<NoteEditorModal />} />
          <Route path="/notes/:id" element={<NoteEditorModal />} />
        </Routes>
      )}
      {!background && (
        <Routes>
          <Route path="/create" element={<NoteEditorModal />} />
          <Route path="/notes/:id" element={<NoteEditorModal />} />
        </Routes>
      )}
    </>
  );
};
