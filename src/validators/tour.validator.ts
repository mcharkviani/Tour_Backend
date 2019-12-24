import * as Joi from '@hapi/joi';

export const tourSchema = Joi.object({
    company: Joi.string()
        .min(2)
        .max(50)
        .required()
        .description('Company is required'),
    email: Joi.string()
        .email()
        // .regex(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
        .required()
        .description('Email is required'),
    phone: Joi.number()
        .required()
        .description('Phone is required'),
    image: Joi.required()
        .description('Image is required'),
    address: Joi.string()
        .required()
        .description('Address is required'),
    country: Joi.string()
        .required()
        .description('Country is required'),
    description: Joi.string()
        .required(),
    price: Joi.number()
        .required()
        .description('Price is required'),
    rating: Joi.number()
        .required()
        .min(1)
        .max(5)
        .description('Rating is required'),
});