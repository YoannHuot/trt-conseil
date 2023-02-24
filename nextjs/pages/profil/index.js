import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useAuth from '../../store/auth/hooks';
import Cookies from 'js-cookie';


const Profil = ({ user }) => {
    const auth = useAuth()
    const [isLogged, setIsLogged] = useState(false)


    return (
        <div className="flex flex-col min-h-screen h-full bg-green-400 w-full">
            <Header />
            <div className="bg-red-400 flex-1 flex justify-center items-center w-full">Ok Profil</div>
            <Footer />
        </div >


    )
}

export async function getStaticProps() {
    const res = await axios.get("http://localhost:8000/users/current.php");
    const user = res.data;

    return {
        props: {
            user
        }
    };
}

export default Profil