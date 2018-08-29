$(document).ready(function () {

    var database = firebase.database();

    $('.datepicker').datepicker({
        defaultDate: new Date(),
        minDate: new Date(),
        yearRange: 1
    });

    $('.sidenav').sidenav({
        edge: 'right',
        preventScrolling: true
    });

    $('.timepicker').timepicker();

    $('.modal').modal();

    $('.tooltipped').tooltip();

    $('.fixed-action-btn').floatingActionButton({
        direction: 'right',
        hoverEnabled: false
    });

    $(document).on('click', '.tripRow', function (event) {
        var element = $(event.target).closest('tr')[0];
        var id = $(element).attr('data-id');
        var driverId = $(element).attr('data-driver');
        TRIP = id;
        updateRiders(driverId);
        CURRENT_PAGE.trip();
    }.bind(this));

    $('#backToSchedule').click(function () {
        database.ref('/riders/' + TRIP).off();
        TRIP = '';
        CURRENT_PAGE.schedule();
    });

    $('#joinCarpool').click(function (event) {
        database.ref('/riders/' + TRIP).orderByChild('userId').equalTo(USER.uid).limitToFirst(1).once('value', function (snapshot) {
            var sv = snapshot.val();
            if (!sv) {
                database.ref('/riders/' + TRIP).push({
                    name: USER.name,
                    userId: USER.uid,
                    driver: false,
                    approved: false
                });

                database.ref('/trips/' + TRIP).once('value', function(snapshot){
                    var sv = snapshot.val();
                    updateRiders(sv.driver);
                });
            }
        });

    });

    $('#riders').on('click', '.approve', function (event) {
        var element = $(event.target);
        var rider = element.attr('data-rider');

        database.ref('/riders/' + TRIP + '/' + rider).update({
            approved: true
        });

        updateRiders(USER.uid);
    });

    database.ref('/trips').on('child_added', function (snapshot) {
        var sv = snapshot.val();

        var row = $('<tr>');
        var driver = $('<td>').text(sv.driverName);
        var seatsRemaining = $('<td>').text(sv.seatNum);
        var departureDate = $('<td>').text(sv.departureDate);
        var departureTime = $('<td>').text(sv.departureTime);
        var startLocation = $('<td>').text(sv.startLocation);
        row.attr('data-id', snapshot.key);
        row.attr('data-driver', sv.driver);
        row.addClass('tripRow');
        row.append(driver);
        row.append(seatsRemaining);
        row.append(departureDate);
        row.append(departureTime);
        row.append(startLocation);

        $('#scheduleBody').append(row);
    });

    $('#addTrip').click(function (event) {
        event.preventDefault();

        var seatNum = $('#num_seats').val().trim();
        var startLocation = $('#startLocation').val().trim();
        var leavingDate = $('#departDate').val().trim();
        var leavingTime = $('#departTime').val().trim();

        if (seatNum === '' || startLocation === '' || leavingDate === '' || leavingTime === '') {
            return;
        }

        var trip = database.ref('/trips').push({
            driver: USER.uid,
            driverName: USER.name,
            seatNum: seatNum,
            startLocation: startLocation,
            departureDate: leavingDate,
            departureTime: leavingTime,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        }).key;

        database.ref('/riders/' + trip).push({
            name: USER.name,
            userId: USER.uid,
            driver: true,
            approved: true
        });

        $('#num_seats').val('');
        $('#startLocation').val('');
        $('#departDate').val('');
        $('#departTime').val('');

        var instance = M.Modal.getInstance(document.getElementById('scheduleForm'));
        instance.close();

    });

    function updateRiders(driverId) {
        $('.rider').remove();

        database.ref('/riders/' + TRIP).once('value', function (snapshot) {
            var riders = snapshot.val();
            for (rider in riders) {
                var listItem = $('<li class="collection-item avatar rider">');
                if (riders[rider].driver) {
                    var icon = $('<i class="fa fa-car circle cyan">');
                } else {
                    var icon = $('<i class="fa fa-user circle teal">');
                }
                var name = $('<span class="title">');
                name.text(riders[rider].name);
                listItem.append(icon);
                listItem.append(name);
                if (!riders[rider].approved && driverId === USER.uid && !riders[rider].driver) {
                    var button = $('<button data-rider="' + rider + '" class="approve btn waves-effect waves-light green secondary-content">');
                    button.text('Approve');
                    listItem.append(button);
                } else if (riders[rider].driver) {
                    var state = $('<p class="secondary-content">');
                    state.text("Driver");
                    listItem.append(state);
                } else if (riders[rider].approved) {
                    var state = $('<p class="secondary-content">');
                    state.text("Approved by Driver");
                    listItem.append(state);
                } else {
                    var state = $('<p class="secondary-content">');
                    state.text("Waiting for Driver Approval");
                    listItem.append(state);
                }
                $('#riders').append(listItem);
            }
        });
    }

});