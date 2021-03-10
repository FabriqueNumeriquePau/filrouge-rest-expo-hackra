import mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { environment } from './config';

class Database {
    private connection: Connection | undefined;
    private static intance: Database | undefined;
    private uri = `mongodb://${environment.HOST_DB}:${environment.PORT_DB}/${environment.DB_NAME}`;
    private constructor() {
        this.initConnection();
    }


    static getInstance(): Database {
        if (Database.intance === undefined) {
            Database.intance = new Database();
        }
        return Database.intance;
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
}

export default Database;

