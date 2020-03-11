import React, { Component } from 'react';
import './Login.css';
import { rxAjax, NODE_APPLICATION_URL } from '../../utils';
import Loader from '../../container/Loader';
import Header from '../Header';

class Login extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			ExternalAction: 'AsignOn',
            username: '',
			password: '',
			loaded: false,
			res_error: '',
			errors: {}
        }
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
		this.handleFieldChange = this.handleFieldChange.bind(this);
	}

	handleFieldChange(event) {
		const { name, value } = event.target;
		
		this.setState({
		  [name]: value,
		});
	}
	
	async handleLoginSubmit(e){
		e.preventDefault();
		if(this.validateForm()){
			const returnData = await rxAjax({
				method: 'POST',
				endpoint: NODE_APPLICATION_URL+'/login',
				payload: {
					ExternalAction: this.state.ExternalAction,
					username: this.state.username,
					password: this.state.password
				}
			});
			console.log(returnData);
			if(returnData.data.Result !== 'SUCCESS'){
				this.setState({
					loaded: false
				});
				this.setState({
					res_error: returnData.data.Msgs,
					username: '',
					password: ''
				})
			}else{
				localStorage.setItem('user', returnData.data.username);
				this.props.history.push('/dashboard');
			}
		}else{
			this.setState({
				loaded: false
			});
		}
	}

	validateForm() {
		let errors = {};
		let formIsValid = true;
  
		if (!this.state["username"]) {
		  formIsValid = false;
		  errors["username"] = "*Please enter your username.";
		}
  
		if (!this.state["password"]) {
		  formIsValid = false;
		  errors["password"] = "*Please enter your password.";
		}

		this.setState({
		  errors: errors,
		  loaded: true
		});
		return formIsValid;
	}

	render() {
	  return (
		<div>
			<Header history={this.props.history}/>
        	<div className="container">
				<div className="row mt-5">
					<div className="col-lg-6 offset-lg-3">
						<div className="card">
							<div className="card-body">
								{this.state.res_error &&
								<div className="alert alert-danger" role="alert">{this.state.res_error}</div>
								}
								<form onSubmit={this.handleLoginSubmit}>
									<input type="hidden" className="form-control" name="ExternalAction" value={this.state.ExternalAction} onChange={this.handleFieldChange} required/>
									<div className="form-group">
										<label htmlFor="userInput">Username</label>
										<input type="text" className="form-control" placeholder="Enter Username"  name="username" value={this.state.username} onChange={this.handleFieldChange}/>
										<div className="errorMsg">{this.state.errors.username}</div>
									</div>
									<div className="form-group">
										<label htmlFor="passwordInput">Password</label>
										<input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleFieldChange}/>
										<div className="errorMsg">{this.state.errors.password}</div>
									</div>
									<button type="submit" className="btn btn-primary" disabled={this.state.loaded}>
									{this.state.loaded && <Loader/>}
									Submit</button>
								</form>
							</div>
						</div>
					</div>
				</div> 
		  	</div>
		  </div>
	  );
	}
};

export default Login;
