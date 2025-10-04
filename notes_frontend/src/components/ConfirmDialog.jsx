import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ConfirmDialog renders a simple confirmation modal.
 */
const ConfirmDialog = ({ title = 'Confirm', description = 'Are you sure?', onCancel, onConfirm }) => (
  <div className="modal-backdrop" role="dialog" aria-modal="true">
    <div className="modal" style={{maxWidth:480}}>
      <div className="modal-header"><strong>{title}</strong></div>
      <div className="modal-body"><p>{description}</p></div>
      <div className="modal-actions">
        <button className="btn" onClick={onCancel}>Cancel</button>
        <button className="btn primary" onClick={onConfirm}>Confirm</button>
      </div>
    </div>
  </div>
);
export default ConfirmDialog;
