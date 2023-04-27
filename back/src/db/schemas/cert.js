import { Schema, model } from 'mongoose';

const CertSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        certName: {
            type: String,
            required: true,
        },
        certAcdate: {
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
