const { User } = require('discord.js');
const fs = require('node:fs');
const { configuration, UserData } = require('../../../config');
const ProjectSpace = () => {
    console.log('TERM: We are creating files for your work enviroment')
    if (UserData.User_Project_Data.IsWorkSpace === true) {
        if (configuration.SystemHosted === true) {
            throw 'You cannot host a bot and work at the same tome Errx. 2'
        } else {
            fs.mkdirSync(UserData.User_Project_Data.path, { recursive: true })
        }
        if (!fs.existsSync(`${UserData.User_Project_Data.path}/commands`)) {
            fs.mkdirSync(`${UserData.User_Project_Data.path}/commands`)
        }
        if (!fs.existsSync(`${UserData.User_Project_Data.path}/events`)) {
            fs.mkdirSync(`${UserData.User_Project_Data.path}/events`)
        }
        setTimeout(() => {
            fs.writeFileSync(`${UserData.User_Project_Data.path}/deploy.js`, `
        const fs = require('node:fs');\n
        const path = require('node:path');\n
        const { Client, Collection } = require('discord.js');\n
        const { REST } = require('@discordjs/rest')\n
        const { Routes } = require('discord-api-types/v9');\
        const commands = [];
        const commandsPath = path.join(__dirname, './commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {\n
         const filePath = path.join(commandsPath, file);\n
         const command = require(filePath);\n
         console.log('loaded cmds: ' + file)\n
         commands.push(command.data.toJSON());\n
    }\n

         const rest = new REST({ version: '10' }).setToken("${configuration.Discord_Bot_Token}");\n

         rest.put(Routes.applicationCommands("${configuration.Discord_Bot_ID}"), { body: commands })\n
            .then(() => console.log('Successfully registered application commands.'))\n
            .catch(console.error);\n
`)
            fs.writeFileSync(`${UserData.User_Project_Data.path}/main.js`, `
        const fs = require('node:fs');\n
        const path = require('node:path');\n
        const { Client, Collection, Intents } = require('discord.js');\n
        const client = new Client({ intents: [Intents.FLAGS.GUILDS] });\n
        client.commands = new Collection();\n
        const commandsPath = path.join(__dirname, './commands');\n
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));\n
        for (const file of commandFiles) {\n
            const filePath = path.join(commandsPath, file);\n
            const command = require(filePath);\n
            client.commands.set(command.data.name, command);\n
        }
        const eventsPath = path.join(__dirname, './events');\n
        const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));\n

        for (const file of eventFiles) {\n
            const filePath = path.join(eventsPath, file);\n
            const event = require(filePath);\n
            console.log('Loaded Events: ' + file)\n
            if (event.once) {\n
                client.once(event.name, (...args) => event.execute(...args));\n
            } else {\n
                client.on(event.name, (...args) => event.execute(...args));\n
            }\n
            client.on('interactionCreate', async interaction => {\n

                const command = client.commands.get(interaction.commandName);\n

                if (!command) return;\n

                try {\n
                    await command.execute(interaction);\n
                } catch (error) {\n
                    console.error(error);\n
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });\n
                }\n
            });
        client.login("${configuration.Discord_Bot_Token}")
}

`)
            fs.writeFileSync(`${UserData.User_Project_Data.path}/deploy-to-app.cmd`, `node ./deploy.js \n pause`)
            fs.writeFileSync(`${UserData.User_Project_Data.path}/run-bot.cmd`, `node ./main.js \n pause`)

        }, 3000)
    }
}
    

    module.exports = {
        ProjectSpace

    }