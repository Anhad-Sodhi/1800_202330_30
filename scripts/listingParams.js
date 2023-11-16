var query = window.location.search;
query = query.replace("?var1=", "")

console.log(query);

var userMadeThisPost = false;
var uid = firebase.auth().currentUser.uid;
console.log(uid);
db.collection("users").doc(uid).get().then(doc => {
    let userListings = doc.data().myposts;
    for (let i = 0; i < userListings.length; i++) {
        if (userListings[i] == query) {
            userMadeThisPost = true;
        }
    }
    console.log("usermadethispost = " + userMadeThisPost);

    // Create listings and populate them for each document in firebase
    // If the user made the listing, turn it into an input field instead of a p
    db.collection("listings").doc(query).get().then(doc => {
        //Product name
        if (userMadeThisPost) {
            var productName = document.createElement("input");
            productName.setAttribute("id", "productName");
            productName.setAttribute("class", "prodName");
            productName.setAttribute("class", "form-control");
            productName.setAttribute("placeholder", doc.data().foodName);

            document.getElementById("description").appendChild(productName);
        } else {
            var productName = document.createElement("p");
            productName.setAttribute("class", "prodName");
            productName.setAttribute("id", "productName");

            document.getElementById("description").appendChild(productName);
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
            price.setAttribute("class", "price");
            price.setAttribute("class", "form-control");
            price.setAttribute("placeholder", "$" + doc.data().foodPrice);

            document.getElementById("description").appendChild(price);
        } else {
            var price = document.createElement("p");
            price.setAttribute("class", "price");
            price.setAttribute("id", "price");

            document.getElementById("description").appendChild(price);
            document.getElementById("price").innerHTML = "$" + doc.data().foodPrice;
        }

        //Information/description
        if (userMadeThisPost) {
            var information = document.createElement("input");
            information.setAttribute("id", "information");
            information.setAttribute("class", "info");
            productName.setAttribute("class", "form-control");
            price.setAttribute("placeholder", doc.data().foodDescription);

            document.getElementById("description").appendChild(information);
        } else {
            var information = document.createElement("p");
            information.setAttribute("id", "information");
            information.setAttribute("class", "info");

            document.getElementById("description").appendChild(information);
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

        // <a id="email" href="#">johnsmith@email.com</a>


        document.getElementById("description").appendChild(userName);
        document.getElementById("description").appendChild(email);
        document.getElementById("description").appendChild(copy);

        const desc = document.getElementById("description");
        desc.insertAdjacentElement("afterend", information);
        const imgBack = document.getElementById("imageBackward");
        imageBackward.insertAdjacentElement("afterend", image);



        let image1 = doc.data().image;

        // Update info on listing
        document.getElementById("userName").innerHTML = doc.data().user;
        document.getElementById("copyButton").innerHTML = "content_copy";
        document.getElementById("productImage").src = image1;
        document.getElementById("email").innerHTML = doc.data().email;

        console.log();

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
    });
})