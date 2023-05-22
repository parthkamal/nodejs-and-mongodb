const express = require('express'); 

const router = express.Router(); 

const EmployeeController = require('../controllers/Employee');


router.get('/',EmployeeController.index);
router.get('/show',EmployeeController.show);
router.post('/store',EmployeeController.store);
router.post('/update',EmployeeController.update);
router.post('/delete',EmployeeController.destroy);

module.exports = router; 