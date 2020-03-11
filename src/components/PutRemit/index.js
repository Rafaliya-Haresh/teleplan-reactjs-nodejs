import React, { Component } from 'react';
import './PutRemit.css';
import { NODE_APPLICATION_URL } from '../../utils';
import Loader from '../../container/Loader';
import axios from 'axios';

class PutRemit extends Component {
	
	constructor() {
		super();
		this.state = {
			ExternalAction: 'AputRemit',
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
			data.append('file', this.state.submitFile)
			data.append('ExternalAction', 'AputRemit')
			
			axios.post(NODE_APPLICATION_URL+ "/file-upload", data).then(result => {
				if(result.statusText){
					this.setState({
						loaded: false
					})
					console.log(result.data);
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
	  	<div className="row mt-5">
			<div className="col-lg-6 offset-lg-3">
			  	<div className="card">
			  		<div className="card-body">
					  	{this.state.res_error &&
						  <div className="alert alert-danger" role="alert">{this.state.res_error}</div>
						}
						<form onSubmit={this.handleRemitSubmit}>
							<div className="form-group">
								<label htmlFor="passwordInput">Password</label>
								<input type="file" className="form-control" onChange={this.onFileChangeHandler}/>
								<div className="errorMsg">{this.state.errors.submitFile}</div>
							</div>
							<button type="submit" className="btn btn-primary" disabled={this.state.loaded}>
			  				{this.state.loaded &&
								<Loader/>
							}
							Click here to upload</button>
						</form>
					</div>
				</div>
			</div>
	  	</div> 
	  );
	}
};

export default PutRemit;
