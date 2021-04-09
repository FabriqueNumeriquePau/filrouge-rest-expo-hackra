import express from 'express';
import apiRouter from './routes/api';
import Database from './configs/Database';
import { environment } from './configs/config';

const database = Database.getInstance();

const app = express();
const PORT = process.env.PORT || '3000';

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.use('/api', apiRouter);

app.listen(PORT, (): void => {
    console.log(`The application is listening on port http://${environment.API_HOST}:${PORT}`);
});