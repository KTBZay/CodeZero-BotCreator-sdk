const fs = require('fs');

const FileCreator = (path, data) => {
    fs.writeFileSync(`${path}`, `${data}`);
}
const FolderCreator = (path) => {
    if (!fs.existsSync) {
        fs.mkdirSync(path, { recursive: true });
    } else if (fs.existsSync(path)) {
        throw "This Folder was always created"
    }
}
const cz_CreateProjectPath = (path) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
    }
}
const cz_WriteTofile = (path) => {
    fs.writeFileSync(`${path}/discord_bot.js`, `const {Client} = require('discord.js') \n const config = { token: '${configuration.Discord_Bot_Token}', prefix: '${configuration.Discord_Bot_Prefix}'}\n const client = new Client({ Intents: ["GUILD_MESSAGING", "GUILDS"] } \n client.on('ready', () => { console.log('Logged in') } ; \n client.login(config.token)`);
}
module.exports = {
    FileCreator,
    FolderCreator,
    cz_CreateProjectPath,
    cz_WriteTofile
}