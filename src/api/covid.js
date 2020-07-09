import axios from 'axios';

export default axios.create({
	baseURL:
		'https://api.covid19api.com/country/dominican-republic?from=2020-06-19T00:00:00Z&to=2020-06-30T00:00:00Z',
});
