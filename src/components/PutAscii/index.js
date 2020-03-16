import React, { Component } from 'react';
import './PutAscii.css';
import { NODE_APPLICATION_URL } from '../../utils';
import Loader from '../../container/Loader';
import axios from 'axios';

class PutAscii extends Component {
	
	constructor() {
		super();
		this.state = {
            submitASCII: '',
			res_error: '',
			loaded: false,
			errors: {}
		}
		this.onAsciiChangeHandler = this.onAsciiChangeHandler.bind(this);
        this.handleAsciiSubmit = this.handleAsciiSubmit.bind(this);
	}

	onAsciiChangeHandler(e){
        this.setState({
            submitASCII: e.target.files[0]
        });
    };
	
	handleAsciiSubmit(e){
		e.preventDefault();
		
		if(this.validateForm()){
			const dataAscii = new FormData() 
			dataAscii.append('submitASCII', this.state.submitASCII)
			dataAscii.append('ExternalAction', 'AputAscii')
			
			axios.post(NODE_APPLICATION_URL+ "/ascii-upload", dataAscii).then(result => {
				if(!result.data.data){
					localStorage.removeItem('user');
					this.props.history.push('/');
					return;
				}
				else if(result.data.data.Result !== 'SUCCESS'){
					this.setState({
						loaded: false,
						res_error: result.data.data.Msgs,
						submitASCII: '',
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
						<form onSubmit={this.handleAsciiSubmit}>
							<div className="form-group">
								<label htmlFor="passwordInput">Select file to send</label>
								<input type="file" className="form-control" name="submitASCII" onChange={this.onAsciiChangeHandler}/>
								<div className="errorMsg">{this.state.errors.submitASCII}</div>
							</div>
							<button type="submit" className="btn btn-primary" disabled={this.state.loaded}>
			  				{this.state.loaded &&
								<Loader/>
							}
							Upload Ascii</button>
						</form>
					</div>
				</div>
			</div>
	  	</div> 
	  );
	}
};

export default PutAscii;
