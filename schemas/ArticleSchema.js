var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: String,
    html: String,
    userId: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'gm_user'
	}],
});

module.exports = ArticleSchema;