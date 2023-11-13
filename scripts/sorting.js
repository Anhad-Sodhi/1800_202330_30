let allListings = document.getElementsByClassName('list');

function sortByMoney() {
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

async function sortByDate() {
    
    // sort listings by lowest price
        var sortedList2 = await Promise.all(Array.from(allListings).sort(async function(a, b) {
        // get the id for each sort item (DOES NOT WORK)
        let aID = a.id;
        let bID = b.id
        // console.log(aID, bID);
        
        let aTime = await db.collection("listings").doc(aID).get().then(doc => {
            return doc.data().last_updated;
        })
        // get a timestamp for each sort item
        let bTime = await db.collection("listings").doc(bID).get().then(doc => {
            return doc.data().last_updated;
        });
        console.log(aTime);
        console.log(aTime._compareTo(bTime));
        var sort = await bTime._compareTo(aTime);
        return sort;
    })).then(() => {
    
    for (let i = 0; i < sortedList2.length; i++) {
        document.getElementById('listings').appendChild(sortedList2[i]);
    }});
    console.log(sortedList2);
    document.getElementById('listings').innerHTML = "";
    

    // clear listings on page and add listings in new sorted order
    

}
