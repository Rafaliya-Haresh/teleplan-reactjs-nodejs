import React, { Component } from 'react';
import './PutAscii.css';
import { NODE_APPLICATION_URL } from '../../utils';
import Loader from '../../container/Loader';
import axios from 'axios';

class PutAscii extends Component {
	
	constructor() {
		super();
		this.state = {
			ExternalAction: 'AputRemit',
            submitASCII: '',
			res_error: '',
			loaded: false,
			errors: {}
		}
		this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
        this.handleRemitSubmit = this.handleRemitSubmit.bind(this);
	}

	onFileChangeHandler(e){
        this.setState({
            submitASCII: e.target.files[0]
        });
    };
	
	handleRemitSubmit(e){
		e.preventDefault();
		
		if(this.validateForm()){
			const data = new FormData() 
			data.append('submitASCII', this.state.submitASCII)
			data.append('ExternalAction', 'submitASCII')
			
			axios.post(NODE_APPLICATION_URL+ "/ascii-upload", data).then(result => {
				if(result.data.data.Result !== 'SUCCESS'){
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
  
		if (!this.state["submitASCII"]) {
		  formIsValid = false;
		  errors["submitASCII"] = "*Please select your file.";
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
			  	<div className="card">
			  		<div className="card-body">
					  	{this.state.res_error &&
						  <div className="alert alert-danger" role="alert">{this.state.res_error}</div>
						}
						<form onSubmit={this.handleRemitSubmit}>
							<div className="form-group">
								<label htmlFor="passwordInput">Select file to send</label>
								<input type="file" className="form-control" onChange={this.onFileChangeHandler}/>
								<div className="errorMsg">{this.state.errors.submitASCII}</div>
							</div>
							<button type="submit" className="btn btn-primary" disabled={this.state.loaded}>
			  				{this.state.loaded &&
								<Loader/>
							}
							Click here to upload Ascii</button>
						</form>
					</div>
				</div>
			</div>
	  	</div> 
	  );
	}
};

export default PutAscii;
