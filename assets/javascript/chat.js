// Run the code on load
$(document).ready(() => {

    var database = firebase.database();
    var view = $('#chatBoxes');

    // Chat Data Structure
    var chats = {
        conversation: [],

        addChat: function (chat) {
            this.conversation.push(chat);
            if (this.conversation[this.conversation.length - 1].user === USER.uid) {
                drawCurrentUserChat(this.conversation);
            } else {
                drawChat(this.conversation);
            }
        },
    };

    function drawCurrentUserChat(conversation) {
        var chat = conversation[conversation.length - 1];
        var previousChat;
        if (conversation.length > 1) {
            previousChat = conversation[conversation.length - 2];
        }
        var chatBox = $('<div class="chatbox row">');
        var chatCardContainer = $('<div class="offset-4 col-8">');
        var chatCard = $('<div class="chatcard card currentCard">');
        var chatCardBody = $('<div class="card-body">');
        var chatCardText = $('<p class="card-text">');
        chatCardText.text(chat.text);
        chatCardBody.append(chatCardText);
        chatCard.append(chatCardBody);
        chatCardContainer.append(chatCard);
        chatBox.append(chatCardContainer);

        if (!!previousChat && previousChat.user === chat.user && moment(chat.timestamp).diff(moment(previousChat.timestamp)) > 1000 * 60) {
            var metaContainer = $('<div class="row chatMeta">');
            var timestamp = $('<span class="col-12 text-center">');
            chatBox.addClass('snap');
            timestamp.text(moment(chat.timestamp).calendar());
            metaContainer.append(timestamp);
        }else if(!!previousChat && previousChat.user != chat.user){
            var metaContainer = $('<div class="row chatMeta">');
            var timestamp = $('<span class="col-12 text-center">');
            chatBox.addClass('snap');
            timestamp.text(moment(chat.timestamp).calendar());
            metaContainer.append(timestamp);
        }else if(!previousChat){
            var metaContainer = $('<div class="row chatMeta">');
            var timestamp = $('<span class="col-12 text-center">');
            chatBox.addClass('snap');
            timestamp.text(moment(chat.timestamp).calendar());
            metaContainer.append(timestamp);
        }

        view.append(metaContainer);
        view.append(chatBox);
        $('#chat').scrollTop($('#chat').prop('scrollHeight'));
    }

    function drawChat(conversation) {
        var chat = conversation[conversation.length - 1];
        var previousChat;
        if (conversation.length > 1) {
            previousChat = conversation[conversation.length - 2];
        }
        var chatBox = $('<div class="chatbox row">');
        var chatBadgeContainer = $('<div class="col-1">');
        var chatBadge = $('<div class="cardbadge">');
        var chatCardContainer = $('<div class="col-8">');
        var chatCard = $('<div class="chatcard card">');
        var chatCardBody = $('<div class="card-body">');
        var chatCardText = $('<p class="card-text">');
        chatCardText.text(chat.text);
        chatCardBody.append(chatCardText);
        chatCard.append(chatCardBody);
        chatCardContainer.append(chatCard);
        chatBadge.text(chat.innitial);
        chatBadgeContainer.append(chatBadge);
        chatBox.append(chatBadgeContainer);
        chatBox.append(chatCardContainer);

        if (!!previousChat && previousChat.user === chat.user && moment(chat.timestamp).diff(moment(previousChat.timestamp)) > 1000 * 60) {
            var metaContainer = $('<div class="row chatMeta">');
            var timestamp = $('<span class="col-12 text-center">');
            chatBox.addClass('snap');
            timestamp.text(moment(chat.timestamp).calendar());
            metaContainer.append(timestamp);
        }else if(!!previousChat && previousChat.user != chat.user){
            var metaContainer = $('<div class="row chatMeta">');
            var timestamp = $('<span class="col-12 text-center">');
            chatBox.addClass('snap');
            timestamp.text(moment(chat.timestamp).calendar());
            metaContainer.append(timestamp);
        }else if(!previousChat){
            var metaContainer = $('<div class="row chatMeta">');
            var timestamp = $('<span class="col-12 text-center">');
            chatBox.addClass('snap');
            timestamp.text(moment(chat.timestamp).calendar());
            metaContainer.append(timestamp);
        }

        view.append(metaContainer);
        view.append(chatBox);
        $('#chat').scrollTop($('#chat').prop('scrollHeight'));
    }

    $('#submitChat').click(function (event) {
        event.preventDefault();
        var text = $('#chatInput').val().trim();
        $('#chatInput').val('');
        var nameArray = USER.name.split(' ');
        database.ref('/chat').push({
            text: text,
            innitial: nameArray[0].charAt(0) + nameArray[1].charAt(0),
            user: USER.uid,
            photoURL: (USER.photoURl ? USER.photoURl : ''),
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    });

    database.ref('/chat').on('child_added', function (snapshot) {
        var sv = snapshot.val();
        chats.addChat(sv);
    });

});