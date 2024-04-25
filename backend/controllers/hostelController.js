const {verifyToken} = require('../utils/auth');
const {validationResult} = require('express-validator');
const { User, Hostel} = require('../models');
const bcrypt = require('bcryptjs');

const addHostel=async (req,res)=>{
    try{
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array()});
        }
        const {name,location,rooms,capacity,vacant,token}=req.body;
        try{
            if (!token) {
                return res.status(401).json({success, errors: [{msg: 'No token, authorization denied'}]});
            }
    
            const decoded = verifyToken(token);
    
            if (!decoded) {
                return res.status(401).json({success, errors: [{msg: 'Token is not valid'}]});
            }
            if(decoded.isAdmin!=='admin')
            {
                return res.status(400).json({success, errors: [{msg: 'Not authorized'}]});
            }
            let hostel=await Hostel.findOne({name});
            if(hostel)
            {
               
                return res.status(400).json({success, errors: [{msg: 'Hostel already exists'}]});
            }


      hostel= new Hostel({
        name,
        location,
        rooms,
        capacity,
        vacant
      })

      await hostel.save();
      success = true;
      res.json({success, hostel})
        }catch (error) {
            res.status(500).send('Server error');
        }
    }
    catch (err) {
        res.status(500).json({success, errors: [{msg: 'Server error'}]});
    }
}

const updateHostel =async (req,res)=>{
    try {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array()});
        }
        const {name,location,rooms,capacity,vacant,token}=req.body;
        try {
            if (!token) {
                return res.status(401).json({success, errors: [{msg: 'No token, authorization denied'}]});
            }
    
            const decoded = verifyToken(token);
    
            if (!decoded) {
                return res.status(401).json({success, errors: [{msg: 'Token is not valid'}]});
            }
            if(decoded.isAdmin==='student')
            {
                return res.status(400).json({success, errors: [{msg: 'Not authorized'}]});
            } 
            let hostel=await Hostel.findOne({name});

            if (!hostel) {
                return res.status(400).json({success, errors: [{msg: 'Hostel does not exists'}]});
            }
            
            
            hostel.name = name;
            hostel.location = location;
            hostel.rooms = rooms;
        hostel.capacity = capacity;
            hostel.vacant = vacant;
          
            await hostel.save();
            success = true;
      res.json({success, hostel})
        }
        catch (error) {
            res.status(500).send('Server error');
        }
    }
    catch (err) {
        res.status(500).json({success, errors: [{msg: 'Server error'}]});
    }
}

const deleteHostel=async (req,res)=>{
    try{
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array()});
        }
        const {name,token}=req.body
        if (!token) {
            return res.status(401).json({success, errors: [{msg: 'No token, authorization denied'}]});
        }
        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({success, errors: [{msg: 'Token is not valid'}]});
        }
        if(decoded.isAdmin!=='admin')
        {
            return res.status(400).json({success, errors: [{msg: 'Not authorized'}]});
        }
        let hostel=await Hostel.findOne({name});
        if(!hostel)
        {
            return res.status(400).json({success, errors: [{msg: 'Hostel does not exists'}]});
        }
        await Hostel.deleteOne(hostel);
        success = true;
        res.json({success, msg: 'Hostel deleted'});
    }
    catch (error) {
        res.status(500).send('Server error');
    }
}

module.exports = {
    addHostel,
    updateHostel,
    deleteHostel
}