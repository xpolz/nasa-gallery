import React, { useContext } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { AppContext } from '../context/provider';
import Body from '../components/layout/body';
import Main from '../components/layout/main';
import Filters from '../components/filters/filters';
import useWindowSize from '../hooks/useWindowSize';
import MarsTitle from '../images/mars-title.png';
import LayoutContainer from '../components/layout/layoutContainer';
import { getCameras } from '../utilities/filtersOptions';
import { ImageTitle, Logo, Header, Gallery, Item, Image, More, Text } from './list.styles';
import useGetPhotos from '../hooks/useGetPhotos';

const List = () => {
	const [store, setStore] = useContext(AppContext);
	const history = useHistory();
	const location = useLocation();
	const { sending, photos, paging } = useGetPhotos();

	function getImages({photos, size}) { 
		return photos.map((item, i) => {
			return (
				<Item columns={ getColumns({size}) } key={ i }>
					<Image src={ item.img_src }/>
				</Item>
			);
		});
	}

	function getColumns({size}) {
		if(size <= 320) return 2;
		if(size <= 480) return 2;
		if(size <= 768) return 3;
		if(size <= 1024) return 4;
		return 5;
	}

	function onSetFilter({name, value}) {
		const params = new URLSearchParams(location.search);

		if(name=== 'type_of_date') {
			setStore({ ...store, type_of_date: value });

		} else if(name === 'rover') {
			// Eliminamos la camara seleccionada si este rover no la tiene
			let equippedCamera = (getCameras({rover: value}).indexOf(params.get('camera')) > -1);
			if(!equippedCamera) params.delete('camera');
			params.set('page', 1);
			history.push(`/list/${value}?${params.toString()}`);

		} else if(name === 'page') {
			const page = params.get('page');
			params.set('page', parseInt(page) + 1);
			history.push({search: params.toString()});

		} else {
			if(name === 'earth_date') {
				// Eliminamos 'sol' cuando se intenta filtrar por 'earth_date'
				params.delete('sol');
			}
			if(name === 'sol') {
				// Eliminamos 'earth_date' cuando se intenta filtrar por 'sol'
				params.delete('earth_date');
			}
			params.set('page', 1);
			params.set(name, value);
			history.push({search: params.toString()});
		}
	}

	function onDeleteFilter({name, value}) {
		const params = new URLSearchParams(location.search);
		params.delete(name, value);
		history.push({search: params.toString()});
	}
	
	const { width } = useWindowSize();

	return(
		<Body>
			{ sending &&
				<span className="loading-bar"></span>
			}
			<LayoutContainer>
				<Header>
					<Logo>
						<Link to='/'><ImageTitle src={ MarsTitle }/></Link>
					</Logo>
					<Filters 
						onSetFilter={ onSetFilter }
						onDeleteFilter={ onDeleteFilter }
					/>
				</Header>
			</LayoutContainer>
			<Main sending={ sending }>
				{ photos.length > 0 ?
					<>
						<Gallery>
							{ getImages({photos, size: width}) }
						</Gallery>
						{ photos.length === 25 * paging ?
							<More onClick={ ()=>{ onSetFilter({name: 'page'}); } }>
								{ 'More images' }
							</More>
							:
							<>
								{ !sending && 
									<Text>
										{'There no more pictures'}
									</Text>
								}
							</>
						}
					</>
					:
					<>
						{ !sending && 
							<Text>
								{'No results found. try changing some filters'}
							</Text>
						}
					</>
				}
			</Main>
		</Body>
	);
};

export default List;