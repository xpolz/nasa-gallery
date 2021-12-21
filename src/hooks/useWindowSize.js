import { useState, useEffect } from 'react';

function useWindowSize() {

	const [windowSize, setWindowSize] = useState({
		width: undefined,
		height: undefined,
	});

	function handleResize() {
		// Set window width/height to state
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}

	useEffect(() => {
		// only execute all the code below in client side
		if (typeof window !== 'undefined') {

			window.addEventListener('resize', handleResize);

			handleResize();
			
			return () => window.removeEventListener('resize', handleResize);
		}

	}, []); // Empty array ensures that effect is only run on mount

	return windowSize;
}

export default useWindowSize;