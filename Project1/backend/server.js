const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public')));

// Mocked token for demonstration purposes
const Token = 'Bearer ${authToken}';

app.post('/authenticate', (req, res) => {
    const login_id = req.body.login_id;
    const password = req.body.password;

    // In a real application, you would authenticate the user
    // and generate a valid token
    if (login_id === 'test@sunbasedata.com' && password === 'Test@123') {
        res.json({ token: Token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Mocked customer list for demonstration purposes
const mockedCustomerList = [
    {
        "first_name": "Jane",
        "last_name": "Doe",
        "email": "jane@example.com",
        "street": "Elvnu Street",
        "address": "H no 2",
        "city": "Delhi",
        "state": "Delhi",
        "phone": "12345678"
    },
    
];

app.get('/get_customer_list', (req, res) => {
    res.status(200).json(mockedCustomerList);
});

app.post('/create_customer', (req, res) => {
    // Extract customer data from request body
    const customerData = req.body;

    // Mock response based on validation
    if (customerData.first_name && customerData.last_name) {
        res.status(201).json({ message: 'Successfully Created' });
    } else {
        res.status(400).json({ message: 'First Name or Last Name is missing' });
    }
});

app.post('/delete_customer', (req, res) => {
    const uuid = req.body.uuid;

    // Mock response based on validation
    if (uuid) {
        res.status(200).json({ message: 'Successfully deleted' });
    } else {
        res.status(400).json({ message: 'UUID not found' });
    }
});

app.post('/update_customer', (req, res) => {
    const uuid = req.body.uuid;
    const customerData = req.body;

    // Mock response based on validation
    if (uuid) {
        res.status(200).json({ message: 'Successfully Updated' });
    } else {
        res.status(500).json({ message: 'UUID not found' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
