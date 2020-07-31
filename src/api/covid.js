import axios from "axios";

export default axios.create({
  baseURL:
    "https://api.covid19api.com/country/dominican-republic?from=2020-07-15T00:00:00Z&to=2020-07-31T00:00:00Z",
});
