import axios from 'axios';

const nasaRovers = async ({data, rover}) => {
	const nasa = 'https://api.nasa.gov/mars-photos/api/v1';
	const key = 'Hlpd7y2vv0AimN6kal1c0oTDNKXJmZ1nOrghwPjR';
	const params = new URLSearchParams(data).toString();
	const url = `${nasa}/rovers/${rover}/photos/?api_key=${key}&${params}`;

	return await axios.get(url)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			console.log(err);
			return [];
		});
};

export default nasaRovers;