const fs = require('fs');
const express = require('express');
const path = require('path');
const config = require('config');
const {fsCreateFolder, fsWatcher} = require( "../fs/fs-worker");


const router = express.Router();
const jsonParser = express.json();

router.get('/root', async (req,res) => {
    const result = await Promise.resolve(fsWatcher());
    res.send(result)
});

router.get('/media', jsonParser, async (req,res) => {
    const { f } = req.query;
    const result = await Promise.resolve(fsWatcher(f));
    res.send(result);
});
router.get('/document', jsonParser, async (req,res) => {
    const { fp } = req.query;
    const filePath = path.join(config.get('rootDirectory'), fp);
    // const file = fs.createReadStream(filePath);
    // const stat = fs.statSync(filePath);
    // res.setHeader('Content-Length', stat.size);
    // res.setHeader('Content-Type', 'application/pdf');
    // file.pipe(res);
    console.log(path.join(config.get('rootDirectory'), fp));
    res.sendFile(path.join(config.get('rootDirectory'), fp));
})

router.post('/create', jsonParser, async (req, res) => {
    const {path} = req.body;
    if (path) {
        const result = await Promise.resolve(fsCreateFolder(path));
        res.send(result);
    } else {
        res.status(400).send('Не указана папка');
    }
});

router.post('/remove-folder', jsonParser, async (req,res) => {
    const { fp } = req.body;
    const filePath = path.join(config.get('rootDirectory'), fp);
    if (filePath) {
        await fs.rmdir(filePath, {recursive: true}, (result, err) => {
            if (err) res.send(err);
            res.send({response: 'succeed'});
        })
    }
})

router.post('/upload-files', jsonParser, async (req, res) => {
    const { dp } = req.query;
    console.log(req.files);
    // const directoryPath = dp? path.join(config.get('rootDirectory'), dp) : config.get('rootDirectory');
    // for (let i = 0; i < req.files.length; i++) {
    //     const newFile = `${directoryPath}/${req.files.uploadingFiles[i].name}`;
    //     fs.writeFileSync(newFile, req.files.uploadingFiles[i]);
    // }
    // console.log('Успешно');
    // res.status(204).send('files upload');
})

router.post('/upload', jsonParser, async (req,res) => {
    // console.log(req);
    // const writeStream = fs.createWriteStream(path.join(config.get('rootDirectory'), 'X7'));
    // req.pipe(writeStream);
    // req.on('end', () => {
    //     res.status(201).send('Файл успешно загружен на сервер');
    // });
    // writeStream.on('error', (err) => {
    //     console.log(err);
    // })
    // const writeStream = fs.createWriteStream(path.join(config.get('rootDirectory'), 'X7'));
    // req.pipe(writeStream);
    // req.on('end', next);
    // writeStream.on('error', err => {
    //     console.log(err)
    // })
    // console.log(req.body);
    // if (!req.files || Object.keys(req.files).length === 0) {
    //     return res.status(400).send('No files were uploaded.');
    // }
    //
    // // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    // let file = req.files.file;
    //
    // // Use the mv() method to place the file somewhere on your server
    // file.mv(path.join(config.get('rootDirectory'), 'X7'), function(err) {
    //     if (err)
    //         return res.status(500).send(err);
    //
    //     res.send('File uploaded!');
    // });
});

router.get('/video', jsonParser, async (req,res) => {
    const { v } = req.query;
    const endPath = path.join(config.get('rootDirectory'), v);
    const stats = fs.statSync(endPath);
    const size = stats.size;
    const range = req.headers.range;
    if (range) {
        const parts = range.replace('bytes=', '').split('-');
        const start = parseInt(parts[0]);
        const end = parts[1] ? parseInt(parts[1]): size - 1;
        const chunkSize = (end - start) + 1;
        const file = fs.createReadStream(endPath, {start, end});
        res.writeHead(206,
            {
            'Content-Range': `bytes ${start}-${end}/${size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4',
            });
        file.pipe(res);
    } else {
        res.writeHead(206,
            {
                'Content-Length': size,
                'Content-Type': 'video/mp4'
            }
        );
        fs.createReadStream(endPath).pipe(res);
    }
});

module.exports = router;
