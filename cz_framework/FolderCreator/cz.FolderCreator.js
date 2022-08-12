const fs = require('fs');

const FolderCreator = (path) => {
    if (!fs.existsSync) {
        fs.mkdirSync(path, { recursive: true });
    }
}

module.exports = {
    FolderCreator
}