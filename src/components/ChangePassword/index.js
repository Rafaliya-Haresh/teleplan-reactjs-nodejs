import React, { Component } from 'react';
import { rxAjax, NODE_APPLICATION_URL } from '../../utils';
import Loader from '../../container/Loader';

class ChangePassword extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			ExternalAction: 'AchangePW',
            username: '',
            oldpassword: '',
            newpassword: '',
            cnfpassword: '',
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
				endpoint: NODE_APPLICATION_URL+'/change-password',
				payload: {
					"ExternalAction": this.state.ExternalAction,
					"username": this.state.username,
                    "password": this.state.oldpassword,
                    "new.password": this.state.newpassword,
                    "confirm.password": this.state.cnfpassword
				}
			});
			console.log("Change Password ", returnData);
			if(returnData.data.Result !== 'SUCCESS'){
				this.setState({
					loaded: false
                });
                
				this.setState({
					res_error: returnData.data.Msgs
				})
			}else{
                this.setState({
					loaded: false,
					username: '',
                    oldpassword: '',
                    newpassword: '',
                    cnfpassword: ''
                });
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
  
		if (!this.state["oldpassword"]) {
		  formIsValid = false;
		  errors["oldpassword"] = "*Please enter your old password.";
        }
        
        if (!this.state["newpassword"]) {
            formIsValid = false;
            errors["newpassword"] = "*Please enter your new password.";
        }

        if (!this.state["cnfpassword"]) {
            formIsValid = false;
            errors["cnfpassword"] = "*Please enter your confirm password.";
		}
		
		// if (this.state["newpassword"] !== this.state["cnfpassword"]) {
        //     formIsValid = false;
        //     errors["cnfpassword"] = "*password doesn't match";
        // }

		this.setState({
		  errors: errors,
		  loaded: true
		});
		return formIsValid;
	}

	render() {
	  return (
		<div>
        	<div className="container">
				<div className="row">
					<div className="col-lg-12">
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
										<label htmlFor="passwordInput">Old Password</label>
										<input type="password" className="form-control" placeholder="Old Password" name="oldpassword" value={this.state.oldpassword} onChange={this.handleFieldChange}/>
										<div className="errorMsg">{this.state.errors.oldpassword}</div>
									</div>

                                    <div className="form-group">
										<label htmlFor="passwordInput">New Password</label>
										<input type="password" className="form-control" placeholder="New Password" name="newpassword" value={this.state.newpassword} onChange={this.handleFieldChange}/>
										<div className="errorMsg">{this.state.errors.newpassword}</div>
									</div>

                                    <div className="form-group">
										<label htmlFor="passwordInput">Confirm Password</label>
										<input type="password" className="form-control" placeholder="Confime Password" name="cnfpassword" value={this.state.cnfpassword} onChange={this.handleFieldChange}/>
										<div className="errorMsg">{this.state.errors.cnfpassword}</div>
									</div>
									<button type="submit" className="btn btn-primary" disabled={this.state.loaded}>
									{this.state.loaded && <Loader/>}
									Change Password</button>
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

export default ChangePassword;
