const { Router } = require("express");
const indexController = require("../controllers/indexController");
const passport = require("passport");

const indexRouter = Router();

indexRouter.get("/", indexController.getIndex);
indexRouter.post(
	"/log-in",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/",
	}),
);
indexRouter.get("/log-out", (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
});
indexRouter.get("/advanced-settings", indexController.getAdvancedSettings);
indexRouter.post("/become-member", indexController.postBecomeMember);
indexRouter.post("/become-admin", indexController.postBecomeAdmin);
indexRouter.post("/send-message", indexController.postSendMessage);

module.exports = indexRouter;
