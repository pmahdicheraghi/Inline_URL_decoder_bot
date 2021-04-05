import { Telegraf, Markup } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on('inline_query', async (ctx, next) => {

	let decoded_link = "Please wait ...";
	console.log(ctx.inlineQuery.query);
	if (ctx.inlineQuery.query) 
	{
		try {
			decoded_link = decodeURI(ctx.inlineQuery.query);
			console.log(decoded_link);
			ctx.answerInlineQuery([{
				type: 'article',
				id: 'someID',
				title: 'Result Found!',
				description: decoded_link,
				message_text: decoded_link
			}]).catch(err => console.log(err.response.description));

		} catch (e) {
			console.error(e);
			ctx.answerInlineQuery([{
				type: 'article',
				id: 'someID',
				title: 'Result Not Found!',
				description: 'URI malformed',
				message_text: 'URI malformed'
			}]).catch(err => console.log(err.response.description));
		}
	}
});

bot.on("dice", (ctx) => {
	ctx.reply("Value: " + ctx.message.dice.value, { reply_to_message_id: ctx.message.message_id });
});

// bot.on("message", async (ctx) => {
// 	ctx.replyWithDice({ emoji: "🎯" });
// });

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));