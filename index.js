import 'dotenv/config'
import linebot from 'linebot'
// import axios from 'axios'
// import cafe from './commands/cafe.js'
import movie from './commands/movie.js'

const bot = linebot({
    channelId: process.env.CHANNEL_ID,
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

// bot.on('follow', async event => {
//     event.reply(`
//     Hi, please enter a movie title to check its score on MetaCritic.
//     If the movie title contains more than one word, please join them with '-'.
// For example, ""
//     `)
// })

bot.on('message', async event => {
    if (event.message.type === 'text') {
        if (event.message.text === 'fight-club') {
            event.reply('We do not talk about fight club.')
        } else {
            movie(event)
        }
        // event.reply(event.message.text.trim().toLowerCase().replace(/\s/g, '-'))
    } else {
        event.reply(`Can't find the movie title.`)
    }
})

bot.listen('/', process.env.PORT || 3000, () => {
    console.log('機器人已開啟')
})