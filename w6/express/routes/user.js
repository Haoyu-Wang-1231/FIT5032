const express = require('express');
const router = express.Router();

// user
// user/new
// user/4

// /user/
router.get("/",(req, res)=> {
    res.send("User List");

});

// /user/new
router.get("/new",(req, res)=> {
    res.send("new");
});

// /user/4
router.get("/:id",(req, res)=> {
    // const id = req.params.id;
    res.send("User id: " + req.params.id);
});


module.exports = router;


