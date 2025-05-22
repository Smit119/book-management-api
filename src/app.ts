import express from 'express';
import morgan from 'morgan';
import bodyParser from "body-parser";
import * as dotenv from 'dotenv'
import bookRoutes from './routes/book.routes'
import db from './config/db'

const app = express();
db().then(() => {
    console.log("database connected successfully")
}).catch((err) => {
    console.log("Error while connecting db", err)
})
dotenv.config();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = Number(process.env.PORT) || 3000;
app.use('/', bookRoutes);

const server = app.listen(port, () => {
    console.log(
        `Server is listening at http://localhost:${port}`
    );
    return;
});


//  "start": "ts-node src/app.ts",