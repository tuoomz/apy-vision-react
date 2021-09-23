import axios from 'axios';
import React, { SyntheticEvent } from 'react'
import { Redirect } from 'react-router-dom';

class Register extends React.Component {
    email = '';
    password = '';
    password_confirm = '';
    state = { redirect: false };

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await axios.post('register', {
            "email": this.email,
            "password": this.password,
            "password_confirm": this.password_confirm,
        });

        this.setState({
            redirect: true
        });

        console.log(response);
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={'/login'} />;
        }

        return <main className="form-signin">
            <form onSubmit={this.submit}>
                <h1 className="h3 mb-3 fw-normal">Register</h1>

                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required
                        onChange={e => this.email = e.target.value} />
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required
                        onChange={e => this.password = e.target.value} />
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPasswordConfirm" placeholder="Confirm Password" required
                        onChange={e => this.password_confirm = e.target.value} />
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
            </form>
        </main>
    }
}

export default Register;