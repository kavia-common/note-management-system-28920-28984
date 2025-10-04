import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Floating action button that navigates to the create note modal.
 */
const FAB = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <button className="fab" aria-label="Add note" onClick={()=>navigate('/create', { state: { backgroundLocation: location } })}>
      +
    </button>
  );
};
export default FAB;
