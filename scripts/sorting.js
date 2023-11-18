let allListings = document.getElementsByClassName('list');

function sortByPriceAscending() {
    // sort listings by lowest price
    let sortedList = Array.from(allListings).sort(function(a, b) {
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
    console.log(sortedList);
    
    // clear listings on page and add listings in new sorted order
    document.getElementById('listings').innerHTML = "";
    for (let i = 0; i < sortedList.length; i++) {
        document.getElementById('listings').appendChild(sortedList[i]);
    }
}

function sortByPriceDescending() {
    // sort listings by lowest price
    let sortedList = Array.from(allListings).sort(function(a, b) {
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
    console.log(sortedList);
    
    // clear listings on page and add listings in new sorted order
    document.getElementById('listings').innerHTML = "";
    for (let i = 0; i < sortedList.length; i++) {
        document.getElementById('listings').appendChild(sortedList[i]);
    }
}