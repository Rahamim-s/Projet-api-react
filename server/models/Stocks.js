const mongoose = require ('mongoose')

const StockSchema = new mongoose.Schema({ // create mongoose schema  
   siren: Number,
 });

const StockModel = mongoose.model("Stocks",StockSchema)
module.exports = StockModel