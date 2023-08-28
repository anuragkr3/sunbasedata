const backendBaseUrl = 'http://localhost:3000';
const authToken=null;
async function authenticate() {
    const login_id = document.getElementById("login_id").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${backendBaseUrl}/authenticate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "login_id": login_id,
            "password": password
        })
    });

    if (response.status === 200) {
        const data = await response.json();
        authToken = data.token; // Save the received token

        // Redirect to the customer list page
        window.location.href = "customer_list.html";
    } else {
        alert("Login failed");
    }
}

async function getCustomerList() {
    const response = await fetch(`${backendBaseUrl}/get_customer_list`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    });

    if (response.status === 200) {
        const customerList = await response.json();
        // Process and display the customer list
    } else {
        console.error("Failed to fetch customer list");
    }
}

async function createCustomer(customerData) {
    const response = await fetch(`${backendBaseUrl}/create_customer`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customerData)
    });

    if (response.status === 201) {
        console.log("Customer created successfully");
    } else {
        console.error("Failed to create customer");
    }
}

async function deleteCustomer(uuid) {
    const response = await fetch(`${backendBaseUrl}/delete_customer`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "uuid": uuid
        })
    });

    if (response.status === 200) {
        console.log("Customer deleted successfully");
    } else if (response.status === 400) {
        console.error("UUID not found");
    } else {
        console.error("Error while deleting customer");
    }
}

async function updateCustomer(uuid, customerData) {
    const response = await fetch(`${backendBaseUrl}/update_customer`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "uuid": uuid,
            "first_name": customerData.first_name,
            "last_name": customerData.last_name,
            "street": customerData.street,
            "address": customerData.address,
            "city": customerData.city,
            "state": customerData.state,
            "email": customerData.email,
            "phone": customerData.phone
        })
    });

    if (response.status === 200) {
        console.log("Customer updated successfully");
    } else if (response.status === 500) {
        console.error("UUID not found");
    } else {
        console.error("Error while updating customer");
    }
}

// Load customer list on customer_list.html page load
if (window.location.href.endsWith("customer_list.html")) {
    getCustomerList();
}
