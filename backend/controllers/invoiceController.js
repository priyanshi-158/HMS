const { validationResult } = require('express-validator');
const { Invoice, Leave, Student } = require('../models');
const { Mess_bill_per_day } = require('../constants/mess');

// @route   Generate api/invoice/generate
// @desc    Generate invoice
// @access  Public
exports.generateInvoices = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { hostel } = req.body;
    const students = await Student.find({ hostel })
    const invoices = await Invoice.find({ student: { $in: students }, date: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } })
    console.log(invoices)
    const studentIdsWithInvoices = invoices.map(invoice => invoice.student.toString());
    const genstuds = students.filter(stud => !studentIdsWithInvoices.includes(stud._id.toString()));
    console.log(genstuds)
    if (genstuds.length===0) {
        return res.status(400).json({ errors: 'Invoices already generated', success });
    }

    // get days in previous month
    let daysinlastmonth = new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate();

    console.log(Mess_bill_per_day);
    let amount = Mess_bill_per_day * daysinlastmonth;
    count = 0;
    genstuds.map(async (student) => {
        let leave = await Leave.find({ student: student });
        if (leave) {
            leave.map((leaveone) => {
                if (leaveone.status === 'approved' && leaveone.return_date.getMonth() + 1 === new Date().getMonth()) {
                    console.log(leaveone);
                    let leaving_date = leaveone.leaving_date;
                    let return_date = leaveone.return_date;
                    let number_of_days = (return_date - leaving_date) / (1000 * 60 * 60 * 24);
                    amount -= Mess_bill_per_day * number_of_days;
                }
            });
        }

        console.log(amount);
        try {
            let invoice = new Invoice({
                student,
                amount
            });
            await invoice.save();
            count++;
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });
    success = true;
    res.status(200).json({ success, count });
}

// @route   GET api/invoice/getbyid
// @desc    Get all invoices
// @access  Public
exports.getInvoicesbyid = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { hostel } = req.body;
    let student = await Student.find({ hostel: hostel });
    try {
        let invoices = await Invoice.find({ student: student }).populate('student', ['name', 'room_no', 'roll_no']);
        success = true;
        //console.log(invoices);
        res.status(200).json({ success, invoices });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// @route   GET api/invoice/student
// @desc    Get all invoices
// @access  Public
exports.getInvoices = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { student } = req.body;
    try {
        let invoices = await Invoice.find({ student: student });
        success = true;
        res.status(200).json({ success, invoices });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// @route   GET api/invoice/update
// @desc    Update invoice
// @access  Public
exports.updateInvoice = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    const { student, status } = req.body;
    try {
        let invoice = await Invoice.findOneAndUpdate({ student: student, date: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } }, { status: status });
        success = true;
        res.status(200).json({ success, invoice });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
