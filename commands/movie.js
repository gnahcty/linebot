import axios from 'axios'
import * as cheerio from 'cheerio'
import template from '../templates/movie.js'
import sum from '../templates/sum.js'
import writeJSON from '../utils/writeJSON.js'



export default async (event) => {
    try {
        const bubble = JSON.parse(JSON.stringify(template))
        const { data } = await axios.get(`https://www.metacritic.com/movie/${event.message.text.trim().toLowerCase().replace(/\s/g, '-')}`)
        const $ = cheerio.load(data)
        const arr = []
        $('#nav_to_metascore .critic_reviews2 .review').each(function () {
            const bubble = JSON.parse(JSON.stringify(template))
            bubble.header.contents[0].text = $(this).find('.source a').text().trim() || $(this).find('.source img').attr('alt') || 'anonymous'
            bubble.header.contents[1].text = $(this).find('.metascore_w').text().trim()
            bubble.body.contents[0].contents[0].text = $(this).find('.summary a').text().replace('Read full review', '').trim() || $(this).find('.summary').text().trim() || 'blank'
            if (bubble.header.contents[1].text * 1 >= 60) {
                bubble.header.backgroundColor = "#66CC33"
            } else if (bubble.header.contents[1].text * 1 >= 40) {
                bubble.header.backgroundColor = "#FFCC33"
            } else {
                bubble.header.backgroundColor = "#FF0000"
            }
            arr.push(bubble)
        })

        const title = JSON.parse(JSON.stringify(sum))
        title.body.contents[0].url = $('#main_content').find('.summary_img').eq(0).attr('src')
        title.body.contents[0].action.uri = `https://www.metacritic.com/movie/${event.message.text.trim().toLowerCase().replace(/\s/g, '-')}`
        title.body.contents[2].contents[0].contents[0].contents[0].text = $('#main_content').find('.product_page_title h1').text()
        title.body.contents[2].contents[0].contents[1].contents[1].text = $('#main_content').find('.metascore_w').eq(0).text()
        title.body.contents[2].contents[0].contents[2].contents[0].contents[0].text = $('#main_content').find('.score_description span').eq(0).text().trim()

        const result1 = await event.reply([{
            type: 'flex',
            altText: 'title',
            contents: title
        },
        {
            type: 'flex',
            altText: 'meta_score',
            contents: {
                type: 'carousel',
                contents: arr
            }
        }])


        writeJSON(arr, 'arr')
        writeJSON(title, 'title')


        if (result1.message) {
            throw new Error(result1.message)
        }


    } catch (error) {
        console.log(error)
        event.reply('發生錯誤')
    }
}