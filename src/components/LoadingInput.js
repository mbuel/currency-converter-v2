import React, {useState} from 'react';
import '../css/InputDialog.css';

function LoadingList(props) {
  const [timer, setTimer] = useState(' . ');
 
  setTimeout(() => {
    setTimer(timer + ' . ');
  }, 350);

  return (
    <div className="py-5 converter container-fluid">
      <div className="py-5 row">
        <div className="py-5 col-12 text-center">
          <h2>Loading {timer}</h2> 
        </div>
      </div>
    </div>
  )
}

export default LoadingList;