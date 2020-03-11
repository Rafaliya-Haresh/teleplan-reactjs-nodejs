import React, { Component } from 'react';
import Header from '../Header';
import './Dashboard.css';

class Dashboard extends Component {

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
  }

  signOff(){
    localStorage.removeItem('user');
    this.props.history.push('/');
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
                <div className="list-group-item list-group-item-action change-password"  onClick={()=>this.isActiveToggle('change-password')}>Change Password</div>
                <div className="list-group-item list-group-item-action"  onClick={()=>this.signOff()}>Sign off</div>
              </div>
            </div>
            <div className="col-8">
              <div className="tab-content" id="nav-tabContent">

                <div className="tab-pane active"  id="home">
                  <h4>Welcome to MSP's Teleplan Web  Access</h4>
                  <p>Welcome to the home page of the BC Medical Service Plan (MSP) <br/> Electronic Claims Submission web application.</p>
                </div>
                
                <div className="tab-pane" id="change-password">
                  ...
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