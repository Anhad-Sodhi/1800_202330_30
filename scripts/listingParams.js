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
            for (let i = 0; i < userListings.length; i++) {
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

    const updateModal = document.getElementById("modalUpdate");
    const updateModalButton = document.getElementById("modal-update-button");

    const deleteModal = document.getElementById("modalDelete");
    const deleteModalButton = document.getElementById("modal-delete-button");
    const cancelModalButton = document.getElementById("modal-cancel-button");

    // Create listings and populate them for each document in firebase
    // If the user made the listing, turn it into an input field instead of a p
    db.collection("listings").doc(docid).get().then(doc => {

        // A variable to represent the description section of the html
        var descField = document.getElementById("description");

        //Change id of description field if it's the user's own post, so the CSS changes properly
        if (userMadeThisPost) {
            descField.setAttribute("id", "descriptionForm");
        }

        // If it's the user's listing, populate the page with input fields
        if (userMadeThisPost) {

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
        }

        // Otherwise populate with the regular listing information
        else {

            // Create a paragraph section for product name
            var productName = document.createElement("p");
            productName.setAttribute("class", "prodName");
            productName.setAttribute("id", "productName");

            // Append the product name to the description section
            descField.appendChild(productName);

            // Populate the product name with data from firestore
            document.getElementById("productName").innerHTML = doc.data().foodName;
        }

        // Create a paragraph section for user name
        var userName = document.createElement("p");
        userName.setAttribute("class", "userName");
        userName.setAttribute("id", "userName");

        // If it's the user's listing, populate the page with input fields
        if (userMadeThisPost) {

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
        }

        // Otherwise populate with the regular listing information
        else {

            // Create a paragraph section for the price
            var price = document.createElement("p");
            price.setAttribute("class", "price");
            price.setAttribute("id", "price");

            // Append the price to the description section
            descField.appendChild(price);

            // Populate the price with a dollar sign and the data from firestore
            document.getElementById("price").innerHTML = "$" + doc.data().foodPrice;
        }


        //Copy
        var copy = document.createElement("p");
        copy.setAttribute("class", "material-symbols-outlined")
        copy.setAttribute("id", "copyButton");
        copy.setAttribute("style", "cursor: pointer")
        //Image
        var image = document.createElement("img");
        image.setAttribute("id", "productImage");
        //Email
        var email = document.createElement("a");
        email.setAttribute("id", "email");
        email.setAttribute("href", "#")
        //Phone Number
        // var phoneNumber = document.createElement("p");
        // phoneNumber.setAttribute("id", "phoneNumber");
        //Address
        var address = document.createElement("p");
        address.setAttribute("id", "address");

        descField.appendChild(userName);
        descField.appendChild(email);
        descField.appendChild(copy);
        // descField.appendChild(phoneNumber);
        descField.appendChild(address);
        

        // If it's the user's listing, populate the page with input fields
        if (userMadeThisPost) {
            var information = document.createElement("input");
            information.setAttribute("id", "information");
            information.setAttribute("class", "info form-control");
            information.setAttribute("value", doc.data().foodDescription);

            var informationLabel = document.createElement("label");
            informationLabel.setAttribute("for", "information");
            informationLabel.innerText = "Description:"

            descField.appendChild(informationLabel);
            descField.appendChild(information);
        }

        // Otherwise populate with the regular listing information
        else {
            var information = document.createElement("p");
            information.setAttribute("id", "information");
            information.setAttribute("class", "info");

            descField.appendChild(information);
            document.getElementById("information").innerHTML = doc.data().foodDescription;
        }

        if (userMadeThisPost) {
            let submitButton = document.createElement("button");
            submitButton.setAttribute("type", "button");
            submitButton.setAttribute("id", "submitButton");
            submitButton.setAttribute("class", "form-control btn btn-success");
            submitButton.innerText = "Update";

            descField.appendChild(submitButton);


            let deleteButton = document.createElement("button");
            deleteButton.setAttribute("type", "button");
            deleteButton.setAttribute("id", "deleteButton");
            deleteButton.setAttribute("class", "form-control btn btn-danger");
            deleteButton.innerText = "Delete";

            descField.appendChild(deleteButton);
        }

        // descField.insertAdjacentElement("afterend", information);
        const imgBack = document.getElementById("imageBackward");
        imgBack.insertAdjacentElement("afterend", image);


        let image1 = doc.data().image;

        // Update info on listing
        document.getElementById("userName").innerHTML = doc.data().user;
        document.getElementById("copyButton").innerHTML = "content_copy";
        document.getElementById("productImage").src = image1;
        document.getElementById("email").innerHTML = doc.data().email;
        // document.getElementById("phoneNumber").innerHTML = doc.data().;
        document.getElementById("address").innerHTML = doc.data().address;


        document.getElementById("email").addEventListener("click",
            function () {
                window.location.href = "mailto:" + document.getElementById("email").innerText;
            });

        document.getElementById("copyButton").addEventListener("click",
            function () {
                let text = document.getElementById("email").innerText;
                navigator.clipboard.writeText(text);
                document.getElementById("copyButton").innerText = "done";
            });
        if (userMadeThisPost) {
            document.getElementById("submitButton").addEventListener("click",
                function () {
                    document.getElementById("submitButton").innerText = "Loading...";

                    let theListing = db.collection("listings").doc(docid);

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
                        updateModal.showModal();
                        updateModalButton.addEventListener("click", function () {
                            updateModal.close();
                            location.reload();
                        })
                    })
                });
            document.getElementById("deleteButton").addEventListener("click",
                function () {
                    document.getElementById("deleteButton").innerText = "Loading...";

                    deleteModal.showModal();
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
                    cancelModalButton.addEventListener("click", function () {
                        deleteModal.close();
                        document.getElementById("deleteButton").innerText = "Delete";
                    })
                })
        };
    });
}