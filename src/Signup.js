import {Form,Row,Col,Button,Spinner} from 'react-bootstrap';
import React,{Component} from 'react';
import retailer from './retailer';
import customer from './customer';
import web3 from './web3';
import { Redirect } from 'react-router-dom';
import styles from './appStyles.module.css';

class Signup extends Component{

  constructor(props){
    super(props);
    this.state={
    name:'',
    email:'',
    phoneNumber:'',
    address:'',
    checkbox:'',
    redirect:false,
    wait:false

  }  
}

enterName=(event)=>{
    this.setState({
      name:event.target.value
    })
  }
  enterEmail=(event)=>{
    this.setState({
      email:event.target.value
    })
  }
  enterPhoneNumber=(event)=>{
    this.setState({
      phoneNumber:event.target.value
    })
  }
  enterAddress=(event)=>{
    this.setState({
      address:event.target.value
    })
  }
  onSubmit=async(event)=>{
    event.preventDefault();
    const accounts=await web3.eth.getAccounts();
    if(this.state.name.length==0){alert('enter name')}
    else if(this.state.email.length==0){alert('enter email')}
    else if(this.state.phoneNumber.length==0){alert('enter phone number')}
    else if(this.state.checkbox=='Retailer'){
      if(await retailer.methods.isValidUser().call({from:accounts[0]})){
        alert('you are already a user');
        this.setState({redirect:true});
      }
      else{
        try{
          this.setState({wait:true})
          await retailer.methods.retailerSignUp(this.state.name,this.state.email,this.state.phoneNumber,this.state.address).send({
          from:accounts[0],gas:10000000
        })
        this.setState({redirect:true}); 
        }
        catch{
          alert('metamask error')
        }
        this.setState({wait:false});
              
      }

    }
    else if(this.state.checkbox=='Customer'){
      if(await customer.methods.isValidUser().call({from:accounts[0]})){
        alert('you are already a user');
        this.setState({redirect:true});
      }
      else{
        try{
          this.setState({wait:true});
           await customer.methods.customerSignUp(this.state.name,this.state.email,this.state.phoneNumber).send({
            from:accounts[0],gas:10000000
          })
          alert('sucessfully signed in');
          this.setState({redirect:true});                
        }
        catch{
          alert('metamask error');
        }
        this.setState({wait:false});
      }

    }
    else {
      alert('please select User Type');
    }
    
  }
  onRadioo=(event)=>{
      this.setState({
        checkbox:event.target.value
      })
    }


  render(){
    return (
    <div className={styles.one_form}>
    { this.state.redirect ? (<Redirect push to="/"/>) : null }  

    <form className={styles.form} onSubmit={this.onSubmit}>
      <h3 className={styles.form_title}>Signup</h3>

      <div className={styles.form_div}>
      <input className={styles.form_input} onChange={this.enterName}/>
      <label className={styles.form_label}>Name: </label>
      </div>

      <div className={styles.form_div}>
      <input type="email" className={styles.form_input} onChange={this.enterEmail}/>
      <label className={styles.form_label}>Email: </label>
      </div>

      <div className={styles.form_div}>
      <input type="tel"  className={styles.form_input} onChange={this.enterPhoneNumber}/>
      <label className={styles.form_label}>PhoneNumber: </label>
      </div>

      <div className={styles.form_div}>
      <input className={styles.form_input} onChange={this.enterAddress}/>
      <label className={styles.form_label}>Address: </label>
      </div>

      <div className={styles.form_div}>
     
                  <input
                 className={styles.form_checkmark}
                  type="radio"
                  value="Retailer"
                  checked={this.state.checkbox === "Retailer"}
                  onChange={this.onRadioo}/>
                    <span>Retailer</span>
       

                <input
                className={styles.form_checkmark}
                  type="radio"
                  value="Customer"
                  checked={this.state.checkbox === "Customer"}
                  onChange={this.onRadioo}/>
                    <span>Customer</span>
        
      
      <label className={styles.form_label}>UserType: </label>
      </div>


      {this.state.wait?(<><Spinner animation="border" variant="primary" /></>):(<><button className={styles.form_button} type="submit">Submit</button></>)}
          </form>
    </div>
  );
  }
  
}

export default Signup;
