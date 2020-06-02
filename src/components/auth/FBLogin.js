import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { setUserSession, getToken, getUser, removeUserSession } from './Sessions'
import { FaFacebook } from 'react-icons/fa';

const FbLogin = () => {
    const [name, setName] = useState('')
    const [pic, setPic] = useState('')
    const [isLogged, setIsLogged] = useState()
    const appId = process.env.REACT_APP_FB_APP_ID
    let fbContent

    useEffect(() => {
        if (getToken()) {
            setIsLogged(true)
            setPic(getUser().picture)
            setName(getUser().name)
        } else setIsLogged(false)
    }, [])

    const responseFacebook = (res) => {

        if (res.userID) {
            setName(res.name)
            setPic(res.picture)
            setIsLogged(true)

            const user = {
                id: res.userID,
                name: res.name,
                email: res.email,
                picture: res.picture
            }
            setUserSession(user, res.accessToken);
        } 
    }

    if (isLogged && pic) {
        fbContent = (<>
            <img src={pic.data.url} alt={name} /><p>{name}</p>
            <Link to={'/'} className="nav-link" onClick={() => removeUserSession()}>Kirjaudu ulos</Link>
        </>)
    }

    else {
        fbContent = (
            <FacebookLogin
                appId={appId}
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                render={renderProps => (
                    <button onClick={renderProps.onClick} className="btn btn-outline">Kirjaudu <FaFacebook /> </button>
                )}
            />
        )
    }
    return (
        <div>
            {fbContent}
        </div>
    )
}

export default FbLogin