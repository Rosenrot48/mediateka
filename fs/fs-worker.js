const fs = require('fs');
const path = require('path');
const util = require('util');
const config = require('config');


const fsReadDir = util.promisify(fs.readdir);

const fsWatcher = (appendPath) => {
    return new Promise(async (res,rej) => {
        console.log(appendPath);
        if (appendPath) {
            // console.log(path.join(config.get('rootDirectory'), appendPath));
            res(await fsReadDir(path.join(config.get('rootDirectory'), appendPath)).catch(err => console.log(err)));
        } else {
            // console.log(path.join(config.get('rootDirectory')));
            res(await fsReadDir(path.join(config.get('rootDirectory'))).catch(err => console.log(err)));
        }
        rej(new Error('Не найдена такая директория'));
    })
};

const fsStat = (path) => {
    const stats = fs.statSync(path);
    // console.log(stats);
    return(stats);
};

const fsCreateFolder = (appendPath) => {
    // console.log(path.join(config.get('rootDirectory'), appendPath));
    return new Promise( async(res, rej) => {
        fs.mkdir(path.join(config.get('rootDirectory'), appendPath), {recursive: true}, (error, result) => {
            if (error) {
                console.log(`Произошла ошибка: ${error}`);
                rej(new Error(`Произошла ошибка: ${error}`));
            } else {
                console.log('Папка успешно создана');
                console.log(result);
                res({
                    result: 'Папка успешно создана'
                })
            }
        });
    })
};

module.exports = {
    fsWatcher,
    fsStat,
    fsCreateFolder
};
