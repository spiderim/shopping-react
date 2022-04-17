import styles from './appStyles.module.css';
import React,{Component} from 'react';
import customer from './customer';
import web3 from './web3';
import {Button,Spinner} from 'react-bootstrap';
import {MDBContainer,MDBRow,MDBCol,MDBCard,MDBCardBody} from "mdbreact";


class CustomerInfo extends Component{

  constructor(props){
    super(props);

    this.state={
      info:{},
      wait:false
  }  
 
}

 async componentDidMount(){
   const accounts=await web3.eth.getAccounts();
   const info=await customer.methods.getUserInfo().call({from:accounts[0]});
   this.setState({info:info});
   
  }
   onSubmitItem=async(event)=>{
    event.preventDefault();

    const accounts=await web3.eth.getAccounts();
    if(this.state.info.name.length==0){
      alert('enter name');
    }
    else if(this.state.info.email.length==0){
      alert('enter email');
    }
    else if(this.state.info.phoneNumber.length==0){
      alert('enter phone Number');
    }
    else{
      try{
        this.setState({wait:true});
        await customer.methods.editUserInfo(this.state.info.name,this.state.info.email,this.state.info.phoneNumber)
        .send({from:accounts[0],gas:10000000});
        alert('sucessfully updated');
      }
      catch{
        alert('metamask error');
      }
      this.setState({wait:false});
    }
   }
  Name=(event)=>{
      this.setState(prevState => ({
      info: {                  
          ...prevState.info,   
          name: event.target.value      
      }
    }))
  }
  Email=(event)=>{
      this.setState(prevState => ({
      info: {                  
          ...prevState.info,   
          email: event.target.value      
      }
    }))
  }

  PhoneNumber=(event)=>{
      this.setState(prevState => ({
      info: {                  
          ...prevState.info,   
          phoneNumber: event.target.value      
      }
    }))
  }


  render(){
    return (
      
   <div >
  
 <MDBContainer >
      <MDBRow>
        <MDBCol md="12">
          <MDBCard >
            <MDBCardBody >
            <br/>
              <form onSubmit={this.onSubmitItem}>
                <h4 className={styles.form_title}>About Me</h4>

          <div className={styles.form_div}>
          <div className={styles.form_input}>{this.state.info.addrCustomer}</div>
          <label className={styles.form_label}>Address</label>
          </div>

          <div className={styles.form_div}>
          <input className={styles.form_input} value={this.state.info.name} onChange={this.Name}/>
          <label className={styles.form_label}>Name</label>
          </div>

          <div className={styles.form_div}>
          <input className={styles.form_input} value={this.state.info.email} onChange={this.Email}/>
          <label className={styles.form_label}>Email</label>
          </div>

          <div className={styles.form_div}>
          <input className={styles.form_input} value={this.state.info.phoneNumber} onChange={this.PhoneNumber}/>
          <label className={styles.form_label}>Phone Number</label>
          </div>
                <div className="text-center py-4 mt-3">
                  {this.state.wait?(<><Spinner animation="border" variant="primary" /></>):(<><button  className={styles.form_button} type="submit"> Update</button></>)}
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>  

    );
  }
  
}

export default CustomerInfo;
