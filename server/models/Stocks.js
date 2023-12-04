const mongoose = require ('mongoose')

// Définir le schéma mongoose pour les stocks
const StockSchema = new mongoose.Schema({ // create mongoose schema  
   siren: Number,
   siret: Number,
   nic: Number,
   statutDiffusionEtablissement: String,
   dateCreationEtablissement: Date,
   activitePrincipaleRegistreMetiersEtablissement: String,
   dateDernierTraitementEtablissement: Date,
   etablissementSiege: Boolean,
   nombrePeriodesEtablissement: Number,
   libelleVoieEtablissement: String,
   codePostalEtablissement: Number,
   libelleCommuneEtablissement: String,
   codeCommuneEtablissement: String,
   dateDebut: Date,
   etatAdministratifEtablissement: String,
   activitePrincipaleEtablissement: String,
   nomenclatureActivitePrincipaleEtablissement: String,
   caractereEmployeurEtablissement: String,
   libelleCommune2Etablissement: String,
 });


// Créer le modèle mongoose basé sur le schéma
const StockModel = mongoose.model("Stocks",StockSchema)
// Exporter le modèle
module.exports = StockModel