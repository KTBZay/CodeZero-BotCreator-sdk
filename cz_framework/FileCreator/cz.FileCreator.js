const fs = require('fs');

const FileCreator = (path, data) => {
    fs.writeFileSync(`${path}`, `${data}`);
}

module.exports = {
    FileCreator
}