/*
 * ProtoPie Connect Plugin for Current Weather Conditions
 * Author: Jeff Clarke
 *
 * 		Install dependencies with 
 *			npm install
 *
 *		Start the app with
 *			npm start
 *
 */

const io = require("socket.io-client");
const axios = require("axios");
const moment = require("moment");

let LAT;
let LONG;
let API_KEY;
let UNITS = "metric";
let LANG = "en";
let TIME_FORMAT = "h:mm A";


//------------- ProtoPie Connect configiration -------------

 // Modify this with the name of your Bridge App.
 // This is what will be displayed in ProtoPie connect
 // as the source of any messages sent from this app.
const PP_CONNECT_APP_NAME = "Open Weather Map Plugin";

// This should work fine if you have this app and ProtoPie
// Connect running on the same computer with the default settings.
// Only modify this if you have ProtoPie Connect running on a
// different server or port. 
const PP_CONNECT_SERVER_ADDRESS = "http://localhost:9981";



// This establishes the connection to ProtoPie Connect via Socket.io
console.log( "[OPEN-WEATHER] Connecting to ProtoPie Connect on", PP_CONNECT_SERVER_ADDRESS );
const ppConnect = io(PP_CONNECT_SERVER_ADDRESS, {
  reconnectionAttempts: 5,
  timeout: 1000 * 10,
});

ppConnect
	.on( "connect", async () => {
		console.log( "[OPEN-WEATHER] Connected to ProtoPie Connect on", PP_CONNECT_SERVER_ADDRESS );
		ppConnect.emit("ppBridgeApp", { name: PP_CONNECT_APP_NAME });
		sendMessageToConnect( "PLUGIN_STARTED", PP_CONNECT_APP_NAME);
	})
	.on( "ppMessage", (message) => {
		console.log('[OPEN-WEATHER] Received a message from ProtoPie Connect', message);

// =========> Handle incoming messages from ProtoPie Connect here


			switch (message.messageId) {
				case "WEATHER_SET_LAT":
					LAT = message.value;
					break;
				case "WEATHER_SET_LONG":
					LONG = message.value;
					break;
				case "WEATHER_SET_API_KEY":
					API_KEY = message.value;
					break;
				case "WEATHER_SET_UNITS":
					UNITS = message.value;
					break;
				case "WEATHER_SET_LANG":
					LANG = message.value;
					break;
				case "WEATHER_SET_TIME_FORMAT":
					TIME_FORMAT = message.value;
					break;
				case "WEATHER_GET_CONDITIONS":

					//Check for required parameters
					if (LAT == null) {
						console.log("[OPEN-WEATHER] Missing latitude parameter. Remember to send WEATHER_SET_LAT from your Pie before sending WEATHER_GET_CONDITIONS.");
						sendMessageToConnect( "WEATHER_ERROR", "Missing latitude.  See README.");
					} 
					if (LONG == null) {
						console.log("[OPEN-WEATHER] Missing longitude parameter. Remember to send WEATHER_SET_LONG from your Pie before sending WEATHER_GET_CONDITIONS.");
						sendMessageToConnect( "WEATHER_ERROR", "Missing longitude.  See README.");
					} 
					if (API_KEY == null) {
						console.log("[OPEN-WEATHER] Missing API key parameter. Remember to send WEATHER_SET_API_KEY from your Pie before sending WEATHER_GET_CONDITIONS.");
						sendMessageToConnect( "WEATHER_ERROR", "Missing API key.  See README.");
					} 
					if (LAT == null || LONG == null || API_KEY == null) {
						return;
					} 

					axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${LAT}&lon=${LONG}&appid=${API_KEY}&units=${UNITS}&lang=${LANG}&exclude=minutely,hourly,alerts`)
						.then( (response) => {


							sendMessageToConnect( "WEATHER_DESC", formatAsSentence(response.data.current.weather[0].description));
							sendMessageToConnect( "WEATHER_ICON", ICON_MAP[response.data.current.weather[0].icon]);

							sendMessageToConnect( "WEATHER_CURRENT_TEMP", response.data.current.temp);
							sendMessageToConnect( "WEATHER_FEELS_LIKE_TEMP", response.data.current.feels_like);
							sendMessageToConnect( "WEATHER_HIGH_TEMP", response.data.daily[0].temp.max);
							sendMessageToConnect( "WEATHER_LOW_TEMP", response.data.daily[0].temp.min);

							sendMessageToConnect( "WEATHER_WIND_SPEED", response.data.current.wind_speed);
							sendMessageToConnect( "WEATHER_WIND_DEG", response.data.current.wind_deg);
							sendMessageToConnect( "WEATHER_WIND_COMPASS_DIR", getOrdinal(response.data.current.wind_deg));

							sendMessageToConnect( "WEATHER_HUMIDITY", response.data.current.humidity);
							sendMessageToConnect( "WEATHER_PRESSURE", response.data.current.pressure);
							sendMessageToConnect( "WEATHER_CLOUD_COVER", response.data.current.clouds);
							sendMessageToConnect( "WEATHER_UV_INDEX", response.data.current.uvi);
							sendMessageToConnect( "WEATHER_VISIBILITY", response.data.current.visibility);
							sendMessageToConnect( "WEATHER_DEW_POINT", response.data.current.dew_point);
							sendMessageToConnect( "WEATHER_POP", Number(response.data.daily[0].pop) * 100);

							sendMessageToConnect( "WEATHER_SUNRISE", moment.unix(response.data.current.sunrise).format(TIME_FORMAT));
							sendMessageToConnect( "WEATHER_SUNSET",  moment.unix(response.data.current.sunset).format(TIME_FORMAT));

						})
						.catch( (error) => {
							console.log("[OPEN-WEATHER] Error:", error.response.data.message);
							sendMessageToConnect( "WEATHER_ERROR", "See log for details.");
						});

					break;
			}


	});


// Use this function to send messages to ProtoPie Connect
function sendMessageToConnect(messageId, value) {

    // console.log(`[OPEN-WEATHER] Sending message '${messageId}:${value}' to ProtoPie Connect`);

    ppConnect.emit("ppMessage", {
      messageId,
      value
    });
}

//------------- Utility functions -------------


//return compass direction from wind direction
const ORDINALS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
function getOrdinal(bearing) {
  return ORDINALS[Math.round(bearing * 16 / 360) % 16];
}

function formatAsSentence(s) {
	//captialize first letter.
	s = s.charAt(0).toUpperCase() + s.slice(1);

	//Add period on end if there isn't one
	if (s[s.length - 1] != '.') {
		return s + '.';
	} else {
		return s;
	}
}

const ICON_MAP = {
  "01d" : "clear-day",
  "01n" : "clear-night",
  "02d" : "partly-cloudy-day",
  "02n" : "partly-cloudy-night",
  "03d" : "cloudy",
  "03n" : "cloudy",
  "04d" : "cloudy",
  "04n" : "cloudy",
  "09d" : "rain",
  "09n" : "rain",
  "10d" : "rain",
  "10n" : "rain",
  "11d" : "thunderstorm",
  "11n" : "thunderstorm",
  "13d" : "snow",
  "13n" : "snow",
  "50d" : "fog",
  "50n" : "fog"
};	



//------------- ProtoPie Connect Socket.io connection error handling -------------

ppConnect
	.on( "connect_error", (err) => {
		console.error( "[OPEN-WEATHER] Connection error: ", err.toString() );
	})
	.on( "disconnect", (reason) => {
		console.log( "[OPEN-WEATHER] Disconnected from ProtoPie Connect: ", reason);
	});

ppConnect.io
	.on( "reconnect_attempt", (count) => {
		console.log( "[OPEN-WEATHER] Retry connection attempt ", count);
	})
	.on( "reconnect_failed", () => {
		console.error( `[OPEN-WEATHER] Connection to ProtoPie Connect failed. Is ProtoPie Connect running on ${PP_CONNECT_SERVER_ADDRESS} ?` );
	});

//------------- Handle exit -------------

function exit(signal) {
	sendMessageToConnect( "PLUGIN_STOPPED", PP_CONNECT_APP_NAME);
  ppConnect.disconnect();
  process.exit();
}

process.on('SIGINT', exit);
process.on('SIGTERM', exit);


