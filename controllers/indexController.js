async function getIndex(req, res) {
	try {
		res.render("index", { title: "Members Only" });
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	getIndex,
};
