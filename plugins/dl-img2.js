const { cmd } = require("../command");
const axios = require("axios");

cmd({
    pattern: "unsplash",
    alias: ["image2", "img2", "unspdl"],
    react: "🦋",
    desc: "Search and download Unsplash images",
    category: "fun",
    use: ".img <keywords>",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const query = args.join(" ");
        if (!query) {
            return reply("🖼️ Please provide a search query\nExample: .img cute cats");
        }

        await reply(`🔍 Searching Unsplash images for "${query}"...`);

        const url = `https://api.giftedtech.co.ke/api/search/unsplash?apikey=gifted&query=${encodeURIComponent(query)}`;
        const response = await axios.get(url);

        // Validate response
        if (!response.data?.success || !response.data.results?.length) {
            return reply("❌ No images found. Try different keywords");
        }

        const results = response.data.results; // always 10 images

        for (const imageUrl of results) {
            await conn.sendMessage(
                from,
                { 
                    image: { url: imageUrl },
                    caption: `📷 Result for: *${query}*\n✨ Powered by SHABAN-MD`
                },
                { quoted: mek }
            );
            // Delay to avoid flood / rate limit
            await new Promise(resolve => setTimeout(resolve, 800));
        }

    } catch (error) {
        console.error('Unsplash Image Search Error:', error);
        reply(`❌ Error: ${error.message || "Failed to fetch images"}`);
    }
});