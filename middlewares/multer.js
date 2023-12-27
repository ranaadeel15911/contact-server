const multer = require('multer')


//define storage

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './upload');
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer(
    { storage: storage,
    limits:{
        fieldSize:1024 * 1024 * 3
    } }
    );

    module.exports  = upload