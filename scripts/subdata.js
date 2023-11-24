const submissionForm = document.querySelector("#submission-form");
const foodType = document.querySelector("#food-type");
const price = document.querySelector("#food-price");
const description = document.querySelector("#food-description");
const address = document.querySelector("#address");
const submit = document.querySelector("#submit-button");
const prodName = document.querySelector("#ProductName");
const phoneNumber = document.querySelector("#phone-number")

function resetForm() {
  submit.innerText = "Submit";
  document.getElementById("subForm").reset();
}

// modal js
const modal = document.querySelector("#modalSub");
const openModal = document.querySelector(".open-button");
const closeModal = document.querySelector(".close-button");

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
  submit.innerText = "Loading...";
  closeModal.addEventListener("click", () => {
    modal.close();
    window.location.href = "./listings.html";
  });
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      navigator.geolocation.getCurrentPosition(position => {
        const userLocation = [position.coords.longitude, position.coords.latitude];
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
        phoneNumber: phoneNumber.value,
        lng: position.coords.longitude,
        lat: position.coords.latitude,
        last_updated: firebase.firestore.FieldValue.serverTimestamp() //current system time
      })
      .then((doc) => {
        uploadPic(doc.id);
      });
      })
      
    } else {
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
      storageRef
        .getDownloadURL()

        // AFTER .getDownloadURL is done
        .then(function (url) {
          // Get URL of the uploaded file

          db.collection("listings")
            .doc(postDocID)
            .update({
              "image": url, // Save the URL into users collection
            })
            // AFTER .update is done
            .then(function () {

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
    db.collection("users")
      .doc(user.uid)
      .update({
        myposts: firebase.firestore.FieldValue.arrayUnion(postDocID),
      })
      .then(() => {
        resetForm();
        modal.showModal();
        //window.location.href = "showposts.html";
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  });
}

