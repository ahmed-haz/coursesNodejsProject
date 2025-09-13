const {getAllUsers, register, login} = require('../controllers/userController');
const express = require('express');
const verifyToken = require('../middleware/verifytoken')
const router = express.Router();
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const extension = file.mimetype.split('/')[1];
      const filename = 'user-' + Date.now() + '.' + extension;
      cb(null, filename)
    }
})
const fileFilter = (req, file, cb) => {
    if(file.mimetype.split('/')[0] === 'image'){
        cb(null, true);
    }
    else{
        return cb(appError.create("Only image files are allowed", 400, ERROR), false);
    }
}
const upload = multer({ 
                        storage: storage,
                        fileFilter
                      });

router.route('/').get(getAllUsers);
router.route('/register').post(upload.single('avatar'), register);
router.route('/login').post(login);


module.exports = router;