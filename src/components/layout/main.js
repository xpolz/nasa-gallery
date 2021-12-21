import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LayoutContainer from './layoutContainer';

const MainContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: center;
	align-items: center;
	transition: opacity 0.3s;
	padding-bottom: 100px;
	box-sizing: border-box;

	${({ sending }) => sending && `
		opacity: 0.5
	`}
`;

const Main = (props) => {
	const {
		children,
		sending
	} = props;

	return(
		<LayoutContainer>
			<MainContainer sending={ sending }>
				{ children }
			</MainContainer>
		</LayoutContainer>
	);
};

Main.defaultProps = {
	children: null
};

Main.propTypes = {
	children: PropTypes.node,
	sending: PropTypes.bool,
};

export default Main;