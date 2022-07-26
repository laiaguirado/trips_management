const mongoose = require("mongoose");
const { capitalize, FKIntegrity } = require("../../helper");
const image = require("../../SchemaType/SchemaImageType");
const Plans = require("../components/plans/plans.model");
const Accommodation = require("../components/accommodation/accommodation.model");
const Restaurant = require("../components/restaurant/restaurant.model");
const Transport = require("../components/transport/transport.model");
const Comment = require("../comments/comments.model");
const Score = require("../score/score.model");
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
      new mongoose.Schema({
        type: {
          type: String,
          enum: {
            values: ["admin", "traveler"],
            message: "{VALUE} for {TYPE} is not suported",
          },
          default: "traveler",
          required: [true, "{PATH} is required"],
        },
        user: {
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
      }),
    ],
    restaurants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant",
        validate: {
          isAsync: true,
          validator: async function (v) {
            return await FKIntegrity(mongoose.model("restaurant"), v).catch(
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
    transport: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "transport",
        validate: {
          isAsync: true,
          validator: async function (v) {
            return await FKIntegrity(mongoose.model("transport"), v).catch(
              (err) => false
            );
          },
          message: `Transport doesn't exist`,
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

  await Comment.deleteMany({ idTravel: idTravel }).exec();
  await Score.deleteMany({ idTravel: idTravel }).exec();
  await Plans.deleteMany({ idTravel: idTravel }).exec();
  await Transport.deleteMany({ idTravel: idTravel }).exec();
  await Accommodation.deleteMany({ idTravel: idTravel }).exec();
  await Restaurant.deleteMany({ idTravel: idTravel }).exec();

  const travel = await Users.updateMany(
    {},
    { $pull: { travels: new mongoose.Types.ObjectId(idTravel) } }
  ).exec();

  next();
});
const Travel = mongoose.model("travel", travelSchema);

module.exports = Travel;
