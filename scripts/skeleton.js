//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {                   //if the pointer to "user" object is not null, then someone is logged in
            // User is signed in.
            // Do something for the user here.
            $('#navbarPlaceholder').load('../text/navbar.html');
            $('#footerPlaceholder').load('../text/footer.html');
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
            $('#footerPlaceholder').load('../text/loginFooter.html');
        } else {
            // No user is signed in.
        }
    });
}
loadSkeletonLogin();
loadSkeleton(); //invoke the function

function footerSubmission() {
    window.location.href = "../pages/submission.html";
}

function logoutButton() {
    const logoutModal = document.getElementById("modalLogout");
    const logoutModalCancelButton = document.getElementById("modal-logoutCancel-button");
    const logoutModalButton = document.getElementById("modal-logout-button");

    logoutModal.showModal();
    logoutModalCancelButton.addEventListener("click", function () {
        logoutModal.close();
    })
    logoutModalButton.addEventListener("click", function () {
        logoutModal.close();
        window.location.href = "../index.html";
    })
}