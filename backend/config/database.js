const mongoose = require("mongoose");

const connectDatabase = (()=>{
    mongoose.connect(process.env.DB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then((data)=>{
        console.log(`MongoDB Connected with server: ${data.connection.host}`);
    });
}); 

module.exports = connectDatabase;

// If mongoDB connects with the server .then log message "MongoDB Connected with server", else .catch err log "err"