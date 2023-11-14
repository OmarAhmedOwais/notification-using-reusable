import { Request, Response } from 'express';
import { getAllItems } from './factory.controller';
import changeCurrency from '../models/changeCurrency.model';
//import IChangeCurrency from '../interfaces/changeCurrency/changeCurrency.interface';

export const ExchangeRate = async (req: Request, res: Response) => {
    try {
      const {baseCurrency} = req.body;
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`, {
        headers: {
          'X-Api-Key': '155ed066805b89ec2dcb286c',
        },
      });
  
      const data = await response.json();
      const exchangeRates = data.rates;
      await changeCurrency.deleteMany({}).exec();
      // Save the exchange rate data to the database
      const newExchangeRate = new changeCurrency({
        baseCurrency, // Assuming base currency is USD
        rates: exchangeRates,
      });
  
      await newExchangeRate.save();
  
      console.log('Exchange rates saved to the database');
  
      const eurExchangeRate = exchangeRates.EUR;
      console.log(`Exchange Rate for EUR: ${eurExchangeRate}`);
  
      res.status(200).json({ message: 'Exchange rates saved successfully',newExchangeRate });
    } catch (error) {
      console.error('Error fetching and saving exchange rates:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export const getExchangeRate = getAllItems(changeCurrency);

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
      changeCurrency.deleteMany({}).exec();
      // Save the updated exchange rate data to the database
      const newExchangeRate = new changeCurrency({
        baseCurrency: 'SAR',
        rates: exchangeRates,
      });
  
      await newExchangeRate.save();
  
      console.log('Exchange rates updated and saved to the database');
    } catch (error) {
      console.error('Error fetching and saving exchange rates:', error);
    }
  };

// Schedule updates every hour (3600000 milliseconds)
const updateInterval = 3600000;

setInterval(() => {
  updateExchangeRates();
}, updateInterval);