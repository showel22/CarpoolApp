$(document).ready(function() {
    console.log('Test');
    $('#notifications').click(getNotifications);
});


var database = firebase.database();

function updateNotificationNumber() {
    database.ref('/notifications/' + USER.uid).once('value', function (snapshot) {
        var sv = snapshot.val();
        if (sv) {
            $('#notifications').removeClass('hide');
            number = Object.keys(sv).length;
            var badge = $('<span>');
            badge.addClass('new badge');
            badge.text(number);
            $('#notifications').append(badge);
        }else{
            $('#notifications').addClass('hide');
        }
    });
}

function getNotifications(){
    database.ref('/notifications/' + USER.uid).once('value', function (snapshot) {
        var sv = snapshot.val();

        if(Object.keys(sv).length){
            for(notification in sv){
            M.toast({html: sv[notification].text});
            database.ref('/notifications/' + USER.uid).remove();
            updateNotificationNumber();
            }
        }else{
            M.toast({html: "No Notications"});
        }
        
    });


}