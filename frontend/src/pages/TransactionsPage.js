import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TransactionCard from '../components/TransactionCard';

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Fetch all transactions
        axios.get('/transactions')
            .then(response => {
                setTransactions(response.data);
            })
            .catch(error => {
                console.error('Error fetching transactions:', error);
            });
    }, []);

    return (
        <div className="flex flex-col p-6">
            <h1 className="text-3xl font-semibold">Transactions</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {transactions.map(transaction => (
                    <TransactionCard key={transaction.id} transaction={transaction} />
                ))}
            </div>
        </div>
    );
};

export default TransactionsPage;
