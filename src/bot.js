const TelegramBot = require('node-telegram-bot-api');
const { token, channelId } = require('./config');
const { getVideos } = require('./database');
require('dotenv').config();

// Botni ishga tushirish
const bot = new TelegramBot(token, { polling: true });

// Foydalanuvchi "start" komandasini yuborganda
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // Foydalanuvchiga salomlashish va obuna bo'lish talabini yuborish
    bot.sendMessage(chatId, `Salom ${msg.from.first_name}, botdan foydalanish uchun kanalimga obuna bo'ling.`, {
        reply_markup: {
            inline_keyboard: [[{
                text: 'Obuna bo‘lish',
                url: `https://t.me/${channelId}` // Kanalga obuna bo‘lish havolasi
            }]]
        }
    });
});

// Kanalga obuna bo'lganligini tekshirish uchun
bot.on('callback_query', async (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;

    try {
        // Foydalanuvchining kanalga obuna bo'lganligini tekshirish
        const member = await bot.getChatMember(channelId, chatId);

        if (member.status === 'member' || member.status === 'administrator' || member.status === 'creator') {
            // Agar obuna bo'lgan bo'lsa, "Videolarni olish" tugmasini yuborish
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
});

// Foydalanuvchi "Videolarni olish" tugmasini bosganda
bot.on('callback_query', (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;

    if (callbackQuery.data === 'get_videos') {
        const videos = getVideos();

        // Har bir videoni yuborish
        videos.forEach(video => {
            bot.sendMessage(chatId, `${video.title}: ${video.url}`);
        });
    }
});
