export function getRovers() {
	return ['curiosity', 'opportunity', 'spirit'];
}

export function getCameras({rover}) {
	const cameras = {
		spirit: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'],
		opportunity: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'],
		curiosity: ['FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM']
	};
	return cameras[rover];
}