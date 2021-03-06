/*
 * ProtoPie Connect Bridge App Boilerplate code for Node.js
 * Author: Jeff Clarke
 *
 * Make sure to install dependencies with
 * 
 * 		npm install
 *
 * Then run this file with
 *
 *		npm start
 *
 */

const io = require("socket.io-client");

//------------- ProtoPie Connect configiration -------------

 // Modify this with the name of your Bridge App.
 // This is what will be displayed in ProtoPie connect
 // as the source of any messages sent from this app.
const PP_CONNECT_APP_NAME = "App name";

// This should work fine if you have this app and ProtoPie
// Connect running on the same computer with the default settings.
// Only modify this if you have ProtoPie Connect running on a
// different server or port. 
const PP_CONNECT_SERVER_ADDRESS = "http://localhost:9981";



// This establishes the connection to ProtoPie Connect via Socket.io
console.log( "[PP-CONNECT] Connecting to ProtoPie Connect on", PP_CONNECT_SERVER_ADDRESS );
const ppConnect = io(PP_CONNECT_SERVER_ADDRESS, {
  reconnectionAttempts: 5,
  timeout: 1000 * 10,
});

ppConnect
	.on( "connect", async () => {
		console.log( "[PP-CONNECT] Connected to ProtoPie Connect on", PP_CONNECT_SERVER_ADDRESS );
		ppConnect.emit("ppBridgeApp", { name: PP_CONNECT_APP_NAME });
		sendMessageToConnect( "PLUGIN_STARTED", PP_CONNECT_APP_NAME);

// =========> Successful connection to ProtoPie Connect. do app stuff here

	})
	.on( "ppMessage", (message) => {
		console.log('[PP-CONNECT] Received a message from ProtoPie Connect', message);

// =========> Handle incoming messages from ProtoPie Connect here

		/*

			switch (message.messageId) {
				case "FOO":
					console.log(message.value);
					break;
			}

		*/

	});

// Use this function to send messages to ProtoPie Connect
function sendMessageToConnect(messageId, value) {

    console.log(`[PP-CONNECT] Sending message '${messageId}:${value}' to ProtoPie Connect`);

    ppConnect.emit("ppMessage", {
      messageId,
      value
    });
}










//------------- ProtoPie Connect Socket.io connection error handling -------------

ppConnect
	.on( "connect_error", (err) => {
		console.error( "[PP-CONNECT] Connection error: ", err.toString() );
	})
	.on( "disconnect", (reason) => {
		console.log( "[PP-CONNECT] Disconnected from ProtoPie Connect: ", reason);
	});

ppConnect.io
	.on( "reconnect_attempt", (count) => {
		console.log( "[PP-CONNECT] Retry connection attempt ", count);
	})
	.on( "reconnect_failed", () => {
		console.error( `[PP-CONNECT] Connection to ProtoPie Connect failed. Is ProtoPie Connect running on ${PP_CONNECT_SERVER_ADDRESS} ?` );
	});

//------------- Handle exit -------------

function exit() {
	sendMessageToConnect( "PLUGIN_STOPPED", PP_CONNECT_APP_NAME);
  ppConnect.disconnect();
  process.exit();
}

process.on('SIGINT', exit);
process.on('SIGTERM', exit);
