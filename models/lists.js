var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GroceryListSchema   = new Schema({
	// name: String,
    user: {
        type: mongoose.Schema.Types.ObjectId, // Object ID of user the recipe belongs to
        ref: 'User'
    },
    itemList: [String],
    // dateCreated: Date,
});

module.exports = mongoose.model('GroceryList', GroceryListSchema);