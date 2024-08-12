import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../types';
import { v4 as uuidv4 } from 'uuid';

const initialState: Contact[] = [];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Omit<Contact, 'id'>>) => {
      state.push({ ...action.payload, id: uuidv4() });
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      return state.filter(contact => contact.id !== action.payload);
    },
  },
});

export const { addContact, updateContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
