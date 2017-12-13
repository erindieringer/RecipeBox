var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GroceryListSchema   = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Object ID of user the recipe belongs to
        ref: 'User'
    },
    itemList: [String],
});

module.exports = mongoose.model('GroceryList', GroceryListSchema);