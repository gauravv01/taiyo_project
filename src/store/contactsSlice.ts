import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../types';
import { v4 as uuidv4 } from 'uuid';

const initialState: {contacts:Contact[],loading:boolean,selectedContact:Contact | {}} = {
  contacts:[],
  loading:false,
  selectedContact:{}
}


const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
     state.contacts.push(action.payload);
     if(state.selectedContact){
      state.selectedContact={}
     }
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
      state.selectedContact = action.payload;
      const updatedContacts= state.contacts.filter(contact => contact.id !== action.payload.id);
      state.contacts=updatedContacts
      }
    },
    deleteContact: (state, action: PayloadAction<Contact>) => {
     const updatedContacts= state.contacts.filter(contact => contact.id !== action.payload.id);
     state.contacts=updatedContacts
    },
  },
});

export const { addContact, updateContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
