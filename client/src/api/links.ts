import axios from 'axios';

const getLinks = () => {
  return axios
    .get('http://localhost:9000/links', {
      headers: {
        Authorization: localStorage.getItem('token') as string,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export { getLinks };
