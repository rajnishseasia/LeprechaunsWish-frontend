import { useEffect } from "react";

const useOutsideClick = (ref, callback)=> {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback(); // Call the callback if clicked outside
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Remove event listener on cleanup
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, callback]);
  };

  export default useOutsideClick;