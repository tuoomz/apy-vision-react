import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';

const Login = () => {;
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const {data} = await axios.post('login', {
            email,
            password
        })

        setRedirect(true);
        console.log(data)
    }

    if(redirect){
        return <Redirect to= {'/'}/>
    }
    
    return (
        <div>
            <main className="form-signin">
                <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal">Login</h1>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required
                            onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required
                            onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Login</button>
                </form>
            </main>
            <Link to="/register">Register</Link>
        </div>
    )
}

export default Login;