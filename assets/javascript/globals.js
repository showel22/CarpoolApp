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
var TRIP;
var TRIP_DRIVER
var START_LOCATION = '';

var CURRENT_PAGE = {
    page: "LOGIN",
    login: function () {
        this.page = "LOGIN";
        $('#authComponent').removeClass('hide');
        $('#scheduleComponent').addClass('hide');
        $('#tripComponent').addClass('hide');
    },
    schedule: function () {
        this.page = 'SCHEDULE';
        $('#authComponent').addClass('hide');
        $('#scheduleComponent').removeClass('hide');
        $('#tripComponent').addClass('hide');
    },
    trip: function () {
        this.page = "TRIP";
        $('#authComponent').addClass('hide');
        $('#scheduleComponent').addClass('hide');
        $('#tripComponent').removeClass('hide');
    }
};

// Test Data Comment this out before committing
/*
USER = {
    name: 'Steven Howell',
    email: 'schyoyo@gmail.com',
    photoUrl: 'https://lh6.googleusercontent.com/-FcMjZM1Q0co/AAAAAAAAAAI/AAAAAAAABN4/l6C7x3_tFDI/photo.jpg',
    emailVerified: true,
    uid: 'syGrikJ6w5OzYFLWdI66Tz5h4Kh1'
};
*/

$(document).ready(function () {
    CURRENT_PAGE.login();
    //CURRENT_PAGE.schedule();
});
