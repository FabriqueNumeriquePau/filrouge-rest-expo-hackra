import express from 'express';

const app = express();

const PORT = process.env.PORT || '3000';
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.listen(PORT, (): void => {
    console.log(`The application is listening on port http://localhost:${environment.PORT}`);
});