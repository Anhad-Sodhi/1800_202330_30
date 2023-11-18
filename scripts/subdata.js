const submissionForm = document.querySelector("#submission-form");
const foodType = document.querySelector("#food-type");
const price = document.querySelector("#food-price");
const description = document.querySelector("#food-description");
const address = document.querySelector("#address");
const submit = document.querySelector("#submit-button");
const prodName = document.querySelector("#ProductName");

function resetForm() {
  document.getElementById("subForm").reset();
}




// All the code below is from techtips chanel B01a

function getNameFromAuth() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {
      // Do something for the currently logged-in user here:
      userName = user.displayName;

      //insert with JS
      // document.getElementById("name-goes-here").innerText = userName;
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
  fileInput.addEventListener("change", function (e) {
    ImageFile = e.target.files[0]; //Global variable
  });
}
listenFileSelect();

function savePost() {
  alert("SAVE POST is triggered");
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      navigator.geolocation.getCurrentPosition(position => {
        const userLocation = [position.coords.longitude, position.coords.latitude];
        // User is signed in.
      // Do something for the user here.
      db.collection("listings")
      .add(
        {
        foodName: prodName.value,
        foodType: foodType.value,
        foodPrice: price.value,
        foodDescription: description.value,
        address: address.value,
        user: userName,
        email: user.email,
        lng: position.coords.longitude,
        lat: position.coords.latitude,
        last_updated: firebase.firestore.FieldValue.serverTimestamp() //current system time
      })
      .then((doc) => {
        console.log("1. Post document added!");
        console.log(doc.id);
        uploadPic(doc.id);
        resetForm();
      });
      })
      
    } else {
      // No user is signed in.
      console.log("Error, no user signed in");
    }
  });
}

function uploadPic(postDocID) {
  console.log("inside uploadPic " + postDocID);
  const storageRef = storage.ref("images/" + postDocID + ".jpg");

  storageRef
    .put(ImageFile) //global variable ImageFile

    // AFTER .put() is done
    .then(function () {
      console.log("2. Uploaded to Cloud Storage.");
      storageRef
        .getDownloadURL()

        // AFTER .getDownloadURL is done
        .then(function (url) {
          // Get URL of the uploaded file
          console.log("3. Got the download URL.");

          // Now that the image is on Storage, we can go back to the
          // post document, and update it with an "image" field
          // that contains the url of where the picture is stored.
          db.collection("listings")
            .doc(postDocID)
            .update({
              "image": url, // Save the URL into users collection
            })
            // AFTER .update is done
            .then(function () {
              console.log("4. Added pic URL to Firestore.");
              // One last thing to do:
              // save this postID into an array for the OWNER
              // so we can show "my posts" in the future
              savePostIDforUser(postDocID);
            });
        });
    })
    .catch((error) => {
      console.log("error uploading to cloud storage");
    });
}

//--------------------------------------------
//saves the post ID for the user, in an array
//--------------------------------------------
function savePostIDforUser(postDocID) {
  firebase.auth().onAuthStateChanged((user) => {
    console.log("user id is: " + user.uid);
    console.log("postdoc id is: " + postDocID);
    db.collection("users")
      .doc(user.uid)
      .update({
        myposts: firebase.firestore.FieldValue.arrayUnion(postDocID),
      })
      .then(() => {
        console.log("5. Saved to user's document!");
        alert("Post is complete!");
        //window.location.href = "showposts.html";
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  });
}

