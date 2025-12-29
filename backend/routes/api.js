import expresss from 'express'
import {uploadController,downloadController}  from '../controller/uploadController.js';
import storage from '../middleware/upload.js';
const router =expresss.Router();
router.post('/upload',storage.single('file'),uploadController);
router.get('/files/:fileId',downloadController);
export default router;