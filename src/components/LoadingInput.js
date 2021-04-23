import React, {useState} from 'react';
import '../css/InputDialog.css';

function LoadingList(props) {
 
  return (
    <div className="py-5 converter container-fluid">
      <div className="py-5 row">
        <div className="py-5 col-12 text-center">
          <h2>Loading . . . <span class="fa fa-spinner fa-spin fa-3x fa-fw"></span></h2> 
        </div>
      </div>
    </div>
  )
}

export default LoadingList;