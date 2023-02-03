import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Provider } from 'react-redux';
import store from '../../store/store'
import useAuth from '../../store/auth/hooks';


const Homepage = ({ user }) => {
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
            {isLogged ?
                <div className="bg-red-400 flex-1 flex justify-center items-center"></div>
                :
                <div className="bg-blue-400 flex-1 flex justify-center items-center">
                    Vous n'êtes plus connecté, vous allez être renvoyé à la page d'authentification.
                </div>
            }
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

export default Homepage