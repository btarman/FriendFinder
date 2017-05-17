var friendsData = require("../data/friends")

module.exports = function(app) {

	app.get("/api/friends", function(req, res) {
  		return res.json(friendsData);
	});

	app.post("/api/friends", function(req, res) {
		var newFriend = req.body;

		var bestMatch = {}
		
		for (var i = 0; i < newFriend.answers.length; i++) {
			newFriend.answers[i] = parseInt(newFriend.answers[i]);
		}

		var bestMatchIndex = 0;
		var bestMatchDifference = 40;

		for (var i = 0; i < friendsData.length; i++) {
			var totalDifference = 0;
			for (var j = 0; j < friendsData[i].answers.length; j++) {
				var diffOneAnswer = Math.abs(friendsData[i].answers[j] - newFriend.answers[j]);
				totalDifference += diffOneAnswer;
			}
			if (totalDifference < bestMatchDifference) {
				bestMatchIndex = i;
				bestMatchDifference = totalDifference;
			}
		}
		bestMatch = friendsData[bestMatchIndex];
		friendsData.push(newFriend);
		res.json(bestMatch)
		
	})
	app.post("/api/clear", function() {
		friendsData = []
	})

}



