const mongoose = require('mongoose');
const dbConnection = process.env.MONGO_CONNECTION;

class DbRepo {
    constructor() {
        this.connect();
    }

    async connect() {
        try {
            if(!dbConnection){
                throw new Error("MONGO_CONNECTION should be set in variables");
            }
            await mongoose.connect(dbConnection);
            mongoose.connection.on('error', err => {
                this.connectionErrHandler(e)
            });
            console.log("connected to database")
        } catch (e) {
            this.connectionErrHandler(e)
        }
    }

    connectionErrHandler(e){
        console.error(e);
        setTimeout(this.connect(), 10_000);
    }
}
