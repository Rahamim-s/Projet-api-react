const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const winston = require('winston');

const UserModel = require('./models/Stocks.js');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/StockEtablissement');

const logsFolderPath = 'C:/Projet_api/Projet-api-react/server/LogsStock';
const logsFilePath = path.join(logsFolderPath, 'logs.txt');

// Configuration de Winston
const logger = winston.createLogger({
  level: 'info', // Niveau minimal de journalisation
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: logsFilePath }),
  ],
});

app.use((req, res, next) => {
  const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`;
  
  // Utilisation de Winston pour journaliser
  logger.info(logMessage);

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
      // Utilisation de Winston pour journaliser
      logger.info(`Deleted stock with SIRET: ${siret} at ${new Date()}`);
      res.json({ message: `Stock with SIRET ${siret} deleted successfully` });
    } else {
      res.status(404).json({ message: `Stock with SIRET ${siret} not found` });
    }
  } catch (error) {
    // Utilisation de Winston pour journaliser les erreurs
    logger.error(`Error deleting stock: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/downloadLogs', (req, res) => {
  res.download(logsFilePath, 'logs.txt', (err) => {
    if (err) {
      // Utilisation de Winston pour journaliser les erreurs de téléchargement
      logger.error(`Error downloading logs: ${err.message}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

app.listen(3001, () => {
  // Utilisation de Winston pour journaliser le démarrage du serveur
  logger.info('Server Is Running');
});
