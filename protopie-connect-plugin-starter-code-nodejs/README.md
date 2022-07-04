# ProtoPie Connect Plugin Starter Code for NodeJS

Everything you need to get started writing your own plugin for ProtoPie Connect.

```
Author: 	Jeff Clarke
Version:	1.0
Date:		4-July-2022
Copyright: 	Studio XID
```

**NOTE: A ProtoPie Enterprise subscription is required in order to use custom plugins with ProtoPie Connect.**

## First Run

This code is already set up to make the Socket.io connection to ProtoPie Connect. 

Run `npm install` to install the Socket.io library.

Start ProtoPie Connect and type `npm start` to launch the plugin.  You should see the message `"PLUGIN_STARTED"` appear in Connect's console with the value `"App name"`.

Press CTRL-C to stop the plugin, and you'll see the message `"PLUGIN_STOPPED"` in Connect's console.

## Customization

This code is intended to be a starting point for any plugin you will write.  As such, you'll want to do some basic modifications before you do anything else:

Modify the following properties in `package.json`:
* `name`
* `description`
* `author`

Modify line 22 in `plugin.js`:

* `const PP_CONNECT_APP_NAME = "App name";`

Change `"App name"` to whatever you'd like to call your plugin.

From here, add whatever dependencies and code you require to integrate with your product or service.

## Receiving Messages

Lines 48-63 handle incoming messages.  The incoming message object has three properties:

```
{
	messageId: <String>
	value: <String>
	time: <Time Value>
}
```

For example, if your Pie sends the message "HELLO" with the value "World", `messageId` would be `"HELLO"`, and `value` would be `"World"`. It is important to note that the `value` property is always passed as a String.  So if you're expecting a numeric value, make sure to convert it to a Number first before doing any arithmetic operations. 

## Sending Megasses

You can use the function `sendMessageToConnect` in your code to send messages to ProtoPie Connect as follows:

`sendMessageToConnect("HELLO", "From my most excellent Bridge App.");`

The first parameter you supply is the name of the message, and the second parameter is the value. The value parameter is optional.

## Compiling

Compiling is optional.  Your plugin will work just fine if your run `npm start` from the command line.  If you're the only person working with the plugin, compiling is an unneccesary step.  However if you'd like to share the plugin with others, compiling the plugin into a single file makes it easy for others to use it.

Modify `metadata.json` with the name of your plugin.  This name is what ProtoPie Connect will display in its plugin drop down menu. It's a good idea to use the same value you used for `PP_CONNECT_APP_NAME` in `plugin.js`.

```
{
	"name":"Your Plugin Name"
}
```

You can use a number of different tools to compile NodeJS code.  One of the most popular is `pkg`:
https://github.com/vercel/pkg

Install `pkg` via NodeJS as follows:

`npm install -g pkg`

You can compile NodeJS code for multiple operating systems in a single command.  Here is an example that compiles for Windows, macOS - Intel and macOS - Apple Silicon using NodeJS runtime version 16:

`pkg -t node16-win-x64,node16-macos-x64,node16-macos-arm64 plugin.js`

This command generates three files:

* plugin-win-x64.exe
* plugin-macos-x64
* plugin-macos-arm64

Lastly, make the macOS versions of the plugin executable with the following command:

`chmod +x plugin-macos*`

## Packaging for ProtoPie Connect

The ProtoPie Connect plugin format is a ZIP archive with two files in it:
* `plugin.exe` (Windows) / `plugin` (mac OS)
* `metadata.json`

This means you'll need to create separate ZIP files for each operating system you wish to deploy your plugin to.

* For Windows, rename `plugin-win-x64.exe` to `plugin.exe`.  Create a ZIP archive with `plugin.exe` and `metadata.json`.
* For Mac - Intel rename `plugin-macos-x64` to `plugin`. Create a ZIP archive with `plugin` and `metadata.json`.
* For Mac - Apple Silicon rename `plugin-macos-arm64` to `plugin`. Create a ZIP archive with `plugin` and `metadata.json`.

To use your plugin in ProtoPie Connect, choose "Plugin" from the top right corner. Then click "+" and browse to the appropriate ZIP archive for your OS.  Start the plugin by clicking "Run".  You can monitor your plugin's console output by clicking "Open in Terminal >". Stop the plugin by clicking "Stop".




