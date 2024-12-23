import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './config/dbConfig';
import shortUrl from './routes/shortUrl'

const app = express();
dotenv.config();
connectDb()

const port: number | string = process.env.PORT || 8000;

const corsOptions = {
  origin: 'http://localhost:8080', 
  methods: 'GET, POST, PUT, DELETE', 
  credentials: true,
};


app.use(cors(corsOptions));
app.use(express.json()) //allows json responses
app.use(express.urlencoded({extended: true}))

app.use("/api/", shortUrl)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello there');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
