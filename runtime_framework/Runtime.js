'use-static';

const { UserData } = require("../../../config");

const  fs  = require('fs')
const MainDir = fs.mkdir(`${UserData.User_Project_Data.path}/data/runtime/`, { recursive: true }, () => { });

const czRunTimeService = (app, { name = '', type = '', author = '' }) => {
	setTimeout(() => {
		fs.writeFileSync(`${UserData.User_Project_Data.path}/data/runtime/${app}.config.js`,
			`
			const RunBroker = {serviceApp: '${app}', serviceName: '${name}', serviceType: '${type}', serviceAuthor: '${author}'}; \n
			 console.log('ServiceWorker: ${app} has now started!')
			module.exports = { RunBroker }`)
		
	}, 3000)
}
module.exports = czRunTimeService;