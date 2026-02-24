function isAuth(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(401).send("You are not authenticated. Please log in.");
	}
}

function isMember(req, res, next) {
	if (req.user.membership_status) {
		next();
	} else {
		res
			.status(401)
			.send("You are not a member. Please become member to continue.");
	}
}

function isAdmin(req, res, next) {
	if (req.user.admin_status) {
		next();
	} else {
		res
			.status(401)
			.send("You are not a Admin. Please become admin to continue.");
	}
}

module.exports = {
	isAuth,
	isMember,
	isAdmin,
};
