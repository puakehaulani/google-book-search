const router = require("express").Router();
const googleController = require("../../controllers/googleController");

// Matches with "/api/google"
router.route("/google")
    .get(googleController.googleBook)

module.exports = router;