$(document).ready(() => {

    
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            CURRENT_PAGE.login();
        }
    });
    

    var authentication = firebase.auth();
    var googleProvider = new firebase.auth.GoogleAuthProvider();

    $('#auth').click(function () {
        authentication.signInWithPopup(googleProvider).then(function (result) {
            if (result.credential) {
                USER_TOKEN = result.credential.accessToken;
            }
            // Set the User
            var user = firebase.auth().currentUser;
            USER = {
                name: user.displayName,
                email: user.email,
                photoUrl: user.photoURL,
                emailVerified: user.emailVerified,
                uid: user.uid
            };
            CURRENT_PAGE.schedule();

        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            var email = error.email;

            var credential = error.credential;
            console.log(errorMessage);
        });
    });

}); 