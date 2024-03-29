import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on('inline_query', async (ctx) => {
	let input_link = ctx.inlineQuery.query;
	if (!ctx.inlineQuery.query)
	{
		console.log("Empty query entered");
		return;
	}
	
	let decoded_link;
	if (ctx.inlineQuery.query.length >= 255)
	{
		for (let i = 255; i > 0; i--)
		{
			try
			{
				decoded_link = decodeURI(input_link);
				break;
			}
			catch (e)
			{
				input_link = input_link.slice(0, -1);
			}
		}
		ctx.answerInlineQuery([{
			type: 'article',
			id: 'someID',
			title: 'Buffer overflow!',
			description: "Input link must have upto 254 character\nTry to guess",
			message_text: decoded_link
		}]).catch(err => console.log(err.response.description));
		console.log("Buffer overflow occurred");
	}
	else
	{
		try
		{
			decoded_link = decodeURI(input_link);
			ctx.answerInlineQuery([{
				type: 'article',
				id: 'someID',
				title: 'Successfully Decoded!',
				description: "Result:\n" + decoded_link,
				message_text: decoded_link
			}]).catch(err => console.log(err.response.description));
			console.log("link successfully decoded");
		}
		catch (e)
		{
			console.error(e.message);
			ctx.answerInlineQuery([{
				type: 'article',
				id: 'someID',
				title: 'ERROR! Result Not Found!',
				description: 'Description:\nURI malformed',
				message_text: 'NO match found!'
			}]).catch(err => console.log(err.response.description));
		}
	}
});

// bot.on("dice", (ctx) => {
// 	ctx.reply("Value: " + ctx.message.dice.value, { reply_to_message_id: ctx.message.message_id });
// });

// bot.on("message", async (ctx) => {
// 	ctx.replyWithDice({ emoji: "🎯" });
// });

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));