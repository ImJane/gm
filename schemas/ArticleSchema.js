var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	// 标题
    title: { type: String, required: true },
    // 内容
    content: { type: String, required: true },
    // 创建时间
    created_time: { type: Number, default: new Date().getTime() }, 
    // 关联用户id
    author: {
		type: Schema.Types.ObjectId,
		ref: 'gm_user'
	},
});

module.exports = ArticleSchema;