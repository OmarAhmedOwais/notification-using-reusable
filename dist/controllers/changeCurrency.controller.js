"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExchangeRate = exports.ExchangeRate = void 0;
const factory_controller_1 = require("./factory.controller");
const changeCurrency_model_1 = __importDefault(require("../models/changeCurrency.model"));
//import IChangeCurrency from '../interfaces/changeCurrency/changeCurrency.interface';
const ExchangeRate = async (req, res) => {
    try {
        const { baseCurrency } = req.body;
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`, {
            headers: {
                'X-Api-Key': '155ed066805b89ec2dcb286c',
            },
        });
        const data = await response.json();
        const exchangeRates = data.rates;
        await changeCurrency_model_1.default.deleteMany({}).exec();
        // Save the exchange rate data to the database
        const newExchangeRate = new changeCurrency_model_1.default({
            baseCurrency,
            rates: exchangeRates,
        });
        await newExchangeRate.save();
        console.log('Exchange rates saved to the database');
        const eurExchangeRate = exchangeRates.EUR;
        console.log(`Exchange Rate for EUR: ${eurExchangeRate}`);
        res.status(200).json({ message: 'Exchange rates saved successfully', newExchangeRate });
    }
    catch (error) {
        console.error('Error fetching and saving exchange rates:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.ExchangeRate = ExchangeRate;
exports.getExchangeRate = (0, factory_controller_1.getAllItems)(changeCurrency_model_1.default);
// Perform the initial update
const updateExchangeRates = async () => {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/SAR', {
            headers: {
                'X-Api-Key': '155ed066805b89ec2dcb286c',
            },
        });
        const data = await response.json();
        const exchangeRates = data.rates;
        changeCurrency_model_1.default.deleteMany({}).exec();
        // Save the updated exchange rate data to the database
        const newExchangeRate = new changeCurrency_model_1.default({
            baseCurrency: 'SAR',
            rates: exchangeRates,
        });
        await newExchangeRate.save();
        console.log('Exchange rates updated and saved to the database');
    }
    catch (error) {
        console.error('Error fetching and saving exchange rates:', error);
    }
};
// Schedule updates every hour (3600000 milliseconds)
const updateInterval = 3600000;
setInterval(() => {
    updateExchangeRates();
}, updateInterval);
