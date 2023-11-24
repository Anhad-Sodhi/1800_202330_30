//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {                   //if the pointer to "user" object is not null, then someone is logged in
            // User is signed in.
            // Do something for the user here.
            $('#navbarPlaceholder').load('./text/navbar.html');
            $('#footerPlaceholder').load('./text/footer.html');
        } else {
            // No user is signed in.
        }
    });
}

function loadSkeletonLogin() {

    firebase.auth().onAuthStateChanged(async function (user) {
        if (!user) {                   //if the pointer to "user" object is not null, then someone is logged in
            // User is signed in.
            // Do something for the user here.
            $('#footerPlaceholder').load('./text/loginFooter.html');
        } else {
            // No user is signed in.
        }
    });
}
loadSkeletonLogin();
loadSkeleton(); //invoke the function

function footerSubmission() {
    window.location.href = "./submission.html";
}

function logoutButton() {
    if (confirm("Are you sure you want to log out?")) {
        window.location.href = "./index.html";
    }
}