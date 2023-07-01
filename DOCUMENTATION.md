**Documentation:**

# Telegram Bot Documentation

## Introduction

This is a Telegram bot written in Node.js that allows users to forward messages to a specific chat. The bot supports multiple commands for interacting with its features, including subscribing to a premium plan, checking the subscription status, testing the bot's speed, and more.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your_username/telegram-bot.git
cd telegram-bot
```

2. Install the required dependencies:

```bash
npm install
```

3. Obtain your Telegram Bot API token:

   a. Create a new bot on Telegram and get the token from the BotFather.

   b. Replace `'YOUR_TOKEN'` in `mainBot.js` with your actual token.

4. Replace `'FORWARD_CHAT_ID'` in `mainBot.js` with the chat ID of the chat where you want the forwarded messages to be sent.

## Usage

To start the bot, run the following command:

```bash
node mainBot.js
```

Once the bot is up and running, you can interact with it using the following commands:

- `/help`: Show the help menu with a list of available commands and their descriptions.
- `/subscribe`: Subscribe to the premium plan for increased message forwarding limits.
- `/unsubscribe`: Unsubscribe from the premium plan.
- `/leavegroup`: Make the bot leave the current group or chat.
- `/speedtest`: Test the bot's speed by measuring its response time.
- `/menu`: Show a menu with options to forward messages, check subscription status, and more.

**Note:** To forward a message, you need to use a specific prefix (e.g., `/forward`). Messages that do not start with the specified prefix will not be forwarded.

## Subscription Plans

The bot offers two subscription plans:

1. Free Plan:
   - Forwarding Limit: 3 messages per 24 hours.
   - Cost: Free

2. Premium Plan:
   - Forwarding Limit: 10 messages per 12 hours.
   - Cost: $5 per month

To subscribe to the premium plan, use the `/subscribe` command. If you have subscribed, you can check your current plan and remaining forwards using the `/subscriptionplan` command.

## Contributing

Contributions are welcome! If you find any issues or have ideas for improvements, feel free to open an issue or submit a pull request.

## License

This Telegram bot is open-source and distributed under the [MIT License](https://opensource.org/licenses/MIT).

## Credits

This bot is created and maintained by [Your Name](https://github.com/your_username).

---
