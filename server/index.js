const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const UserModel = require('./models/Stocks.js');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/StockEtablissement');

const logsFolderPath = 'C:/Projet_api/Projet-api-react/server/LogsStock';
const logsFilePath = path.join(logsFolderPath, 'logs.txt');

app.use((req, res, next) => {
    const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}\n`;

    fs.appendFile(logsFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });

    next();
});

app.get('/getStockBySiret/:siret', (req, res) => {
    const { siret } = req.params;
    UserModel.findOne({ siret: parseInt(siret) })
        .then(stock => res.json(stock))
        .catch(err => res.json(err));
});

app.delete('/deleteStock/:siret', async (req, res) => {
    const { siret } = req.params;

    try {
        const deletedStock = await UserModel.findOneAndDelete({ siret: parseInt(siret) });

        if (deletedStock) {
            // Journaliser l'action dans la console
            console.log(`Deleted stock with SIRET: ${siret} at ${new Date()}`);
            res.json({ message: `Stock with SIRET ${siret} deleted successfully` });
        } else {
            res.status(404).json({ message: `Stock with SIRET ${siret} not found` });
        }
    } catch (error) {
        console.error('Error deleting stock:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/downloadLogs', (req, res) => {
    res.download(logsFilePath, 'logs.txt', (err) => {
        if (err) {
            console.error('Error downloading logs:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

app.listen(3001, () => {
    console.log('Server Is Running');
});
