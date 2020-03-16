import React, { Component } from 'react';
import './GetAsciiFile.css';
import { rxAjax, NODE_APPLICATION_URL, nl2br } from '../../utils';
import Loader from '../../container/Loader';

class GetAsciiFile extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			ExternalAction: 'AgetAscii',
            filechar: '',
            loaded: false,
            data: '',
			res_error: '',
			errors: {}
        }
        this.handleFileCharSubmit = this.handleFileCharSubmit.bind(this);
		this.handleFieldChange = this.handleFieldChange.bind(this);
	}

	handleFieldChange(event) {
		const { name, value } = event.target;
		
		this.setState({
		  [name]: value,
		});
	}
	
	async handleFileCharSubmit(e){
		this.setState({
			data: ''
		});
		e.preventDefault();
		if(this.validateForm()){
			const returnData = await rxAjax({
				method: 'POST',
				endpoint: NODE_APPLICATION_URL+'/get-ascii-file',
				payload: {
					ExternalAction: this.state.ExternalAction,
					filechar: this.state.filechar,
				}
			});
			console.log("GetAsciiFile ", returnData);
			if(!returnData.data){
				localStorage.removeItem('user');
				this.props.history.push('/');
				return false;
			}
			else if(returnData.data.Result !== 'SUCCESS'){
				this.setState({
                    loaded: false,
                    res_error: returnData.data.Msgs,
					filechar: '',
				});
			}else{
                this.setState({
					loaded: false,
					filechar: '',
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
  
		if (!this.state["filechar"]) {
		  formIsValid = false;
		  errors["filechar"] = "*Please enter your filechar.";
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
        	<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="card">
							<div className="card-body">
								{this.state.res_error &&
								<div className="alert alert-danger" role="alert">{this.state.res_error}</div>
								}
								<form onSubmit={this.handleFileCharSubmit}>
									<input type="hidden" className="form-control" name="ExternalAction" value={this.state.ExternalAction} onChange={this.handleFieldChange} required/>
									<div className="form-group">
										<label htmlFor="userInput">File Type</label>
										<input type="text" className="form-control" placeholder="Enter Filechar"  name="filechar" value={this.state.filechar} onChange={this.handleFieldChange}/>
										<div className="errorMsg">{this.state.errors.filechar}</div>
									</div>
									<button type="submit" className="btn btn-primary" disabled={this.state.loaded}>
									{this.state.loaded && <Loader/>}
									Get Acii File</button>
								</form>
							</div>
                            <div id="getascii" dangerouslySetInnerHTML={{ __html: nl2br(this.state.data) }} style={{padding: '10px 20px'}}/>
						</div>
					</div>
				</div> 
		  	</div>
		  </div>
	  );
	}
};

export default GetAsciiFile;
