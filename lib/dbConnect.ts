import mongoose from "mongoose"


type connectionObject = {
    isConnected?: number;
}

const connection:connectionObject={}

async function dbConnect():Promise<void>{
    if (connection.isConnected){
    console.log("already connected to the database")
    return;
    }
    try {
        const db = await mongoose.connect(process.env.DATABASE_URI || '' , {})
        connection.isConnected = db.connections[0].readyState

        console.log("database successfully connected!");
             
    } catch (error) {
        console.log('database connection failed!!', error);

        process.exit(1)
    }
}

export default dbConnect