import React from 'react';

class LoginForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            buttonDisabled: false
        }
    }
    setInputValue(property, val) {
        val = val.trim();
        if(val.length > 12) {
            return;
        }
        this.setState({
            username: '',
            password: '',
            buttonDisabled: false
        })
    }

    render(){
        return (
            <div  className="loginForm">

            </div>
        );
    }
}

export default LoginForm;
