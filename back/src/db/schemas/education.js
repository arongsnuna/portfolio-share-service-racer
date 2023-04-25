import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    eduSchool:{
        type: String,
        required: true,
    },
    eduMajor:{
        type: String,
        required: true,
    },
    eduStart:{
        type: Date,
        required: true,
    },
    eduEnd:{
        type: Date,
        required: true,
    },
    eduDegree:{
        type: String,
        required: true,
        // 수정필요!!!!
    },

  },
  {
    timestamps: true,
  }
);

const EducationModel = model("Eucation", EducationSchema);

export { EducationModel, EducationSchema };
