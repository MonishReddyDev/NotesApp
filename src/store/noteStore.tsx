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
  notes: [
    {
      title: 'Good',
      notes:
        'The container view has a flex-direction of row to arrange its children horizontally.The titleContainer and descriptionContainer views use flex to distribute the available space. Adjust the flex values to control the width of each section.The delete button is placed in its container with a fixed width (width: 40) to ensure it remains small and is aligned to the right. Adjust the width as needed for your design.Adjust padding, margins, and other styles as per your design requirements',
    },
  ],
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
