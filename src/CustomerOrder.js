
import React,{Component} from 'react';
import retailer from './retailer';
import customer from './customer';
import web3 from './web3';
import {Button,Spinner} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class CustomerOrder extends Component{

  constructor(props){
    super(props);
    this.state={
      orders:[],
      wait:true,
      spin:false

  }  
}

  async componentDidMount(){
    const accounts=await web3.eth.getAccounts();
    // const obj=await customer.methods.getOrders().call({from:accounts[0]});
    // console.log(obj);
    // obj.slice().sort((a,b)=>Number(a.orderId)>Number(b.orderId)?-1:1);
    // console.log(obj)
    // this.setState({orders:obj});
    this.setState({orders:await customer.methods.getOrders().call({from:accounts[0]})})
    this.setState({wait:false});
  }
  onDeliver=(id)=>async(event)=>{
    const accounts=await web3.eth.getAccounts();
    const orderInfo=await customer.methods.getOrderInfo(id).call({from:accounts[0]});
    // console.log(orderInfo.price);
    // console.log(orderInfo.addrRetailer);
    if(orderInfo.payStatus){
      try{
        this.setState({spin:true});
        await customer.methods.deliveryWithoutPay(orderInfo.orderId,orderInfo.addrRetailer)
          .send({from:accounts[0],gas:10000000});
        alert('sucessfully delivered'); 
        window.location.reload(false);      
      }
      catch{
        alert('metamask error');
      }
      this.setState({spin:false});

    }
    else{
      try{
        this.setState({spin:true});
        await customer.methods.deliveryOnPay(orderInfo.orderId,orderInfo.addrRetailer)
          .send({from:accounts[0],gas:10000000,value:orderInfo.price});
        alert('sucessfully delivered');
        window.location.reload(false);        
      }
      catch{
        alert('metamask error');
      }
      this.setState({spin:false});

    }
  }
  onCancel=(id)=>async(event)=>{

    const accounts=await web3.eth.getAccounts();
    const orderInfo=await customer.methods.getOrderInfo(id).call({from:accounts[0]});
    // console.log(orderInfo.price);
    // console.log(orderInfo.addrRetailer);
    if(orderInfo.orderStatus>3){
      alert('item cannot be cancelled');
    }
    else{
      try{
        this.setState({spin:true})
        await customer.methods.cancelOrder(orderInfo.orderId,orderInfo.addrRetailer)
        .send({from:accounts[0],gas:10000000});
        this.setState({spin:false})
        alert('order sucessfully cancelled');
        window.location.reload(false);
      }
      catch{
        alert('metamask error');
        
    }
    this.setState({spin:false});

      }
  }


  render(){
    if(!this.state.orders.length){
      if(this.state.wait){
        return (<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}><Spinner animation="border" variant="primary" /></div>); 
      }
      else{
        return (<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>you have not ordered any items</div>);
      }
      
    }
    else{
      return (
        <div style={{padding:"1px"}}>
        <h2><b>My Orders</b></h2>
          {this.state.orders.slice().sort((a,b)=>a.orderId<b.orderId?1:-1).map(order=>(
            

            <div style={{backgroundColor:order.orderStatus=="6" || order.orderStatus=="5"?'#D5FEB6':order.orderStatus=='3'?'#A1FCD3':order.orderStatus=="4"?'#FCAEA8':'#A1CDFC',margin:"10px 10px 10px 10px"}} key={order.orderId}>
              <Link style={{textDecoration: "none",color:"black",textAlign:"left"}} to={`/shopping-react/order/${order.itemId}/${order.addrRetailer}`}>
            
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
              
            {this.state.spin?(<><Spinner animation="border" variant="primary" /></>):(<div>{(order.orderStatus==3)?
                (<div>{this.state.spin?(<><Spinner animation="border" variant="primary" /></>):(<><Button onClick={this.onDeliver(order.orderId)}>Deliver</Button><Button onClick={this.onCancel(order.orderId)}>Cancel Order</Button></>)}</div>):
                (<div>{(order.orderStatus==5 || order.orderStatus==6)?
                  (<div style={{color:"green"}}>Order Delivered</div>):
                  (<div>{(order.orderStatus==1 || order.orderStatus==2)?
                    (<div>Waiting retailer to dispatch<Button onClick={this.onCancel(order.orderId)}>Cancel Order</Button></div>):
                    (<div>{(order.orderStatus==4)?
                      (<div>order cancelled</div>):(<div></div>)}</div>)}</div>)
                }</div>)
              }</div>)}
            
            </div>
           


            ))}

        </div>
      ); 
    }
    
  }
  
}

export default CustomerOrder;
