# denon-rest-api

## Summary
This application creates a REST API that can be used to send commands to a Denon AV receiver over
a network connection. This was tested with my Denon AVR-E300, but should be compatible with other
Denon network-attached receivers.

## How to use
1) Install Node (http://nodejs.org) and execute `npm install` in the root directory of this project.
2) Run `node server.js [ip address of receiver]` to launch the web server. 
3) Send GET commands to http://localhost:8000/api/[command]

## Notes
- Port 8000 is the default port, but can be changed in code. 
- The full list of valid commands is available in the included protocol PDF from Denon.
- You may need to adjust settings on your receiver to allow remote network control of your device.
- This application communicates with the receiver via the factory-provided telnet API.

## Examples
``` Javascript
'http://localhost:8000/api/SIDVD'     //Sets Input to DVD   
'http://localhost:8000/api/SITUNER'   //Sets Input to TUNER   
'http://localhost:8000/api/PWON'      //turns PoWer ON   
```