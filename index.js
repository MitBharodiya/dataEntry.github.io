import  express from "express";
import  dotenv from "dotenv";
import path from "path";
import DB_Connection from "./config/DB_COnnection.js";
import session from 'express-session';
import flash from 'connect-flash';
DB_Connection();
dotenv.config();

import { fileURLToPath } from 'url';
import { renderCompanyForm, createCompany, getAllCompanies  } from './controller/compny.controller.js';
import {renderCompanyList,getAllCompaniesList, getCompanyById, updateCompanyById,updateCompanyHandler, deleteCompanyById } from './controller/compny.controller.js';


const app = express();

// Determine __dirname using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'your-secret-key', // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
}));

// Setup flash middleware
app.use(flash());

// Define the routes
app.get('/companies/new', renderCompanyForm); // Render the form for new company
app.post('/companies', createCompany); // Handle the form submission

app.get('/companies/list', renderCompanyList);// Render the list for all company
app.get('/companies/listmenu', getAllCompaniesList);// Render the list for all company
app.post('/companies/delete/:id',deleteCompanyById );// delete by id compny list
app.get('/companies/edit/:id', updateCompanyById);// update counpny list
app.post('/companies/edit/:id', updateCompanyHandler);



app.get('/companies',getAllCompanies ); // excel downlode

app.listen(3000,()=>{
    console.log("App is listening on port 3000");
});