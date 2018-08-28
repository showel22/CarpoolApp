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
        var chatBox = $('<li class="collection-item white-text cyan lighten-3">');
        var chatBoxText = $('<p class="right-align">');
        chatBoxText.text(chat.text);
        chatBox.append(chatBoxText);

        if (!!previousChat && previousChat.user === chat.user && moment(chat.timestamp).diff(moment(previousChat.timestamp)) > 1000 * 60) {
            var metaContainer = $('<div class="title">');
            var timestamp = $('<div class="center-align meta-text">');
            timestamp.text(moment(chat.timestamp).calendar());
            metaContainer.append(timestamp);
            chatBox.addClass('chat-item');
        } else if (!!previousChat && previousChat.user != chat.user) {
            var metaContainer = $('<div class="title">');
            var timestamp = $('<div class="center-align meta-text">');
            timestamp.text(moment(chat.timestamp).calendar());
            metaContainer.append(timestamp);
            chatBox.addClass('chat-item');
        } else if (!previousChat) {
            var metaContainer = $('<div class="title">');
            var timestamp = $('<div class="center-align meta-text">');
            timestamp.text(moment(chat.timestamp).calendar());
            metaContainer.append(timestamp);
            chatBox.addClass('chat-item');
        }

        chatBox.prepend(metaContainer);
        view.append(chatBox);
        $('#chat').scrollTop($('#chat').prop('scrollHeight'));
    }

    function drawChat(conversation) {
        var chat = conversation[conversation.length - 1];
        var previousChat;
        if (conversation.length > 1) {
            previousChat = conversation[conversation.length - 2];
        }
        var chatBox = $('<li class="collection-item avatar white-text teal lighten-3 chat-item">');
        var chatBoxText = $('<p class="left-align">');
        var img = $('<span class="circle center-align teal white-text valign-wrapper innitial">');
        img.text(chat.innitial);
        chatBoxText.text(chat.text);
        chatBox.append(img);
        chatBox.append(chatBoxText);

        if (!!previousChat && previousChat.user === chat.user && moment(chat.timestamp).diff(moment(previousChat.timestamp)) > 1000 * 60) {
            var metaContainer = $('<div class="title meta-text">');
            var timestamp = $('<div class="center-align">');
            timestamp.text(moment(chat.timestamp).calendar());
            metaContainer.append(timestamp);
            chatBox.addClass('chat-item');
        } else if (!!previousChat && previousChat.user != chat.user) {
            var metaContainer = $('<div class="title meta-text">');
            var timestamp = $('<div class="center-align">');
            timestamp.text(moment(chat.timestamp).calendar());
            metaContainer.append(timestamp);
            chatBox.addClass('chat-item');
        } else if (!previousChat) {
            var metaContainer = $('<div class="title meta-text">');
            var timestamp = $('<div class="center-align">');
            timestamp.text(moment(chat.timestamp).calendar());
            metaContainer.append(timestamp);
            chatBox.addClass('chat-item');
        }

        chatBox.prepend(metaContainer);
        view.append(chatBox);
        $('#chat').scrollTop($('#chat').prop('scrollHeight'));
    }

    $('#submitChat').click(function (event) {
        event.preventDefault();
        var text = $('#chatInput').val().trim();
        $('#chatInput').val('');
        var nameArray = USER.name.split(' ');
        database.ref('chats/' + TRIP).push({
            text: text,
            innitial: nameArray[0].charAt(0) + nameArray[1].charAt(0),
            user: USER.uid,
            photoURL: (USER.photoURl ? USER.photoURl : ''),
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    });

    $(document).on('click', '.tripRow', function(event){
        showChat();
    }.bind(this));

    function showChat() {
        database.ref('chats/' + TRIP).on('child_added', function (snapshot) {
            var sv = snapshot.val();
            chats.addChat(sv);
        });
    }

});