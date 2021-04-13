// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

const config = `
export const CLIENT_ID = "${process.env.TWITCH_CLIENT_ID}";
export const OAUTH_BASE_URL = "https://id.twitch.tv/oauth2";
export const CHANNELS_URL = "https://blyxxfr.github.io/terrier-channels/channels.json";
`;

fs.writeFileSync(path.join(__dirname, "src", "config.ts"), config);
