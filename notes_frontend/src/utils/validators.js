export const validateNote = ({ title, content }) => {
  if(!title || !title.trim()) return { ok:false, message:'Title is required' };
  if((content||'').trim().length < 1) return { ok:false, message:'Content is required' };
  return { ok:true };
};
