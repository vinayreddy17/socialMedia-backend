import express from "express";
import 'dotenv/config';
import cors from 'cors'; // Removed curly braces around cors
import Router from './routes/authRoutes.js';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import postRoutes from './routes/postRoutes.js'; 
import profileRoutes from './routes/profileRoutes.js';


const app = express(); //initializing the server
app.use(cors({
    origin: '*', // Replace with your frontend origin
    credentials: true, // Allow credentials
  }));

  // connecting mongodb
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('Database Connected'))
.catch((err)=>console.log(err));
//middleware to parse the data #global middleware
app.use(express.json());

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));


const PORT = 5000;

app.use('/', Router);

app.use('/posts', postRoutes);
app.use('/profiles', profileRoutes);

app.listen(PORT, () => console.log('Server is running on port', PORT)); // Corrected port variable name to uppercase PORT
;
