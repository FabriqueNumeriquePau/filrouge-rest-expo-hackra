import mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { environment } from './config';

class Database {
    private connection: Connection | undefined;
    // mongo "mongodb+srv://cluster-escape.vgivj.mongodb.net/myFirstDatabase" --username < username >
    private uri = `mongodb://${environment.HOST_DB}:${environment.PORT_DB}/${environment.DB_NAME}`;
    private static instance: Database | undefined;
    private constructor() {
        this.initConnection();
    }

    private initConnection(): void {
        mongoose.connect(this.uri, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            authSource: 'admin',
            auth: { user: environment.USER_DB, password: environment.PASSWORD_DB}
        })
        .then(c => this.connection = c.connection)
        .catch(err => {
            console.error(err);
            process.exit(-1);
        });
    }

    static getInstance(): Database {
        if (Database.instance === undefined) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

export default Database;

