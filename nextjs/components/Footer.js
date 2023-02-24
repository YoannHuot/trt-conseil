import React from 'react'

const Footer = () => {
    return (
        <div className='w-full h-24 bg-app-gray grid grid-cols-4 text-xs pt-4 px-4 '>
            <div className='flex flex-col font-black uppercase'>
                <span>Trt-Conseil</span>
                <span>Plus proche du talent</span>
            </div>
            <div className='flex flex-col'>
                <span className='pb-2 font-semibold'>CONTACT</span>
                <span className='italic'>+33 9 41 56 98 74</span>
                <span className='italic'>admin@admin-trt.fr</span>
                <span className='italic'>Du lundi au vendredi</span>

            </div>
            <div className='flex flex-col'>
                <span className='pb-2 font-semibold'>HORAIRES</span>
                <span className='italic' >Horaires : 7h à 9h</span>
                <span className='italic'>14h à 18h</span>
                <span className='italic'>Du lundi au vendredi</span>
            </div>
            <div className='flex flex-col'>
                <span className='pb-2 font-semibold'>ADRESSE</span>
                <span className='italic'>43 rue des droits de l'Homme</span>
                <span className='italic'>Lyon 69006</span>
            </div>
        </div>
    )
}

export default Footer