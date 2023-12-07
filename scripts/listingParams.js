//Tech Tip B01b used for this code

// Variable to hold whether the post was made by the user or not initialized to false
var userMadeIt = false;

// Function to update the listing page based on whether it is the user's or not
function doAll() {
    // Get the listing document id
    var query = window.location.search;
    query = query.replace("?var1=", "")

    // Get the current user
    firebase.auth().onAuthStateChanged((user) => {

        // Get the user's data from firestore
        db.collection("users").doc(user.uid).get().then(userDoc => {

            // Get the user's listings
            let userListings = userDoc.data().myposts;

            // Loop through the user's listings to see if the page is one of theirs
            for (let i = 0; userListings && i < userListings.length; i++) {
                if (userListings[i] == query) {
                    // If it is their listing, update  the boolean to true
                    userMadeIt = true;
                }
            }
            //use the processListing function to populate the data on the page
            processListing(userMadeIt, query, user.uid);
        })
    });
}

doAll();

// This function populates the page based on whether it is the user's listing or not
function processListing(userMadeThisPost, docid, userid) {
    // Create listings and populate them for each document in firebase
    // If the user made the listing, turn it into an input field instead of a p
    db.collection("listings").doc(docid).get().then(doc => {
        // A variable to represent the description section of the html
        var descField = document.getElementById("description");

        //Change id of description field if it's the user's own post, so the CSS changes properly
        if (userMadeThisPost) {
            userMadeElements(descField, doc);
            processUpdate(docid);
            processDelete(docid, userid);
        }
        else {
            userDidntMakeElements(descField, doc);
            emailAndPhone();
        }

        const imgBack = document.getElementById("imageBackward");
        imgBack.insertAdjacentElement("afterend", image);

        //get the image to use for the listing
        let image1 = doc.data().image;
        document.getElementById("productImage").src = image1;
    });
}

function userMadeElements(descField, doc) {
    descField.setAttribute("id", "descriptionForm");

    // Create an input section for product name
    var productName = document.createElement("input");
    productName.setAttribute("id", "productName");
    productName.setAttribute("class", "prodName form-control");
    productName.setAttribute("value", doc.data().foodName);

    // Create a label for the input section
    var productLabel = document.createElement("label");
    productLabel.setAttribute("for", "productName");
    productLabel.innerText = "Product Name:"

    // Append the input and label to the description section
    descField.appendChild(productLabel);
    descField.appendChild(productName);

    // Create an input section for price
    var price = document.createElement("input");
    price.setAttribute("id", "price");
    price.setAttribute("type", "number");
    price.setAttribute("min", "0");
    price.setAttribute("class", "price form-control");
    price.setAttribute("value", doc.data().foodPrice);

    // Create a label for the price
    var priceLabel = document.createElement("label");
    priceLabel.setAttribute("for", "price");
    priceLabel.innerText = "Price:"

    // Append the input, a dollar sign, and the label to the description section
    descField.appendChild(priceLabel);
    descField.innerHTML += "<span id=\"dollarSign\" class=\"input-group-text\">$</span>";
    descField.appendChild(price);

    // Create an input section for description
    var information = document.createElement("input");
    information.setAttribute("id", "information");
    information.setAttribute("class", "info form-control");
    information.setAttribute("value", doc.data().foodDescription);

    // Create a label section for description
    var informationLabel = document.createElement("label");
    informationLabel.setAttribute("for", "information");
    informationLabel.innerText = "Description:"

    // Add the sections to the descField div
    descField.appendChild(informationLabel);
    descField.appendChild(information);

    // Create a button for submit
    let submitButton = document.createElement("button");
    submitButton.setAttribute("type", "button");
    submitButton.setAttribute("id", "submitButton");
    submitButton.setAttribute("class", "form-control btn btn-success");
    submitButton.innerText = "Update";

    // Add the button to the descField div
    descField.appendChild(submitButton);

    // Create a button for delete
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("id", "deleteButton");
    deleteButton.setAttribute("class", "form-control btn btn-danger");
    deleteButton.innerText = "Delete";

    // Add the button to the descField div
    descField.appendChild(deleteButton);
}
function userDidntMakeElements(descField, doc) {
    // Create a paragraph section for product name
    var productName = document.createElement("p");
    productName.setAttribute("class", "prodName");
    productName.setAttribute("id", "productName");

    // Append the product name to the description section
    descField.appendChild(productName);

    // Populate the product name with data from firestore
    document.getElementById("productName").innerHTML = doc.data().foodName;

    // Create a paragraph section for user name
    var userName = document.createElement("p");
    userName.setAttribute("class", "userName");
    userName.setAttribute("id", "userName");

    // Create a paragraph section for the price
    var price = document.createElement("p");
    price.setAttribute("class", "price");
    price.setAttribute("id", "price");

    // Append the price to the description section
    descField.appendChild(price);

    // Populate the price with a dollar sign and the data from firestore
    document.getElementById("price").innerHTML = "$" + doc.data().foodPrice;

    // Create a paragraph section for copy email
    var copy = document.createElement("p");
    copy.setAttribute("class", "material-symbols-outlined")
    copy.setAttribute("id", "copyButtonEmail");
    copy.setAttribute("style", "cursor: pointer")

    // Create a paragraph section for copy phone number
    var copy2 = document.createElement("p");
    copy2.setAttribute("class", "material-symbols-outlined")
    copy2.setAttribute("id", "copyButtonPhone");
    copy2.setAttribute("style", "cursor: pointer")

    // Create an image section
    var image = document.createElement("img");
    image.setAttribute("id", "productImage");

    // Create an anchor section for email
    var email = document.createElement("a");
    email.setAttribute("id", "email");
    email.setAttribute("href", "#");

    // Create an anchor section for phone number
    var phoneNumber = document.createElement("a");
    phoneNumber.setAttribute("id", "phoneNumber");
    phoneNumber.setAttribute("href", "#");

    //Address
    var address = document.createElement("p");
    address.setAttribute("id", "address");

    // Add the sections to the descField div
    descField.appendChild(userName);
    descField.appendChild(email);
    descField.appendChild(copy);
    descField.appendChild(phoneNumber);
    descField.appendChild(copy2);
    descField.appendChild(address);

    // Create a paragraph section for information
    var information = document.createElement("p");
    information.setAttribute("id", "information");
    information.setAttribute("class", "info");

    // Add the section to the descField div
    descField.appendChild(information);

    // Populate the section with data from firebase
    document.getElementById("information").innerHTML = doc.data().foodDescription;
    document.getElementById("userName").innerHTML = doc.data().user;
    document.getElementById("copyButtonEmail").innerHTML = "content_copy";
    document.getElementById("copyButtonPhone").innerHTML = "content_copy";
    document.getElementById("email").innerHTML = doc.data().email;
    document.getElementById("phoneNumber").innerHTML = doc.data().phoneNumber;
    document.getElementById("address").innerHTML = doc.data().address;
}

function emailAndPhone() {
    //Email/Phone number redirect function
    document.getElementById("email").addEventListener("click",
        function () {
            window.location.href = "mailto:" + document.getElementById("email").innerText;
        });
    document.getElementById("phoneNumber").addEventListener("click",
        function () {
            window.location.href = "tel:" + document.getElementById("phoneNumber").innerText;
        });

    //Copy buttons for email/phone number
    document.getElementById("copyButtonEmail").addEventListener("click",
        function () {
            let text = document.getElementById("email").innerText;
            navigator.clipboard.writeText(text);
            document.getElementById("copyButtonEmail").innerText = "done";
        });
    document.getElementById("copyButtonPhone").addEventListener("click",
        function () {
            let text = document.getElementById("phoneNumber").innerText;
            navigator.clipboard.writeText(text);
            document.getElementById("copyButtonPhone").innerText = "done";
        });
}

function processUpdate(docid) {
    const updateModal = document.getElementById("modalUpdate");
    const updateModalButton = document.getElementById("modal-update-button");
    //add an event listener to the submit button
    document.getElementById("submitButton").addEventListener("click",
        function () {
            //change the submit button text to "Loading..."
            document.getElementById("submitButton").innerText = "Loading...";

            let theListing = db.collection("listings").doc(docid);

            //if a value is not empty, update it
            if (document.getElementById("productName").value.trim() != "") {
                theListing.update({
                    foodName: document.getElementById("productName").value
                })
            }
            if (document.getElementById("price").value.trim() != "") {
                theListing.update({
                    foodPrice: document.getElementById("price").value
                })
            }
            if (document.getElementById("information").value.trim() != "") {
                theListing.update({
                    foodDescription: document.getElementById("information").value
                })
            }
            theListing.update({
                last_updated: firebase.firestore.FieldValue.serverTimestamp()
            }).then(i => {
                //update acknowledgement modal
                updateModal.showModal();
                updateModalButton.addEventListener("click", function () {
                    updateModal.close();
                    location.reload();
                })
            })
        });
}

function processDelete(docid, userid) {
    const deleteModal = document.getElementById("modalDelete");
    const deleteModalButton = document.getElementById("modal-delete-button");
    const cancelModalButton = document.getElementById("modal-cancel-button");
    //add an event listener to the delete button
    document.getElementById("deleteButton").addEventListener("click",
        function () {
            //change the delete button text to "Loading..."
            document.getElementById("deleteButton").innerText = "Loading...";

            deleteModal.showModal();
            //if confirmation modal is confirmed
            deleteModalButton.addEventListener("click", function () {
                deleteModal.close();
                //delete listing from database
                db.collection("listings").doc(docid).delete();

                //delete picture from cloud storage
                storage.ref().child("images/" + docid + ".jpg").delete();

                //delete listing from user's myposts array
                let userListing = db.collection("users").doc(userid)
                userListing.update({
                    myposts: firebase.firestore.FieldValue.arrayRemove(docid)
                }).then(i => {
                    window.location.href = "./listings.html";
                })
            })
            //if confirmation modal is cancelled
            cancelModalButton.addEventListener("click", function () {
                deleteModal.close();
                //change the delete button text back to "Delete"
                document.getElementById("deleteButton").innerText = "Delete";
            })
        })
}