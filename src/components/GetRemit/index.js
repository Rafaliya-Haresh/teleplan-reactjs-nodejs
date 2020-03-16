import React, { Component } from 'react';
import './GetRemit.css';
import { rxAjax, NODE_APPLICATION_URL, nl2br } from '../../utils';
import Loader from '../../container/Loader';

class GetRemit extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			ExternalAction: 'AgetRemit',
            remittance: false,
            loaded: false,
            data: '',
			res_error: '',
			errors: {}
        }
        this.handleRemitSubmit = this.handleRemitSubmit.bind(this);
		this.handleFieldChange = this.handleFieldChange.bind(this);
	}

	handleFieldChange() {
		this.setState({
            remittance: !this.state.remittance,
		});
	}
	
	async handleRemitSubmit(e){
		this.setState({
			data: ''
		});
		e.preventDefault();
		if(this.validateForm()){
			const returnData = await rxAjax({
				method: 'POST',
				endpoint: NODE_APPLICATION_URL+'/get-remit',
				payload: {
					ExternalAction: this.state.ExternalAction,
					remittance: this.state.remittance,
				}
			});
			console.log("GetRemit ", returnData);
			if(!returnData.data){
				localStorage.removeItem('user');
				this.props.history.push('/');
				return;
			}
			else if(returnData.data.Result !== 'SUCCESS'){
				this.setState({
                    loaded: false,
                    res_error: returnData.data.Msgs,
					remittance: false,
				});
			}else{
                this.setState({
					loaded: false,
					remittance: false,
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
								<form onSubmit={this.handleRemitSubmit}>
									<input type="hidden" className="form-control" name="ExternalAction" value={this.state.ExternalAction} onChange={this.handleFieldChange} required/>
									<div className="form-group">
                                    <label>
                                        <input type="checkbox" checked={this.state.remittance} onChange={this.handleFieldChange} /> Include Remittances
                                    </label>
										<div className="errorMsg">{this.state.errors.remittance}</div>
									</div>
									<button type="submit" className="btn btn-primary" disabled={this.state.loaded}>
									{this.state.loaded && <Loader/>}
									Get Remit</button>
								</form>
							</div>
                            <div id="getremit" dangerouslySetInnerHTML={{ __html: nl2br(this.state.data) }} style={{padding: '10px 20px'}}/>
						</div>
					</div>
				</div> 
		  	</div>
		  </div>
	  );
	}
};

export default GetRemit;
