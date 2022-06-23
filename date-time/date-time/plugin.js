/*
 * ProtoPie Connect Plugin For Date & Time
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
const moment = require("moment");

//------------- ProtoPie Connect configiration -------------

 // Modify this with the name of your Bridge App.
 // This is what will be displayed in ProtoPie connect
 // as the source of any messages sent from this app.
const PP_CONNECT_APP_NAME = "Date & Time Plugin";

// This should work fine if you have this app and ProtoPie
// Connect running on the same computer with the default settings.
// Only modify this if you have ProtoPie Connect running on a
// different server or port. 
const PP_CONNECT_SERVER_ADDRESS = "http://localhost:9981";



// This establishes the connection to ProtoPie Connect via Socket.io
console.log( "[DATE-TIME] Connecting to ProtoPie Connect on", PP_CONNECT_SERVER_ADDRESS );
const ppConnect = io(PP_CONNECT_SERVER_ADDRESS, {
  reconnectionAttempts: 5,
  timeout: 1000 * 10,
});

ppConnect
	.on( "connect", async () => {
		console.log( "[DATE-TIME] Connected to ProtoPie Connect on", PP_CONNECT_SERVER_ADDRESS );
		ppConnect.emit("ppBridgeApp", { name: PP_CONNECT_APP_NAME });
		sendMessageToConnect( "PLUGIN_STARTED", PP_CONNECT_APP_NAME);
	})
	.on( "ppMessage", (message) => {
		console.log('[DATE-TIME] Received a message from ProtoPie Connect', message);

// =========> Handle incoming messages from ProtoPie Connect here


			switch (message.messageId) {
				case "GET_TIME":
					if (message.value) {
						console.log("[DATE-TIME] Formatting time with custom format:", message.value);
						sendMessageToConnect( "TIME", moment().format(message.value));
					} else {
						console.log("[DATE-TIME] Formatting time with default format.");
						sendMessageToConnect( "TIME", moment().format("h:mm A"));
					}
					break;
				case "GET_DATE":
					if (message.value) {
						console.log("[DATE-TIME] Formatting date with custom format:", message.value);
						sendMessageToConnect( "DATE", moment().format(message.value));
					} else {
						console.log("[DATE-TIME] Formatting date with default format.");
						sendMessageToConnect( "DATE", moment().format("dddd MMMM D"));
					}
					break;
			}


	});


// Use this function to send messages to ProtoPie Connect
function sendMessageToConnect(messageId, value) {

    console.log(`[DATE-TIME] Sending message '${messageId}:${value}' to ProtoPie Connect`);

    ppConnect.emit("ppMessage", {
      messageId,
      value
    });
}










//------------- ProtoPie Connect Socket.io connection error handling -------------

ppConnect
	.on( "connect_error", (err) => {
		console.error( "[DATE-TIME] Connection error: ", err.toString() );
	})
	.on( "disconnect", (reason) => {
		console.log( "[DATE-TIME] Disconnected from ProtoPie Connect: ", reason);
	});

ppConnect.io
	.on( "reconnect_attempt", (count) => {
		console.log( "[DATE-TIME] Retry connection attempt ", count);
	})
	.on( "reconnect_failed", () => {
		console.error( `[DATE-TIME] Connection to ProtoPie Connect failed. Is ProtoPie Connect running on ${PP_CONNECT_SERVER_ADDRESS} ?` );
	});

//------------- Handle exit -------------

function exit(signal) {
	sendMessageToConnect( "PLUGIN_STOPPED", PP_CONNECT_APP_NAME);
  ppConnect.disconnect();
  process.exit();
}

process.on('SIGINT', exit);
process.on('SIGTERM', exit);
