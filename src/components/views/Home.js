import React from 'react'
import FbLogin from '../auth/FBLogin'

const Home = () => {
    return (
        <div className="container">
            <div className="col-5 m-auto">
                <h4>Olen etusivu</h4>
                <FbLogin />
            </div>
        </div>
    )
}
export default Home