import { useState, useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { AppContext } from '../context/provider';
import nasaRovers from '../services/nasaRovers';

const useGetPhotos = () => {
	const [store, setStore] = useContext(AppContext);
	const params = useParams();
	const location = useLocation();
	const [sending, setSending] = useState(false);
	const [photos, setPhotos ] = useState([]);
	const [paging, setPaging ] = useState(1);

	useEffect(() => {
		const data = new URLSearchParams(location.search);
		const earthDate = data.get('earth_date');
		const page = data.get('page');
		const sol = data.get('sol');
		const camera = data.get('camera');

		if(!page) data.set('page', '1');

		if(!sol && !earthDate) data.set('earth_date', getDefaultDate());

		setStore({
			rover: params.type,
			earth_date: earthDate || getDefaultDate(),
			page: page || 1,
			camera: camera,
			sol: sol,
			type_of_date: sol ? 'sol' : 'earth_date',
			url_params: data
		});

		setPaging(parseInt(page));

		setSending(true);
		(async () => {
			const response  = await nasaRovers({data, rover: params.type});
			console.log(response);
			setSending(false);
			setPhotos((prevState) => {
				if(prevState && page > 1) {
					return [...prevState, ...response.photos];
				} else {
					return response.photos || [];
				}
			});
		})();

		console.log(store);

	}, [location, params.type]);

	function getDefaultDate() {
		let today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth() + 1;
		let yyyy = today.getFullYear() - 1;

		return `${yyyy}-${mm}-${dd}`;
	}

	return { sending, photos, paging };
};

export default useGetPhotos;