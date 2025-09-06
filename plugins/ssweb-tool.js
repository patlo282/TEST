const axios = require("axios");
const config = require('../config');
const { cmd } = require('../command');

cmd({
  pattern: "ssweb",
  alias: ["screenweb"],
  react: "📸",
  desc: "Download screenshot of a given link.",
  category: "other",
  use: ".ss <link>",
  filename: __filename,
}, 
async (conn, mek, m, { from, q, reply }) => {
  if (!q) {
    return reply("❗ براہ کرم اسکرین شاٹ لینے کے لیے ایک لنک فراہم کریں۔");
  }

  try {
    const apiUrl = `https://api.giftedtech.co.ke/api/tools/ssweb?apikey=gifted&url=${encodeURIComponent(q)}`;
    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });

    if (!response || response.status !== 200) {
      return reply("⚠️ اسکرین شاٹ لینے میں ناکامی۔ براہ کرم دوبارہ کوشش کریں۔");
    }

    const imageBuffer = Buffer.from(response.data, 'binary');

    await conn.sendMessage(from, { 
      image: imageBuffer, 
      caption: "*📸 WEB SCREENSHOT DOWNLOADER*\n\n> *© POWERED BY SHABAN MD*" 
    }, { quoted: m });

  } catch (error) {
    console.error("❌ Screenshot Error:", error);
    reply("⚠️ اسکرین شاٹ لینے میں ناکامی۔ براہ کرم درست لنک فراہم کریں یا بعد میں کوشش کریں۔");
  }
});