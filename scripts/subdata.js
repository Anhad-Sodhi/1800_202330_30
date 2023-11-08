const submissionForm = document.querySelector("#submission-form");
// const photo = document.querySelector("#food-photo");
const foodType = document.querySelector("#food-type");
const price = document.querySelector("#food-price");
const description = document.querySelector("#food-description");
const address = document.querySelector("#address");
const submit = document.querySelector("#submit-button");
const prodName = document.querySelector("#ProductName");

function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            userName = user.displayName;

            //insert with JS
            document.getElementById("name-goes-here").innerText = userName;    

        } else {
            // No user is signed in.
        }
    });
}
getNameFromAuth(); //run the function

submit.addEventListener('click', (e) => {
    e.preventDefault();
    db.collection('listings').doc().set({
        // photo: photo.value,
        foodName: prodName.value,
        foodType: foodType.value,
        foodPrice: price.value,
        foodDescription: description.value,
        address: address.value,
        user: userName,
    }).then(() => {
        submissionForm.reset();      
    })
});