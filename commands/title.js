// import axios from 'axios'
// import * as cheerio from 'cheerio'
// import sum from '../templates/sum.js'
// // import writeJSON from '../utils/writeJSON.js'



// export default async (event) => {
//     try {

//         const { data } = await axios.get(`https://www.metacritic.com/movie/${event.message.text}`)
//         const $ = cheerio.load(data)

//         const title = JSON.parse(JSON.stringify(sum))
//         title.hero.url = $('#main_content').find('.summary_img').eq(0).attr('src')
//         title.body.contents[0].text = $('#main_content').find('.product_page_title h1').text()
//         title.body.contents[1].contents[1].text = $('#main_content').find('.metascore_w').eq(0).text()
//         title.body.contents[2].contents[0].contents[0].text = $('#main_content').find('.score_description span').eq(0).text().trim()

//         const result1 = await event.reply({
//             type: 'flex',
//             altText: 'title',
//             contents: title
//         })



//         if (result1.message) {
//             throw new Error(result1.message)
//         }

//     } catch (error) {
//         console.log(error)
//         event.reply('發生錯誤')
//     }
// }