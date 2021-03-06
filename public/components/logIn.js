import React from 'react';
import Style from '../css/loginPage.css';
import {Redirect, Link} from 'react-router-dom';
import loginImage from '../css/images/LcarsNetwork.png';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';

//FIXME: Change background to move with login elements when page is resized

let bigDiv = {
  backgroundColor: 'black',
  position: "fixed",
  height: "100%",
  width: "100%"
}

let sectionStyle ={
  display: "block",
  margin: "0px",
  marginRight: "auto",
  marginLeft: "auto",
  textAlign: "center",
  marginTop: "25px"

}

let buttonStyle = {width:"150px",height: "50px", position: "relative",
    display: "block", margin: "auto", borderRadius: "8px", fontSize: 16, background: "white" };




export default class LoginComp extends React.Component {
  constructor(props){
    super();
    //FIXME: REMOVE USER AND PASS AFTER TESTING
    this.state = {username: "", password: "", redirect: false, unMount: false};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.changePass = this.changePass.bind(this);
    //FOR TEST: Log current user out to ensure login page works
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    }, function(error) {
    // An error happened.
    });
  }

  componentWillMount(){
    this.auth = firebase.auth().onAuthStateChanged(function(user) {
      this.setState({unMount: true})
      if (user) {

          this.setState({redirect: true});
          //console.log(user.uid);

      } else {
        // No user is signed in.
      }
    }.bind(this));
  }

  handleSubmit(event){
    event.preventDefault();
    event.stopPropagation();

      //console.log(this.state.username);
      //console.log(this.state.password);

      firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;


        if(errorCode == 'auth/user-not-found'){
          alert(errorMessage);
        }
        else{
          alert(errorMessage);
        }
        this.setState(unMount:true);


      });


  }
  changeUser(event){
    this.setState({username: event.target.value});
  }
  changePass(event){
    this.setState({password: event.target.value});
  }
  render() {
    if(this.state.redirect){
      //console.log("Working!");
      return <Redirect to="/home" />

    }
    return (
      <div style = {bigDiv}>
      <section style = {sectionStyle}>
        <div key='divKey'>
          <img src = {loginImage}></img>
          <form onSubmit = {this.handleSubmit}>
            <p><input type="text" value = {this.state.username}  placeholder="Username or Email" onChange = {this.changeUser}/></p>
            <p><input type="password" value = {this.state.password} placeholder="Password" onChange = {this.changePass}/></p>

            <p><button type="submit" style = {buttonStyle} onClick={this.handleSubmit}>Log In</button></p>
          </form>
        </div>

        <div>
          <p><font color = "white">Don't have an account? </font><Link to ="/create">Click here to make one</Link>.</p>
        </div>
      </section>
    </div>
    )
    }
    componentWillUnmount(){
      if(this.state.unMount){
      this.auth();
      }
    }

}
