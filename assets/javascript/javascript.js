


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBhbhIdjQP0dXfM9WOAqaQwm6iLA9GSVyk",
    authDomain: "in-class-demo-c4fd2.firebaseapp.com",
    databaseURL: "https://in-class-demo-c4fd2.firebaseio.com",
    projectId: "in-class-demo-c4fd2",
    storageBucket: "in-class-demo-c4fd2.appspot.com",
    messagingSenderId: "814591098078"
  };
  

 	firebase.initializeApp(config);

 	var database = firebase.database();
	var nameDisplay;
	var destDisplay;
	var freqDisplay;
	var startTimeDisplay;
	var convertedTime;


database.ref().on("child_added", function(snapshot){

	nameDisplay = snapshot.val().Name;
	destDisplay = snapshot.val().Destination;
	freqDisplay = snapshot.val().Frequency;
	startTimeDisplay = snapshot.val().StartTime;
	convertedTime = moment(startTimeDisplay, "HH:mm");
	var currentTime = moment();

	var input = $("<tr>");

	console.log(convertedTime);
	console.log(startTimeDisplay);
	console.log(currentTime);

	var firstTimeConverted = moment(startTimeDisplay, "HH:mm").subtract(1, "day");

	var minutes = currentTime.diff(firstTimeConverted, "minutes");


	var minutesAway = freqDisplay - (minutes % freqDisplay);

	
	var arrival = moment().add(minutesAway, "minutes");



	var temp = input.append("<td>" + nameDisplay + "</td>");
	input.append("<td>" + destDisplay + "</td>");
	input.append("<td>" + startTimeDisplay + "</td>");
	input.append("<td>" + freqDisplay + "</td>");
	input.append("<td>" + moment(arrival).format("HH:mm") + "</td>");
	input.append("<td>" + minutesAway + "</td>");
	


	$("#tableContent").append(temp);
	}) 	


	$("#submit").on("click", function(event){
	event.preventDefault();

	var name = $("#trainName").val().trim();
	var dest = $("#trainDest").val().trim();
	var startTime = $("#trainStartTime").val().trim();
	var frequency = $("#trainFrequency").val().trim();

	database.ref().push({

		Name: name,
		Destination: dest,
		StartTime: startTime,
		Frequency: frequency

	});


	$(".boxes").val("");


});

