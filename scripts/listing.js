// Variable to count iterations through the loop
var count = 1;

// This function loads the listings onto the page
async function doAll() {
    
    // Loop through all of the listing data
    const listingsRef = db.collection('listings').orderBy("last_updated", "desc");
    const snapshot = await listingsRef.get();
    snapshot.forEach(doc => {
        
        // Create a listing div
        var listing = document.createElement("div");
        listing.setAttribute("class", "list");
        listing.setAttribute("id", "" + doc.id);
        
        // If a listing is clicked, open the listing page and set var1= the doc id
        // The doc id is used to ensure the data from that listing populates the page
        listing.onclick = function link() {
            window.location = "listing.html?var1=" + doc.id;
        }

         // Create sections to hold data
        var backgroundColor = document.createElement("div");
        backgroundColor.setAttribute("class", "bkgClr");
        var productName = document.createElement("p");
        productName.setAttribute("class", "prodName");
        productName.setAttribute("id", "productName" + count);
        var userName = document.createElement("p");
        userName.setAttribute("class", "userName");
        userName.setAttribute("id", "userName" + count);
        var price = document.createElement("p");
        price.setAttribute("class", "price");
        price.setAttribute("id", "price" + count);
        var information = document.createElement("p");
        information.setAttribute("class", "info");
        information.setAttribute("id", "information" + count);

        // Add the sections to the listing div
        listing.appendChild(backgroundColor);
        listing.appendChild(productName);
        listing.appendChild(userName);
        listing.appendChild(price);
        listing.appendChild(information);

        //add the listing to the page
        document.getElementById("listings").appendChild(listing);

        //get the image to use for the listing
        let image1 = doc.data().image;


        // Update info on the listing
        document.getElementById("productName" + count).innerHTML = doc.data().foodName;
        document.getElementById("userName" + count).innerHTML = doc.data().user;
        document.getElementById("information" + count).innerHTML = doc.data().foodDescription;
        document.getElementById("price" + count).innerHTML = "$" + doc.data().foodPrice;
        document.getElementById("" + doc.id).style.backgroundImage = "url(" + image1 + ")";
        
        // Increase count after iterating
        count++;
    });
}
doAll();
