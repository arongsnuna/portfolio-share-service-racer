import { Schema, model } from "mongoose";

const AwardSchema = new Schema(
  {
    awardName: {
      type: String,
      required: true,
    },
    awardDate: {
      type: Date,
      required: false,
    },
    awardInstitution: {
      type: String,
      required: true,
    },
    awardDescription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AwardModel = model("Award", AwardSchema);

export { AwardModel, AwardSchema };