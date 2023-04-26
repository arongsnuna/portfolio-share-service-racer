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
            type: Date,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

const CertModel = model('Cert', CertSchema);

export { CertModel, CertSchema };
