const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {addHostel,updateHostel,deleteHostel} =require('../controllers/hostelController')


router.post('/add-hostel',[
    check('name','Name is required').not().isEmpty(),
    check('location','Location is required').not().isEmpty(),
    check('rooms','Rooms is required').not().isEmpty(),
    check('capacity','Capacity is required').not().isEmpty(),
    check('vacant','Vacant is required').not().isEmpty()
],addHostel)


router.post('/update-hostel',[
    check('name','Name is required').not().isEmpty(),
    check('location','Location is required').not().isEmpty(),
    check('rooms','Rooms is required').not().isEmpty(),
    check('capacity','Capacity is required').not().isEmpty(),
    check('vacant','Vacant is required').not().isEmpty()
],updateHostel)

router.post('/delete-hostel',[
    check('name','Name is required').not().isEmpty()
],deleteHostel)

module.exports = router;
