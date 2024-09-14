import { useState } from 'react';
import { Table } from "flowbite-react";
import Navbar from '../component/Navbar';
function managerDashboard() {
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
    <div className="container mx-auto p-4">
     <Navbar/>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h2 className="text-xl font-bold mb-2">Quick Overview</h2>
        <p className="text-gray-600 mb-4">Welcome to your personal e-finance dashboard.</p>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">100</h3>
            <p className="text-gray-600">Total User</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">89</h3>
            <p className="text-gray-600">Active users</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">11</h3>
            <p className="text-gray-600">Blocked users</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h2 className="text-xl font-bold mb-2">Recent Transaction</h2>
        <p className="text-gray-600 mb-4">All your recent transactions in one place</p>
        <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>Color</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {'Apple MacBook Pro 17"'}
            </Table.Cell>
            <Table.Cell>Sliver</Table.Cell>
            <Table.Cell>Laptop</Table.Cell>
            <Table.Cell>$2999</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Microsoft Surface Pro
            </Table.Cell>
            <Table.Cell>White</Table.Cell>
            <Table.Cell>Laptop PC</Table.Cell>
            <Table.Cell>$1999</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Magic Mouse 2</Table.Cell>
            <Table.Cell>Black</Table.Cell>
            <Table.Cell>Accessories</Table.Cell>
            <Table.Cell>$99</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
      </div>
    </div>
  );
}

export default managerDashboard;
