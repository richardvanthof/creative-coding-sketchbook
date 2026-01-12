# Puredata + P5
In this project Puredata is combined with a p5.js sketch using OSC.
## Requirements
- Node.js
- NPM/Yarn/etc...
- Puredata/Plugdata
## Get started
0. Open this folder in your terminal.
1. Run `cd p5 && npm install && npm run start`.
2. Open `localhost:8080` in your browser.
3. Open `pd/ambient.pd` to view the Puredata patch.

The patch will now start to send OSC data to the browser page to control the sketch animation.
> Tip: view browser console to review incomming OSC messages. 