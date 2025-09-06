const { cmd } = require("../command");


cmd({
pattern: "demote",
alias: ["d", "dismiss", "removeadmin"],
desc: "Demote a group admin",
category: "group",
react: "💀",
filename: __filename
}, async (conn, mek, m, {
from,
isCreator,
isBotAdmins,
isAdmins,
isGroup,
quoted,
reply,
botNumber
}) => {
try {
if (!isGroup) return reply("⚠️ This command only works in groups.");
if (!isBotAdmins) return reply("❌ I must be admin to demote someone.");
if (!isAdmins && !isCreator) return reply("🔐 Only group admins or owner can use this command.");

// Consistent user extraction logic  
if (!m.quoted && (!m.mentionedJid || m.mentionedJid.length === 0)) {  
  return reply("❓ You did not give me a user to demote!");  
}  

let users = m.mentionedJid[0]  
  ? m.mentionedJid[0]  
  : m.quoted  
  ? m.quoted.sender  
  : null;  

if (!users) return reply("⚠️ Couldn't determine target user.");  

// Protection checks  
if (users === botNumber) return reply("🤖 I can't demote myself!");  
const ownerJid = conn.user.id.split(":")[0] + '@s.whatsapp.net';  
if (users === ownerJid) return reply("👑 I can't demote the owner!");  

await conn.groupParticipantsUpdate(from, [users], "demote");  
reply(`*✅ Admin Successfully demoted to a normal member.*`, { mentions: [users] });

} catch (err) {
console.error(err);
reply("❌ Failed to demote. Something went wrong.");
}
});