import express from 'express';
import apiRouter from './routes/api';

const app = express();
const PORT = process.env.PORT||'3000';

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome');
});

app.use('/api', apiRouter);

app.listen(PORT, (): void => {
    console.log(`The application is listening on port http://localhost:${PORT}`);
});
