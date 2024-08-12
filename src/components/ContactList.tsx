import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../store/contactsSlice';
import { Contact } from '../types';

interface ContactListProps {
  contacts: Contact[];
  onSelectContact: (id: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, onSelectContact }) => {
  const dispatch = useDispatch();

  return (
    <ul className="divide-y divide-gray-200">
      {contacts.map((contact) => (
        <li key={contact.id} className="py-4 flex justify-between">
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{contact.name}</p>
            <p className="text-sm text-gray-500">{contact.email}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onSelectContact(contact.id)}
              className="px-2 py-1 text-sm text-blue-600 hover:text-blue-800"
            >
              View
            </button>
            <button
              onClick={() => dispatch(deleteContact(contact.id))}
              className="px-2 py-1 text-sm text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ContactList