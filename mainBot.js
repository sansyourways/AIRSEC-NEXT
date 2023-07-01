const TelegramBotHelper = require('./telegramBotHelper');

// Replace 'YOUR_TOKEN' with your Telegram Bot API token
const TOKEN = 'YOUR_TOKEN';
const FORWARD_CHAT_ID = '123456789'; // Replace with the chat ID where you want to forward the messages

// Create an instance of the TelegramBotHelper
const botHelper = new TelegramBotHelper(TOKEN, FORWARD_CHAT_ID);

// Register bot functions
botHelper.start();
botHelper.help();
botHelper.leaveGroup();
botHelper.subscribe();
botHelper.unsubscribe();
botHelper.speedTest();
botHelper.forwardMessage('/forward ');
botHelper.menu();
botHelper.forwardMessageCommand();
botHelper.subscriptionPlanCommand();


// Launch the bot
botHelper.launch();
