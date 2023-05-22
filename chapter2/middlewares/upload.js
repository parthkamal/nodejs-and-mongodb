const path = require('path');//core module
const multer = require('multer');



//diskstorage engine gives you control about the destination and filename to be stored in the server side

const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, 'uploads/');
    }, 
    filename: function(request, file, callback){
        let ext = path.extname(file.originalname);
        callback(null, Date.now+ext); 
    }
});

//file filter engine  control which files should be uploaded and which should be skipped.

const upload = multer({
    storage: storage, 

    fileFilter: function(request, file, callback){
        if(file.mimetype== 'image/png'|| file.mimetype == 'image/jpg'){
            callback(null,true);
        }else {
            console.log('only jpg/png files are supported');
            callback(null, false);
        }
    }
})

module.exports = upload;