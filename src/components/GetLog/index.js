import React, { Component } from 'react';
import { rxAjax, NODE_APPLICATION_URL } from '../../utils';
import Loader from '../../container/Loader';

class GetLog extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			ExternalAction: "AgetLog",
			logname: '',
			logtype: '',
			mode: "DOWNLOAD",
			loaded: false,
			data: '',
			logList: '',
			listLoaded: false,
			res_error: '',
			errors: {}
    	}
    	this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.getRetriveGetLogList = this.getRetriveGetLogList.bind(this);
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
				endpoint: NODE_APPLICATION_URL+'/getlog',
				payload: {
					ExternalAction: this.state.ExternalAction,
					LOGNAME: this.state.logname,
					LOGTYPE: this.state.logtype,
					MODE: this.state.mode
				}
			});
			console.log("Retrive Logs ", returnData);
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
					logname: '',
					logtype: '',
					data: returnData.data.text
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
  
		if (!this.state["logname"]) {
		  formIsValid = false;
		  errors["logname"] = "*Please enter your logname.";
		}
  
		if (!this.state["logtype"]) {
		  formIsValid = false;
		  errors["logtype"] = "*Please enter your logtype.";
    	}

		this.setState({
		  errors: errors,
		  loaded: true
		});
		return formIsValid;
	}

	async getRetriveGetLogList(){
		this.setState({
			listLoaded: true
		});
		const returnData = await rxAjax({
			method: 'POST',
			endpoint: NODE_APPLICATION_URL+'/getloglist',
			payload: {
				"ExternalAction": "AgetLogList"
			}
		});
		this.setState({
			listLoaded: false
		});
		console.log("Retrive Logs List ", returnData);
		this.setState({
			logList: returnData.data.text
		})
	}

	render() {
	  return (
		<div>
        	<div className="container">
				<h4>Other Processing: View Log History</h4>
				<div className="row">
					<div className="col-lg-12">
						<div className="card">
							<div className="card-body">
								{this.state.res_error &&
								<div className="alert alert-danger" role="alert">{this.state.res_error}</div>
								}
								<form onSubmit={this.handleLoginSubmit}>
									<input type="hidden" className="form-control" name="ExternalAction" value={this.state.ExternalAction} onChange={this.handleFieldChange}/>
                  <input type="hidden" className="form-control" name="mode" value={this.state.mode} onChange={this.handleFieldChange}/>
									<div className="form-group">
										<label htmlFor="userInput">Filename</label>
										<input type="text" className="form-control" placeholder="Enter Filename"  name="logname" value={this.state.logname} onChange={this.handleFieldChange}/>
										<div className="errorMsg">{this.state.errors.logname}</div>
									</div>
									<div className="form-group">
										<label htmlFor="passwordInput">Log Type</label>
										<input type="text" className="form-control" placeholder="Enter " name="logtype" value={this.state.logtype} onChange={this.handleFieldChange}/>
										<div className="errorMsg">{this.state.errors.logtype}</div>
									</div>

									<button type="submit" className="btn btn-primary" disabled={this.state.loaded}>
									{this.state.loaded && <Loader/>}
									Retrive Log</button>
								</form>
							</div>
							{this.state.data}
						</div>
					</div>
				</div>
				<div className="row mt-5">
					<div className="col-lg-12">
						<button type="button" className="btn btn-primary" disabled={this.state.listLoaded} onClick={this.getRetriveGetLogList}>
									{this.state.listLoaded && <Loader/>}
									Retrive Log List</button>

									{this.state.logList}
					</div>
				</div>
		  	</div>
		  </div>
	  );
	}
};

export default GetLog;
