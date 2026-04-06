import {google} from "googleapis";

console.log("Client Id: ", process.env.CLINET_ID);
console.log("Clinet secret: ", process.env.CLINET_SECRET);
console.log("Call back url: ", process.env.REFRESH_TOKEN);

const oauth2Client = new google.auth.OAuth2(
    process.env.CLINET_ID,
    process.env.CLINET_SECRET,
    process.env.CALLBACK_URL
)


oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
})

export const auth = oauth2Client;