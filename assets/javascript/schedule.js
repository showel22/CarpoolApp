$(document).ready(function(){
    
    var database = firebase.database();

    $('.datepicker').datepicker({
        defaultDate: new Date(),
        minDate: new Date(),
        yearRange: 1
    });

    $('.timepicker').timepicker();

    $('.modal').modal();

    $('.fixed-action-btn').floatingActionButton({
        direction: 'right',
        hoverEnabled: false
    });

    $(document).on('click', '.tripRow', function(event){
        var element = $(event.target).closest('tr')[0];
        var id = $(element).attr('data-id');
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

        if(seatNum === '' || startLocation === '' || leavingDate === '' || leavingTime === ''){
            return;
        }

        database.ref('/trips').push({
            driver: USER.uid,
            driverName: USER.name,
            seatNum: seatNum,
            startLocation: startLocation,
            departureDate: leavingDate,
            departureTime: leavingTime,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });

        $('#num_seats').val('');
        $('#startLocation').val('');
        $('#departDate').val('');
        $('#departTime').val('');

        var instance = M.Modal.getInstance(document.getElementById('scheduleForm'));
        instance.close();

    });
});