// import { Document, Schema, Model, model } from "mongoose";

// export interface ITenantModel extends Document {
//     tenant_id: string,
//     contact_name: string,
//     contact_number: string
//     // Add cool methods here if applicable
// }

// export var TenantSchema: Schema = new Schema({
//     tenant_id: {
//         type: [String],
//         index: true
//     },
//     contact_name: String,
//     contact_number: String,
// },
//     {
//         timestamps: {
//             createdAt: "created_at",
//             updatedAt: "updated_at"
//         }
//     });

// export const Tenant: Model<ITenantModel> = model<ITenantModel>("Tenant", TenantSchema);