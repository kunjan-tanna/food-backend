const express = require("express");
const router = express.Router();

const {
   createrole,
   getroleById,
   getrole,
   getAllrole,
   updaterole,
   deleterole,
} = require("../controllers/role");

//Get Parameter of role
router.param("roleId", getroleById);

//Create role  Route
router.post("/create/role", createrole);

//Read role  Route
router.get("/get/role/:roleId", getrole);
router.get("/role", getAllrole);

//Update role Route
router.put("/edit/role/:roleId", updaterole);

//Delete role Route
router.delete("/delete/role/:roleId", deleterole);

module.exports = router;
