var userMadeIt = false;
function doAll() {
    var query = window.location.search;
    query = query.replace("?var1=", "")

    console.log(query);

    firebase.auth().onAuthStateChanged((user) => {
        console.log(user.uid);

        db.collection("users").doc(user.uid).get().then(userDoc => {

            let userListings = userDoc.data().myposts;

            for (let i = 0; i < userListings.length; i++) {
                if (userListings[i] == query) {
                    console.log("Match identified");
                    userMadeIt = true;
                    console.log("Variable changed successfully");
                }
                console.log(userMadeIt);
            }
            console.log(userMadeIt);
            processListing(userMadeIt, query, user.uid);

        })

        // userMadeIt = getUserMadeThisPost(user.uid, query, userMadeIt);
        console.log(userMadeIt);


    });
}
doAll();

// function getUserMadeThisPost(userid, docid, didTheyMakeIt) {


// }

function processListing(userMadeThisPost, docid, userid) {
    // Create listings and populate them for each document in firebase
    // If the user made the listing, turn it into an input field instead of a p
    db.collection("listings").doc(docid).get().then(doc => {
        var descField = document.getElementById("description");
        //Product name
        if (userMadeThisPost) {
            var productName = document.createElement("input");
            productName.setAttribute("id", "productName");
            productName.setAttribute("class", "prodName");
            productName.setAttribute("class", "form-control");
            productName.setAttribute("placeholder", doc.data().foodName);

            var productLabel = document.createElement("label");
            productLabel.setAttribute("for", "productName");
            productLabel.innerText = "Product Name:"

            descField.appendChild(productLabel);
            descField.appendChild(productName);
        } else {
            var productName = document.createElement("p");
            productName.setAttribute("class", "prodName");
            productName.setAttribute("id", "productName");

            descField.appendChild(productName);
            document.getElementById("productName").innerHTML = doc.data().foodName;
        }

        //Username
        var userName = document.createElement("p");
        userName.setAttribute("class", "userName");
        userName.setAttribute("id", "userName");

        //Price
        if (userMadeThisPost) {
            var price = document.createElement("input");
            price.setAttribute("id", "price");
            price.setAttribute("type", "number");
            price.setAttribute("min", "0");
            price.setAttribute("class", "price");
            price.setAttribute("class", "form-control");
            price.setAttribute("placeholder", doc.data().foodPrice);

            var priceLabel = document.createElement("label");
            priceLabel.setAttribute("for", "price");
            priceLabel.innerText = "Price:"

            descField.appendChild(priceLabel);
            descField.innerHTML += "<span class=\"input-group-text\">$</span>";
            descField.appendChild(price);
        } else {
            var price = document.createElement("p");
            price.setAttribute("class", "price");
            price.setAttribute("id", "price");

            descField.appendChild(price);
            document.getElementById("price").innerHTML = "$" + doc.data().foodPrice;
        }

        //Information/description
        if (userMadeThisPost) {
            var information = document.createElement("input");
            information.setAttribute("id", "information");
            information.setAttribute("class", "info");
            information.setAttribute("class", "form-control");
            information.setAttribute("placeholder", doc.data().foodDescription);

            var informationLabel = document.createElement("label");
            informationLabel.setAttribute("for", "information");
            informationLabel.innerText = "Description:"

            descField.appendChild(informationLabel);
            descField.appendChild(information);
        } else {
            var information = document.createElement("p");
            information.setAttribute("id", "information");
            information.setAttribute("class", "info");

            descField.appendChild(information);
            document.getElementById("information").innerHTML = doc.data().foodDescription;
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


        descField.appendChild(userName);
        // descField.innerHTML += "<br>";
        descField.appendChild(email);
        descField.appendChild(copy);

        if (userMadeThisPost) {
            let submitButton = document.createElement("button");
            submitButton.setAttribute("type", "button");
            submitButton.setAttribute("id", "submitButton");
            submitButton.setAttribute("class", "form-control");
            submitButton.setAttribute("class", "btn btn-outline-success");
            submitButton.innerText = "Submit";

            descField.appendChild(submitButton);


            let deleteButton = document.createElement("button");
            deleteButton.setAttribute("type", "button");
            deleteButton.setAttribute("id", "deleteButton");
            deleteButton.setAttribute("class", "form-control");
            deleteButton.setAttribute("class", "btn btn-outline-danger");
            deleteButton.innerText = "Delete";

            descField.appendChild(deleteButton);
        }

        const desc = descField;
        descField.insertAdjacentElement("afterend", information);
        const imgBack = document.getElementById("imageBackward");
        imageBackward.insertAdjacentElement("afterend", image);


        let image1 = doc.data().image;

        // Update info on listing
        document.getElementById("userName").innerHTML = doc.data().user;
        document.getElementById("copyButton").innerHTML = "content_copy";
        document.getElementById("productImage").src = image1;
        document.getElementById("email").innerHTML = doc.data().email;

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
                    let theListing = db.collection("listings").doc(docid);

                    if (document.getElementById("productName").value.trim() != "") {
                        theListing.update({
                            foodName: document.getElementById("productName").value
                        })
                        console.log("submission 1 good");
                    }
                    if (document.getElementById("price").value.trim() != "") {
                        theListing.update({
                            foodPrice: document.getElementById("price").value
                        })
                        console.log("submission 2 good");
                    }
                    if (document.getElementById("information").value.trim() != "") {
                        theListing.update({
                            foodDescription: document.getElementById("information").value
                        })
                        console.log("submission 3 good");
                    }
                    history.back();
                });
            document.getElementById("deleteButton").addEventListener("click",
                function () {
                    if (confirm("Are you sure you want to delete this lsiting? This cannot be undone!")) {
                        db.collection("listings").doc(docid).delete();

                        let userListing = db.collection("users").doc(userid)
                        userListing.update({
                            myposts: firebase.firestore.FieldValue.arrayRemove(docid)
                        });
                        console.log("deletion successful");
                        history.back();
                    }
                })
        };
    });
}