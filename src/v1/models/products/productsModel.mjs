import mongoose from "mongoose";

const { Schema } = mongoose

const productsSchema = new Schema(
  {
    brand: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [20, 'Name must be at most 15 characters long'],
      trim: true,
      escape: true,
    },
    model: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [20, 'Name must be at most 15 characters long'],
      trim: true,
      escape: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [1, 'Price must be a positive number'],
      trim: true,
      escape: true,
    },
    createdAd: {
      type: Date,
      default: Date.now,
      required: true,
    },
    updatedAd: {
      type: Date,
      default: Date.now,
      required: true,
    },
    imageSrc: {
      type: String,
    },
    sellers: {
      type: Schema.Types.ObjectId,
      ref: 'Seller',
      required: true,
    },
  },
  {collection: 'products'}
);

//--------------------Creat Virtual---------------------//

productsSchema.virtual('fullName').get(function () {
  return `${this.brand} ${this.model}`;
});

productsSchema.set('toObject', {virtuals: true});
productsSchema.set('toJSON', {virtuals: true});

const Product = mongoose.model('Product', productsSchema)
export default Product