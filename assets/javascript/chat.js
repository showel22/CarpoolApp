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
        var chatBox = $('<li class="card-panel white-text blue">');
        var chatRow = $('<div class="row chat-row">');
        var chatBoxText = $('<p class="chat-text right-align col s12">');
        chatBoxText.text(chat.text);
        chatRow.append(chatBoxText);
        chatBox.append(chatRow);
        chatBox.addClass('space');

        if (!!previousChat && previousChat.user === chat.user && moment(chat.timestamp).diff(moment(previousChat.timestamp)) > 1000 * 60) {
            var metaContainer = $('<div class="title">');
            var timestamp = $('<div class="center-align meta-text">');
            timestamp.text(moment(chat.timestamp).calendar());
            metaContainer.append(timestamp);
            chatBox.addClass('chat-item');
            chatBox.removeClass('space');
        } else if (!!previousChat && previousChat.user != chat.user) {
            var metaContainer = $('<div class="title">');
            var timestamp = $('<div class="center-align meta-text">');
            timestamp.text(moment(chat.timestamp).calendar());
            metaContainer.append(timestamp);
            chatBox.addClass('chat-item');
            chatBox.removeClass('space');
        } else if (!previousChat) {
            var metaContainer = $('<div class="title">');
            var timestamp = $('<div class="center-align meta-text">');
            timestamp.text(moment(chat.timestamp).calendar());
            metaContainer.append(timestamp);
            chatBox.addClass('chat-item');
            chatBox.removeClass('space');
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
        var chatBox = $('<li class="card-panel avatar white-text deep-orange chat-item">');
        var row = $('<div class="row chat-row">');
        var chatBoxText = $('<p class="chat-text left-align col s9">');
        var imgContainer = $('<div class="col s3">');
        var img = $('<div class="userInit circle center-align deep-orange accent-4 white-text innitial">');
        img.text(chat.innitial);
        chatBoxText.text(chat.text);
        imgContainer.append(img);
        row.append(imgContainer);
        row.append(chatBoxText);
        chatBox.append(row);

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

        database.ref('/trips/' + TRIP).once('value', function (snapshot) {
            var sv = snapshot.val();
            if (sv.driver != USER.uid) {
                database.ref('/notifications/' + sv.driver).push({
                    text: USER.name + " commented on your trip.",
                    trip: TRIP
                });
            }
        });
    });

    $(document).on('click', '.tripRow', function (event) {
        database.ref('chats/' + TRIP).off();
        view.empty();
        showChat();
    }.bind(this));

    function showChat() {
        database.ref('chats/' + TRIP).on('child_added', function (snapshot) {
            var sv = snapshot.val();
            chats.addChat(sv);
        });
    }

});