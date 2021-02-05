const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Multer = require('multer');
const uploadController = require('../controllers/upload-controller');

const multer = Multer({
    storage: Multer.memoryStorage()
});

router.get('/test', auth, uploadController.upload_test);
router.post('/new', [auth, multer.single('file')], uploadController.upload_new);
router.get('/all', auth, uploadController.upload_get_user_uploads);
router.get('/read/:id', auth, uploadController.upload_read_text);
router.delete('/delete/:id', auth, uploadController.upload_delete);

module.exports = router;