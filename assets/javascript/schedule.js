$(document).ready(function(){
    
    var database = firebase.database();

    $('.datepicker').datepicker();

    $('.timepicker').timepicker();

    $('.fixed-action-btn').floatingActionButton({
        direction: 'right',
        hoverEnabled: false
    });

    $('#openForm').click(function(event){
        var scheduleForm = $('#scheduleForm');

        if(scheduleForm.hasClass('scale-out')){
            scheduleForm.removeClass('hide');
            scheduleForm.removeClass('scale-out');
            scheduleForm.addClass('scale-in');
        }else{
            scheduleForm.addClass('hide');
            scheduleForm.removeClass('scale-in');
            scheduleForm.addClass('scale-out');
        }
    });

    $(document).on('click', '.tripRow', function(event){
        var id = $(this).attr('data-id');
        TRIP = id;
        CURRENT_PAGE.trip();
    }.bind(this));

    $('#backToSchedule').click(function(){
        TRIP = '';
        CURRENT_PAGE.schedule();
    });

    database.ref('/trips').on('child_added', function(snapshot){
        var sv = snapshot.val();

        var row = $('<tr>');
        var driver = $('<td>').text(sv.driverName);
        var seatsRemaining = $('<td>').text(sv.seatNum);
        var departureDate = $('<td>').text(sv.departureDate);
        var departureTime = $('<td>').text(sv.departureTime);
        var startLocation = $('<td>').text(sv.startLocation);
        row.attr('data-id', snapshot.key);
        row.addClass('tripRow');
        row.append(driver);
        row.append(seatsRemaining);
        row.append(departureDate);
        row.append(departureTime);
        row.append(startLocation);

        $('#scheduleBody').append(row);
    });

    $('#addTrip').click(function(event){
        event.preventDefault();

        var seatNum = $('#num_seats').val().trim();
        var startLocation = $('#startLocation').val().trim();
        var leavingDate = $('#departDate').val().trim();
        var leavingTime = $('#departTime').val().trim();

        database.ref('/trips').push({
            driver: USER.uid,
            driverName: USER.name,
            seatNum: seatNum,
            startLocation: startLocation,
            departureDate: leavingDate,
            departureTime: leavingTime,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });

        $('#num_seats').val().trim('');
        $('#startLocation').val().trim('');
        $('#departDate').val().trim('');
        $('#departTime').val().trim('');

    });

    

});