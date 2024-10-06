const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf('7243007965:AAEBnTOdZxJiBkOvYivYQ7oQIjfVAu2OI60');

const CHANNEL_ID = '@abduqoodiir';


// Botga "/start" buyrug'i yuborilganda
bot.start((ctx) => {
    ctx.reply(
        'Assalomu alekum, botga hush kelibsiz! Iltimos, kanalga obuna bo\'ling.',
        Markup.inlineKeyboard([
            [Markup.button.url('Obuna bo\'lish', 'https://t.me/abduqoodiir')],
            [Markup.button.callback('Tekshirish', 'check')]
        ]).resize()
    );
});

bot.action('check', async (ctx) => {
    const userId = ctx.from.id; 

    try {

        const chatMember = await ctx.telegram.getChatMember(CHANNEL_ID, userId);
        if (chatMember.status === 'member' || chatMember.status === 'administrator' || chatMember.status === 'creator') {
            ctx.reply('Siz kanalga obuna bo\'lgansiz! Iltimos, quyidagi tugmalardan birini tanlang:', {
                reply_markup: {
                    keyboard: [
                        [{ text: 'Darsliklarni Ko\'rish', callback_data: 'view_lessons' }],
                        [{ text: 'Kanalga O\'tish', url: 'https://t.me/abduqoodiir' }],
                        [{ text: 'Ilovani Yuklab Olish', callback_data: 'download_app' }]
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: false
                }
            });
        } else {
            ctx.reply('Iltimos, kanalga obuna bo\'ling.');
        }
    } catch (error) {
        ctx.reply('Xatolik yuz berdi. Iltimos, keyinroq yana urinib ko\'ring.');
    }
});

// Botni ishga tushirish
bot.launch().then(() => {
    console.log('Bot ishga tushdi');
}).catch((error) => {
    console.error('Botni ishga tushirishda xatolik:', error);
});