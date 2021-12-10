const Joi = require("joi");

module.exports = {
  register(req, res, next) {
    const schema = Joi.object({
        first_name: Joi.string().alphanum().min(3).max(30).required(),
        last_name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      switch (error.details[0].context.key) {
        case "email":
          res
            .status(400)
            .json({ error: "Please enter a valid email address" });
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
