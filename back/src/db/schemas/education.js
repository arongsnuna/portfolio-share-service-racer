import { Schema, model } from 'mongoose';

const EducationSchema = new Schema(
    {
        eduSchool: {
            type: String,
            required: true,
        },
        eduMajor: {
            type: String,
            required: true,
        },
        eduStart: {
            type: String,
            required: true,
        },
        eduEnd: {
            type: String,
            required: true,
        },
        eduDegree: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        isSave: {
            type: Boolean,
            default: true,
        },
        isEdit: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const EducationModel = model('Education', EducationSchema);

export { EducationModel, EducationSchema };
