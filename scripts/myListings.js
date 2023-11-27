// Variable to count iterations through the loop
var count = 1;

// This function loads the listings onto the page
async function doAll() {

    // Loop through all of the listing data
    const listingsRef = db.collection('listings').orderBy("last_updated", "desc");
    const snapshot = await listingsRef.get();
    snapshot.forEach(doc => {

        // Get the info of the current user from firestore
        db.collection("users").doc(firebase.auth().currentUser.uid).get().then(test => {

            // Get the users listings
            var postinglist = test.data().myposts;

            // If they have listings then populate the page
            if (postinglist.length > 0) {

                // Compare to see if each post is the user's or not
                for (let i = 0; i < postinglist.length; i++) {
                    let currentPost = postinglist[i];

                    // Create a listing on the page if the listing is the user's
                    if (doc.id == currentPost) {

                        // Create a listing div
                        var listing = document.createElement("div");
                        listing.setAttribute("class", "list");
                        listing.setAttribute("id", "listing" + i);

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
                        productName.setAttribute("id", "productName" + i);
                        var userName = document.createElement("p");
                        userName.setAttribute("class", "userName");
                        userName.setAttribute("id", "userName" + i);
                        var price = document.createElement("p");
                        price.setAttribute("class", "price");
                        price.setAttribute("id", "price" + i);
                        var information = document.createElement("p");
                        information.setAttribute("class", "info");
                        information.setAttribute("id", "information" + i);

                        // Add the sections to the listing div
                        listing.append(backgroundColor);
                        listing.appendChild(productName);
                        listing.appendChild(userName);
                        listing.appendChild(price);
                        listing.appendChild(information);

                        //add the listing to the page
                        document.getElementById("listings").appendChild(listing);

                        //get the image to use for the listing
                        let image1 = doc.data().image;

                        // Update info on the listing
                        document.getElementById("productName" + i).innerHTML = doc.data().foodName;
                        document.getElementById("userName" + i).innerHTML = doc.data().user;
                        document.getElementById("information" + i).innerHTML = doc.data().foodDescription;
                        document.getElementById("price" + i).innerHTML = "$" + doc.data().foodPrice;
                        document.getElementById("listing" + i).style.backgroundImage = "url(" + image1 + ")";
                    }
                }
            // If they don't have listings, print out a message
            } else {
                var noListings = document.createElement("p");
                noListings.setAttribute("id", "noListings");
                document.getElementById("listings").appendChild(noListings);
                document.getElementById("noListings").innerHTML = "You do not have any listings currently!" + "<br/>" + "To add a new listing, click the + button in the bottom right corner.";
            }

        });

        // Increase count after iterating
        count++;
    })
};

doAll();