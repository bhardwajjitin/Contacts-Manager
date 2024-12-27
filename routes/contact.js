const express = require("express");
const router = express.Router();
const { getContacts, createContact, getContactId, updateContact, deleteContact } = require("../controllers/contact");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken)
router.route("/").get(getContacts);
router.route("/").post(createContact);

router.route("/:id").get(getContactId);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

module.exports = router;