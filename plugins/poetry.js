const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: "shayari",
  alias: ["poetry", "pt"],
  react: "📝",
  desc: "Random Shayari from API",
  category: "fun",
  filename: __filename
}, 
async (conn, m) => {
  try {
    const response = await axios.get("https://api.giftedtech.co.ke/api/fun/shayari?apikey=gifted");
    const data = response.data;

    if (data?.success && data?.result) {
      await conn.sendMessage(m.chat, {
        text: `📝 *SHAYARI BY SHABAN-MD* \n\n${data.result}`,
      }, { quoted: m });
    } else {
      await conn.sendMessage(m.chat, { text: "❌ Shayari nahi mil saki. Dubara koshish karein." }, { quoted: m });
    }
  } catch (e) {
    console.error("Shayari Error:", e);
    await conn.sendMessage(m.chat, { text: "⚠️ API request failed. Please try again later." }, { quoted: m });
  }
});