import React, { Component } from 'react';
import Validator from 'validatorjs';

const validation = (BaseComponent, rules, messages) => class extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { errors: {} };

    this.validate = this.validate.bind(this);
    this.reset = this.reset.bind(this);
  }

  onValidate(isValid, validator, onValidate) {
    return () => {
      this.setState({ errors: isValid ? {} : validator.errors.all() });

      onValidate(isValid, isValid ? null : validator.errors);
    };
  }

  validate(data, callback) {
    const validator = new Validator(data, rules, messages);

    validator.checkAsync(
      this.onValidate(true, validator, callback),
      this.onValidate(false, validator, callback)
    );
  }

  reset() {
    this.setState({ errors: {} });
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
