const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactmodel"); 
// get all contacts
const getContacts=asyncHandler(async(req, res) => {
    const contacts=await Contact.find({ user_id: req.user.id});
    res.status(200).json(contacts);
});
const createContact=asyncHandler(async(req, res) => {
    console.log("The request body is:",req.body);
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }
    const contact=await Contact.create({
        user_id:req.user.id,
        name,
        email,
        phone,
    });
    res.status(201).json(contact);
});

const getContactId=asyncHandler(async(req, res) => {
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json(contact);
});
const updateContact=asyncHandler(async(req, res) => {
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("Not Authorized to Update the Contact");
    }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,{
        new:true
        }
    );
    res.status(200).json(updatedContact);
});
const deleteContact=asyncHandler(async(req, res) => {
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("Not Authorized to Delete the Contact");
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contact);
});

module.exports={getContacts,createContact,getContactId,updateContact,deleteContact};
