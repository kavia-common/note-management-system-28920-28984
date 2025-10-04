import React from 'react';
import './App.css';
import { NotesProvider } from './state/NotesContext';
import { NotesRoutes } from './routes/NotesRoutes';

// PUBLIC_INTERFACE
function App(){
  /** Root application component that wires context and routes. */
  return (
    <NotesProvider>
      <NotesRoutes />
    </NotesProvider>
  );
}
export default App;
