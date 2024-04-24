const express = require('express');
const { check } = require('express-validator');
const { registerWarden, updateWarden, getWarden, getHostel, deleteWarden } = require('../controllers/wardenController');
const router = express.Router();

// @route  POST api/admin/register-admin
// @desc   Register admin
// @access Public
router.post('/register-warden', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('father_name', 'Father name is required').not().isEmpty(),
    check('contact', 'Enter a valid contact number').isLength(10),
    check('address', 'Address is required').not().isEmpty(),
    check('dob', 'Date of birth is required').not().isEmpty(),
    check('aadhar', 'Aadhar Number is required').isLength(12),
    check('password', 'Password is required').isLength(8),
    check('hostel', 'Hostel is required').not().isEmpty()
], registerWarden);

// @route  POST api/admin/update-admin
// @desc   Update admin
// @access Public
router.post('/update-warden', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('contact', 'Enter a valid contact number').isLength(10),
    check('address', 'Address is required').not().isEmpty(),
    check('dob', 'Date of birth is required').not().isEmpty(),
    check('aadhar', 'Aadhar is required').isLength(12),
    check('password', 'Password is required').isLength(8)
], updateWarden);

// @route  POST api/admin/get-admin
// @desc   Get admin by email
// @access Public
router.post('/get-warden', [
    check('isAdmin', 'isAdmin is required').notEmpty(),
    check('token', 'Token is required').notEmpty(),
], getWarden);

// @route  POST api/admin/get-hostel
// @desc   Get hostel by name
// @access Public
router.post('/get-hostel', [
    check('id', 'Id is required').notEmpty(),
], getHostel);

// @route  POST api/admin/delete-admin
// @desc   Delete admin
// @access Public
router.post('/delete-warden', [
    check('email', 'Please include a valid email').isEmail()
], deleteWarden);

module.exports = router;