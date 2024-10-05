require('dotenv').config();

module.exports = {
    token: process.env.TELEGRAM_TOKEN,
    channelId: process.env.CHANNEL_ID,
};
