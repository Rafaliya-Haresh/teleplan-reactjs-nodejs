import React, { Component } from 'react';
import './PutRemit.css';
import { NODE_APPLICATION_URL } from '../../utils';
import Loader from '../../container/Loader';
import axios from 'axios';

class PutRemit extends Component {
	
	constructor() {
		super();
		this.state = {
            submitFile: '',
			res_error: '',
			loaded: false,
			errors: {}
		}
		this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
        this.handleRemitSubmit = this.handleRemitSubmit.bind(this);
	}

	onFileChangeHandler(e){
        this.setState({
            submitFile: e.target.files[0]
        });
    };
	
	handleRemitSubmit(e){
		e.preventDefault();
		if(this.validateForm()){
			const data = new FormData() 
			data.append('submitFile', this.state.submitFile)
			data.append('ExternalAction', 'AputRemit')
			
			axios.post(NODE_APPLICATION_URL+ "/file-upload", data).then(result => {
				if(!result.data.data){
					localStorage.removeItem('user');
					this.props.history.push('/');
					return;
				}
				else if(result.data.data.Result !== 'SUCCESS'){
					this.setState({
						loaded: false,
						res_error: result.data.data.Msgs,
						submitFile: '',
					});
				}
			})
		 }else{
			this.setState({
				loaded: false
			});
		 }
	}

	validateForm() {
		let errors = {};
		let formIsValid = true;
  
		if (!this.state["submitFile"]) {
		  formIsValid = false;
		  errors["submitFile"] = "*Please select your file.";
        }
        
		this.setState({
		  errors: errors,
		  loaded: true
		});
		return formIsValid;
	}

	render() {
	  return (
	  	<div className="row">
			<div className="col-lg-12">
				<h4>Send Claims</h4>
			  	<div className="card">
			  		<div className="card-body">
					  	{this.state.res_error &&
						  <div className="alert alert-danger" role="alert">{this.state.res_error}</div>
						}
						<form onSubmit={this.handleRemitSubmit}>
							<div className="form-group">
								<label htmlFor="passwordInput">Select file to send</label>
								<input type="file" className="form-control"  name="submitFile" onChange={this.onFileChangeHandler}/>
								<div className="errorMsg">{this.state.errors.submitFile}</div>
							</div>
							<button type="submit" className="btn btn-primary" disabled={this.state.loaded}>
			  				{this.state.loaded &&
								<Loader/>
							}
							Upload Remit</button>
						</form>
					</div>
				</div>
			</div>
	  	</div> 
	  );
	}
};

export default PutRemit;
