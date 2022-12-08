import mongoose from 'mongoose';
const {Schema} = mongoose;
import shortId from 'shortid';

const shortUrlSchema = new Schema({
    full:{
        type: String,
        required: true
    },
    short:{
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks:{
        type:Number,
        required:true,
        default:0
    }
})

export default new mongoose.model('ShortUrl', shortUrlSchema)