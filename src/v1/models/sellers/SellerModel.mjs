import mongoose from "mongoose";
const { Schema } = mongoose

const SellerSchema = new Schema({
  seller: {
    type: String,
    required: [true, 'seller is required'],
    minlength: [3, 'seller must be at least 3 characters long'],
    maxlength: [20, 'seller must be at most 15 characters long'],
    trim: true,
    escape: true,
  },
},
{collection: 'sellers'},
);

const Seller = mongoose.model('Seller', SellerSchema);

export default Seller;