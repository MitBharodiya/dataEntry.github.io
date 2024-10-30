import Company from '../model/compny.model.js'; // Correct the path if necessary
import * as XLSX from 'xlsx';

export const renderCompanyForm = (req, res) => {
    res.render('companyForm'); // Render the form to add a company
};

export const createCompany = async (req, res) => {
    try {
        // Validate incoming data if necessary (could also use a library like express-validator)
        const { item, company, dealer, salesMan } = req.body;

        // Ensure all required fields are present
        if (!item || !company || !dealer || !salesMan || salesMan.length === 0) {
            return res.status(400).send("All fields are required and at least one salesman must be added.");
        }

        // Validate the salesMan array
        if (salesMan.length === 0) {
            return res.status(400).send("At least one salesman must be added.");
        }
        // Create a new company instance
        const newCompany = new Company({item, company, dealer, salesMan});

        // Save the company to the database
        await newCompany.save();

        // Redirect to the companies page with a success message (optional)
        // req.flash('success', 'Company created successfully!'); // Ensure flash middleware is set up
        res.redirect('/companies/new'); // Redirect to the companies page after successful insertion
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).send(error.message); // Handle validation errors, can customize further if needed
    }
};

//XCEL EXPORT CONTROLLLER
export const getAllCompanies = async (req, res) => {
    try {
        // Fetch all companies from the database 
        const companies = await Company.find({});

        // Convert company data to a format suitable for Excel
        const data = companies.map(company => ({
            Item: company.item,
            Company: company.company,
            Dealer: company.dealer,
            Salesmen: company.salesMan.map(salesman => `${salesman.name} (${salesman.contactNumber})`).join(', '),
            // CreatedAt: company.createdAt,
            // UpdatedAt: company.updatedAt,
        }));

        // Create a new workbook and add the data
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Companies');

        // Generate a buffer and send it as a downloadable file
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        
        res.setHeader('Content-Disposition', 'attachment; filename=companies.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(excelBuffer);
    } catch (error) {
        res.status(500).send('Error generating Excel file: ' + error.message);
    }
};


// ========================================================COMPNY CRUD API START================================================================

export const renderCompanyList = async (req, res) => {
    try {
        const companies = await Company.find(); // Fetch all companies from the database
        res.render('companyList', { companies }); // Pass the companies array to the EJS view
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};
export const getAllCompaniesList = async (req, res) => {
    try {
        const companies = await Company.find();
        res.render('companiesList', { companies });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};
export const getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        res.render('editCompany', { company }); // Render an edit form with the company data
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

export const updateCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).send("Company not found");
        }
        res.render('editCompany', { company });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

export const updateCompanyHandler = async (req, res) => {
    try {
        const updatedCompany = await Company.findByIdAndUpdate(
            req.params.id,
            {
                item: req.body.item,
                company: req.body.company,
                dealer: req.body.dealer,
                salesMan: req.body.salesMan // Assuming salesMan is an array of objects
            },
            { new: true }
        );

        if (!updatedCompany) {
            return res.status(404).send("Company not found");
        }

        res.redirect('/companies/list'); // Redirect back to the companies list page after update
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};



export const deleteCompanyById = async (req, res) => {
    try {
        await Company.findByIdAndDelete(req.params.id);
        res.redirect('/companies/list'); // Redirect after deletion
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

// ========================================================COMPNY CRUD API OVER================================================================
