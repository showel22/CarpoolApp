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

// Test Data
USER = {
    name: 'Steven Howell',
    email: 'schyoyo@gmail.com',
    photoUrl: 'https://lh6.googleusercontent.com/-FcMjZM1Q0co/AAAAAAAAAAI/AAAAAAAABN4/l6C7x3_tFDI/photo.jpg',
    emailVerified: true,
    uid: 'syGrikJ6w5OzYFLWdI66Tz5h4Kh1'
};
var USER_TOKEN;