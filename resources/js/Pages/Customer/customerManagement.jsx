import { useState } from 'react';
import Table from '@/Components/Table';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

function customerManagement({ auth }) {
  const [transactions, setTransactions] = useState([
    {
      date: '2023-03-08',
      description: 'Transfer to Bank A',
      amount: '100.000',
      status: 'Success',
    },
    {
      date: '2023-03-07',
      description: 'Top Up E-Wallet',
      amount: '50.000',
      status: 'Success',
    },
    {
      date: '2023-03-06',
      description: 'Payment Bill Electricity',
      amount: '200.000',
      status: 'Success',
    },
    {
      date: '2023-03-05',
      description: 'Purchase on Marketplace',
      amount: '150.000',
      status: 'Success',
    },
  ]);

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Customer Management" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded">
            <div className="p-6 text-gray-900">
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h2 className="text-xl font-bold mb-2">Customer Management</h2>
                <p className="text-gray-600 mb-4">Manage customer account</p>
              </div>

              {/* Search and Add New Customer Section */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Search"
                    className="border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <button className="bg-cyan-600 text-white px-4 py-2 rounded-r-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    Search
                  </button>
                </div>
                <button className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline">
                  Add New Customer
                </button>
              </div>

              {/* Table Section */}
              <Table header={['Date', 'Description', 'Amount', 'Status', 'Actions']}>
                {transactions.map((transaction, index) => (
                  <Table.Tr key={index}>
                    <Table.Td item={transaction.date} />
                    <Table.Td item={transaction.description} />
                    <Table.Td item={transaction.amount} />
                    <Table.Td item={transaction.status} />
                    <Table.TdAction>
                      <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                    </Table.TdAction>
                  </Table.Tr>
                ))}
              </Table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default customerManagement;
