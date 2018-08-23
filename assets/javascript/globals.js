var firebaseConfig = {
    apiKey: "AIzaSyAX0li5itgvRU6kvUHLleDWH-r1Fb0M12E",
    authDomain: "carpoolapp-14ee6.firebaseapp.com",
    databaseURL: "https://carpoolapp-14ee6.firebaseio.com",
    projectId: "carpoolapp-14ee6",
    storageBucket: "carpoolapp-14ee6.appspot.com",
    messagingSenderId: "957003689395"
};
firebase.initializeApp(firebaseConfig);

// Global variable to hold current user
var USER;
var USER_TOKEN;