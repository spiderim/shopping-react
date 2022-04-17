import styles from './appStyles.module.css';
import React,{Component} from 'react';
import retailer from './retailer';
import web3 from './web3';
import {Button} from 'react-bootstrap';


class RetailerInfo extends Component{

  constructor(props){
    super(props);

    this.state={
      info:{}
  }  
 
}

 async componentDidMount(){
   const accounts=await web3.eth.getAccounts();
   const info=await retailer.methods.getUserInfo().call({from:accounts[0]});
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
    else if(this.state.info.shopAddress.length==0){
      alert('enter shop address');
    }
    else{
      await retailer.methods.editUserInfo(this.state.info.name,this.state.info.email,this.state.info.phoneNumber,this.state.info.shopAddress)
        .send({from:accounts[0],gas:10000000});
      alert('sucessfully updated');
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

  ShopAddress=(event)=>{
      this.setState(prevState => ({
      info: {                  
          ...prevState.info,   
          shopAddress: event.target.value      
      }
    }))
  }


  render(){
    return (
      
   <div className={styles.one_form}>

      <form className={styles.form}  onSubmit={this.onSubmitItem}>
       <h4 className={styles.form_title}>About Me</h4>

          <div className={styles.form_div}>
          <div className={styles.form_input}>{this.state.info.addrRetailer}</div>
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

          <div className={styles.form_div}>
          <input className={styles.form_input} value={this.state.info.shopAddress} onChange={this.ShopAddress}/>
          <label className={styles.form_label}>Shop Address</label>
          </div>

            <button  className={styles.form_button} type="submit"> Update</button>
          </form>
          <hr/>

    </div>  );
  }
}

export default RetailerInfo;
