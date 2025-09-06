const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "ai",
    alias: ["bot", "chatgpt2", "gpt"],
    desc: "Chat with an AI model",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    const react = async (emoji) => {
        try {
            await conn.sendMessage(m.chat, { react: { text: emoji, key: mek.key } });
        } catch (e) {
            console.error("React error:", e);
        }
    };

    try {
        if (!q) return reply("Please provide a message for the AI.\nExample: `.ai Hello`");

        const apiUrl = `https://apis-keith.vercel.app/ai/gpt41Nano?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || data.status !== true || !data.result) {
            await react("❌");
            return reply("AI failed to respond. Please try again later.");
        }

        await reply(`🤖 *AI Response SHABAN-MD*\n\n${data.result}`);
        await react("✅");
    } catch (e) {
        console.error("Error in AI command:", e);
        await react("❌");
        reply("An error occurred while communicating with the AI.");
    }
});