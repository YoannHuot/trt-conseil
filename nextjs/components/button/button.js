import React, { useState } from 'react'
import _ from 'underscore';

const SubmitUnvalid = () => {
    return (
        <div className='px-2 py-2 my-8 bg-gray-300 flex justify-center items-center' style={{ cursor: "default" }}>
            Valider</div >
    )
}

const SubmitValid = ({ handleSubmit }) => {
    return (
        <button type='submit' className='px-2 py-2 my-8 bg-yellow-300' onClick={handleSubmit}>Valider</button>
    )
}
export { SubmitValid, SubmitUnvalid }