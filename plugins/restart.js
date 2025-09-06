const { cmd, commands } = require("../command");
const { sleep } = require("../lib/functions");

cmd({
    pattern: "restart",
    desc: "Restarting the bot ShabanMd",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, senderNumber, reply
}) => {
    try {
        // Bot owner ka number nikalna
        const botOwner = conn.user.id.split(":")[0]; 
        if (senderNumber !== botOwner) {
            return reply("Only the bot owner can use this command.");
        }

        reply("♻️ Restarting bot...");
        await sleep(1500);

        // pm2 ke bajaye direct restart
        process.exit(0);

    } catch (e) {
        console.error(e);
        reply(`${e}`);
    }
});
