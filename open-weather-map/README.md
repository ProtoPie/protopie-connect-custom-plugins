# ProtoPie Connect Open Weather Map Plugin

ProtoPie Connect Plugin prividing current weather conditions

Author: 	Jeff Clarke
Version:	1.0
Date:		21-June-2022
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
with the value "Open Weather Map Plugin"

Log output can be viewed by clicking "Open in Terminal"



## Configuration

This plugin requires three parameters:
	- Latitude
	- Longitude
	- Open Weather Map API Key

Obtain your latitude and longitude from https://www.latlong.net/.

To obtain your Open Weather Map API Key:

1. Go to https://openweathermap.org/
2. Create an account
3. Your API Key will be emailed to you. Alternatively you can
	obtain your API key by clicking your name in the top right
	corner, and then click "My API Keys"

You will not need a paid account.  This plugin works off of the free One Call API 1.0.

You supply the above three requirements to the plugin through your Pie.
Send the following messages through the ProtoPie Studio channel:
* WEATHER_SET_LAT
* WEATHER_SET_LONG
* WEATHER_SET_API_KEY

For each of these supply the associated value by checking "Send value together." Remember
that the API key is a combinbation of letters and numbers, so it needs to be passed as text
in ProtoPie Studio, surrounded in double quotes.

e.g., 

CHANNEL:	ProtoPie Studio
MESSAGE:	WEATHER_SET_API_KEY
VALUE:		"a1b2c3d4e5f6g7h8i9j0"

Additionally there are a number of optional parameters you can set:

WEATHER_SET_UNITS
Possible values are
* "standard" (degrees Kelvin)
* "metric" (degrees Celsius)
* "imperial" (degrees Farenheit)
Defaults to "metric"

WEATHER_SET_LANG
Any language code supported by Open Weather Map.  Defaults to "en".
See https://openweathermap.org/api/one-call-api#multi

WEATHER_SET_TIME_FORMAT
A pattern for how sunrise and sunset times will be formatted.
Any formatting options supported by moment.js will work. See
https://momentjs.com/docs/#/displaying/format/

Defaults to "h:mm A" (e.g., 9:52 PM)



## Getting Weather Conditions

Once you have set theabove parameters, you can obtain weather conditions
by sending the message WEATHER_GET_CONDITIONS through the ProtoPie Studio
channel. The plugin will send back a number of messages:

* WEATHER_DESC - (Text) A short text description of the current conditions
* WEATHER_CURRENT_TEMP - (Number) The current temperature
* WEATHER_FEELS_LIKE_TEMP - (Number) The current "feels like" temperature
* WEATHER_HIGH_TEMP - (Number) The high temperature forecast for the day
* WEATHER_LOW_TEMP - (Number) The low temperature forecast for the day
* WEATHER_WIND_SPEED - (Number) Wind speed in mils/hour for imperial units, meters/second for standard and metric units.
* WEATHER_WIND_DEG - (Number) The direction of the wind. 0 for from the north
* WEATHER_WIND_COMPASS_DIR - (Text) The direction of the wind converted to the nearest compass ordinal (e.g., N, SSE, etc.)
* WEATHER_HUMIDITY - (Number) The percentage of humidity
* WEATHER_PRESSURE - (Number) Barometric pressure in hPa
* WEATHER_CLOUD_COVER - (Number) The percentage of cloud cover
* WEATHER_UV_INDEX - (Number) The current UV Index
* WEATHER_VISIBILITY - (Number) Visibility in metres
* WEATHER_DEW_POINT - (Number) Dew point temperature
* WEATHER_POP - (Number) Probability of preceiptation, as a percentage
* WEATHER_SUNRISE - (Text) Time of sunrise, formatted as per the WEATHER_SET_TIME_FORMAT parameter
* WEATHER_SUNSET - (Text) Time of sunset, formatted as per the WEATHER_SET_TIME_FORMAT parameter
* WEATHER_ICON - (Text) The name of the weather icon to display, one of the following:
	* clear-day
	* clear-night
	* partly-cloudy-day
	* partly-cloudy-night
	* cloudy
	* rain
	* thunderstorm
	* snow
	* fog

A set of icons in SVG format is included with this plugin.

Additionally, Connect will report the message WEATHER_ERROR in the event of a problem.


## Running the Demo Pie

1. Open Demo.pie in ProtoPie Studio.
2. Under the Start trigger, look for the Send response named  "Send WEATHER_SET_API_KEY"
3. Configure it with your API key, surrounded in double quotes (e.g., "a1b2c3d4e5f6g7h8i9j0")
4. The Pie is pre-configured with latitude and longitude values, but you can change them if you like
4. Save the Pie
5. Start ProtoPie Connect and start the Open Weather Map Plugin
6. Add Demo.pie to Connect and preview it
