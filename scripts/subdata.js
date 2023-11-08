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

//photo
var ImageFile;
function listenFileSelect() {
      // listen for file selection
      var fileInput = document.getElementById("food-photo");

			// When a change happens to the File Chooser Input
      fileInput.addEventListener('change', function (e) {
          ImageFile = e.target.files[0];   //Global variable
      })
}
listenFileSelect();

function uploadPic(postDocID) {
    console.log("inside uploadPic " + postDocID);
    var storageRef = storage.ref("images/" + postDocID + ".jpg");

    storageRef.put(ImageFile)   //global variable ImageFile
       
                   // AFTER .put() is done
        .then(function () {
            console.log('2. Uploaded to Cloud Storage.');
            storageRef.getDownloadURL()

                 // AFTER .getDownloadURL is done
                .then(function (url) { // Get URL of the uploaded file
                    console.log("3. Got the download URL.");

                    // Now that the image is on Storage, we can go back to the
                    // post document, and update it with an "image" field
                    // that contains the url of where the picture is stored.
                    db.collection("listings").doc(postDocID).update({
                            "image": url // Save the URL into users collection
                        })
                         // AFTER .update is done
                        .then(function () {
                            console.log('4. Added pic URL to Firestore.');
                            // One last thing to do:
                            // save this postID into an array for the OWNER
                            // so we can show "my posts" in the future
                            savePostIDforUser(postDocID);
                        })
                })
        })
        .catch((error) => {
             console.log("error uploading to cloud storage");
        })
}
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