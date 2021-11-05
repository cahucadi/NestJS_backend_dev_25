import { Schema } from 'mongoose';

export const StudentSchema =  new Schema({
    
    code: { type: Number, required: true },
    name: { type: String, required: true },
    photoURL:  {
        type: String,
        default: 'https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});