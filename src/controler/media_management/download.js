const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');

async function downloadMedia (URL,name,folder1,folder2,callback) {  
    const url = URL;
    const path = Path.resolve(folder1||'./public/', folder2||'media', name);
    const writer = Fs.createWriteStream(path);

    try {
        const response = await Axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });
    
        response.data.pipe(writer);
    
        new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        })
        return callback(true);
    } catch (error) {
        // loi cu phap
        return callback(false);
    }
}

async function deleteMedia(name,folder1,folder2,callback) {
    const path = Path.resolve(folder1||'./public/', folder2||'media', name);
    try {
        Fs.unlink(path, function (err) {
            if (err) {
                // khong tim dc file
                return callback(false)
            }
        }); 
    } catch (error) {
        // loi cu phap
        return callback(false);
    }
}


module.exports = {
    downloadMedia: downloadMedia,
    deleteMedia: deleteMedia,
}