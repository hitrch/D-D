let gameRole = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{
                text: 'Лучник',
                callback_data: 'archer'
            }],
            [{
                text: 'Мечник',
                callback_data: 'swordsman'
            }],
            [{
                text: 'Маг',
                callback_data: 'magician'
            }],
            [{
                text: 'Олег',
                callback_data: 'oleg'
            }]
        ]
    })
};

let initialRoom = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{
                text: 'Налево',
                callback_data: 'left1'
            }],
            [{
                text: 'Направо',
                callback_data: 'right1'
            }]
        ]
    })
};

let firstCorridorChoice = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{
                text: 'Продолжать идти',
                callback_data: 'continue1'
            }],
            [{
                text: 'Вернуться',
                callback_data: 'back'
            }]
        ]
    })
};

let firstCorridorSecondChoice = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{
                text: 'Упорно продвигаться',
                callback_data: 'continue2'
            }],
            [{
                text: 'Все таки вернуться',
                callback_data: 'back'
            }]
        ]
    })
};

let sphinx = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{
                text: 'Ребенок',
                callback_data: 'kid'
            }],
            [{
                text: 'Обезьяна',
                callback_data: 'monkey'
            }],
            [{
                text: 'Человек',
                callback_data: 'human'
            }],
            [{
                text: 'Великан',
                callback_data: 'giant'
            }]
        ]
    })
};

let crystal = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{
                text: 'Взять кристал',
                callback_data: 'takeCrystal'
            }],
            [{
                text: 'Идти в туманный коридор',
                callback_data: 'skipCrystal'
            }]
        ]
    })
};

let ogreChoice = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{
                text: 'Сражаться',
                callback_data: 'fightOgre'
            }],
            [{
                text: 'Бежать',
                callback_data: 'flee'
            }]
        ]
    })
};

let lizardHorn = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{
                text: 'Тихо скрысил и ушел - называется нашел.',
                callback_data: 'snatch'
            }],
            [{
                text: 'Пойду ка я от греха подальше.',
                callback_data: 'stealth'
            }],
            [{
                text: 'А почему б не вмаать этому красному?',
                callback_data: 'fightLizard'
            }]
        ]
    })
};

let giantLayer = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{
                text: 'Бежать на встречу выходу.',
                callback_data: 'run'
            }],
            [{
                text: 'Проявить отсорожность до конца, ведь мало ли что может ждать впереди.',
                callback_data: 'careful'
            }]
        ]
    })
};

let giantChoice = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{
                text: 'Попробовать проскользнуть.',
                callback_data: 'breakthrough'
            }],
            [{
                text: 'Тут не проскользнуть - бой.',
                callback_data: 'fightGiant'
            }]
        ]
    })
};

let lastChoice = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{
                text: 'До выхода немного - прорвемся.',
                callback_data: 'runOfFaith'
            }],
            [{
                text: 'Не успею убежать - надо сражаться.',
                callback_data: 'fightGiant'
            }]
        ]
    })
};

let game = function (bot, msg, db) {

    roleChoice(bot, msg);
};

roleChoice = (bot, msg) => {
    let gamer = {
        id: msg.from.id,
        username: msg.from.username,
        alive: true
    };

    msg.reply('Выберите роль', gameRole);

    bot.action('archer', msg => {
        msg.reply('Приветствую, Леголас');
        gamer.role = 'archer';
        setTimeout(function(){ startGame(gamer, msg, bot);},1000);
    });

    bot.action('swordsman', msg => {
        msg.reply('Приветствую, мистер простреленное колено');
        gamer.role = 'swordsman';
        setTimeout(function(){ startGame(gamer, msg, bot);},1000);
    });

    bot.action('magician', msg => {
        msg.reply('Приветствую, Пендальф');
        gamer.role = 'magician';
        setTimeout(function(){ startGame(gamer, msg, bot);},1000);
    });

    bot.action('oleg', msg => {
        msg.reply('Да да я, но роль выберете все же');
    });

};

startGame = (gamer, msg, bot) => {
    msg.telegram.sendMessage(msg.chat.id,
        'Вы оказались в куполоподобной комнате, имеющей два выхода, располагающихся напротив друг друга. Каждый ведет в свой коридор. Куда пойдешь странник?',
        initialRoom);

    bot.action('right1', msg => {
        right1(msg, bot, gamer);
    });

    bot.action('left1', msg => {
        left1(msg, bot, gamer);
    });
};

right1 = (msg, bot, gamer) => {
    msg.reply('Вы выбираете правый коридор. Идя по нему вы чувствуете непонятное тревожное ощущение, вызывающее желание повернуть обратно. Вы: ', firstCorridorChoice);

    bot.action('continue1', msg => {
        msg.reply('Вы решаете продолжить продвижение. Идти становится все сложнее и чувство чего то потустороннего усилилоось. Вы: ', firstCorridorSecondChoice);

        bot.action('continue2', msg => {
            demonOrgreLayer(msg, bot, gamer);
        });
    });

    bot.action('back', msg => {
        msg.reply('Вы решаете вернуться. Перед вами все та же куполообразная комната. Слышится грохот и проход которым вы прошли внезапно перекрывается каменной плитой. Что же остается только один вариант и вы устремляетесь в оставшийся коридор.');
        left1(msg, bot, gamer);
    });
};

left1 = (msg, bot, gamer) => {
    msg.reply('Вы выбираете левый коридор. Перед собой вы видете голову сфинкса и четыре плиты, каждая со своей надписью. Похоже это какая то загадка.', sphinx);

    let deathInfo = 'Надавив на плиту вы услышали скрежет и вас проткнуло копьями из открывшихся щелей';

    bot.action('monkey', msg => {
        death(msg, bot, gamer, deathInfo);
    });

    bot.action('kid', msg => {
        death(msg, bot, gamer, deathInfo);
    });

    bot.action('giant', msg => {
        death(msg, bot, gamer, deathInfo);
    });

    bot.action('human', msg => {
        msg.reply('\'Ну конечно же это человек\' - усмехнувшись подумали вы, дети же не люди.');
        room2(msg, bot, gamer);
    });
};

death = (msg, bot, gamer, info) => {
    gamer.alive = false;
    msg.telegram.sendMessage(msg.chat.id, info);
    msg.telegram.sendMessage(msg.chat.id, 'Вы мертвы');
};

demonOrgreLayer = (msg, bot, gamer) => {
    msg.telegram.sendMessage(msg.chat.id,'С трудом преодолев давящюю слабость, вы все таки добираетесь до новой комнаты. В центре нее находится небольшой пьедестал с огромным бриллиантом, вделанным в его вершину. А за пьедесталом находится коридор, заполненный туманом. Вы:', crystal);

    bot.action('takeCrystal', msg => {
        msg.reply('Вы осторожно подходите к пьедесталу и касаетесь драгоценности. Внезапно вспыхивает яркий свет и за вами оказывается демонический огр', ogreChoice);
        bot.action('fightOgre', msg => {
            death(msg, bot, gamer, 'Вы нашли свой покой в желудке демонического огра.');
        });
        bot.action('flee', msg => {
            msg.reply('Вы решаете не рисковать своей жизнью в сражении с огром и устремляетесь в туманный коридор.');
            let random = Math.floor(Math.random() * 6);
            if(random === 4 || random === 5 || random === 5)
            {
                death(msg, bot, gamer, 'Бежа по коридору вы думаете о том как хорошо что вы все таки спокойно избежали битвы с огром, как вдруг понимаете что под ногами у вас больше не каменные плиты коридора. Воздух свистит в ваших ушах и вы разбиваетесь насмерть.');
            }
            else
            {
                msg.reply('Пробежав некотрое расстояние вы останавливаетесь чтобы перевести дух, как вдруг замечаете прямо перед собой провал. Как же хорошо бывает иногда просто вовремя остановиться.');
                room2(msg, bot, gamer);
            }

        });
    });

    bot.action('skipCrystal', msg => {
        msg.reply('В гробу вы видали эти подозрительные драгоценности и магические побрякушки, так что обойдя пьедестал вы углубляетесь в туманный коридор. Пройдя некоторое врямя по нему, вы натыкаетесь на провал который при быстром перемещении в тумане вы б могли и не заметить. Как же хорошо никуда не спешить.');
        room2(msg, bot, gamer);
    });
};

room2 = (msg, bot, gamer) => {
    msg.reply('\'Вторая куполоподобная\' - подумали вы, - \'по закону жанра если пройти эту останется всего одна.\'');
    setTimeout(function(){ msg.reply('Осматривая комнату, вы замечаете, что в центре комнаты навалена куча бревен, сучьев, костей и мусора, наверху которой спит гигантский огненный ящер. С одной из сторон гнезда ящера торчит серебрянный рог. Вы:', lizardHorn);},1000);

    bot.action('snatch', msg => {
        msg.reply('Вы решаете поиграть в бывалого рецедивиста.');
        setTimeout(function(){
            let random = Math.floor(Math.random() * 6);
            if(random === 5 || random === 6)
            {
                msg.reply('Вам удается аккуратно подобраться к логову спящего ящера и умыкнуть серебрянный рог. Пробраться к следующему коридору так же не составило вам существенных проблем.');
                room3(msg, bot, gamer);
            }
            else
            {
                msg.reply('Вы аккуратно пробираетесь к логову спящего ящера. И вот когда вы уже почти коснулись серебрянного рога вас накрывает тень. Подняв глаза кверху вы задумываетесь о том что ящер то размеров далеко не маленьких.');
                death(msg, bot, gamer, 'Вы были испепелены дыханием огненной ящерицы.');
            }

        },1000);

    });

    bot.action('stealth', msg => {
        msg.reply('Вы решаете проскочить мимо спящей опасности и тенью проскальзываете к коридору в противоположном конце комнаты.');
        room3(msg, bot, gamer);
    });

    bot.action('fightLizard', msg => {
        msg.reply('Зачем напрягаться и тратить время на скрытное проникновение или кражу если можно ворваться и расскидать все и вся. BANG, BANG, BANG батя в здании..');
        death(msg, bot, gamer, 'Вы были испепелены дыханием огненной ящерицы.');
    });
};

room3 = (msg, bot, gamer) => {
    setTimeout(function(){ msg.reply('Идя по коридору, вы внезапно чувствуете еле уловимое дуновение ветра. Вероятно выход уже близко. Вы:', giantLayer);},500);
    bot.action('run', msg => {
        msg.reply('Вы выбегаете в огромную пещеру и встречаетесь взглядом с подгорным гигантом.');
        ////////////////////////////Battle
    });

    bot.action('careful', msg => {
        msg.reply('Вы осторожно пробираетесь к входу в огромную пещеру и замечаете, что в центре комнаты спиной к вам расположился Великан. Вы: ', giantChoice);
        bot.action('breakthrough', msg => {
            msg.reply('Вы медленно и аккуратно пробираетесь, но когда вы преодолели большую часть пути Великан замечает вас. Вы: ', lastChoice);
            bot.action('runOfFaith', msg => {
                let random = Math.floor(Math.random() * 6);
                if(random === 4 || random === 5 || random === 6)
                {
                    msg.reply('Вы делаете решающий бросок, кувырком чудом увернувшись от удара Великана, ныряете в спасительный коридор, где противник в виду своих размеров не может вас достать.\n'+
                        'Лежа на земле вы ощущаете сильное дуновение ветра. Поспешно поднявшись вы проходите последние десятки метров и вас ослепляет дневной свет.');
                    setTimeout(function(){ msg.reply('Поздравляем с успешным прохождением игры!');},1000);
                }
                else {
                    death(msg, bot, gamer, 'Вы были отправлены в полет авиалиниями Вайтрана');
                }

            });
        });

        bot.action('fightGiant', msg => {
            death(msg, bot, gamer, 'Вы были отправлены в полет авиалиниями Вайтрана');
        });

    });
};


module.exports = game;