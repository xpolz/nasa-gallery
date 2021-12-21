import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LayoutContainer from './layoutContainer';

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: center;
	align-items: center;
`;

const Main = (props) => {
	const {
		children
	} = props;

	return(
		<LayoutContainer>
			<MainContainer>
				{ children }
			</MainContainer>
		</LayoutContainer>
	);
};

Main.defaultProps = {
	children: null
};

Main.propTypes = {
	children: PropTypes.node
};

export default Main;