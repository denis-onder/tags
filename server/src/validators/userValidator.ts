import { ValidatorResponse } from '../domain/util';
import validator from 'validator';
import { User } from '../domain/User';

export default function (user: User): ValidatorResponse {
  const response: ValidatorResponse = {
    valid: false,
    errors: [],
  };

  if (validator.isEmpty(user.displayName)) {
    response.errors?.push('Please provide a valid display name.');
  }
  if (!validator.isEmail(user.email)) {
    response.errors?.push('Please provide a valid email address.');
  }
  if (validator.isEmpty(user.password)) {
    response.errors?.push('Please provide a valid password.');
  }
  if (user.password.length < 8) {
    response.errors?.push('Your password has to be longer than 8 characters.');
  }

  if (response.errors?.length === 0) {
    response.valid = true;
    delete response.errors;
  }

  return response;
}
