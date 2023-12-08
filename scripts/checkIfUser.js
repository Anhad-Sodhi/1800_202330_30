function redirectUserIfNotLoggedIn() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            //redirect to login if user is not logged in
            window.location.href = "../pages/login.html";
        }
    });
}
redirectUserIfNotLoggedIn();