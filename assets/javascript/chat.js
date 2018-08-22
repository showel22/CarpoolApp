// Run the code on load
$(document).ready(() => {

    var database = firebase.database();

    var view = $('#chatBoxes');

    $('#submitChat').click(function(){
        var text = $('#chatInput').val().trim();
        
        database.ref('/chat').push({
            text: text,
            innitial: 'SH',
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    });

    database.ref('/chat').on('child_added', function(snapshot){
        var sv = snapshot.val();
        var chatBox = $('<div class="chatbox row">');
        var chatBadgeContainer = $('<div class="col-2">');
        var chatBadge = $('<div class="cardbadge">');
        var chatCardContainer = $('<div class="col-10">');
        var chatCard = $('<div class="chatcard card">');
        var chatCardBody = $('<div class="card-body">');
        var chatCardText = $('<p class="card-text">');
        chatCardText.text(sv.text);
        chatCardBody.append(chatCardText);
        chatCard.append(chatCardBody);
        chatCardContainer.append(chatCard);
        chatBadge.text(sv.innitial);
        chatBadgeContainer.append(chatBadge);
        chatBox.append(chatBadgeContainer);
        chatBox.append(chatCardContainer);
        console.log(chatBox.prop('scrollHeight'));
        chatBox.scrollTop = chatBox.scrollHeight;
        view.append(chatBox);
    });

});