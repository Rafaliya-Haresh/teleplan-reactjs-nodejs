(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{32:function(e,t,a){e.exports=a(64)},37:function(e,t,a){},39:function(e,t,a){},40:function(e,t,a){},58:function(e,t,a){},64:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(28),l=a.n(s),o=(a(37),a(1)),i=a(2),c=a(4),m=a(3),d=a(5),u=(0,a(12).createBrowserHistory)(),h=a(66),p=function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"main-content"},r.a.createElement("div",{className:"error-box"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-12"},r.a.createElement("div",{className:"error text-center"},r.a.createElement("img",{src:"images/error-404.png",className:"img-fluid",alt:"test"}),r.a.createElement("br",null),r.a.createElement("h2",{className:"mt-4 "},"Sorry the page not found"),r.a.createElement("a",{href:"/",className:"button mt-5 mr-2"},"Go to Home Page"))))))))}}]),t}(n.Component),g=a(7),v=a.n(g),b=a(11),E=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).state={username:""},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentWillMount",value:function(){var e=localStorage.getItem("user");null!=e?(this.props.history.push("/dashboard"),this.setState({username:e})):this.props.history.push("/")}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("nav",{className:"navbar navbar-expand-md navbar-dark bg-dark "},r.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarTogglerDemo01","aria-controls":"navbarTogglerDemo01","aria-expanded":"false","aria-label":"Toggle navigation"},r.a.createElement("span",{className:"navbar-toggler-icon"})),r.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarTogglerDemo01"},r.a.createElement("ul",{className:"navbar-nav mr-auto mt-2 mt-lg-0"},r.a.createElement("li",{className:"nav-item active"},r.a.createElement("div",{className:"nav-link"},this.state.username?this.state.username:"Guest"))))))}}]),t}(n.Component),f=(a(39),a(13)),w=a(6),y="https://teleplan.herokuapp.com";function N(e){var t=[],a={},n=e.method;if(n||(n="GET"),e.endpoint||t.push("endpoint"),e.payload||"GET"===n||"DELETE"===n||t.push("payload"),t.length)throw new Error("Error! You must pass `".concat(t.join("`, `"),"`"));return a.url=e.endpoint,a.method=n,a.crossDomain=!0,a.headers={"Content-Type":"application/json"},e.responseType&&(a.responseType=e.responseType),"GET"!==n&&(a.body=e.payload),fetch(a.url,{method:a.method,crossDomain:!0,headers:a.headers,body:JSON.stringify(a.body)}).then(function(e){return e.json()}).then(function(e){return e}).catch(function(e){return e})}var O=function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("span",null,r.a.createElement("span",{className:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"}),"\xa0")}}]),t}(n.Component),S=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).state={ExternalAction:"AchangePW",username:"",oldpassword:"",newpassword:"",cnfpassword:"",loaded:!1,res_error:"",errors:{}},a.handleLoginSubmit=a.handleLoginSubmit.bind(Object(w.a)(a)),a.handleFieldChange=a.handleFieldChange.bind(Object(w.a)(a)),a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"handleFieldChange",value:function(e){var t=e.target,a=t.name,n=t.value;this.setState(Object(f.a)({},a,n))}},{key:"handleLoginSubmit",value:function(){var e=Object(b.a)(v.a.mark(function e(t){var a;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!this.validateForm()){e.next=9;break}return e.next=4,N({method:"POST",endpoint:y+"/change-password",payload:{ExternalAction:this.state.ExternalAction,username:this.state.username,password:this.state.oldpassword,"new.password":this.state.newpassword,"confirm.password":this.state.cnfpassword}});case 4:a=e.sent,console.log("Change Password ",a),"SUCCESS"!==a.data.Result?(this.setState({loaded:!1}),this.setState({res_error:a.data.Msgs})):this.setState({loaded:!1,username:"",oldpassword:"",newpassword:"",cnfpassword:""}),e.next=10;break;case 9:this.setState({loaded:!1});case 10:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"validateForm",value:function(){var e={},t=!0;return this.state.username||(t=!1,e.username="*Please enter your username."),this.state.oldpassword||(t=!1,e.oldpassword="*Please enter your old password."),this.state.newpassword||(t=!1,e.newpassword="*Please enter your new password."),this.state.cnfpassword||(t=!1,e.cnfpassword="*Please enter your confirm password."),this.state.newpassword!==this.state.cnfpassword&&(t=!1,e.cnfpassword="*password doesn't match"),this.setState({errors:e,loaded:!0}),t}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"container"},r.a.createElement("h4",null,"Change Password"),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-lg-12"},r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-body"},this.state.res_error&&r.a.createElement("div",{className:"alert alert-danger",role:"alert"},this.state.res_error),r.a.createElement("form",{onSubmit:this.handleLoginSubmit},r.a.createElement("input",{type:"hidden",className:"form-control",name:"ExternalAction",value:this.state.ExternalAction,onChange:this.handleFieldChange,required:!0}),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"userInput"},"Username"),r.a.createElement("input",{type:"text",className:"form-control",placeholder:"Enter Username",name:"username",value:this.state.username,onChange:this.handleFieldChange}),r.a.createElement("div",{className:"errorMsg"},this.state.errors.username)),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"passwordInput"},"Old Password"),r.a.createElement("input",{type:"password",className:"form-control",placeholder:"Old Password",name:"oldpassword",value:this.state.oldpassword,onChange:this.handleFieldChange}),r.a.createElement("div",{className:"errorMsg"},this.state.errors.oldpassword)),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"passwordInput"},"New Password"),r.a.createElement("input",{type:"password",className:"form-control",placeholder:"New Password",name:"newpassword",value:this.state.newpassword,onChange:this.handleFieldChange}),r.a.createElement("div",{className:"errorMsg"},this.state.errors.newpassword)),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"passwordInput"},"Confirm Password"),r.a.createElement("input",{type:"password",className:"form-control",placeholder:"Confime Password",name:"cnfpassword",value:this.state.cnfpassword,onChange:this.handleFieldChange}),r.a.createElement("div",{className:"errorMsg"},this.state.errors.cnfpassword)),r.a.createElement("button",{type:"submit",className:"btn btn-primary",disabled:this.state.loaded},this.state.loaded&&r.a.createElement(O,null),"Change Password"))))))))}}]),t}(n.Component),C=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).state={ExternalAction:"AgetLog",logname:"",logtype:"",mode:"DOWNLOAD",loaded:!1,data:"",logList:"",listLoaded:!1,res_error:"",errors:{}},a.handleLoginSubmit=a.handleLoginSubmit.bind(Object(w.a)(a)),a.handleFieldChange=a.handleFieldChange.bind(Object(w.a)(a)),a.getRetriveGetLogList=a.getRetriveGetLogList.bind(Object(w.a)(a)),a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"handleFieldChange",value:function(e){var t=e.target,a=t.name,n=t.value;this.setState(Object(f.a)({},a,n))}},{key:"handleLoginSubmit",value:function(){var e=Object(b.a)(v.a.mark(function e(t){var a;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!this.validateForm()){e.next=9;break}return e.next=4,N({method:"POST",endpoint:y+"/getlog",payload:{ExternalAction:this.state.ExternalAction,LOGNAME:this.state.logname,LOGTYPE:this.state.logtype,MODE:this.state.mode}});case 4:a=e.sent,console.log("Retrive Logs ",a),"SUCCESS"!==a.data.Result?(this.setState({loaded:!1}),this.setState({res_error:a.data.Msgs})):this.setState({loaded:!1,logname:"",logtype:"",data:a.data.text}),e.next=10;break;case 9:this.setState({loaded:!1});case 10:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"validateForm",value:function(){var e={},t=!0;return this.state.logname||(t=!1,e.logname="*Please enter your logname."),this.state.logtype||(t=!1,e.logtype="*Please enter your logtype."),this.setState({errors:e,loaded:!0}),t}},{key:"getRetriveGetLogList",value:function(){var e=Object(b.a)(v.a.mark(function e(){var t;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({listLoaded:!0}),e.next=3,N({method:"POST",endpoint:y+"/getloglist",payload:{ExternalAction:"AgetLogList"}});case 3:t=e.sent,this.setState({listLoaded:!1}),console.log("Retrive Logs List ",t),this.setState({logList:t.data.text});case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"container"},r.a.createElement("h4",null,"Other Processing: View Log History"),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-lg-12"},r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-body"},this.state.res_error&&r.a.createElement("div",{className:"alert alert-danger",role:"alert"},this.state.res_error),r.a.createElement("form",{onSubmit:this.handleLoginSubmit},r.a.createElement("input",{type:"hidden",className:"form-control",name:"ExternalAction",value:this.state.ExternalAction,onChange:this.handleFieldChange}),r.a.createElement("input",{type:"hidden",className:"form-control",name:"mode",value:this.state.mode,onChange:this.handleFieldChange}),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"userInput"},"Filename"),r.a.createElement("input",{type:"text",className:"form-control",placeholder:"Enter Filename",name:"logname",value:this.state.logname,onChange:this.handleFieldChange}),r.a.createElement("div",{className:"errorMsg"},this.state.errors.logname)),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"passwordInput"},"Log Type"),r.a.createElement("input",{type:"text",className:"form-control",placeholder:"Enter ",name:"logtype",value:this.state.logtype,onChange:this.handleFieldChange}),r.a.createElement("div",{className:"errorMsg"},this.state.errors.logtype)),r.a.createElement("button",{type:"submit",className:"btn btn-primary",disabled:this.state.loaded},this.state.loaded&&r.a.createElement(O,null),"Retrive Log"))),this.state.data))),r.a.createElement("div",{className:"row mt-5"},r.a.createElement("div",{className:"col-lg-12"},r.a.createElement("button",{type:"button",className:"btn btn-primary",disabled:this.state.listLoaded,onClick:this.getRetriveGetLogList},this.state.listLoaded&&r.a.createElement(O,null),"Retrive Log List"),this.state.logList))))}}]),t}(n.Component),j=(a(40),a(29)),k=a.n(j),F=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).state={ExternalAction:"AputRemit",submitFile:"",res_error:"",loaded:!1,errors:{}},e.onFileChangeHandler=e.onFileChangeHandler.bind(Object(w.a)(e)),e.handleRemitSubmit=e.handleRemitSubmit.bind(Object(w.a)(e)),e}return Object(d.a)(t,e),Object(i.a)(t,[{key:"onFileChangeHandler",value:function(e){this.setState({submitFile:e.target.files[0]})}},{key:"handleRemitSubmit",value:function(e){var t=this;if(e.preventDefault(),this.validateForm()){var a=new FormData;a.append("submitFile",this.state.submitFile),a.append("ExternalAction","AputRemit"),k.a.post(y+"/file-upload",a).then(function(e){e.statusText&&(t.setState({loaded:!1}),console.log(e.data))})}else this.setState({loaded:!1})}},{key:"validateForm",value:function(){var e={},t=!0;return this.state.submitFile||(t=!1,e.submitFile="*Please select your file."),this.setState({errors:e,loaded:!0}),t}},{key:"render",value:function(){return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-lg-12"},r.a.createElement("h4",null,"Send Claims"),r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-body"},this.state.res_error&&r.a.createElement("div",{className:"alert alert-danger",role:"alert"},this.state.res_error),r.a.createElement("form",{onSubmit:this.handleRemitSubmit},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"passwordInput"},"Select file to send"),r.a.createElement("input",{type:"file",className:"form-control",onChange:this.onFileChangeHandler}),r.a.createElement("div",{className:"errorMsg"},this.state.errors.submitFile)),r.a.createElement("button",{type:"submit",className:"btn btn-primary",disabled:this.state.loaded},this.state.loaded&&r.a.createElement(O,null),"Click here to upload"))))))}}]),t}(n.Component),x=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).state={ExternalAction:"AsignOff"},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"isActiveToggle",value:function(e){for(var t=document.getElementsByClassName("tab-pane"),a=0;a<t.length;a++)t[a].classList.remove("active");for(var n=document.getElementsByClassName("list-group-item-action"),r=0;r<n.length;r++)n[r].classList.remove("active");document.getElementById(e).classList.add("active"),document.querySelector(".list-group-item.list-group-item-action."+e).classList.add("active")}},{key:"signOff",value:function(){var e=Object(b.a)(v.a.mark(function e(){return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N({method:"POST",endpoint:y+"/signoff",payload:{ExternalAction:this.state.ExternalAction}});case 2:"SUCCESS"!==e.sent.data.Result||(localStorage.removeItem("user"),this.props.history.push("/"));case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(E,{history:this.props.history}),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row mt-5"},r.a.createElement("div",{className:"col-4"},r.a.createElement("div",{className:"list-group",id:"list-tab",role:"tablist"},r.a.createElement("div",{className:"list-group-item list-group-item-action home active",onClick:function(){return e.isActiveToggle("home")}},"Home"),r.a.createElement("div",{className:"list-group-item list-group-item-action home claims",onClick:function(){return e.isActiveToggle("claims")}},"Send Claims"),r.a.createElement("div",{className:"list-group-item list-group-item-action change-password",onClick:function(){return e.isActiveToggle("change-password")}},"Change Password"),r.a.createElement("div",{className:"list-group-item list-group-item-action log",onClick:function(){return e.isActiveToggle("log")}},"Other Processing + Logs"),r.a.createElement("div",{className:"list-group-item list-group-item-action",onClick:function(){return e.signOff()}},"Sign off"))),r.a.createElement("div",{className:"col-8"},r.a.createElement("div",{className:"tab-content",id:"nav-tabContent"},r.a.createElement("div",{className:"tab-pane active",id:"home"},r.a.createElement("h4",null,"Welcome to MSP's Teleplan Web  Access"),r.a.createElement("p",null,"Welcome to the home page of the BC Medical Service Plan (MSP) ",r.a.createElement("br",null)," Electronic Claims Submission web application."),r.a.createElement("p",null,"Version: Teleplan Web 4.2.8"),r.a.createElement("p",null,"Use the menu at the left to select the service you would like to access")),r.a.createElement("div",{className:"tab-pane",id:"claims"},r.a.createElement(F,null)),r.a.createElement("div",{className:"tab-pane",id:"change-password"},r.a.createElement(S,null)),r.a.createElement("div",{className:"tab-pane",id:"log"},r.a.createElement(C,null)))))))}}]),t}(n.Component),L=(a(58),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).state={ExternalAction:"AsignOn",username:"",password:"",loaded:!1,res_error:"",errors:{}},a.handleLoginSubmit=a.handleLoginSubmit.bind(Object(w.a)(a)),a.handleFieldChange=a.handleFieldChange.bind(Object(w.a)(a)),a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"handleFieldChange",value:function(e){var t=e.target,a=t.name,n=t.value;this.setState(Object(f.a)({},a,n))}},{key:"handleLoginSubmit",value:function(){var e=Object(b.a)(v.a.mark(function e(t){var a;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!this.validateForm()){e.next=9;break}return e.next=4,N({method:"POST",endpoint:y+"/login",payload:{ExternalAction:this.state.ExternalAction,username:this.state.username,password:this.state.password}});case 4:a=e.sent,console.log("SignOn ",a),"SUCCESS"!==a.data.Result?(this.setState({loaded:!1}),this.setState({res_error:a.data.Msgs,username:"",password:""})):(localStorage.setItem("user",a.data.username),this.props.history.push("/dashboard")),e.next=10;break;case 9:this.setState({loaded:!1});case 10:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"validateForm",value:function(){var e={},t=!0;return this.state.username||(t=!1,e.username="*Please enter your username."),this.state.password||(t=!1,e.password="*Please enter your password."),this.setState({errors:e,loaded:!0}),t}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(E,{history:this.props.history}),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row mt-5"},r.a.createElement("div",{className:"col-lg-6 offset-lg-3"},r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-body"},this.state.res_error&&r.a.createElement("div",{className:"alert alert-danger",role:"alert"},this.state.res_error),r.a.createElement("form",{onSubmit:this.handleLoginSubmit},r.a.createElement("input",{type:"hidden",className:"form-control",name:"ExternalAction",value:this.state.ExternalAction,onChange:this.handleFieldChange,required:!0}),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"userInput"},"Username"),r.a.createElement("input",{type:"text",className:"form-control",placeholder:"Enter Username",name:"username",value:this.state.username,onChange:this.handleFieldChange}),r.a.createElement("div",{className:"errorMsg"},this.state.errors.username)),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"passwordInput"},"Password"),r.a.createElement("input",{type:"password",className:"form-control",placeholder:"Password",name:"password",value:this.state.password,onChange:this.handleFieldChange}),r.a.createElement("div",{className:"errorMsg"},this.state.errors.password)),r.a.createElement("button",{type:"submit",className:"btn btn-primary",disabled:this.state.loaded},this.state.loaded&&r.a.createElement(O,null),"Login"))))))))}}]),t}(n.Component)),A=function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement(h.b,{history:u},r.a.createElement(h.c,null,r.a.createElement(h.a,{exact:!0,path:"/",component:L}),r.a.createElement(h.a,{exact:!0,path:"/dashboard",component:x}),r.a.createElement(h.a,{path:"/put-remit",component:F}),r.a.createElement(h.a,{path:"*",component:p})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(A,null),document.getElementById("react-app")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[32,1,2]]]);
//# sourceMappingURL=main.a06fded7.chunk.js.map