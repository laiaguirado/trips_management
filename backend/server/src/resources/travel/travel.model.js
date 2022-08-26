const mongoose = require("mongoose");
const { capitalize, FKIntegrity } = require("../../helper");
const image = require("../../SchemaType/SchemaImageType");
const Plans = require("../components/plans/plans.model");
const Accommodation = require("../components/accommodation/accommodation.model");
const Restoration = require("../components/restoration/restoration.model");
const Transportation = require("../components/transportation/transportation.model");
const Users = require("../users/user.model");

mongoose.Schema.Types.Image = image;

const travelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "{PATH} is required"],
      trim: true,
      maxlength: [50, "{PATH} is too long"],
      set: capitalize,
    },
    description: {
      type: String,
      required: false,
      maxlength: [1000, "{PATH} is too long"],
    },
    location: {
      type: String,
      required: true,
      maxlength: [1000, "{PATH} is too long"],
    },

    startDate: {
      type: Date,
      required: [true, "{PATH} is required"],
    },
    endDate: {
      type: Date,
      required: [true, "{PATH} is required"],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    image: {
      type: mongoose.Schema.Types.Image,
      validate: {
        validator: (v) => v,
        message: (props) => `Image is wrong`,
      },
      required: [true, "{PATH} is required"],
    },
    travellers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        validate: {
          isAsync: true,
          validator: async function (v) {
            return await FKIntegrity(mongoose.model("user"), v).catch(
              (err) => false
            );
          },
          message: `User doesn't exist`,
        },
      },
    ],
    scores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "score",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    restaurants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restoration",
        validate: {
          isAsync: true,
          validator: async function (v) {
            return await FKIntegrity(mongoose.model("restoration"), v).catch(
              (err) => false
            );
          },
          message: `Restaurant doesn't exist`,
        },
      },
    ],
    accommodations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "accommodation",
        validate: {
          isAsync: true,
          validator: async function (v) {
            return await FKIntegrity(mongoose.model("accommodation"), v).catch(
              (err) => false
            );
          },
          message: `Accommodation doesn't exist`,
        },
      },
    ],
    transportation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "transportation",
        validate: {
          isAsync: true,
          validator: async function (v) {
            return await FKIntegrity(mongoose.model("transportation"), v).catch(
              (err) => false
            );
          },
          message: `Transportation doesn't exist`,
        },
      },
    ],
    plans: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "plans",
        validate: {
          isAsync: true,
          validator: async function (v) {
            return await FKIntegrity(mongoose.model("plans"), v).catch(
              (err) => false
            );
          },
          message: `Plan doesn't exist`,
        },
      },
    ],
  },
  { timestamps: true }
);

travelSchema.pre("findOneAndDelete", async function (next) {
  const idTravel = this.getQuery()["_id"];

  await Plans.deleteMany({ idTravel: idTravel }).exec();
  await Transportation.deleteMany({ idTravel: idTravel }).exec();
  await Accommodation.deleteMany({ idTravel: idTravel }).exec();
  await Restoration.deleteMany({ idTravel: idTravel }).exec();

  const travel = await Users.updateMany(
    {},
    { $pull: { travels: new mongoose.Types.ObjectId(idTravel) } }
  ).exec();

  next();
});
const Travel = mongoose.model("travel", travelSchema);



module.exports = Travel;
