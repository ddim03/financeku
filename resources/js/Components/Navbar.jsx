import React from 'react';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Navbar(props) {
    return (
        <div className="navbar-container" {...props}>
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2 items-center">
                    <FontAwesomeIcon icon={faCoins} size="lg" />
                    <span className="font-medium text-lg text-gray-800">FinanceKu</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="rounded-full bg-gray-300 w-4 h-4" />
                    <span>Dimas Gilang Dwi Aji</span>
                </div>
            </div>
            <nav className="flex gap-4 mb-4">
                <span className="cursor-pointer">Dashboard</span>
                <span className="cursor-pointer">Teller</span>
                <span className="cursor-pointer">Customer</span>
                <span className="cursor-pointer">Transaction</span>
            </nav>
        </div>
    );
}

export default Navbar;
