const eris = require('eris');
const e = require("express");

// Create a Client instance with our bot token.
const bot = new eris.Client('ODg3NzE4NjkxMjMwMzM5MTQ0.YUIOdQ.AvOKQJ6HqfcjSISlkOlJP0VOPOM');

const COMMAND_PREFIX = "/"

const handleCommands = {}

handleCommands['play'] = (msg, args) => {
    const link = args[0];

    return msg.channel.createMessage(`${link}`);
};

handleCommands['join'] = (msg, args) => {
    // msg.channel.
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
           await msg.channel.createMessage('Present');
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