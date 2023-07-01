const { Telegraf, Markup } = require('telegraf');

class TelegramBotHelper {
  constructor(token, forwardChatId) {
    this.bot = new Telegraf(token);
    this.forwardChatId = forwardChatId;
    this.subscriptions = {};
    this.subscriptionPlan = {
      free: {
        limit: 3,
        interval: 24 * 60 * 60 * 1000,
      },
      premium: {
        limit: 10,
        interval: 12 * 60 * 60 * 1000,
      },
    };
  }

  start() {
    this.bot.start((ctx) => ctx.reply('Welcome to the Forwarding Bot!'));
  }

  help() {
    this.bot.help((ctx) => {
      const helpMessage =
        "To forward a message, simply send it to this bot.\n\n" +
        "Available commands:\n" +
        "/help - Show this help menu\n" +
        "/subscribe - Subscribe to the premium plan\n" +
        "/unsubscribe - Unsubscribe from the premium plan\n" +
        "/leavegroup - Leave the current group\n" +
        "/speedtest - Test bot speed";
      ctx.reply(helpMessage);
    });
  }

  leaveGroup() {
    this.bot.command('leavegroup', (ctx) => {
      const chatId = ctx.message.chat.id;
      this.bot.telegram.leaveChat(chatId);
    });
  }

  subscribe() {
    this.bot.command('subscribe', (ctx) => {
      const chatId = ctx.message.chat.id;
      if (this.subscriptions[chatId]) {
        ctx.reply('You are already subscribed to the premium plan.');
      } else {
        this.subscriptions[chatId] = {
          plan: 'premium',
          remaining: this.subscriptionPlan.premium.limit,
          nextReset: Date.now() + this.subscriptionPlan.premium.interval,
        };
        ctx.reply('You have successfully subscribed to the premium plan.');
      }
    });
  }

  unsubscribe() {
    this.bot.command('unsubscribe', (ctx) => {
      const chatId = ctx.message.chat.id;
      if (this.subscriptions[chatId]) {
        delete this.subscriptions[chatId];
        ctx.reply('You have unsubscribed from the premium plan.');
      } else {
        ctx.reply('You are not currently subscribed to any plan.');
      }
    });
  }

  speedTest() {
    this.bot.command('speedtest', async (ctx) => {
      const start = Date.now();
      const message = await ctx.reply('Testing bot speed...');
      const end = Date.now();
      const latency = end - start;
      await this.bot.telegram.editMessageText(ctx.chat.id, message.message_id, undefined, `Bot latency: ${latency}ms`);
    });
  }

  forwardMessage(prefix) {
  this.bot.on('message', (ctx) => {
    const chatId = ctx.message.chat.id;
    const messageText = ctx.message.text;
    
    if (messageText.startsWith(prefix)) {
      if (this.subscriptions[chatId] && this.subscriptions[chatId].remaining > 0) {
        this.subscriptions[chatId].remaining--;
        const forwardedMessage = messageText.slice(prefix.length).trim();
        this.bot.telegram.sendMessage(this.forwardChatId, forwardedMessage);
      } else {
        ctx.reply('You have reached the maximum number of forwards for your subscription plan.');
      }
    }
  });
}


  menu() {
    this.bot.hears('Menu', (ctx) => {
      const menuKeyboard = Markup.keyboard([
        ['Forward Message', 'Subscription Plan'],
        ['Help', 'Leave Group', 'Speed Test'],
      ]).resize().extra();
      ctx.reply('Select an option:', menuKeyboard);
    });
  }

  forwardMessageCommand() {
    this.bot.hears('Forward Message', (ctx) => {
      ctx.reply('Please send the message you want to forward.');
    });
  }

  subscriptionPlanCommand() {
    this.bot.hears('Subscription Plan', (ctx) => {
      const chatId = ctx.message.chat.id;
      const plan = this.subscriptions[chatId] ? this.subscriptions[chatId].plan : 'free';
      const remaining = this.subscriptions[chatId] ? this.subscriptions[chatId].remaining : 0;
      const nextReset = this.subscriptions[chatId] ? new Date(this.subscriptions[chatId].nextReset).toLocaleString() : 'N/A';
      const subscriptionMessage =
        `Your subscription plan: ${plan}\n` +
        `Remaining forwards: ${remaining}\n` +
        `Next reset: ${nextReset}`;
      ctx.reply(subscriptionMessage);
    });
  }

  launch() {
    this.bot.launch();
  }
}

module.exports = TelegramBotHelper;
