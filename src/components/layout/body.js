import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BodyContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	padding: 0px;
	box-sizing: border-box;
	height: 100vh;
	overflow-y: auto;
	width: 100%;
	background: rgb(155,36,210);
	background: linear-gradient(159deg, rgba(155,36,210,1) 0%, rgba(83,43,166,1) 100%);

	${({ background }) => background && `
		background: rgb(230,28,255);
		background: linear-gradient(159deg, rgba(230,28,255,1) 0%, rgba(83,43,166,1) 100%);
	`}

	-webkit-overflow-scrolling: touch;
	&::-webkit-scrollbar { width: 4px; border-radius: 10px; }
	&::-webkit-scrollbar-track { background: #fff; border-radius: 10px; }
	&::-webkit-scrollbar-thumb { border-radius: 10px; background: #7C98A7; }
	&::-webkit-scrollbar-thumb:hover { background: rgb(38,20,82); border-radius: 10px; }
`;

const Body = (props) => {
	const {
		children,
		background
	} = props;

	return(
		<BodyContainer background={ background }>
			{ children }
		</BodyContainer>
	);
};

Body.defaultProps = {
	children: null,
	background: false
};

Body.propTypes = {
	children: PropTypes.node,
	background: PropTypes.bool
};

export default Body;