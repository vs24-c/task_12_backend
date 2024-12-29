import { body } from "express-validator";

class ValidateSchem {
  static prodValidate = [
    body('brand')
      .notEmpty()
      .withMessage('Title is required')
      .isLength({min: 3, max: 20})
      .withMessage('Title must be between 3 and 100 characters long')
      .trim()
      .escape(),
    body('model')
      .notEmpty()
      .withMessage('Title is required')
      .isLength({min: 3, max: 20})
      .withMessage('Title must be between 3 and 100 characters long')
      .trim()
      .escape(),
    body('price')
      .notEmpty()
      .withMessage('Price is required')
      .isNumeric()
      .withMessage('Price must be a number')
      .isFloat({min: 1})
      .withMessage('Price must be a positive number')
      .trim()
      .escape(),
    body('seller')
      .notEmpty()
      .withMessage('Title is required')
      .isLength({min: 3, max: 20})
      .withMessage('Title must be between 3 and 100 characters long')
      .trim()
      .escape(),
  ];
}

export default ValidateSchem;