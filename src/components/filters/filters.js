import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../context/provider';
import { Filter, Camera, HardDrive, Disc } from 'react-feather';
import { FiltersContainer, Wrapper, Shadow, Button, Tags, Content, Location, Options, Title, Input } from './filters.styles';
import LayoutContainer from '../layout/layoutContainer';
import { getCameras, getRovers } from '../../utilities/filtersOptions';

const Filters = (props) => {
	const { onSetFilter, onDeleteFilter } = props;

	const [opened, setOpened] = useState(false);

	const [store] = useContext(AppContext);

	function toggleFilters() {
		setOpened(!opened);
	}

	function setFilterParams({name, value}) {
		if(onSetFilter) onSetFilter({name, value});
	}

	function deleteFilterParams({name, value}) {
		if(onDeleteFilter) onDeleteFilter({name, value});
	}

	function onlyNumbers(e) {
		var key = e.keyCode || e.which;
		if ( key === 110 || key === 190 || key === 188 ) {     
			e.preventDefault();     
		}
	}

	return(
		<>
			<Button full={ true } selected={ opened } onClick={ ()=>{ toggleFilters(); } }>
				<Filter/>{ 'Filters' }
			</Button>

			<FiltersContainer>
				<Shadow opened={ opened } onClick={()=>{ toggleFilters();}}/>
				<Content opened={ opened } >
					<LayoutContainer>
						<Wrapper>
							<Location>
								<Title>{ 'Select Rover' }</Title>
								<Options>
									{ getRovers().map((item, i)=>{
										return (
											<Tags key={i} selected={ store.rover === item } onClick={ ()=>{ setFilterParams({name: 'rover', value: item}); } }>
												<HardDrive/>{ item }
											</Tags>
										);
									}) }
								</Options>
							</Location>
							<Location>
								<Title>{ 'Select Date' }</Title>
								{ store.type_of_date === 'sol' &&
									<Input type={ 'number' }
										defaultValue={ store.sol }
										placeholder={ 'Enter days on Mars' }
										onKeyDown={ (e)=>{ onlyNumbers(e); } }
										onBlur={ (e)=>{ setFilterParams({name: 'sol', value: e.target.value}); } }
									/>
								}
								{ store.type_of_date === 'earth_date' &&
									<Input type={ 'date' }
										defaultValue={ store.earth_date }
										pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}'
										onChange={ (e)=>{ setFilterParams({name: 'earth_date', value: e.target.value}); } }
									/>
								}
								<Options>
									<Tags selected={ store.type_of_date === 'sol' } onClick={ ()=>{ setFilterParams({name: 'type_of_date', value: 'sol'}); } }>
										<Disc/>{ 'By Martian Day' }
									</Tags>
									<Tags selected={ store.type_of_date === 'earth_date' } onClick={ ()=>{ setFilterParams({name: 'type_of_date', value: 'earth_date'}); } }>
										<Disc/>{ 'By Earth Date' }
									</Tags>
								</Options>
							</Location>
							<Location>
								<Title>{ 'Select Camera' }</Title>
								<Options>
									{ getCameras({rover: store.rover}).map((item, i)=>{
										return (
											<Tags key={i} 
												selected={ store.camera === item } 
												onClick={ () => {
													if(store.camera === item) {
														deleteFilterParams({name: 'camera', value: item}); 
													} else {
														setFilterParams({name: 'camera', value: item}); 
													}
												}}>
												<Camera/>{ item }
											</Tags>
										);
									}) }
								</Options>
							</Location>
						</Wrapper>
					</LayoutContainer>
				</Content>
			</FiltersContainer>
		</>
	);
};

Filters.defaultProps = {
	children: null,
	onSetFilter: null,
	onDeleteFilter: null
};

Filters.propTypes = {
	children: PropTypes.node,
	onSetFilter: PropTypes.func,
	onDeleteFilter: PropTypes.func
};

export default Filters;