// controllers/TransactionController.js
const Transaction = require('../models/TransactionModel');

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTransaction = async (req, res) => {
    try {
        const { user, products, totalPrice, transactionDate } = req.body;

        // Validate required fields
        if (!user || !products || !totalPrice) {
            return res.status(400).json({ message: 'User, products, and totalPrice are required for creating a transaction' });
        }

        const newTransaction = new Transaction({ user, products, totalPrice, transactionDate });
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateTransaction = async (req, res) => {
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(updatedTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteTransaction = async (req, res) => {
    try {
        const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!deletedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
};
