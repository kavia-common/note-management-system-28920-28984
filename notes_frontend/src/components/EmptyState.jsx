import React from 'react';
import FAB from './FAB';

/**
 * PUBLIC_INTERFACE
 * Empty state shown when no notes exist.
 */
const EmptyState = () => (
  <div className="empty">
    <h2>No notes yet</h2>
    <p>Create your first note using the + button.</p>
    <FAB />
  </div>
);
export default EmptyState;
