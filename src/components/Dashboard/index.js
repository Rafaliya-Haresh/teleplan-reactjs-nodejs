import React, { Component } from 'react';
import Header from '../Header';
import './Dashboard.css';
import ChangePassword from '../ChangePassword';
import GetLog from '../GetLog';
import PutRemit from '../PutRemit';
import PutAscii from '../PutAscii';
import GetAsciiFile from '../GetAsciiFile';
import GetRemit from '../GetRemit';
import AcheckE45 from '../AcheckE45';
import { rxAjax, NODE_APPLICATION_URL } from '../../utils';

class Dashboard extends Component {

  constructor(props){
    super(props);
    this.state = {
      ExternalAction: 'AsignOff',
      data: ''
    }
  }


  isActiveToggle(step){
    let tabPaneArr = document.getElementsByClassName('tab-pane');
    for (var i = 0; i < tabPaneArr.length; i++) {
        tabPaneArr[i].classList.remove('active');
    }

    let navLinkArr = document.getElementsByClassName('list-group-item-action');
    for (var j = 0; j < navLinkArr.length; j++) {
        navLinkArr[j].classList.remove('active');
    }
    document.getElementById(step).classList.add('active');
    document.querySelector('.list-group-item.list-group-item-action.'+ step).classList.add('active');

    document.getElementById('getascii').innerHTML = '';
    document.getElementById('getremit').innerHTML = '';
    document.getElementById('getlog').innerHTML = '';
    document.getElementById('getloglist').innerHTML = '';
  }

  async signOff(){
    const returnData = await rxAjax({
      method: 'POST',
      endpoint: NODE_APPLICATION_URL+'/signoff',
      payload: {
        ExternalAction: this.state.ExternalAction
      }
    });
    if(returnData.data.Result !== 'SUCCESS'){

    }else{
      localStorage.removeItem('user');
      this.props.history.push('/');    
    }
  }

  render() {
    return (
      <div>
        <Header history={this.props.history}/>
        <div className="container">
          <div className="row mt-5">
            <div className="col-4">
              <div className="list-group" id="list-tab" role="tablist">
                <div className="list-group-item list-group-item-action home active" onClick={()=>this.isActiveToggle('home')}>Home</div>
                <div className="list-group-item list-group-item-action home sendclaims" onClick={()=>this.isActiveToggle('sendclaims')}>Send Claims</div>
                <div className="list-group-item list-group-item-action home retiveRemittances" onClick={()=>this.isActiveToggle('retiveRemittances')}>Retrieve Remittances</div>
                <div className="list-group-item list-group-item-action change-password"  onClick={()=>this.isActiveToggle('change-password')}>Change Password</div>
                <div className="list-group-item list-group-item-action log"  onClick={()=>this.isActiveToggle('log')}>Other Processing + Logs</div>
                <div className="list-group-item list-group-item-action checkEligibility"  onClick={()=>this.isActiveToggle('checkEligibility')}>Check Eligibility</div>
                <div className="list-group-item list-group-item-action"  onClick={()=>this.signOff()}>Sign off</div>
              </div>
            </div>
            <div className="col-8">
              <div className="tab-content" id="nav-tabContent">

                <div className="tab-pane active"  id="home">
                  <h4>Welcome to MSP's Teleplan Web  Access</h4>
                  <p>Welcome to the home page of the BC Medical Service Plan (MSP) <br/> Electronic Claims Submission web application.</p>
                  <p>Version: Teleplan Web 4.2.8</p>
                  <p>Use the menu at the left to select the service you would like to access</p>
                </div>
                
                <div className="tab-pane" id="sendclaims">
                  <PutRemit/> 
                    <br/><br/>
                  <PutAscii/>
                </div>

                <div className="tab-pane" id="retiveRemittances">
                  <GetAsciiFile/>
                    <br/><br/>
                    <GetRemit/>
                </div>

                <div className="tab-pane" id="change-password">
                  <ChangePassword/> 
                </div>

                <div className="tab-pane" id="log">
                  <GetLog/> 
                </div>

                <div className="tab-pane" id="checkEligibility">
                  <AcheckE45/>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;