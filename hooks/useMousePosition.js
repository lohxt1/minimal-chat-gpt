import { useEffect, useRef, useState } from 'react';
import useCursorStore from '../stores/useCursorStore';

const useMousePosition = () => {
	const [hasTouch, setTouch] = useState(false);
	// const [isMouseMoving, _setMouseMoving] = useState(false);

	// const isMouseMovingRef = useRef();

	// const setMouseMoving = val => {
	// 	_setMouseMoving(val);
	// 	isMouseMovingRef.current = val;
	// }

	useEffect(() => {
		const _hasTouch =
			'ontouchstart' in window ||
			navigator.maxTouchPoints > 0 ||
			navigator?.msMaxTouchPoints > 0;
		setTouch(_hasTouch);
	}, []);

	const [_isOut, _setOut] = useState(false);
	const isOut = useRef(_isOut);

	const setOut = (val) => {
		_setOut(val);
		isOut.current = val;
	};

	const [_position, _setPosition] = useState({ x: 0, y: 0 });
	const position = useRef(_position);

	const timer = useRef();

	const setPosition = (val) => {
		_setPosition(val);
		position.current = val;
	};

	const [_trailingPositions, _setTrailingPositions] = useState([]);
	const trailingPositions = useRef(_trailingPositions);

	const setTrailingPositions = (val) => {
		_setTrailingPositions(val);
		trailingPositions.current = val;
	};

	const setCoordinates = (val) => {
		timer?.current && clearTimeout(timer.current);
		setTrailingPositions([{ ...val }, ...trailingPositions?.current?.slice(0, 30)]);
		setPosition({ ...val });
		if (trailingPositions?.current?.[30]?.x !== val?.x) {
			timer.current = setTimeout(() => setCoordinates({ ...val }), 200);
		}
	};

	useEffect(() => {
		setInterval(() => {
			// setMouseMoving(false);
			// useCursorStore.setState({ isMouseMoving: false });
		}, 100);
		const setFromEvent = (e) => {
			// if (mouseMovementTimeout) { clearTimeout(mouseMovementTimeout); }
			// setMouseMoving(true);
			// useCursorStore.setState({ isMouseMoving: true });
			setCoordinates({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener('mousemove', setFromEvent);

		return () => {
			window.removeEventListener('mousemove', setFromEvent);
		};
	}, []);

	return {
		hasTouch,
		...position?.current,
		isOut: isOut?.current,
		trailingPositions: trailingPositions.current
	};
};

export default useMousePosition;