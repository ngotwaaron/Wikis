
function showSignIn() {
    document.getElementById("signInForm").style.display = "block";
    document.getElementById("signUpForm").style.display = "none";
}

function showSignUp() {
    document.getElementById("signInForm").style.display = "none";
    document.getElementById("signUpForm").style.display = "block";
}

function refreshPage() {
    location.reload();
}

function signIn() {
    // Assuming the user has successfully signed in
    showMessage("Welcome! Find your treasure.");
    // Hide the sign-in form after submission
    document.getElementById("signInForm").style.display = "none";
    // Prevent default form submission behavior
    event.preventDefault();
    console.log("Sign-in message displayed.");
}

function signUp() {
    // Assuming the user has successfully signed up
    showMessage("Welcome! Find your treasure.");
    // Hide the sign-up form after submission
    document.getElementById("signUpForm").style.display = "none";
    // Prevent default form submission behavior
    event.preventDefault();
    console.log("Sign-up message displayed.");
}


function showMessage(message) {
    var messageContainer = document.getElementById("messageContainer");
    messageContainer.innerText = message;
    messageContainer.style.display = "block";
    setTimeout(function() {
        messageContainer.style.display = "none";
    }, 3000); // Hide the message after 3 seconds
}

document.getElementById("signInLink").addEventListener("click", showSignIn);
document.getElementById("signUpLink").addEventListener("click", showSignUp);

// Adding event listeners to form submit buttons
document.getElementById("signInForm").addEventListener("submit", signIn);
document.getElementById("signUpForm").addEventListener("submit", signUp);


document.addEventListener("DOMContentLoaded", function() {
    // Add event listener for the "Report Lost Items" button
    document.getElementById("viewLostBtn").addEventListener("click", function() {
        fetchItems("lostItems");
    });

    // Add event listener for the "Report Found Items" button
    document.getElementById("viewFoundBtn").addEventListener("click", function() {
        fetchItems("foundItems");
    });
});

function fetchItems(type) {
    fetch('db.json')
    .then(response => response.json())
    .then(data => {
        displayItems(data[type]);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function displayItems(items) {
    const itemsContainer = document.getElementById('itemsContainer');
    itemsContainer.innerHTML = '';

    items.forEach(item => {
        // Create card container
        const card = document.createElement('div');
        card.classList.add('card');

        // Create image element
        const image = document.createElement('img');
        image.src = item.imageURL;
        image.alt = item.name;
        card.appendChild(image);

        // Create details container
        const details = document.createElement('div');
        details.classList.add('details');

        // Create name element
        const name = document.createElement('h3');
        name.textContent = item.name;
        details.appendChild(name);

        // Create color element
        const color = document.createElement('p');
        color.innerHTML = `<strong>Color:</strong> ${item.color}`;
        details.appendChild(color);

        // Create description element
        const description = document.createElement('p');
        description.innerHTML = `<strong>Description:</strong> ${item.description}`;
        details.appendChild(description);

        // Append details container to card
        card.appendChild(details);

        // Append card to items container
        itemsContainer.appendChild(card);
    });
}

// Function to show the report lost item form
function showReportLostForm() {
    document.getElementById("reportLostForm").style.display = "block";
    document.getElementById("reportFoundForm").style.display = "none";
}

// Function to show the report found item form
function showReportFoundForm() {
    document.getElementById("reportFoundForm").style.display = "block";
    document.getElementById("reportLostForm").style.display = "none";
}

function reportForm() {
    // Display success message
    showMessage(successMessage);
    // Hide the form after submission
    document.getElementById("reportFoundForm").style.display = "none";
    // Prevent default form submission behavior
    event.preventDefault();
    console.log("Report form submitted successfully.");
}

// Function to hide the report lost item form after submission
function hideReportLostForm() {
    document.getElementById("reportLostForm").style.display = "none";
}

// Function to hide the report found item form after submission
function hideReportFoundForm() {
    document.getElementById("reportFoundForm").style.display = "none";
}

// Add event listener for the "Report Lost Items" button
document.getElementById("reportLostBtn").addEventListener("click", showReportLostForm);

// Add event listener for the "Report Found Items" button
document.getElementById("reportFoundBtn").addEventListener("click", showReportFoundForm);

// Adding event listeners to report form submit buttons
document.getElementById("reportLostForm").addEventListener("submit", function(event) {
    reportLostItem();
    hideReportLostForm();
    event.preventDefault(); // Prevent default form submission behavior
});

document.getElementById("reportFoundForm").addEventListener("submit", function(event) {
    reportFoundItem();
    hideReportFoundForm();
    event.preventDefault(); // Prevent default form submission behavior
});


// Add event listener for the "Report Lost Items" button
document.getElementById("reportLostBtn").addEventListener("click", showReportLostForm);

// Add event listener for the "Report Found Items" button
document.getElementById("reportFoundBtn").addEventListener("click", showReportFoundForm);

// Function to report a lost item
function reportLostItem() {
    const name = document.getElementById("lostItemName").value;
    const color = document.getElementById("lostItemColor").value;
    const description = document.getElementById("lostItemDescription").value;

    // Construct the new lost item object
    const newItem = {
        name: name,
        color: color,
        description: description,
        // You can add additional properties here if needed
    };

    // Send the data to your server using fetch API or XMLHttpRequest
    // Example:
    fetch("http://localhost:3000/lostItems", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
        // Optionally, display a success message or perform any other action
    })
    .catch(error => {
        console.error("Error:", error);
        // Optionally, display an error message or perform any other action
    });
}

// Function to report a found item
function reportFoundItem() {
    const name = document.getElementById("foundItemName").value;
    const color = document.getElementById("foundItemColor").value;
    const description = document.getElementById("foundItemDescription").value;

    // Construct the new found item object
    const newItem = {
        name: name,
        color: color,
        description: description,
        // You can add additional properties here if needed
    };

    // Send the data to your server using fetch API or XMLHttpRequest
    // Example:
    fetch("http://localhost:3000/foundItems", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
        // Optionally, display a success message or perform any other action
    })
    .catch(error => {
        console.error("Error:", error);
        // Optionally, display an error message or perform any other action
    });
}
