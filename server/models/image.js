const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
	filename:
	{
		type: String,
		unique: true,
		required : true
	},
	contentType:{
		type: String,
		required: true
	},
	imageBase64:{
		type: String,
		required: true
	},
	author: {
      id: {
         type: Schema.Types.ObjectId,
         ref: "User"
      },
      username: String,
	  email : String
   }
});

module.exports = ImageModel = mongoose.model('uploads',imageSchema);
