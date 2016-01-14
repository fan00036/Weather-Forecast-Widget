//Pretend that this is somewhere else on another server
var requiredFileCount = 2,
	currentFileCount = 0;

var buildWidget = function () {
	//var tL = "strong"
		//$('.widget').append('<li src="'+data.hourly.data[]+'"/>');
	//var title = '<table style="width: 100%">'


	
	$(".weather-forecast").append('<p>Algonquin Weather Widget</p>');
	
	$.ajax({
		url: "https://api.forecast.io/forecast/5195f9219d2b8c2712b93c08dc0d2b83/45.348391,-75.757045",
		type: "get",
		dataType: "jsonp",
		crossDomain: true,
		data: "units=ca",
		xhrFields: {
			withCredentials: true
		}
	}).done(gotData).fail(whoops);
}

function gotData(data) {

	//this runs when the ajax call works
	console.log("success");
var table = '<table>';
	
console.log(data.daily.summary);
	var dailySummary = data.daily.summary;
	
	var dailyDate=new Date(data.daily.data[0].time*1000);
	console.log(dailyDate.getDate());
	console.log(dailyDate.getMonth());
	console.log(dailyDate.getFullYear());
	table += '<tr class="first">'
    table += '<td>Date:  ' + dailyDate.getDate() +"/"+ (parseInt(dailyDate.getMonth())+1)+"/"+dailyDate.getFullYear()+'</td>'
	table += '<td colspan="6">' + dailySummary + '</td>'
	table += '</tr>'	
	
	
	
	table += '<tr>'
	table += '<th><strong>Time</strong></th>'
	table += '<th><strong>Humidity(%)</strong></th>'
	table += '<th><strong>Cloud Cover(%)</strong></th>'
	table += '<th><strong>Temperature</strong></th>'
	table += '<th><strong>Wind Speed</strong></th>'
	table += '<th><strong>Weather Icon</strong></th>'
	table += '<th><strong>Summary</strong></th>'
	table += '</tr>'
	
	
	
	for (i = 0; i <= 23; i++) {
		console.log(data.hourly.data[i]);
		console.log(data.hourly.data[i].summary);
	    console.log(data.hourly.data[i].time);
		console.log(data.hourly.data[i].humidity);
		console.log(data.hourly.data[i].cloudCover);
		console.log(data.hourly.data[i].temperature);
		console.log(data.hourly.data[i].windSpeed);
		
		
		var summary = data.hourly.data[i].summary;
		var date = new Date(data.hourly.data[i].time*1000);
		date.getHours();
		console.log(date);
		var Time = date.getHours()+":00"
		var humidity = data.hourly.data[i].humidity;
		var cloud = data.hourly.data[i].cloudCover;
		var temperature = data.hourly.data[i].temperature;
		var wind = data.hourly.data[i].windSpeed;
		
		table += '<tr class="second" >'
		table += '<td><strong>'+Time+'</strong></td>'
		table += '<td>' + humidity + ' %</td>'
		table += '<td>'+ cloud+ ' %</td>'
		table += '<td>'+ temperature +' °C</td>'
		table += '<td>'+ wind +' kph</td>'
		table += '<td class="'+data.hourly.data[i].icon+'"></td>'
		table += '<td>' + summary + '</td>'
		table += '</tr>'
		
		
	}
	table += '</table>';
	$(".weather-forecast").append(table);
}

function whoops(jqXHR, textStatus, errorThrown) {
	//this runs if the ajax call fails
	console.log("fail", textStatus);
	console.log("fail", errorThrown.message);
	console.log(jqXHR.responseText);
}



var loadCount = function () {
	currentFileCount++;
	//var w = document.querySelector(".weather-forecast");
	//w.innerHTML = "<p>Loaded " + currentFileCount + " files.</p>";

	if (currentFileCount === requiredFileCount) {
		//we now have all our files
		//wait two seconds then run the build widget
		//the waiting is ONLY for demo purposes... not needed
		//setTimeout(buildWidget, 2000);
		console.log("css and jquery loaded");
		buildWidget();
	}
}

document.addEventListener("DOMContentLoaded", function () {
	//using an anonymous function to avoid conflicts
	var css = document.createElement("link");
	document.querySelector("head").appendChild(css);
	css.addEventListener("load", loadCount);
	css.setAttribute("rel", "stylesheet");
	css.setAttribute("href", "css/widget.css");


	var s = document.createElement("script");
	document.querySelector("head").appendChild(s);
	s.addEventListener("load", loadCount);
	s.setAttribute("src", "http://code.jquery.com/jquery-2.1.0.min.js");


	//css.setAttribute("href", "http://faculty.edumedia.ca/griffis/mad9014/ajax-demo/widget.css");
	//s.setAttribute("src", "http://code.jquery.com/jquery-2.1.0.min.js");

	//wait one second then load the css file
	//setTimeout(function () {

	//}, 1000);

	//wait 2 seconds then load the script
	//setTimeout(function () {
	
	//}, 2000);

});