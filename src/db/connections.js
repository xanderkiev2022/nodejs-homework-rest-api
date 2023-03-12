const MongoClient = require("mongodb").MongoClient;

const connectMongo = async () => {
   const client = await MongoClient.connect(process.env.MONGO_URL, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   });
    console.log("Database connection successful");
    const db = client.db();
    const Contacts = db.collection("contacts");
    return Contacts;
}

module.exports = { connectMongo };
