let allListings = document.getElementsByClassName('list');

function sortByPriceAscending() {
    // sort listings by lowest price
    let sortedList = Array.from(allListings).sort(function (a, b) {
        //get each price element
        a = a.getElementsByClassName('price')[0];
        b = b.getElementsByClassName('price')[0];

        // get an innerHTML string for each sort item
        let a1 = a.innerHTML;
        let b1 = b.innerHTML;

        // remove $ from each one
        a1 = a1.replace('\$', '');
        b1 = b1.replace('\$', '');

        // compare each one
        return parseInt(a1) - parseInt(b1);
    })

    // clear listings on page and add listings in new sorted order
    document.getElementById('listings').innerHTML = "";
    for (let i = 0; i < sortedList.length; i++) {
        document.getElementById('listings').appendChild(sortedList[i]);
    }
}

function sortByPriceDescending() {
    // sort listings by lowest price
    let sortedList = Array.from(allListings).sort(function (a, b) {
        //get each price element
        a = a.getElementsByClassName('price')[0];
        b = b.getElementsByClassName('price')[0];

        // get an innerHTML string for each sort item
        let a1 = a.innerHTML;
        let b1 = b.innerHTML;

        // remove $ from each one
        a1 = a1.replace('\$', '');
        b1 = b1.replace('\$', '');

        // compare each one
        return parseInt(b1) - parseInt(a1);
    })

    // clear listings on page and add listings in new sorted order
    document.getElementById('listings').innerHTML = "";
    for (let i = 0; i < sortedList.length; i++) {
        document.getElementById('listings').appendChild(sortedList[i]);
    }
}

function showOnlyFruits() {
    //make an array of all the listings
    let arr = Array.from(allListings);

    //clear the listings page
    document.getElementById('listings').innerHTML = "";

    //for each listing that matches criteria, add it to the page
    for (let a = 0; a < arr.length; a++) {
        //set the aid to the item id in the class
        let aid = arr[a].outerHTML;
        aid = aid.substring(17, 37);

        db.collection("listings").doc(aid).get().then(doc => {
            //type of food
            let aType = doc.data().foodType;

            //if the food type is fruit, add it to the shown listings
            if (aType == "fruit") {
                document.getElementById('listings').appendChild(arr[a]);
            }
        })
    }
}

function showOnlyVegetables() {
    //make an array of all the listings
    let arr = Array.from(allListings);

    //clear the listings page
    document.getElementById('listings').innerHTML = "";

    //for each listing that matches criteria, add it to the page
    for (let a = 0; a < arr.length; a++) {
        //set the aid to the item id in the class
        let aid = arr[a].outerHTML;
        aid = aid.substring(17, 37);

        db.collection("listings").doc(aid).get().then(doc => {
            //type of food
            let aType = doc.data().foodType;

            //if the food type is vegetable, add it to the shown listings
            if (aType == "vegetable") {
                document.getElementById('listings').appendChild(arr[a]);
            }
        })
    }
}

function showOnlyOther() {
    //make an array of all the listings
    let arr = Array.from(allListings);

    //clear the listings page
    document.getElementById('listings').innerHTML = "";

    //for each listing that matches criteria, add it to the page
    for (let a = 0; a < arr.length; a++) {
        //set the aid to the item id in the class
        let aid = arr[a].outerHTML;
        aid = aid.substring(17, 37);

        db.collection("listings").doc(aid).get().then(doc => {
            //type of food
            let aType = doc.data().foodType;

            //if the food type is other, add it to the shown listings
            if (aType == "other") {
                document.getElementById('listings').appendChild(arr[a]);
            }
        })
    }
}