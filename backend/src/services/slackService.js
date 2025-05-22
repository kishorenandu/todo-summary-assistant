const { IncomingWebhook } = require('@slack/webhook');

async function sendSlackMessage(summary) {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!webhookUrl) {
        throw new Error("Slack Webhook URL is not configured.");
    }

    const webhook = new IncomingWebhook(webhookUrl);

    try {
        await webhook.send({
            text: `*Todo Summary Update*:\n\n${summary}`,
            username: 'Todo Assistant',
            icon_emoji: ':memo:',
        });
        console.log('Message sent to Slack successfully!');
        return { success: true, message: 'Summary sent to Slack!' };
    } catch (error) {
        console.error('Error sending message to Slack:', error.message);
        throw new Error('Failed to send summary to Slack.');
    }
}

module.exports = { sendSlackMessage };
