import { useState } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

function EditCustomer({ auth }) {  // Ubah menjadi EditCustomer dengan huruf kapital
  const [accountNumber, setAccountNumber] = useState('');
  const [saveAs, setSaveAs] = useState('');

  const handleAccountNumberChange = (event) => {
    setAccountNumber(event.target.value);
  };

  const handleSaveAsChange = (event) => {
    setSaveAs(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log('Account Number:', accountNumber);
    console.log('Save As:', saveAs);
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Edit Customer" />

      <div className="bg-gray-100 p-6 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Add Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="accountNumber" className="block text-gray-700 text-sm font-bold mb-2">
              Account Number
            </label>
            <input
              type="text"
              id="accountNumber"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={accountNumber}
              onChange={handleAccountNumberChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="saveAs" className="block text-gray-700 text-sm font-bold mb-2">
              Save As
            </label>
            <input
              type="text"
              id="saveAs"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={saveAs}
              onChange={handleSaveAsChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}

export default EditCustomer;  // Pastikan komponen diekspor sebagai 'EditCustomer'
