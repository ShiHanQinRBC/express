const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

// Gets all members
// Able to use just a / because api/members is already defined in index.js
router.get('/', (req, res) => {
    res.json(members);
});

//Get single member:
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id)); //Will return t/f about if some satisfy it
    if (found ) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        //400 code means it's a bad request
        res.status(400).json({ msg: `No member with the id of ${req.params.id} found` });
    } 
});

//Create member
router.post('/', (req, res) => {
    //creating a new member
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please include a name and email' });
    } 

    members.push(newMember);
    res.json(members);
});

//Update member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id)); //Will return t/f about if some satisfy it
    if (found ) {
        const updMember = req.body; //Gets name and email
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) { //If the id matches...
                member.name = updMember.name ? updMember.name : member.name; //In case they only wanna update either name or email not both
                member.email = updMember.email ? updMember.email : member.email;

                res.json({ msg: 'Member updated', member });
            }
        });
    } else {
        //400 code means it's a bad request
        res.status(400).json({ msg: `No member with the id of ${req.params.id} found` });
    } 
});

//Delete single member:
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id !== parseInt(req.params.id)); //Will return t/f about if some satisfy it
    if (found ) {
        res.json({ 
            msg: 'Member deleted',
            members: members.filter(member => member.id !== parseInt(req.params.id))});
    } else {
        //400 code means it's a bad request
        res.status(400).json({ msg: `No member with the id of ${req.params.id} found` });
    } 
});
module.exports = router;