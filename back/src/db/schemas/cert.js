import { Schema, model } from 'mongoose';

const CertSchema = new Schema(
    {
        certName: {
            type: String,
            required: true,
        },
        certAcDate: {
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

const CertModel = model('Cert', CertSchema);

export { CertModel, CertSchema };
