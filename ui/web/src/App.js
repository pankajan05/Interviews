import './App.css';
import React from 'react';
import Store from "./folder/Store";
import SubmitButton from "./SubmitButton";
import {observer} from "mobx-react";
import LoginForm from "./LoginForm";

class App extends React.Component{
    async componentDidMount(){
        try{
            let res = await fetch('/isLoggedIn', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            let result = await res.json();
            if (result && result.success) {
                Store.loading = false;
                Store.isLoggedIn = true;
                Store.username = result.username;
            } else {
                Store.loading = false;
                Store.isLoggedIn = false;
            }
        } catch(e) {
            Store.loading = false;
            Store.isLoggedIn = false;
        }
    }

    async doLogout(){
        try{
            let res = await fetch('/logout', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            let result = await res.json();
            if (result && result.success) {
                Store.loading = false;
                Store.isLoggedIn = false;
                Store.username = '';
            }
        } catch(e) {
            console.log(e);
        }
    }
  render(){
        if (Store.loading){
            return (
                <div className="app">
                    <div className="loading">
                        Loading, please wait......
                    </div>
                </div>
            );
        }
        else {
            if(Store.isLoggedIn){
                return (
                    <div className="app">
                        <div className="loading">
                            Welcome {Store.username}
                            <SubmitButton text={'Log out'} disabled={false} onClick={() => this.doLogout()}/>
                        </div>
                    </div>
                );
            }
            return (
                <div className="App">
                    <div className="container">
                        <LoginForm/>
                    </div>
                </div>
            );
        }
  }
}

export default observer(App);
