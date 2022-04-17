import {Link} from 'react-router-dom';
import styles from './appStyles.module.css';
import {Button,Spinner} from 'react-bootstrap';
import React,{Component} from 'react';
import retailer from './retailer';
import customer from './customer';
import web3 from './web3';

class RetailerOrder extends Component{

  constructor(props){
    super(props);
    this.state={
      orders:[],
      wait:false,
      trackingId:'',
      trackingCompany:''

  }  
}

  async componentDidMount(){
    const accounts=await web3.eth.getAccounts();
    const obj=await retailer.methods.getOrders().call({from:accounts[0]});
    // obj.sort((a,b)=>a.orderId>b.orderId);
    // this.setState({orders:obj});
    this.setState({orders:obj});
    // console.log(this.state.orders);
  }

  dispatchOrder=(id)=>async(event)=>{
    event.preventDefault();
  	const accounts=await web3.eth.getAccounts();
  	const orderInfo=await retailer.methods.getOrderInfo(id).call({from:accounts[0]});
    if(this.state.trackingId.length==0){
      alert('please enter tracking Id');
    }
    else if(this.state.trackingCompany.length==0){
      alert('please enter tracking Company Name');
    }
    else{
      try{
        this.setState({wait:true});
        await customer.methods.setOrderStatusDispatched(orderInfo.addrCustomer,id,this.state.trackingId,this.state.trackingCompany).send({from:accounts[0],gas:10000000});
        alert('sucessfully dispatched');
        window.location.reload(false);
        }
      catch{
        alert('metamask error');
      }
    }


  	this.setState({wait:false});
    
  }

  enterTrackingId=(event)=>{
    this.setState({trackingId:event.target.value})
  }
  enterTrackingCompany=(event)=>{
    this.setState({trackingCompany:event.target.value})
  }



  render(){

    if(!this.state.orders.length){
      return (<div>you have not any items</div>);
    }
    else{

      return (


        <div>
        <h2><b>My Orders</b></h2>
          {this.state.orders.slice().sort((a,b)=>a.orderId<b.orderId?1:-1).map(order=>(
            <div style={{backgroundColor:order.orderStatus=="6" || order.orderStatus=="5"?'#D5FEB6':order.orderStatus=='3'?'#A1FCD3':order.orderStatus=="4"?'#D87206':'#A1CDFC',margin:"10px 10px 10px 10px"}} key={order.orderId}>
            <Link style={{textDecoration: "none",color:"black",textAlign:"left"}} to={`/order/${order.itemId}/${order.addrRetailer}`}>
            
              <Button style={{width:"100%"}}>Go to Item</Button>
              </Link>
              <div style={{marginLeft:"10px",textAlign:"left"}}><b>OrderId:</b> {order.orderId}</div>
              <div style={{marginLeft:"10px",textAlign:"left"}}><b>Price:</b> {order.price/1000000000000000000} ether</div>
              <div style={{marginLeft:"10px",textAlign:"left"}}><b>Quantity:</b> {order.quantity}</div>
              <div style={{marginLeft:"10px",textAlign:"left"}}><b>Order Status:</b> {order.orderStatus}</div>
              <div style={{marginLeft:"10px",textAlign:"left"}}><b>ItemId :</b> {order.itemId}</div>
              <div style={{marginLeft:"10px",textAlign:"left"}}><b>Delivery Address :</b> {order.deliveryAddress}</div>
             
              <div style={{marginLeft:"10px",textAlign:"left"}}><b>Retailer:</b> {order.addrRetailer}</div>
              <div style={{marginLeft:"10px",textAlign:"left"}}><b>Customer:</b> {order.addrCustomer}</div>
          {((order.trackingId).length>0)?(<div style={{marginLeft:"10px",textAlign:"left"}}><b>Tracking Id :</b> {order.trackingId}</div>):(<div></div>)}
              {((order.trackingCompanyName).length>0)?(<div style={{marginLeft:"10px",textAlign:"left"}}><b>Tracking Company Name :</b> {order.trackingCompanyName}</div>):(<div></div>)}
              
            
            {(order.orderStatus==1 || order.orderStatus==2)?
                (<div>{this.state.wait?(<><Spinner animation="border" variant="info" /></>):

                (

                <><form>
                <br/>
                    <div className={styles.form_div}>
          <input type="text" className={styles.form_input}  onChange={this.enterTrackingId}/>
          <label className={styles.form_label}>Tracking Id </label>
          </div>

                    <div className={styles.form_div}>
          <input type="text" className={styles.form_input}  onChange={this.enterTrackingCompany}/>
          <label className={styles.form_label}>Tracking Company </label>
          </div>

          <Button type="submit" onClick={this.dispatchOrder(order.orderId)}>Dispatch</Button>
        </form></>)}</div>):
                (<div>{order.orderStatus==3?(<div>order Dispatched</div>):(<div>{(order.orderStatus==5 || order.orderStatus==6)?
                  (<div>sucessfully delivered</div>):(<div>{(order.orderStatus==4)?
                    (<>order cancelled! <div>{((order.trackingId).length>0)?(<div>please collect your order</div>):(<div></div>)}</div></>):(<div></div>)}</div>)}</div>)}</div>)}
                  </div>

            ))}

        </div>
      ); 
    }
    
  }
  
}

export default RetailerOrder;
