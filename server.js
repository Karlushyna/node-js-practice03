const mongoose = require("mongoose");
// require("dotenv").config();


const app = require('./app')

const {DB_HOST, PORT=3000} = process.env;
// console.log(process.env);
mongoose.connect(DB_HOST)
  .then(()=> app.listen(PORT))
  .catch(error=> console.log(error.message))


