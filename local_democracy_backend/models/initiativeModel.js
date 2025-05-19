const mongoose = require("mongoose");

const initiativeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        type: {
            type: String,
            required: true,
            trim: true,
            enum: ["Environment", "Education", "Health", "Community", "Other"], // you can adjust the list
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Initiative = mongoose.model("Initiative", initiativeSchema);
module.exports = Initiative;
