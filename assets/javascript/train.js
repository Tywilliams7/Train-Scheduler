// Initialize Firebase
var config = {
    apiKey: "AIzaSyDJKqvx5LEop_uC9v6jRQa-06UysA7cTFw",
    authDomain: "train-scheduler-7e77c.firebaseapp.com",
    databaseURL: "https://train-scheduler-7e77c.firebaseio.com",
    projectId: "train-scheduler-7e77c",
    storageBucket: "train-scheduler-7e77c.appspot.com",
    messagingSenderId: "375150491486"
};
firebase.initializeApp(config);

var database = firebase.database();
console.log(database)

$(document).ready(function () {





    $("#add-train").on("click", function (event) {
        // User Inputs
        event.preventDefault();
        var train = $("#train-name").val().trim();
        var destination = $("#train-destination").val().trim();
        var time = $("#train-time").val().trim();
        var frequency = $("#train-frequency").val().trim();

        //Send user inputs to database
        database.ref().push({
            name: train,
            destination: destination,
            arrival: time,
            frequency: frequency
        });

        //Clear input value
        $("#train-name").val("")
        $("#train-destination").val("")
        $("#train-time").val("")
        $("#train-frequency").val("")

    });


    database.ref().on("child_added", function (childSnapshot) {
    
        var name = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var arrival = childSnapshot.val().arrival;
        var frequency = childSnapshot.val().frequency;
        var startTime = moment(arrival, "HH:mm")
        console.log(startTime)
        var endTime = new Date()

        endTime = moment(endTime, "HH:mm")
        console.log(endTime)
        console.log(endTime.diff(startTime, "minutes"))
        console.log(childSnapshot);
        // Displaying to user
        var row = $("<tr>").append(
            $("<td>").text(name),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(moment(arrival, "HH:mm").format("hh:mm a")),
            $("<td>").text(minutes(arrival))
            // $("<td>").text(moment(arrival).fromNow("mm"))
            )
        $("#tbody").append(row)
    })
});
function minutes(arrival){
    if(moment() < moment(arrival, "HH:mm")) {
    
        // Since the arrival time is in the future put it first
        timeDiffInMinutes = moment(arrival, "HH:mm").diff(moment(), 'minutes');
    }
    
    else {
    
        // Since the current time is in the future put it first
        timeDiffInMinutes = moment().diff(moment(arrival, "HH:mm"), 'minutes');
    }
    return timeDiffInMinutes  
}

