import * as axios from "axios";

const instance = axios.create({
  baseURL: "https://api.nasa.gov/neo/rest/v1/neo/",
});

export const asteriodAPI = {
  getCurrentAsteroid(id) {
    return instance
      .get(`${id}?api_key=gPojl5jlrIk09du2hY1DKjnnL7TBJl00ljDIj21W`)
      .then((response) => {
        return response.data;
      });
  },
  getRandomAsteroid() {
    return instance.get(`browse?api_key=DEMO_KEY`).then((response) => {
      return response.data;
    });
  },
};
