const Joi = require("joi");

module.exports = {
  register(req, res, next) {
    // Joi = 
    // Module for data validation. This module validates the data based on schemas
    const schema = Joi.object({
      // https://joi.dev/api/?v=17.5.0
      first_name: Joi.string().alphanum().min(3).max(30).required(),
      last_name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email().lowercase().required(),
      // New regEx pattern for password validation
      // 8 caracters
      // 1 Uppercase & 1 lowercase & 1 number
      // 1 special character
      password: Joi.string().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      switch (error.details[0].context.key) {
        case "email":
          res.status(400).json({ error: "Please enter a valid email address" });
          break;
        case "password":
          res.status(400).json({ error: 'Please enter a valid password' });
          break;
        default:
          res.status(400).json({ error: 'Incorrect information' });
      }
    } else {
      next();
    }
  },
};
