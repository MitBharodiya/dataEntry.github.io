// import mongoose from "mongoose";


// // Define the schema with specific types and validation
// const companySchema = new mongoose.Schema({
//     item: {
//         type: String,  // Assuming `item` will store an array of strings
//         required:true
//     },
//     company: {
//         type: String,  // Assuming `company` stores an array of company names
//         required: true,
        
//     },
//     dealer: {
//         type: String,  // Assuming `dealer` stores an array of dealer names
//         required: true,
//     },
//     salesMan: {
//         type: [salesmanSchema],  // Now using the salesmanSchema for the salesMan field
//         required: [true, "Salesman field is required"],
//         validate: {
//             validator: function (value) {
//                 return value.length > 0;  // Ensure at least one salesman is provided
//             },
//             message: "Salesman array must contain at least one element"
//         }
//     }
// }, {
//     timestamps: true  // Automatically adds `createdAt` and `updatedAt` fields
// });

// // Middleware for error handling on save
// companySchema.post("save", function (error, doc, next) {
//     if (error.name === "ValidationError") {
//         next(new Error("Data validation failed"));
//     } else {
//         next(error);
//     }
// })

// const Company = mongoose.model("Company", companySchema);

// export default Company;




import mongoose from 'mongoose';
import salesmanSchema from './salesman.model.js'; // Adjust the path as necessary

// Define the company schema with salesman schema embedded
const companySchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true,
    },
    dealer: {
        type: String,
        required: true,
    },
    salesMan: {
        type: [salesmanSchema], // Use the salesmanSchema for the salesMan field
        required: [true, "Salesman field is required"],
        validate: {
            validator: function(value) {
                return value.length > 0; // Ensure at least one salesman is provided
            },
            message: "Salesman array must contain at least one element"
        }
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Middleware for error handling on save
companySchema.post("save", function(error, doc, next) {
    if (error.name === "ValidationError") {
        next(new Error("Data validation failed"));
    } else {
        next(error);
    }
});

const Company = mongoose.model("Company", companySchema);

export default Company;
