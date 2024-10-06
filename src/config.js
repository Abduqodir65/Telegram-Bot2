// src/config.js
require('dotenv').config();

module.exports = {
    botToken: process.env.BOT_TOKEN,
    channelId: process.env.CHANNEL_ID,
};