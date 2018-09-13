var mongoose = require('mongoose');
var ArticleSchema = require('../schemas/ArticleSchema');
var Article = mongoose.model('gm_article', ArticleSchema);
module.exports = Article;