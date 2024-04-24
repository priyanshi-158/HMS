const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { requestLeave, countLeave, listLeave, updateLeave } = require('../controllers/leaveController');

// @route   request api/leave/request
// @desc    Request for mess off
// @access  Public
router.post('/request', [
    check('student', 'Student ID is required').not().isEmpty(),
    check('leaving_date', 'Leaving date is required').not().isEmpty(),
    check('return_date', 'Return date is required').not().isEmpty()
], requestLeave);

// @route   GET count of request api/leave/count
// @desc    Get all mess off requests
// @access  Private
router.post('/count', [
    check('student', 'Student ID is required').not().isEmpty()
], countLeave);

// @route   GET list of request api/leave/list
// @desc    Get all mess off requests
// @access  Public
router.post('/list', [
    check('hostel', 'Hostel is required').not().isEmpty()
], listLeave);

// @route   POST update request api/leave/update
// @desc    Update mess off request
// @access  Public
router.post('/update', [
    check('id', 'ID is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty()
], updateLeave);

module.exports = router;