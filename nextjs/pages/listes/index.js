import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'


const Listes = () => {
    return (
        <div className="flex flex-col min-h-screen h-full bg-green-400 w-full">
            <Header />
            <div className="bg-red-400 flex-1 flex justify-center items-center w-full">Ok Listes</div>
            <Footer />
        </div >
    )
}

export default Listes