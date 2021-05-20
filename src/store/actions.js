// eslint-disable-next-line no-unused-vars
import axios from "axios";

// const SITE_PREFIX = "http://127.0.0.1:8000";
const SITE_PREFIX = "http://ec2-35-154-206-196.ap-south-1.compute.amazonaws.com";

export const actions = {
  getTopScrips: () =>
    new Promise((resolve, reject) => {
      axios
        .get(SITE_PREFIX + `/`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    }),
  searchScrips: (store, val) =>
    new Promise((resolve, reject) => {
      axios
        .get(SITE_PREFIX + `/search/${val}/`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    }),
};
