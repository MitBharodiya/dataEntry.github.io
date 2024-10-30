import mongoose from 'mongoose';

// Define the salesman schema
const salesmanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Salesman name is required"],
    },
    contactNumber: {
        type: String,
        required: [true, "Contact number is required"],
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v); // Example validation for a 10-digit phone number
            },
            message: props => `${props.value} is not a valid contact number!`
        }
    }
});

// Export the salesman schema for reuse
export default salesmanSchema;
