var query = window.location.search;
query = query.replace("?var1=", "")

console.log(query);

// Create listings and populate them for each document in firebase
var count = 1;

db.collection("listings").doc(query).get().then(doc => {
    var productName = document.createElement("p");
    productName.setAttribute("class", "prodName");
    productName.setAttribute("id", "productName");
    var userName = document.createElement("p");
    userName.setAttribute("class", "userName");
    userName.setAttribute("id", "userName");
    var price = document.createElement("p");
    price.setAttribute("class", "price");
    price.setAttribute("id", "price");
    var information = document.createElement("p");
    information.setAttribute("class", "info");
    information.setAttribute("id", "information");
    var copy = document.createElement("p");
    copy.setAttribute("class", "material-symbols-outlined")
    copy.setAttribute("id", "copyButton");
    var image = document.createElement("img");
    image.setAttribute("id", "productImage");
    var email = document.createElement("a");
    email.setAttribute("id", "email");
    email.setAttribute("href", "#")

    // <a id="email" href="#">johnsmith@email.com</a>


    document.getElementById("description").appendChild(productName);
    document.getElementById("description").appendChild(userName);
    document.getElementById("description").appendChild(email);
    document.getElementById("description").appendChild(copy);
    document.getElementById("description").appendChild(price);

    const desc = document.getElementById("description");
    desc.insertAdjacentElement("afterend", information);
    const imgBack = document.getElementById("imageBackward");
    imageBackward.insertAdjacentElement("afterend", image);



    let image1 = doc.data().image;

    // Update info on listing
    document.getElementById("productName").innerHTML = doc.data().foodName;
    document.getElementById("userName").innerHTML = doc.data().user;
    document.getElementById("information").innerHTML = doc.data().foodDescription;
    document.getElementById("price").innerHTML = "$" + doc.data().foodPrice;
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
        });
});
