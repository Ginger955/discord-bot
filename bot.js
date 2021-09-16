const eris = require('eris');
const {VoiceDataStream} = require("eris");

// Create a Client instance with our bot token.
const bot = new eris.Client('ODg3NzE4NjkxMjMwMzM5MTQ0.YUIOdQ.066YAcf80HKQ72w4MOkiS0b-Nio');
const data_stream = new eris.VoiceDataStream("pcm");


const COMMAND_PREFIX = "/"

const handleCommands = {}

handleCommands['play'] = (msg, args) => {
    const link = args[0];
    data_stream.on(new Buffer(), '1',1, 1);
    return msg.channel.createMessage(`Searching ${link}`);
};

handleCommands['join'] = (msg, args) => {
    const channels = msg.channel.guild;
    console.log(channels);
    //749185878785523782 - OPP
    //650096506141016078 - bando
    try {
        bot.joinVoiceChannel('650096506141016078');
        console.log("Joined channel.");
    } catch (err) {
        console.log("Error while joining channel:", err);
    }
}

handleCommands['leave'] = (msg, args) => {
    try {
        bot.leaveVoiceChannel('650096506141016078');
        console.log("Left channel.");
    } catch (err) {
        console.log("Error while leaving channel:", err);
    }
}

// When the bot is connected and ready, log to console.
bot.on('ready', () => {
   console.log('Connected and ready.');
});

bot.on('messageCreate', async (msg) => {
    const content = msg.content;

    //only process server messages
    if (!msg.channel.guild){
        return;
    }

    const bot_mentioned = msg.mentions.find(
       mentionedUser => mentionedUser.id === bot.user.id,
    );

    if (bot_mentioned) {
        try {
           await msg.channel.createMessage('Prezent');
        } catch (err) {
           console.warn('Failed to respond to mention.');
           console.warn(err);
        }
    }

    //ignore text that does not start with the command prefix
    if(!content.startsWith(COMMAND_PREFIX)){
        return;
    }

    const command_parts = content.slice(1, content.length).split(' ');

    console.log(command_parts);

    const command_name = command_parts[0];
    const commandHandler = handleCommands[command_name];

    if(!commandHandler){
        return;
    }

    const args = command_parts.slice(1);

    try {
        await commandHandler(msg, args);
    } catch (err) {
        console.warn('Error handling command', command_name);
        console.warn(err);
    }
});

bot.on('error', err => {
   console.warn(err);
});

bot.connect();