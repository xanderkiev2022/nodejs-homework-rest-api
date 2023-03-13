const express = require("express");
const router = express.Router();
const ctrlTask = require("../../src/controllers/contactsController");

router.get("/", ctrlTask.getAll);
router.get("/:contactId", ctrlTask.getById);
router.post("/", ctrlTask.add);
router.put("/:contactId", ctrlTask.update);
router.delete("/:contactId", ctrlTask.remove);
router.patch("/:contactId/favorite", ctrlTask.updateStatus);

module.exports = router; 
