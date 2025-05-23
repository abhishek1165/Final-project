const express = require('express');
const router = express.Router();
const { createComplaint, getAllComplaints } = require('../Controllers/complaintController');

router.post('/complaints', createComplaint);
router.get('/complaints', getAllComplaints);

module.exports = router;
