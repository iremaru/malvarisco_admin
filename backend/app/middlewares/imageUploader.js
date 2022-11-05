const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images');
    },
    filename: (req, file, callBack) => {
        let filetype = '';
        if (file.mimetype === 'image/gif') filetype = 'gif';
        if (file.mimetype === 'image/png') filetype = 'png';
        if (file.mimetype === 'image/jpeg') filetype = 'jpg';
        if (file.mimetype === 'image/webp') filetype = 'webp';
        callBack(null, 'image-' + Date.now() + '.' + filetype);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
