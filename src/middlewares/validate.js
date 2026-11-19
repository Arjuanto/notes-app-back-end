import { InvariantError } from '../exceptions/index.js';

const validate = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        allowUnknown: false,
        stripUnknown: true
    });

    if (error) return next(new InvariantError(error.message));
    req.validated = value;
    return next();
};

export const validateQuery = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.query, {
        abortEarly: false,
        allowUnknown: false,
        stripUnknown: true
    });

    if (error) return next(new InvariantError(error.message));
    req.validatedQuery = value;
    return next();
};

export default validate;