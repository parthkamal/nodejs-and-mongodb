const express = require('express'); 

const router = express.Router(); 

const EmployeeController = require('../controllers/Employee');

const upload = require('../middlewares/upload');
const authenticate = require('../middlewares/authenticate');



router.get('/',authenticate,EmployeeController.index);
router.get('/show',EmployeeController.show);
router.post('/store',upload.single('avatar'),EmployeeController.store);
router.post('/update',EmployeeController.update);
router.post('/delete',EmployeeController.destroy);

module.exports = router; 
