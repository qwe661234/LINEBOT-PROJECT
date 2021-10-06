const { router, text } = require('bottender/router');
const axios = require('axios');

export default async function App(context: any) {
    return router([
        text(/(hi|hello)/i, SayHi),
        text('台南', SendFood),
        text('高雄', SendFood),
        text('*', defaultReply),
    ]);
}

async function SayHi(context) {
    await context.sendText('Hi!');
}

async function defaultReply(context) {
    await context.sendText('聽不懂ㄟ = =');
}

async function SendFood(context) {
    const url = `http://localhost:8080/food/${encodeURI(
        context.event.message.text,
    )}`;
    const data = [];
    axios.get(url).then(async res => {
        res.data.map(item => {
            data.push(FoodBubble(item));
        });
        await context.sendFlex('This is a carousel flex', {
            type: 'carousel',
            contents: data,
        });
    });
}

const FoodBubble = item => {
    return {
        type: 'bubble',
        hero: {
            type: 'image',
            url:
                'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
            size: 'full',
            aspectRatio: '20:13',
        },
        body: {
            type: 'box',
            layout: 'vertical',
            contents: [
                {
                    type: 'text',
                    text: item.name,
                    weight: 'bold',
                    size: 'xl',
                },
                {
                    type: 'box',
                    layout: 'vertical',
                    margin: 'lg',
                    contents: [
                        {
                            type: 'box',
                            layout: 'baseline',
                            contents: [
                                {
                                    type: 'text',
                                    text: item.address,
                                    wrap: true,
                                    color: '#666666',
                                    size: 'sm',
                                    flex: 5,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        footer: {
            type: 'box',
            layout: 'vertical',
            contents: [
                {
                    type: 'button',
                    action: {
                        type: 'uri',
                        label: 'Link',
                        uri: item.link,
                    },
                },
            ],
        },
    };
};
