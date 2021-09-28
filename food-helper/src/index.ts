const { router, text } = require('bottender/router');

export default async function App(context: any) {
    return router([text(/(hi|hello)/i, SayHi), text('*', defaultReply)]);
}

async function SayHi(context) {
    await context.sendText('Hi!');
}

async function defaultReply(context) {
    await context.sendText('聽不懂 = =');
}
