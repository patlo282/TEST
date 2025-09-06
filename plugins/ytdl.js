const config = require('../config');
const { cmd } = require('../command');
const { ytsearch, ytmp3, ytmp4 } = require('@dark-yasiya/yt-dl.js'); 

// video

cmd({ 
    pattern: "video×", 
    alias: ["video×", "video×"], 
    react: "🎥", 
    desc: "Download Youtube song", 
    category: "main", 
    use: '.song < Yt url or Name >', 
    filename: __filename 
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => { 
    try { 
        if (!q) return await reply("Please provide a YouTube URL or song name.");
        
        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("No results found!");
        
        let yts = yt.results[0];  
        let apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(yts.url)}`;
        
        let response = await fetch(apiUrl);
        let data = await response.json();
        
        if (data.status !== 200 || !data.success || !data.result.download_url) {
            return reply("Failed to fetch the video. Please try again later.");
        }
        
        let ytmsg = `*🎞️ SHABAN-MD YT VIDEO DOWNLOADER 🎞️*
        
╭━━❐━⪼
┇๏ *Title* -  ${yts.title}
┇๏ *Duration* - ${yts.timestamp}
┇๏ *Views* -  ${yts.views}
┇๏ *Author* -  ${yts.author.name}
╰━━❑━⪼`;

        // Send video details
        await conn.sendMessage(from, { image: { url: data.result.thumbnail || '' }, caption: ytmsg }, { quoted: mek });
        
        // Send video file
        await conn.sendMessage(from, { video: { url: data.result.download_url }, mimetype: "video/mp4" }, { quoted: mek });
        
        // Send document file (optional)
        await conn.sendMessage(from, { 
            document: { url: data.result.download_url }, 
            mimetype: "video/mp4", 
            fileName: `${data.result.title}.mp4`, 
            caption: `> *${yts.title}*\n> *© Pᴏᴡᴇʀᴇᴅ Bʏ Sʜᴀʙᴀɴ-Mᴅ ♡*`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("An error occurred. Please try again later.");
    }
});  
       
// play

cmd({ 
     pattern: "play", 
     alias: ["play", "play"], 
     react: "🎶", 
     desc: "Download Youtube song",
     category: "main", 
     use: '.song < Yt url or Name >', 
     filename: __filename }, 
     async (conn, mek, m, { from, prefix, quoted, q, reply }) => 
     
     { try { if (!q) return await reply("Please provide a YouTube URL or song name.");

const yt = await ytsearch(q);
    if (yt.results.length < 1) return reply("No results found!");
    
    let yts = yt.results[0];  
    let apiUrl = `https://apis.davidcyriltech.my.id/youtube/mp3?url=${encodeURIComponent(yts.url)}`;
    
    let response = await fetch(apiUrl);
    let data = await response.json();
    
    if (data.status !== 200 || !data.success || !data.result.downloadUrl) {
        return reply("Failed to fetch the audio. Please try again later.");
    }
    
    let ytmsg = `*🎧 SHABAN-MD YT MP3 DOWNLOADER 🎧*
    
╭━━❐━⪼
┇๏ *Tital* -  ${yts.title}
┇๏ *Duration* - ${yts.timestamp}
┇๏ *Views* -  ${yts.views}
┇๏ *Author* -  ${yts.author.name} 
╰━━❑━⪼
> *© Pᴏᴡᴇʀᴇᴅ Bʏ Sʜᴀʙᴀɴ-Mᴅ ♡*`;



// Send song details
    await conn.sendMessage(from, { image: { url: data.result.image || '' }, caption: ytmsg }, { quoted: mek });
    
    // Send audio file
    await conn.sendMessage(from, { audio: { url: data.result.downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
    
    // Send document file
    await conn.sendMessage(from, { 
        document: { url: data.result.downloadUrl }, 
        mimetype: "audio/mpeg", 
        fileName: `${data.result.title}.mp3`, 
        caption: `> *© Pᴏᴡᴇʀᴇᴅ Bʏ Sʜᴀʙᴀɴ-Mᴅ ♡*`
    }, { quoted: mek });

} catch (e) {
    console.log(e);
    reply("An error occurred. Please try again later.");
}

});

// Mp3 Url

cmd({ 
    pattern: "mp3", 
    alias: ["mp3"], 
    react: "🎙️", 
    desc: "Download YouTube song",
    category: "main", 
    use: '.play <YouTube URL or Song Name>', 
    filename: __filename 
}, 
async (conn, mek, m, { from, prefix, quoted, q, reply }) => {
    try {
        if (!q) return await reply("❌ Please provide a YouTube URL or song name.");

        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("❌ No results found!");

        let yts = yt.results[0];  
        let apiUrl = `https://apis-keith.vercel.app/download/dlmp3?url=${encodeURIComponent(yts.url)}`;

        let response = await fetch(apiUrl);
        let json = await response.json();

        if (!json.status || !json.result.success) {
            return reply("❌ Failed to fetch audio. Try again later.");
        }

        const res = json.result.data;

        let ytmsg = `*🎙️ SHABAN-MD YT MP3 EXTRA DOWNLOADER 🎙️*

╭━━❐━⪼
┇๏ *Title* -  ${res.title}
┇๏ *Duration* - ${res.duration} sec
┇๏ *Quality* -  ${res.quality}kbps
┇๏ *Video ID* - ${res.videoId}
╰━━❑━⪼
> *© Pᴏᴡᴇʀᴇᴅ Bʏ Sʜᴀʙᴀɴ-Mᴅ ♡*`;

        // Send thumbnail and info
        await conn.sendMessage(from, { image: { url: res.thumbnail }, caption: ytmsg }, { quoted: mek });

        // Send audio as audio file
        await conn.sendMessage(from, { audio: { url: res.downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });

        // Send audio as document file
        await conn.sendMessage(from, { 
            document: { url: res.downloadUrl }, 
            mimetype: "audio/mpeg", 
            fileName: `${res.title}.mp3`, 
            caption: `> *© Pᴏᴡᴇʀᴇᴅ Bʏ Sʜᴀʙᴀɴ-Mᴅ ♡*`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("❌ An error occurred. Please try again later.");
    }
});

// Mp4 url

cmd({ 
    pattern: "mp4×", 
    alias: ["mp4×"], 
    react: "🎬", 
    desc: "Download YouTube video", 
    category: "main", 
    use: '.video < YouTube URL or Name >', 
    filename: __filename 
}, async (conn, mek, m, { from, q, reply }) => { 
    try { 
        if (!q) return reply("🔍 Please provide a YouTube URL or video name.");

        const yt = await ytsearch(q);
        if (!yt.results || yt.results.length === 0) return reply("❌ No results found!");

        const video = yt.results[0];
        const api = `https://apis-keith.vercel.app/download/ytmp4?url=${encodeURIComponent(video.url)}`;

        const res = await fetch(api);
        const json = await res.json();

        const result = json.result;

        const caption = `*🎬 SHABAN-MD YT MP4 EXTRA DOWNLOADER 🎬*

╭━━❐━⪼
┇๏ *Title* - ${result.title}
┇๏ *Quality* - ${result.quality}
┇๏ *Powered BY* - *SHABAN-MD*
╰━━❑━⪼`;

        // Send thumbnail
        await conn.sendMessage(from, {
            image: { url: result.thumbnail },
            caption
        }, { quoted: mek });

        // Send video
        await conn.sendMessage(from, {
            video: { url: result.download_url },
            mimetype: "video/mp4"
        }, { quoted: mek });

    } catch (err) {
        console.error(err);
        reply("⚠️ Error while downloading the video. Try again later.");
    }
});

//gifted mp4

cmd({ 
    pattern: "mp4", 
    alias: ["video"], 
    react: "🎬", 
    desc: "Download YouTube video", 
    category: "main", 
    use: '.video < YouTube URL or Name >', 
    filename: __filename 
}, async (conn, mek, m, { from, q, reply }) => { 
    try { 
        if (!q) return reply("🔍 Please provide a YouTube URL or video name.");

        // Check if it's a YouTube link or search keyword
        const isYTUrl = q.includes("youtube.com") || q.includes("youtu.be");
        let videoUrl;

        if (!isYTUrl) {
            const yt = await ytsearch(q);
            if (!yt.results || yt.results.length === 0) return reply("❌ No results found!");
            videoUrl = yt.results[0].url;
        } else {
            videoUrl = q.trim();
        }

        const api = `https://api.giftedtech.web.id/api/download/ytmp4?apikey=gifted&url=${encodeURIComponent(videoUrl)}`;
        const res = await fetch(api);
        const json = await res.json();

        if (!json.status || !json.result) return reply("❌ Failed to fetch video info.");

        const result = json.result;

        const caption = `*🎬 SHABAN-MD YT MP4 EXTRA DOWNLOADER 🎬*

╭━━❐━⪼
┇๏ *TITLE* - ${result.title}
┇๏ *QUALITY* - ${result.quality}
┇๏ *POWERED BY* - *SHABAN-MD*
╰━━❑━⪼`;

        // Send thumbnail
        await conn.sendMessage(from, {
            image: { url: result.thumbnail },
            caption
        }, { quoted: mek });

        // Send video
        await conn.sendMessage(from, {
            video: { url: result.download_url },
            mimetype: "video/mp4"
        }, { quoted: mek });

    } catch (err) {
        console.error(err);
        reply("⚠️ Error while downloading the video. Try again later.");
    }
});

//=========Giftedmp3================

cmd({ 
    pattern: "audio", 
    alias: ["audio"], 
    react: "🎤", 
    desc: "Download YouTube song",
    category: "main", 
    use: '.mp3 <YouTube URL or Song Name>', 
    filename: __filename 
}, 
async (conn, mek, m, { from, prefix, quoted, q, reply }) => {
    try {
        if (!q) return await reply("❌ Please provide a YouTube URL or song name.");

        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("❌ No results found!");

        const yts = yt.results[0];
        const apiUrl = `https://api.giftedtech.co.ke/api/download/ytmp3?apikey=gifted&url=${encodeURIComponent(yts.url)}`;

        const response = await fetch(apiUrl);
        const json = await response.json();

        if (!json.success || !json.result) {
            return reply("❌ Failed to fetch audio. Try again later.");
        }

        const res = json.result;

        let ytmsg = `*🎤 SHABAN-MD YT AUDIO DOWNLOADER 🎤*

╭━━❐━⪼
┇๏ *TITLE* -  ${res.title}
┇๏ *QUALITY* - ${res.quality}
╰━━❑━⪼
> *© Pᴏᴡᴇʀᴇᴅ Bʏ Sʜᴀʙᴀɴ-Mᴅ ♡*`;

        await conn.sendMessage(from, { image: { url: res.thumbnail }, caption: ytmsg }, { quoted: mek });

        // Send audio as audio file
        await conn.sendMessage(from, { audio: { url: res.download_url }, mimetype: "audio/mpeg" }, { quoted: mek });

        // Send audio as document file
        await conn.sendMessage(from, {
            document: { url: res.download_url },
            mimetype: "audio/mpeg",
            fileName: `${res.title}.mp3`,
            caption: `> *© Pᴏᴡᴇʀᴇᴅ Bʏ Sʜᴀʙᴀɴ-Mᴅ ♡*`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("❌ An error occurred. Please try again later.");
    }
});