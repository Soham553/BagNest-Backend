import {google} from "googleapis";


const oauth2Client = new google.auth.OAuth2(
    process.env.CLINET_ID,
    process.env.CLINET_SECRET,
    process.env.CALLBACK_URL
)

console.log("this is inside auth:", process.env.CALLBACK_URL);
console.log("This is refresh token: ", process.env.REFRESH_TOKEN);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
})

export const auth = oauth2Client;