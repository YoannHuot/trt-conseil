import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const Index = () => {
    return (
        <div>
            <div className="flex flex-col min-h-screen h-full  w-full">
                <Header />
                <div className="bg-red-400 flex-1 flex justify-center items-center w-full">Ok Annonces</div>
                <Footer />
            </div >
        </div>
    )
}

export default Index