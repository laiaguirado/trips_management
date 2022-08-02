const mongoose = require("mongoose");
const extendSchema = require("mongoose-extend-schema");
const { componentSchema } = require("../component.model");

const restorationSchema = extendSchema(componentSchema, {
    web: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        maxlength: [250, "'{VALUE}' is too long"],
    },
    location: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        uniqueCaseInsensitive: true,
        required: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, " '{VALUE}' is invalid"],
        immutable: true,
    },
    kindOfFood:{
        type: String,
    },
    minPrice:{
        type: Number,
    },
    maxPrice:{
        type: Number,
    }
});

restorationSchema.index({ phone: 1 });

const Restoration = mongoose.model("restoration", restorationSchema);

module.exports = Restoration;
