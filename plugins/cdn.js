const { cmd } = require('../command');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

cmd({
    pattern: "cdn",
    alias: ["upload", "savecdn", "store"],
    desc: "Upload replied file to Bandaheali CDN",
    category: "tools",
    react: "☁️",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Check reply
        const quoted = mek.quoted || m.quoted;
        if (!quoted) return reply("❌ Reply to any *image/video/document* with the command to upload to CDN.");

        // Download file locally
        const qmsg = quoted.msg || quoted;
        const mediaPath = await conn.downloadAndSaveMediaMessage(qmsg);
        if (!mediaPath) return reply("❌ Could not download the file. Please try again.");

        // Get extension
        const ext = path.extname(mediaPath) || ".bin";

        // Generate random filename
        const filename = "EDITH-MD" + Math.floor(Math.random() * 100000) + ext;

        // Prepare form-data
        let form = new FormData();
        form.append("file", fs.createReadStream(mediaPath), { filename });

        // Upload to CDN
        const { data } = await axios.post("https://cdn-bandaheali.zone.id/api/upload", form, {
            headers: form.getHeaders()
        });

        // Delete temp file
        fs.unlinkSync(mediaPath);

        // Send only file URL
        if (data?.file?.url) {
            await reply(`✅ File uploaded successfully!\n\n🌐 CDN URL:\n${data.file.url}`);
        } else {
            await reply("❌ Upload failed. Response:\n```" + JSON.stringify(data, null, 2) + "```");
        }

    } catch (error) {
        console.error("CDN Upload Error:", error);
        reply("❌ Failed to upload file. Error: " + error.message);
    }
});