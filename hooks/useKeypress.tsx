import { useEffect, useState } from "react";

const useKeypress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState<boolean>(false);

  const _downHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  };
  const _upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", _downHandler);
    window.addEventListener("keyup", _upHandler);
    return () => {
      window.removeEventListener("keydown", _downHandler);
      window.removeEventListener("keyup", _upHandler);
    };
  }, []);

  return keyPressed;
};

export default useKeypress;
