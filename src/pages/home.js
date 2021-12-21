import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/provider';
import Body from '../components/layout/body';
import Main from '../components/layout/main';
import MarsTitle from '../images/mars-title.png';
import { Title, SelectMenu, Item, Intermitent, RocketImage } from './home.styles';

const Home = () => {
	const [store] = useContext(AppContext);

	function urlParams(store) {
		if(store.url_params === '') {
			return `earth_date=${store.earth_date}&page=1`;
		} else return store.url_params;
	}

	return(
		<Body background={ true }>
			<Main>
				<Title src={ MarsTitle }/>
			</Main>

			<SelectMenu>
				<Link to={ `/list/curiosity?${ urlParams(store) }` }>
					<Item>{ 'Curiosity' }</Item>
				</Link>
				<Link to={ `/list/opportunity?${ urlParams(store) }` }>
					<Item>{ 'Opportunity' }</Item>
				</Link>
				<Link to={ `/list/spirit?${ urlParams(store) }` }>
					<Item>{ 'Spirit' }</Item>
				</Link>
			</SelectMenu>

			<Intermitent>{ 'select a rover' }</Intermitent>
			<RocketImage/>
		</Body>
	);
};

export default Home;