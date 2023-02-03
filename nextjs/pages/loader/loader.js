import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Provider } from 'react-redux';
import store from '../../store/store'
import useAuth from '../../store/auth/hooks';


const Loader = ({ user }) => {
    const auth = useAuth()
    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        if (auth.authStore.logged) {
            setIsLogged(true)
        } else setIsLogged(false)
    }, [])

    return (
        <div className="flex flex-col min-h-screen h-full bg-green-400">
            <Header />
            <div className="bg-blue-400 flex-1 flex justify-center items-center">
                Un administrateur va approuver votre demande, merci de patienter
            </div>
            <Footer />
        </div>


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

export default Loader