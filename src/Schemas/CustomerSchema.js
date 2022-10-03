import Joi from "joi";

const CustomerSchema = Joi.object({
    name:Joi.string().min(1).required,
    phone: Joi.string().pattern(/[0-9]/).min(10).max(11).required(),
    cpf: Joi.string().pattern(/[0-9]/).min(11).max(11).required(),
    birthday: Joi.date().required(),
});

export default CustomerSchema;