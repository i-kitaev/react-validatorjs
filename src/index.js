import React, { Component } from 'react';
import Validator from 'validatorjs';

const unwrapErrors = errors => Object.keys(errors).reduce((memo, it) => memo.concat(errors[it]), []);

const validation = (BaseComponent, rules, messages) => class extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { errors: [] };

    this.validate = this.validate.bind(this);
    this.reset = this.reset.bind(this);
  }

  onValidate(isValid, validator, onValidate) {
    return () => {
      this.setState({ errors: isValid ? [] : unwrapErrors(validator.errors.all()) });

      if (typeof onValidate === 'function') onValidate(isValid, isValid ? null : validator.errors);
    };
  }

  validate(data, onValidate, onCreate) {
    const validator = new Validator(data, rules, messages);

    if (typeof onCreate === 'function') onCreate(validator);

    validator.checkAsync(
      this.onValidate(true, validator, onValidate),
      this.onValidate(false, validator, onValidate)
    );
  }

  reset() {
    this.setState({ errors: [] });
  }

  render() {
    return React.createElement(BaseComponent, {
      ...this.props, ...this.state, validate: this.validate, resetValidation: this.reset
    });
  }
};

export {
  Validator as default,
  validation
};
