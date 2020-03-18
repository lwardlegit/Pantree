var express = require("express");
const path = require('path');
const creds = require('./client_secret');
const app = express()
const port = 5000;

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const sheets = google.sheets('v4');

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// Serve the static files from the React app
//app.use(express.static(path.join(__dirname, 'client/src')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';


// Load client secrets from a local file.
fs.readFile('client_secret.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), grabSheetData);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials) {
  return new Promise(resolve => {  // Added
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(oAuth2Client, e => resolve(e));  // Modified
      oAuth2Client.setCredentials(JSON.parse(token));
      resolve(oAuth2Client);  // Modified
    });
  });
}


async function grabSheetData () {
  var data = {
    payload: ''
  }
  const authClient = await authorize(creds);  // Modified
  const request = {
    spreadsheetId: '1VTiTgPvMvLlOVBhBfoMGrshfMMJJMMzoA6GesheWMPg', 
    range: 'A1:C',
    valueRenderOption: "FORMATTED_VALUE",  // Modified
    dateTimeRenderOption: "SERIAL_NUMBER",  // Modified 
    auth: authClient, //this should be my token???
  }

  try {
    const response = (await sheets.spreadsheets.values.get(request)).data;
    // TODO: Change code below to process the `response` object:
    console.log(JSON.stringify(response, null, 2));
    data.payload=response
  } catch (err) {
    console.error(err);
  }
  return data
};


/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}



/* SHEET GET */
app.get('/api/sheetData', async (req,res) =>{
  const sheetData = await grabSheetData()
  res.json(sheetData)
})

/* SHEET UPDATE */
app.post('/api/updateSheet', (req,res)=>{
    updateSheet(req.body);
    console.log(req.body)
});