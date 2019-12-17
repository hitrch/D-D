let game = require('./game');
const Telegraf = require('telegraf');
let TOKEN = '1040821645:AAH19W8z8wJgOXiQlYOMaj1e1sQPn4bz3MI';
let url = 'https://dndg.herokuapp.com';
const bot = new Telegraf(TOKEN/*, {polling:true}*/);


const admin = require('firebase-admin');

let serviceAccount = require("./ddbot-17122-firebase-adminsdk-k2za6-37f23106d3");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ddbot-17122.firebaseio.com"
});

const db = admin.firestore();

/*let setupRef = db.collection('setup').doc('Fentezi');

setupRef.set({
    info: '\n В далеком будущем высоких технологий было создано развлечение для самых умных(нет) и сильных(точно нет). Представляем вам квест в виртуальной реальности будущего, где ваша задача - выжить.',
});*/

let info;
db.collection('setup').doc('Fentezi').get().then(data => saveInfo(data._fieldsProto.info.stringValue));

function saveInfo(data) {
    info = data;
}



bot.start((msg) => {
    msg.reply('Greetings treveler' + " " + msg.from.first_name + ' ' + msg.from.last_name + '\n' +
        'Вас приветствует Dungeon & Dragons bot. Здесь и сейчас вы можете окунутся в увлекательное сольное путешествие по низведанным мирам\n' +
        'Введите команду /help для получения справки(от пропусков не спасет, использовать с умом)\n' +
        'Введите команду /herewego для начала игры');
    setTimeout(function(){ msg.reply('Об успешном окончании игры как и о проигрыше вам будет сообщено системой, просьба не жульничать при проигрыше.');},1000);
});

bot.help((ctx) =>
    ctx.reply('На текущий момент доступен единственный мир D&D\n' +
        'Введите команду /herewego для начала игры'));

let startButton = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{
                text: 'Так точно',
                callback_data: 'startGame'
            }]
        ]
    })
};

bot.command('herewego', (msg) =>
    msg.reply('Готовы?', startButton)
);

bot.action('startGame', msg => {
    msg.reply('Да прибудет с вами богиня удачи');

    setTimeout(function(){ msg.reply('Ваш мир:');},100);

    setTimeout(function(){ msg.reply(info);},500);

    setTimeout(function(){ game(bot, msg, db);},1000);

});

//bot.launch(); //for poling

// Start webhook via launch method (preffered)
bot.launch({
    webhook: {
        domain: url,
        port: process.env.PORT
    }
});