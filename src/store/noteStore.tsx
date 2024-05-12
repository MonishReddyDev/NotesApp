// noteStore.js
import {create} from 'zustand';
import notesData from '../constants/NotesData';

// Define the types of the store
export interface Note {
  title: string;
  notes: string;
}

interface NoteStore {
  editNotes: (index: number, updatedNote: Note) => void;
  notes: Note[];
  addNote: (newNote: Note) => void;
  deleteNote: (index: number) => void;
}

// This is the custom hook that we can use in a React component
const useNoteStore = create<NoteStore>(set => ({
  notes: [],
  addNote: newNote => set(state => ({notes: [...state.notes, newNote]})),
  editNotes: (index, updatedNote) =>
    set(state => {
      const newNotes = [...state.notes];
      newNotes[index] = updatedNote;
      return {notes: newNotes};
    }),
  deleteNote: (index: number) =>
    set(state => ({notes: state.notes.filter((_, i) => i !== index)})),
}));

export default useNoteStore;
