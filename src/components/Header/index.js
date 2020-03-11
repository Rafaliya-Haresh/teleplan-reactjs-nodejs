import React, { Component } from 'react';

class Header extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      username: ''
    }
  }
  
	componentWillMount(){
		var userdata = localStorage.getItem('user');
		if(userdata != null){
      this.props.history.push('/dashboard');
      this.setState({
        username: userdata
      })
		}else{
      this.props.history.push('/');
    }
	}


	render() {
	  return (
	  	<div>
			  <nav className="navbar navbar-expand-md navbar-dark bg-dark ">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <div className="nav-link">
              {this.state.username?this.state.username:'Guest'}</div>
            </li>
          </ul>
        </div>
      </nav>
			</div>
      )
    }
}

export default Header;