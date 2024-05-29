import axios from 'axios'
import * as cheerio from 'cheerio'
import reviewTemplate from '../templates/movie.js'
import basicInfoTemplate from '../templates/sum.js'
import writeJSON from '../utils/writeJSON.js'



export default async (event) => {
    try {
        const { data } = await axios.get(`https://www.metacritic.com/movie/${event.message.text.trim().toLowerCase().replace(/\s/g, '-')}`)
        if(!data) throw new Error('cannot get data from metacritic')

        const $ = cheerio.load(data)

        /**** Basic info ****/
        const filmInfo = JSON.parse(JSON.stringify(basicInfoTemplate)) //copy basic info template

        const filmTitle = $('#__layout').find('.c-productHero_title h1').text()
        const metaScore = $('#__layout').find('.c-siteReviewScore_background-critic_medium').find('span').text().slice(0, 2)
        const userScoreRaw = $('#__layout').find('.c-siteReviewScore_background-user').find('span').text()
        const userScore = userScoreRaw.split('.')[0].concat('.',userScoreRaw.split('.')[1].slice(0,1))
        const summary = $('#__layout').find('span.c-productDetails_description').eq(0).text().trim()
        const director = $('#__layout').find('.c-productDetails_staff_directors').eq(0).find('a').text().trim()

        filmInfo.body.contents[0].text = filmTitle||'filmTitle'
        filmInfo.body.contents[1].text = summary || 'filmSummary'
        filmInfo.body.contents[3].contents[0].contents[1].text = metaScore || 'N/A'
        filmInfo.body.contents[3].contents[1].contents[1].text = userScore || 'N/A'
        filmInfo.body.contents[5].contents[1].text = director || 'unknown'
        /**** Basic info ****/


        /**** Reviews ****/

        const reviewArr = []
        const reviews =  $('.c-reviewsSection_criticReviews .c-siteReview')
        reviews.each(function() {
            const review = JSON.parse(JSON.stringify(reviewTemplate))
            let reviewer = $(this).find('.c-siteReviewHeader_publisherLogo a').text().trim();
            let score = $(this).find('.c-siteReviewScore span').text().trim();
            let content = $(this).find('.c-siteReview_quote span').text().trim();

            review.header.contents[0].text = reviewer || 'anonymous'
            review.header.contents[1].text = score || '666'
            review.body.contents[0].contents[0].text = content || 'blank'
            review.header.backgroundColor = score>=60 ? "#66CC33" : score>=40 ? "#FFCC33" : "#FF0000"

            reviewArr.push(review)
        })
        /**** Reviews ****/

        /**** code test ****/
        const test = [{filmTitle, metaScore, userScore, summary, director,reviewArr}]
        writeJSON(test, 'test')
        writeJSON(reviewArr, 'reviews')
        writeJSON(filmInfo, 'filmInfo')
        /**** code test ****/


        const reply = await event.reply([{
            type: 'flex',
            altText: 'failed to show film info. Your device might not support this feature.',
            contents: filmInfo
        },
        {
            type: 'flex',
            altText: 'failed to show reviews. Your device might not support this feature.',
            contents: {
                type: 'carousel',
                contents: reviewArr
            }
        }])

        if (reply.message) {
            throw new Error(reply.message)
        }


    } catch (error) {
        console.log(error)
        event.reply('An unexpected error occurred. Please try again later.')
    }
}