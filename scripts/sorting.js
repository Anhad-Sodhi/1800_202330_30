let allListings = document.getElementsByClassName('list');

function sortByMoney() {
    let sortedList = Array.from(allListings).sort(function(a, b) {
        a = a.getElementsByClassName('price')[0].innerHTML;
        b = b.getElementsByClassName('price')[0].innerHTML;
        return a.localeCompare(b);
    })
    console.log(sortedList);
    
    document.getElementById('listings').innerHTML = "";
    for (let i = 0; i < sortedList.length; i++) {
        document.getElementById('listings').innerHTML += sortedList[i].innerHTML;
    }
}

function sortByDate() {

}