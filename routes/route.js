
const express = require("express");
const router = express.Router();
const {signup,login} = require("../controllers/controller")
const {encryptPassword} = require("../middlewares/middlewares")

router.post("/signup",encryptPassword,signup);
router.post("/signin",login)



module.exports = router;