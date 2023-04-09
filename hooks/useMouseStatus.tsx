import { useEffect, useLayoutEffect, useState } from "react";

const useMouseStatus = ({ ref }) => {
  const [isMouseDown, toggleMouseDown] = useState(false);
  const [isMouseOver, toggleMouseOver] = useState(false);
  const [didMousePass, toggleMousePass] = useState(false);

  const _handleMouseDown = (e) => toggleMouseDown((_) => true);
  const _handleMouseUp = (e) => toggleMouseDown((_) => false);
  const _handleMouseOver = (e) => {
    toggleMousePass((_) => true);
    toggleMouseOver((_) => true);
  };
  const _handleMouseLeave = (e) => {
    toggleMouseOver((_) => false);
    toggleMouseDown((_) => false);
  };

  useEffect(() => {
    const _ref = ref?.current ? ref.current : window;
    if (!_ref) return;
    _ref.addEventListener("mousedown", _handleMouseDown);
    _ref.addEventListener("mouseup", _handleMouseUp);
    _ref.addEventListener("mouseover", _handleMouseOver);
    _ref.addEventListener("mouseleave", _handleMouseLeave);

    return () => {
      _ref.removeEventListener("mousedown", _handleMouseDown);
      _ref.removeEventListener("mouseup", _handleMouseUp);
      _ref.removeEventListener("mouseover", _handleMouseOver);
      _ref.removeEventListener("mouseleave", _handleMouseLeave);
    };
  }, [ref]);

  return {
    isMouseDown,
    isMouseOver,
    didMousePass,
  };
};

export default useMouseStatus;
