import styles from './appStyles.module.css';
import React,{Component} from 'react';
import retailer from './retailer';
import web3 from './web3';
import {Button} from 'react-bootstrap';
import {MDBContainer,MDBRow,MDBCol,MDBCard,MDBCardBody} from "mdbreact";


class ItemInfo extends Component{

  constructor(props){
    super(props);

    this.state={
      item:{},
      price:-1,
      description:'',
      cashOnDelivery:'',
      quantity:0,
      title:'',
      img:''
  }  
 
}

 async componentDidMount(){
   const accounts=await web3.eth.getAccounts();
   const para = this.props.match.params;
   let item=await retailer.methods.getItemInfo(para.id,para.addr).call({from:accounts[0]});
   this.setState({item:item});
   this.setState({price:item.price/1000000000000000000,description:item.description,quantity:item.quantity,title:item.title,img:item.imgLink})
   if(item.availableCashOnDelivery){
    this.setState({cashOnDelivery:"Yes"});
   }
   else{
    this.setState({cashOnDelivery:"No"});
   }

  }
  enterPrice=(event)=>{
    this.setState({
      price:event.target.value
    })
  }
  enterDescription=(event)=>{
    this.setState({
      description:event.target.value
    })
  }

  onCashOnDelivery=(event)=>{
    this.setState({cashOnDelivery:event.target.value})
  }

  enterQuantity=(event)=>{
    this.setState({quantity:event.target.value})
  }
  enterTitle=(event)=>{
    this.setState({title:event.target.value})
  }
  enterImg=(event)=>{
    this.setState({img:event.target.value})
  }
    onSubmitItem=async(event)=>{
    event.preventDefault();
    if(this.state.price<0){
      alert('price must be non negative')
    }
    else if(this.state.description.length==0){
      alert('enter valid description')
    }
    else if(this.state.cashOnDelivery.length==0){
      alert('select cash on delivery value')
    }
    else if(this.state.quantity<=0){
      alert('quantity must be positive number')
    }
   let v;
      if(this.state.cashOnDelivery=='Yes'){
        v=true
      }
      else{
        v=false
      }
      const accounts=await web3.eth.getAccounts();
      const weiValue = web3.utils.toWei(this.state.price.toString(), 'ether');
      // console.log(this.state.item.itemId);
      // console.log(weiValue);
      // console.log(this.state.title);
      // console.log(this.state.img);
      // console.log(this.state.description);
      // console.log(v);
      // console.log(this.state.quantity);

      await retailer.methods.editItemInfo(this.state.item.itemId,weiValue,this.state.title,this.state.img,this.state.description,v,this.state.quantity).send({
        from:accounts[0],
        gas:10000000
      });
      
      alert('item sucessfully updated');
    

  }

  render(){
    return (
      <div>
      <MDBContainer >
      <MDBRow>
        <MDBCol md="12">
          <MDBCard >
            <MDBCardBody >
            <br/>
               <form  onSubmit={this.onSubmitItem}>
       <h4 className={styles.form_title}>Update Item</h4>

          <div className={styles.form_div}>
          <input className={styles.form_input} value={this.state.title} onChange={this.enterTitle}/>
          <label className={styles.form_label}>Title</label>
          </div>

          <div className={styles.form_div}>
          <input className={styles.form_input} value={this.state.img} onChange={this.enterImg}/>
          <label className={styles.form_label}>Image Link</label>
          </div>

          <div className={styles.form_div}>
          <input className={styles.form_input} type="number" step="any" value={this.state.price} onChange={this.enterPrice}/>
          <label className={styles.form_label}>Price(ether)</label>
          </div>

          <div className={styles.form_div}>
          <input type="text" className={styles.form_input} value={this.state.description}  onChange={this.enterDescription}/>
          <label className={styles.form_label}>description </label>
          </div>

          <div className={styles.form_div}>
          <input type="number" className={styles.form_input} value={this.state.quantity} onChange={this.enterQuantity}/>
          <label className={styles.form_label}>quantity </label>
          </div>

          <div className={styles.form_div}>
     
                  <input
                  className={styles.form_checkmark}
                  type="radio"
                  value="Yes"
                  checked={this.state.cashOnDelivery === "Yes"}
                  onChange={this.onCashOnDelivery}/>
                    <span>Yes</span>
       

               <input
               className={styles.form_checkmark}
                  type="radio"
                  value="No"
                  checked={this.state.cashOnDelivery === "No"}
                  onChange={this.onCashOnDelivery}/>
                    <span>No</span>
        
      
          <label className={styles.form_label}>Pay On Delivery: </label>
          </div>
            


            <button  className={styles.form_button} type="submit"> Update</button>
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

export default ItemInfo;
