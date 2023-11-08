function redirectEmail() {
    window.location.href = "mailto:" + document.getElementById("email");
}

// Create listings and populate them for each document in firebase
var count = 1;

const citiesRef = db.collection('listings');
const snapshot = await citiesRef.get();
snapshot.forEach(doc => {
    // Create listing
    var listing = document.createElement("div");
    listings.setAttribute("class", "list");
    var productName = document.createElement("p");
    productName.setAttribute("class", "prodName");
    var userName = document.createElement("p");
    userName.setAttribute("class", "userName");
    var price = document.createElement("p");
    price.setAttribute("class", "Price");
    var information = document.createElement("p");
    information.setAttribute("class", "info");

    listing.appendChild(productName);
    listing.appendChild(userName);
    listing.appendChild(price);
    listing.appendChild(information);

    document.getElementById("listings").appendChild(listing);

    
    // Update info on listing
    document.getElementById("productName" + count).innerHTML = doc.data().productName;      
    document.getElementById("userName" + count).innerHTML = doc.data().posterName;
    document.getElementById("information" + count).innerHTML = doc.data().description;      
    document.getElementById("price" + count).innerHTML = "$" + doc.data().price;      

    count++;
    console.log(count);
});