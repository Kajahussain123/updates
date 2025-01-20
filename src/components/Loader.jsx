import React from 'react';
import { FadeLoader    } from 'react-spinners';
import './Loader.css'; // Import CSS for styling the loader

const Loader = () => {
  return (
    <div className="loader-container" >
      <FadeLoader color="white" size={15} />
    </div>
  );
};

export default Loader;
