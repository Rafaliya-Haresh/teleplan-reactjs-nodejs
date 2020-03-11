import React, { Component } from 'react';

class Page404 extends Component {
	render() {
	  return (
	  	<div>
              <div className="main-content">
     
     <div className="error-box">
       
       <div className="container">
         <div className="row">
           <div className="col-sm-12">
             <div className="error text-center">
               <img src="images/error-404.png" className="img-fluid" alt="test"/><br/>
               <h2 className="mt-4 ">Sorry the page not found</h2>
               <a href="/" className="button mt-5 mr-2">Go to Home Page</a>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
        </div>
      )
    }
}

export default Page404;