const mongoose =require("mongoose");

const connectDatabase = async ()=>{

    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useCreateIndex: true,
    }).then(
        (data)=>{
            console.log(`MongoDB Connected with server: ${data.connection.host}`);
        }); 

   
};

module.exports =connectDatabase;