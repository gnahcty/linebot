export default {
    "type": "bubble",
    "size": "giga",
    "header": {
        "type": "box",
        "layout": "vertical",
        "contents": [
            {
                "type": "text",
                "text": "Commenter",
                "color": "#ffffff",
                "align": "start",
                "size": "md",
                "gravity": "center"
            },
            {
                "type": "text",
                "text": "Score",
                "color": "#ffffff",
                "align": "start",
                "size": "xs",
                "gravity": "center",
                "margin": "lg"
            }
        ],
        "backgroundColor": "#A17DF5",
        "paddingTop": "19px",
        "paddingAll": "12px",
        "paddingBottom": "16px"
    },
    "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
            {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                    {
                        "type": "text",
                        "text": "comment",
                        "color": "#8C8C8C",
                        "size": "sm",
                        "wrap": true
                    }
                ],
                "flex": 1
            }
        ],
        "spacing": "md",
        "paddingAll": "12px"
    },
    "styles": {
        "footer": {
            "separator": false
        }
    }
}