import { User } from '@/types';
import axios from 'axios';

const register = (
  displayName: string,
  email: string,
  password: string
): Promise<boolean> => {
  const payload = {
    displayName,
    email,
    password,
  };

  return axios
    .post('http://localhost:9000/auth/register', {
      ...payload,
    })
    .then((result) => {
      if (result) {
        return true;
      } else {
        return false;
      }
    })
    .catch(() => {
      return false;
    });
};

const logIn = (email: string, password: string): Promise<boolean> => {
  return axios
    .post('http://localhost:9000/auth/login', {
      email,
      password,
    })
    .then((res) => {
      if (res.data) {
        localStorage.setItem('token', res.data as string);
        return true;
      } else {
        return false;
      }
    })
    .catch(() => {
      return false;
    });
};

const getMe = () => {
  return axios
    .get('http://localhost:9000/auth/me', {
      headers: { Authorization: localStorage.getItem('token') as string },
    })
    .then((res) => {
      return res.data;
    });
};

export { register, logIn, getMe };
