import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext();

const { Provider } = AppContext;

const StoreProvider = ({children}) => {

	const [store, setStore] = useState({
		rover: 'curiosity',
		earth_date: getDefaultDate(),
		page: 1,
		camera: null,
		sol: null,
		type_of_date: 'earth_date',
		url_params: ''
	});

	function getDefaultDate() {
		let today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth() + 1;
		let yyyy = today.getFullYear() - 1;

		return `${yyyy}-${mm}-${dd}`;
	}

	return (
		<Provider value={ [ store, setStore ] }>
			{ children }
		</Provider>  
	);
};

StoreProvider.propTypes = {
	children: PropTypes.node
};

export default StoreProvider;

