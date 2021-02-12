const mongoose = require("mongoose");

// schema of the meme
const MemeSchema = mongoose.Schema({
    name: {
        type: String
    },
    caption: {
        type: String
    },
    url: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

MemeSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) { delete ret._id }
});

module.exports = mongoose.model("Meme", MemeSchema);
