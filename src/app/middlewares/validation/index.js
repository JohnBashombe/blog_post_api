class Validation {
  static joiHandlerBody(req, res, schema, next) {
    const options = {
      language: {
        key: "{{key}} ",
      },
    };

    const { error } = schema.validate(req.body, options);

    if (error) {
      return this.joiError(res, error);
    }

    return next();
  }

  static joiHandlerParams(req, res, schema, next) {
    const options = {
      language: {
        key: "{{key}} ",
      },
    };

    const { error } = schema.validate(req.params, options);

    if (error) {
      return this.joiError(res, error);
    }

    return next();
  }

  static joiHandlerQuery(req, res, schema, next) {
    const options = {
      language: {
        key: "{{key}} ",
      },
    };

    const { error } = schema.validate(req.query, options);

    if (error) {
      return this.joiError(res, error);
    }

    return next();
  }

  static joiError(res, error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message.replace(/[^a-zA-Z0-9]/g, ""),
    });
  }
}

export default Validation;
