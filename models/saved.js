var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var SavedRecipeSchema   = new Schema({
    name: String,
    recipeID: String, //From Yummly API
    user: {
        type: mongoose.Schema.Types.ObjectId, // Object ID of user the recipe belongs to
        ref: 'User'
    },
    savedDate: Date
});

module.exports = mongoose.model('SavedRecipe', SavedRecipeSchema);