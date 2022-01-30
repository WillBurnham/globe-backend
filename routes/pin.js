var express = require("express");
var PinController = require("../controllers/PinController");

var router = express.Router();

router.get("/", PinController.getAll);
router.post("/", PinController.createPin);
router.put("/", PinController.updatePin);
router.delete("/", PinController.deletePin);

module.exports = router;