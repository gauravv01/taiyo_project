import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addContact, updateContact, deleteContact } from '../store/contactsSlice';
import { Contact } from '../types';

const Contacts: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts);
  const dispatch = useDispatch();

  const [selectedContact, setSelectedContact] = React.useState<string | null>(null);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    const newContact: Contact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };
    dispatch(addContact(newContact));
    setName('');
    setEmail('');
    setPhone('');
  };

  const handleUpdateContact = (contact: Contact) => {
    dispatch(updateContact(contact));
    setSelectedContact(null);
  };

  const handleDeleteContact = (id: string) => {
    dispatch(deleteContact(id));
    if (selectedContact === id) {
      setSelectedContact(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Add Contact</h2>
        <form onSubmit={handleAddContact} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Add Contact
          </button>
        </form>

        <h2 className="text-2xl font-bold mt-8 mb-4">Contact List</h2>
        <ul className="space-y-2">
          {contacts.map((contact) => (
            <li key={contact.id} className="flex justify-between items-center bg-white p-2 rounded shadow">
              <span>{contact.name}</span>
              <div>
                <button
                  onClick={() => setSelectedContact(contact.id)}
                  className="text-blue-500 mr-2"
                >
                  View
                </button>
                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Contact Details</h2>
        {selectedContact ? (
          <div className="bg-white p-4 rounded shadow">
            {contacts.find(c => c.id === selectedContact) && (
              <>
                <h3 className="text-xl font-semibold mb-2">{contacts.find(c => c.id === selectedContact)!.name}</h3>
                <p>Email: {contacts.find(c => c.id === selectedContact)!.email}</p>
                <p>Phone: {contacts.find(c => c.id === selectedContact)!.phone}</p>
                <button
                  onClick={() => handleUpdateContact(contacts.find(c => c.id === selectedContact)!)}
                  className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600"
                >
                  Update Contact
                </button>
              </>
            )}
          </div>
        ) : (
          <p>Select a contact to view details</p>
        )}
      </div>
    </div>
  );
};

export default Contacts;