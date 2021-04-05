import { Telegraf, Markup } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on("dice", (ctx) => {
	ctx.reply("Value: " + ctx.message.dice.value, {reply_to_message_id: ctx.message.message_id});
});

bot.on("message", async (ctx) => {
	ctx.replyWithDice({ emoji: "🎯"});
});

bot.launch();


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));