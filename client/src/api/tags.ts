import axios from 'axios';

const getTags = (linkId: string) => {
  return axios
    .get('http://localhost:9000/tags', {
      params: {
        linkId,
      },
      headers: {
        Authorization: localStorage.getItem('token') as string,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export { getTags };
