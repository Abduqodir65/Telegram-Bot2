const TelegramBot = require('node-telegram-bot-api');
const { token, channelId } = require('./config');
const { getVideos } = require('./database');

require('dotenv').config();

const bot = new TelegramBot(token, { polling: true });

// Funktsiya: foydalanuvchini kanalga obuna bo'lishga chaqirish
const greetUser = (chatId, firstName) => {
    bot.sendMessage(chatId, `Salom ${firstName}, botdan foydalanish uchun kanalimga obuna bo'ling.`, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'Obuna bo‘lish',
                    url: `https://t.me/${channelId}`
                }],
                [{
                    text: 'Kanalga obunani tekshirish',
                    callback_data: 'check_subscription'
                }]
            ]
        }
    });
};

// Funktsiya: obuna holatini tekshirish
const checkSubscription = async (chatId) => {
    try {
        const member = await bot.getChatMember(channelId, chatId);
        return member.status === 'member' || member.status === 'administrator' || member.status === 'creator';
    } catch (error) {
        console.error(error);
        return false; // Agar xato bo'lsa, obuna holatini bilmaslik
    }
};

// Funktsiya: videolarni jo'natish
const sendVideos = (chatId) => {
    const videos = getVideos();
    if (videos.length === 0) {
        bot.sendMessage(chatId, "Hozirda videolar mavjud emas.");
        return;
    }
    
    videos.forEach(video => {
        bot.sendMessage(chatId, `${video.title}: ${video.url}`);
    });
};

// Bot harakatlari
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    greetUser(chatId, msg.from.first_name);
});

bot.on('callback_query', async (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;

    if (callbackQuery.data === 'check_subscription') {
        const isSubscribed = await checkSubscription(chatId);
        if (isSubscribed) {
            bot.sendMessage(chatId, 'Siz kanalga muvaffaqiyatli obuna bo‘ldingiz! Videolarni olish uchun quyidagi tugmani bosing:', {
                reply_markup: {
                    inline_keyboard: [[{ text: 'Videolarni olish', callback_data: 'get_videos' }]]
                }
            });
        } else {
            bot.sendMessage(chatId, 'Iltimos, avval kanalga obuna bo‘ling.');
        }
    }

    if (callbackQuery.data === 'get_videos') {
        sendVideos(chatId);
    }
});
