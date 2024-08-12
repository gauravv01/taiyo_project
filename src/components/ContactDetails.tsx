import React from "react";
import { useDispatch } from "react-redux";
import { updateContact } from "../store/contactsSlice";
import { Contact } from "../types";

interface ContactDetailsProps {
  contact: Contact;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ contact }) => {
  const dispatch = useDispatch();
  const [name, setName] = React.useState(contact.name);
  const [email, setEmail] = React.useState(contact.email);
  const [phone, setPhone] = React.useState(contact.phone);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateContact({ ...contact, name, email, phone }));
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="edit-name"
            className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="edit-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="edit-email"
            className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="edit-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="edit-phone"
            className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="edit-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {contact.name}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{contact.email}</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Phone</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {contact.phone}
            </dd>
          </div>
        </dl>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button
          onClick={() => setIsEditing(true)}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Edit
        </button>
      </div>
    </div>
  );
};

export default ContactDetails;
