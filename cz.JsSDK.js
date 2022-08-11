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
const cz_WriteTofile = (path,token,prefix) => {
    fs.writeFileSync(`${path}/discord_bot.js`, `const {Client} = require('discord.js') \n const config = { token: '${token}', prefix: '${prefix}'}\n const client = new Client({ Intents: ["GUILD_MESSAGING", "GUILDS"] } \n client.on('ready', () => { console.log('Logged in') } ; \n client.login(config.token)`);
}

const czRunTimeService = (app,path, { name = '', type = '', author = '' }) => {
    setTimeout(() => {
        const MainDir = fs.mkdir(`${path}/data/runtime/`, { recursive: true }, () => { });
        fs.writeFileSync(`${path}/data/runtime/${app}.config.js`,
            `
			const RunBroker = {serviceApp: '${app}', serviceName: '${name}', serviceType: '${type}', serviceAuthor: '${author}'}; \n
			 console.log('ServiceWorker: ${app} has now started!')
			module.exports = { RunBroker }`)

    }, 3000)
}
module.exports = {
    FileCreator,
    FolderCreator,
    cz_CreateProjectPath,
    cz_WriteTofile,
    czRunTimeService
}