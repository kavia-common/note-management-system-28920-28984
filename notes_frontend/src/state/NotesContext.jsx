import React, { createContext, useContext, useEffect, useReducer, useCallback } from 'react';
import { notesApi } from '../api/notesApi';
import { initialState, notesReducer } from './useNotesReducer';

const NotesCtx = createContext(null);

/**
 * PUBLIC_INTERFACE
 * NotesProvider wraps the app providing notes state and actions via context.
 */
export const NotesProvider = ({ children })=>{
  const [state, dispatch] = useReducer(notesReducer, initialState);

  const load = useCallback(async ()=>{
    dispatch({ type:'SET_LOADING', payload:true });
    try{
      const items = await notesApi.list();
      dispatch({ type:'SET_ITEMS', payload: items });
    }catch(err){
      dispatch({ type:'SET_ERROR', payload: err.message || String(err) });
    }finally{
      dispatch({ type:'SET_LOADING', payload:false });
    }
  },[]);

  useEffect(()=>{ load(); },[load]);

  const createNote = async (data)=>{
    const created = await notesApi.create(data);
    dispatch({ type:'ADD', payload: created });
    return created;
  };
  const updateNote = async (id, data)=>{
    const updated = await notesApi.update(id, data);
    dispatch({ type:'UPDATE', payload: updated });
    return updated;
  };
  const removeNote = async (id)=>{
    await notesApi.remove(id);
    dispatch({ type:'REMOVE', payload: id });
  };
  const setSearch = (q)=> dispatch({ type:'SET_QUERY', payload: q });
  const getById = (id)=> state.items.find(n=> String(n.id)===String(id));

  const value = { ...state, notes: state.items, createNote, updateNote, removeNote, setSearch, getById };
  return <NotesCtx.Provider value={value}>{children}</NotesCtx.Provider>;
};

// PUBLIC_INTERFACE
export const useNotes = ()=> useContext(NotesCtx);
