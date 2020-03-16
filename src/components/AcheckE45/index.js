import React, { Component } from 'react';
import './AcheckE45.css';
import { rxAjax, NODE_APPLICATION_URL } from '../../utils';
import Loader from '../../container/Loader';

class AcheckE45 extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			ExternalAction: 'AcheckE45',
            PHN: '',
            dateOfBirthyyyy: '',
            dateOfBirthmm: '',
            dateOfBirthdd: '',
            dateOfServiceyyyy: '',
            dateOfServicemm: '',
            dateOfServicedd: '',
            PatientVisitCharge: false,
            LastEyeExam: false,
            PatientRestriction: false,
            birthDate: '',
			loaded: false,
			res_error: '',
			errors: {}
        }
		this.handleCheckE45Submit = this.handleCheckE45Submit.bind(this);
		this.handleCheckboxFieldPatientVisitChange = this.handleCheckboxFieldPatientVisitChange.bind(this);
		this.handleCheckboxFieldLastEyeExamChange = this.handleCheckboxFieldLastEyeExamChange.bind(this);
		this.handleCheckboxFieldPatientRestrictionChange = this.handleCheckboxFieldPatientRestrictionChange.bind(this);
		this.handleFieldChange = this.handleFieldChange.bind(this);
	}

	handleFieldChange(event) {
		const { name, value } = event.target;
		
		this.setState({
		  [name]: value,
		});
	}

	handleCheckboxFieldPatientVisitChange(){
		this.setState({
			PatientVisitCharge: !this.state.PatientVisitCharge
		})
	}

	handleCheckboxFieldLastEyeExamChange(){
		this.setState({
            LastEyeExam: !this.state.LastEyeExam
		})
	}

	handleCheckboxFieldPatientRestrictionChange(){
		this.setState({
            PatientRestriction: !this.state.PatientRestriction
		})
	}
	
	async handleCheckE45Submit(e){
		e.preventDefault();
		if(this.validateForm()){
			const returnData = await rxAjax({
				method: 'POST',
				endpoint: NODE_APPLICATION_URL+'/checkE45',
				payload: {
					ExternalAction: this.state.ExternalAction,
					PHN: this.state.PHN,
					dateOfBirthyyyy: this.state.dateOfBirthyyyy,
					dateOfBirthmm: this.state.dateOfBirthmm,
					dateOfBirthdd: this.state.dateOfBirthdd,
					dateOfServiceyyyy: this.state.dateOfServiceyyyy,
					dateOfServicemm: this.state.dateOfServicemm,
					dateOfServicedd: this.state.dateOfServicedd,
					PatientVisitCharge: this.state.PatientVisitCharge,
					LastEyeExam: this.state.LastEyeExam,
					PatientRestriction: this.state.PatientRestriction
				}
			});
			console.log("AcheckE45 ", returnData);
			if(returnData.data.Result !== 'SUCCESS'){
				this.setState({
					loaded: false,
					res_error: returnData.data.Msgs,
					PHN: '',
					dateOfBirthyyyy: '',
					dateOfBirthmm: '',
					dateOfBirthdd: '',
					dateOfServiceyyyy: '',
					dateOfServicemm: '',
					dateOfServicedd: '',
					PatientVisitCharge: false,
					LastEyeExam: false,
					PatientRestriction: false
				});
			}else{
				
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
  
		if (!this.state["PHN"]) {
		  formIsValid = false;
		  errors["PHN"] = "*Please enter your PHN.";
		}
  
		if (!this.state["dateOfBirthyyyy"] || !this.state["dateOfBirthmm"] || !this.state["dateOfBirthdd"]) {
		  formIsValid = false;
		  errors["birthDate"] = "*Please enter your Birth Date.";
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
				<h4>MSP Coverage Status Check</h4>
				<div className="row">
					<div className="col-lg-12">
						<div className="card">
							<div className="card-body">
								{this.state.res_error &&
								<div className="alert alert-danger" role="alert">{this.state.res_error}</div>
								}
								<form onSubmit={this.handleCheckE45Submit}>
									<input type="hidden" className="form-control" name="ExternalAction" value={this.state.ExternalAction} onChange={this.handleFieldChange} required/>
									<div className="form-group">
										<label htmlFor="userInput">PHN Number</label>
										<input type="number" className="form-control" placeholder="Enter Phone Number"  name="PHN" value={this.state.PHN} onChange={this.handleFieldChange}/>
										<div className="errorMsg">{this.state.errors.PHN}</div>
									</div>
									<div className="form-group birth-date">
										<label>Birth Date</label><br/>
										<input type="number" className="form-control" placeholder="YYYY" name="dateOfBirthyyyy" value={this.state.dateOfBirthyyyy} onChange={this.handleFieldChange}/>/&nbsp;
                                        <input type="number" className="form-control" placeholder="MM" name="dateOfBirthmm" value={this.state.dateOfBirthmm} onChange={this.handleFieldChange}/>/&nbsp;
                                        <input type="number" className="form-control" placeholder="DD" name="dateOfBirthdd" value={this.state.dateOfBirthdd} onChange={this.handleFieldChange}/>
										
                                        <div className="errorMsg">{this.state.errors.birthDate}</div>
									</div>

                                    <div className="form-group service-date">
										<label>Service Date (YYYY MM DD)</label><br/>
										<input type="number" className="form-control" placeholder="YYYY" name="dateOfServiceyyyy" value={this.state.dateOfServiceyyyy} onChange={this.handleFieldChange}/>/&nbsp;
                                        <input type="number" className="form-control" placeholder="MM" name="dateOfServicemm" value={this.state.dateOfServicemm} onChange={this.handleFieldChange}/>/&nbsp;
                                        <input type="number" className="form-control" placeholder="DD" name="dateOfServicedd" value={this.state.dateOfServicedd} onChange={this.handleFieldChange}/>
									</div>
									<div className="form-group">
										<label>
											<input type="checkbox" checked={this.state.PatientVisitCharge} onChange={this.handleCheckboxFieldPatientVisitChange} /> Subsidy Insured Service
										</label>
									</div>
									<div className="form-group">
										<label>
											<input type="checkbox" checked={this.state.LastEyeExam} onChange={this.handleCheckboxFieldLastEyeExamChange} /> Last Eye Exam
										</label>
									</div>
									<div className="form-group">
										<label>
											<input type="checkbox" checked={this.state.PatientRestriction} onChange={this.handleCheckboxFieldPatientRestrictionChange} /> Patient Restriction
										</label>
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

export default AcheckE45;
