const config = require('../config')
const {cmd , commands} = require('../command')
cmd({
    pattern: "about",
    alias: ["teams","helpers"], 
    react: "👑",
    desc: "get owner dec",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let about = `
*╭━━〔 SHABAN-MD 〕━━┈⊷*

*👋 HELLO ${pushname}*

*╰──────────────┈⊷*
*╭━━━〔 ABOUT 〕━━━┈⊷*
*┃★╭──────────────*
*┃★│* *Wᴇʟᴄᴏᴍᴇ Eᴠᴇʀʏᴏɴᴇ*
*┃★│* *Cʀᴇᴀᴛᴇʀ : Mʀ Sʜᴀʙᴀɴ42*
*┃★│* *Rᴇᴀʟ Nᴀᴍᴇ : Sʜᴀʙᴀɴ*
*┃★│* *Pᴜʙʟɪᴄ Nᴀᴍᴇ : Sʜᴀʙᴀɴ-Mᴅ*
*┃★│* *Aɢᴇ : 22 Yᴇᴀʀ*
*┃★│* *Cɪᴛʏ : Mᴀɴᴅɪ Sᴀᴅɪǫ Gᴜɴᴊ*
*┃★│* *Sɪᴍᴘʟᴇ Wʜᴀᴛsᴀᴘᴘ Bᴏᴛ*
*┃★╰──────────────*
*╰━━━━━━━━━━━━━━━┈⊷*
> *◆◆◆◆◆◆◆◆◆◆◆◆*

*[ • SPECIAL THANKS FOR • ]*
*╭━━━〔 THANKS TO 〕━━━┈⊷*
*┃★╭──────────────*
*┃★│* *▢Bᴀɴᴅᴀʜᴇᴀʟɪ*
*┃★│* *▢Sᴀᴍɪ Rᴀᴊᴘᴜᴛ*
*┃★│* *▢Mɪsʙʜᴀ Uʟ Hᴀǫ*
*┃★│* *▢Usᴍᴀɴ Kʜᴀɴ*
*┃★│* *▢Jᴀᴡᴀᴅ Kʜᴀɴ*
*┃★╰──────────────*
*╰━━━━━━━━━━━━━━━┈⊷*

*•────────────•⟢*
> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ sʜᴀʙᴀɴ
*•────────────•⟢*
`

await conn.sendMessage(from,{image:{url:`https://i.ibb.co/sJj4BNR3/shaban-md.jpg`},caption:about,
                             contextInfo: {
    mentionedJid: [m.sender],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363358310754973@newsletter',
      newsletterName: 'MR-SHABAN42',
      serverMessageId: 999
    }
  }
}, { quoted: mek });
} catch (e) {
console.log(e)
reply(`${e}`)
}
})