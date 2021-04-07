import {Telegraf} from 'telegraf'

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.on('inline_query', async (ctx) => {
	let link = ctx.inlineQuery.query
	
	if (ctx.inlineQuery.query) {
		if (ctx.inlineQuery.query.length >= 255) {
			while (true) {
				try {
					link = decodeURI(link)
					break
				} catch (e) {
					link = link.slice(0, -1)
				}
			}
			ctx.answerInlineQuery([{
				type: 'article',
				id: 'someID',
				title: 'Buffer overflow!',
				description: 'Input link must have upto 254 character\nTry to guess',
				message_text: link,
			}]).catch(err => console.log(err.response.description))
			console.log('Buffer overflow occurred')
		} else {
			try {
				link = decodeURI(ctx.inlineQuery.query)
				ctx.answerInlineQuery([{
					type: 'article',
					id: 'someID',
					title: 'Successfully Decoded!',
					description: 'Result:\n' + link,
					message_text: link,
				}]).catch(err => console.log(err.response.description))
				console.log('link successfully decoded')
			} catch (e) {
				console.error(e)
				ctx.answerInlineQuery([{
					type: 'article',
					id: 'someID',
					title: 'ERROR! Result Not Found!',
					description: 'Description:\nURI malformed',
					message_text: 'NO match found!',
				}]).catch(err => console.log(err.response.description))
			}
		}
	} else {
		console.log('Empty query entered')
	}
})

bot.on('dice', (ctx) => {
	ctx.reply('Value: ' + ctx.message.dice.value, {reply_to_message_id: ctx.message.message_id})
})

bot.launch().then()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))