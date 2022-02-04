import React from 'react';
import loader from './spinner.gif'

const Spinner = () => {
    return(
     <div className='text-center'>
        <img src={loader} alt="loader" />
    </div>
    );
}

export default Spinner