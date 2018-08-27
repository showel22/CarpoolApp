$(document).ready(() => {

    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            CURRENT_PAGE.login();
        }
    });

    var authentication = firebase.auth();
    var googleProvider = new firebase.auth.GoogleAuthProvider();

    if (USER === undefined) {
        $('#auth').text('Sign In');
    } else {
        $('#auth').text('Sign Out');
    }

    $('#auth').click(function () {
        if (USER == undefined) {
            $('#auth').text('Sign In');
            USER = undefined;
            USER_TOKEN = undefined;
            UID = undefined;
            firebase.auth().signOut().then(function () {
                // Sign-out successful.
                console.log("Signed Out");
            }).catch(function (error) {
                // An error happened.
                console.log("Error on Sign Out");
            });
        } else {
            $('#auth').text('Sign Out');
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
        }
    });

}); 