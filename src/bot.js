const TelegramBot = require("node-telegram-bot-api");
const { token, channelId } = require("./config");
const { getVideos } = require("./database");

require("dotenv").config();

const bot = new TelegramBot(token, { polling: true });

// Foydalanuvchini kutib olish
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, `Salom ${msg.from.first_name}! Botdan foydalanish uchun quyidagi tugmalardan foydalaning:`, {
        reply_markup: {
            keyboard: [
                [
                    { text: "Kanalga o'tish" },
                    { text: "Videolarni ko‘rish" }
                ]
            ],
            resize_keyboard: true,
            one_time_keyboard: false
        }
    });
});

// Tugmachalarga javob berish
bot.on("message", (msg) => {
    const chatId = msg.chat.id;

    // Kanalga o'tish tugmasi
    if (msg.text === "Kanalga o'tish") {
        bot.sendMessage(chatId, "Siz kanalga o'tasiz...", {
            reply_markup: {
                inline_keyboard: [[
                    { text: "Kanalga o'tish", url: `https://t.me/${channelId}` }
                ]]
            }
        });
    }

    // Videolarni ko'rish tugmasi
    if (msg.text === "Videolarni ko‘rish") {
        const videos = getVideos();

        // Tugmalarni ikki qator qilib ajratamiz
        const videoButtons = videos.map(video => {
            return [{ text: video.title }];
        });

        // Orqaga tugmasi
        videoButtons.push([{ text: "Orqaga", resize_keyboard: true, one_time_keyboard: false }]);

        bot.sendMessage(chatId, "Videolar ro'yxati:", {
            reply_markup: {
                keyboard: videoButtons,
                resize_keyboard: true,
                one_time_keyboard: false
            }
        });
    }

    // Orqaga tugmasi
    if (msg.text === "Orqaga") {
        bot.sendMessage(chatId, `Salom ${msg.from.first_name}! Botdan foydalanish uchun quyidagi tugmalardan foydalaning:`, {
            reply_markup: {
                keyboard: [
                    [
                        { text: "Kanalga o'tish" },
                        { text: "Videolarni ko‘rish" }
                    ]
                ],
                resize_keyboard: true,
                one_time_keyboard: false
            }
        });
    }
});
