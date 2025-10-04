export const initialState = { items: [], loading: true, error: null, query: '' };
export function notesReducer(state, action){
  switch(action.type){
    case 'SET_LOADING': return { ...state, loading: action.payload };
    case 'SET_ERROR': return { ...state, error: action.payload, loading: false };
    case 'SET_ITEMS': return { ...state, items: action.payload, loading: false };
    case 'ADD': return { ...state, items: [action.payload, ...state.items] };
    case 'UPDATE': return { ...state, items: state.items.map(n=> n.id===action.payload.id? action.payload : n) };
    case 'REMOVE': return { ...state, items: state.items.filter(n=> n.id!==action.payload) };
    case 'SET_QUERY': return { ...state, query: action.payload };
    default: return state;
  }
}
