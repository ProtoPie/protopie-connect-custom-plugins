# Date & Time Plugin for Protopie Connect

Author: 	Jeff Clarke
Version: 	1.0
Date: 		14-June-2022
Copyright: 	Studio XID


## Installation

REQUIRED: You must subscribe to the Enterprise Plan. If you
are using the Pro Plan, Connect won't have the option to
install a custom plugin.

Add the plugin for your OS to ProtoPie Connect:

1. Click "Plugin" in the top-right corner
2. Click "+"
3. Browse to the plugin ZIP file for your OS and select it
4. Click "Run" to start the plugin

ProtoPie Connect should reflect the message PLUGIN_STARTED
with the value "Date & Time Plugin"

Log output can be viewed by clicking "Open in Terminal"




## Usage in Pie File

Use Send & Receive in your Pie as follows:

To get the system time, send the message "GET_TIME".  The plugin will respond
with the message "TIME".

Send:
	Channel:	ProtoPie Studio
	Message: 	GET_TIME
	Value: 		(optional) formatting string -- see SPECIFYING A CUSTOM FORMAT below

Receive:
	Channel: 	ProtoPie Studio
	Message: 	TIME
	Value: 		formatted time
				(defaults to "h:mm A", e.g. 5:56 PM)


To get the system date, send the message "GET_DATE".  The plugin will respond
with the message "DATE".

Send:
	Channel: 	ProtoPie Studio
	Message: 	GET_DATE
	Value: 		(optional) formatting string -- see SPECIFYING A CUSTOM FORMAT below

Receive:
	Channel: 	ProtoPie Studio
	Message: 	DATE
	Value: 		formatted date
				(defaults to "dddd MMMM D", e.g. Tuesday October 14)




## Specifying a Custom Format

It is possible to override the default formatting for each of
the above messages by specifying the desired form as the value
supplied with the message you send.

For example, if you send the message GET_TIME with the value "HH:mm"
the plugin will respond with the message TIME along with the time
formatted as 24-hour time
	e.g., 17:56

This plugin makes use of the Moment.js library and accepts any
formatting string as outlined here:

https://momentjs.com/docs/#/displaying/format/


