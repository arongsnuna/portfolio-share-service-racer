import { Schema, model } from 'mongoose';

const CommentSchema = new Schema(
    {
        commentContent: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        wantedId: {
            type: Schema.Types.ObjectId,
            ref: 'Wanted',
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

const CommentModel = model('Comment', CommentSchema);

export { CommentModel, CommentSchema };
