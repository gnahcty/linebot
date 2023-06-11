// import 'dotenv/config'
import axios from 'axios'
// import template from '../templates/cafe.js'

export default async (event) => {
    try {
        const bubble = JSON.parse(JSON.stringify(template))
        const { data } = await axios.get(`https://cafenomad.tw/api/v1.2/cafes`)
        for (const info of data) {
            if (event.message.text.includes(info.name)) {
                event.reply([
                    info.url,
                    {
                        type: 'location',
                        title: info.name,
                        address: info.address,
                        latitude: info.latitude,
                        longitude: info.longitude
                    }
                ])
                return
            }
        }
        event.reply('找不到')
    } catch (error) {
        console.log(error)
        event.reply('發生錯誤')
    }
}