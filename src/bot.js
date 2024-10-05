const TelegramBot = require('node-telegram-bot-api');
const { token, channelId } = require('./config');
const { getVideos } = require('./database');

require('dotenv').config();

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, `Salom ${msg.from.first_name}, botdan foydalanish uchun kanalimga obuna bo'ling.`, {
        reply_markup: {
            inline_keyboard: [[{
                text: 'Obuna bo‘lish',
                url: `https://t.me/${channelId}`
            }], [{
                text: 'Kanalga obunani tekshirish',
                callback_data: 'check_subscription'
            }]]
        }
    });
});

bot.on('callback_query', async (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;

    if (callbackQuery.data === 'check_subscription') {
        try {
            const member = await bot.getChatMember(channelId, chatId);

            if (member.status === 'member' || member.status === 'administrator' || member.status === 'creator') {
                bot.sendMessage(chatId, 'Siz kanalga muvaffaqiyatli obuna bo‘ldingiz! Videolarni olish uchun quyidagi tugmani bosing:', {
                    reply_markup: {
                        inline_keyboard: [[{ text: 'Videolarni olish', callback_data: 'get_videos' }]]
                    }
                });
            } else {
                bot.sendMessage(chatId, 'Iltimos, avval kanalga obuna bo‘ling.');
            }
        } catch (err) {
            console.error(err);
            bot.sendMessage(chatId, 'Kanalga obuna bo‘lishni tekshirishda xatolik yuz berdi.');
        }
    }

    if (callbackQuery.data === 'get_videos') {
        const videos = getVideos();

        videos.forEach(video => {
            bot.sendMessage(chatId, `${video.title}: ${video.url}`);
        });
    }
});
