import styles from './appStyles.module.css';
import React,{useState,useEffect,useCallback} from 'react';
import retailer from './retailer';
import customer from './customer';
import web3 from './web3';
import { useParams} from 'react-router-dom'
import {Button,Card,Spinner,Alert,Container,Row,Col} from 'react-bootstrap';
import {MDBContainer,MDBRow,MDBCol,MDBCard,MDBCardBody} from "mdbreact";



const Order=()=>{ 
  const parms= useParams();
  const [address,setAddress]=useState('');
  const [name,setName]=useState('');
  const [phone,setPhone]=useState('');
  const [state,setState]=useState('');
  const [country,setCountry]=useState('');
  const [pin,setPin]=useState('');
  const [quantity,setQuantity]=useState(0);
  const [price,setPrice]=useState(0);
  const [item,setItem]= useState({});
  const [wait,setWait]=useState(false);



  function handleInputChange(event){
    setAddress(event.target.value)
  }
  function handleQuantity(event){
    setQuantity(event.target.value);
    // setPrice(prev=>item.price*quantity/1000000000000000000);
  }
  function handleName(event){
    setName(event.target.value)
  }
  function handlePhone(event){
    setPhone(event.target.value)
  }
  function handleState(event){
    setState(event.target.value)
  }
  function handleCountry(event){
    setCountry(event.target.value)
  }
  function handlePin(event){
    setPin(event.target.value)
  }
  const payLaterOrder = useCallback(async () => {
    const accounts=await web3.eth.getAccounts();
    if(!await customer.methods.isValidUser().call({from:accounts[0]})){
      alert('signup first');
    }
    else if(!name.length){
      alert('enter name');
    }
    else if(!address.length){
      alert('enter address');
    }
    else if(!phone.length){
      alert('enter phone number')
    }
    else if(!state.length){
      alert('enter state name');
    }
    else if(!country.length){
      alert('enter country name');
    }
    else if(!pin.length){
      alert('enter pin');
    }
    else if(quantity<=0){
      alert('enter valid quantity');
    }
    else{

      const itemInfo=await retailer.methods.getItemInfo(parms.id,parms.addr).call();
      if(itemInfo.quantity-quantity>=0){
        setWait(true);
        try{
          const newaddr="Name: "+name+", Phone Number: "+phone+", Address: "+address+", State: "+state+", Country: "+country+", Pin: "+pin;
         await customer.methods.cashOnDeliveryOrder(parms.addr,itemInfo.price,parms.id,newaddr,quantity).send({
          from:accounts[0],gas:10000000
        })

         var cacheName=accounts[0]+"/"+parms.addr+"/"+parms.id;
          if ("caches" in window) {
            caches.delete(cacheName).then(function (res) {
              return res;
            });
          }

         alert('order done');
         window.location.reload(false);
       }
         catch{
          alert('metamask error');
         }
        setWait(false);
      }
      else{
        alert('item quantity not available');

      }
      
    }
  },[handleInputChange,handleQuantity,handleName,handlePhone,handleState,handleCountry,handlePin]);

  const payOrder = useCallback(async () => {
    const accounts=await web3.eth.getAccounts();  
    if(!await customer.methods.isValidUser().call({from:accounts[0]})){
      alert('signup first');
    }
    else if(!name.length){
      alert('enter name');
    }
    else if(!address.length){
      alert('enter address');
    }
    else if(!phone.length){
      alert('enter phone number')
    }
    else if(!state.length){
      alert('enter state name');
    }
    else if(!country.length){
      alert('enter country name');
    }
    else if(!pin.length){
      alert('enter pin');
    }
    else if(quantity<=0){
      alert('enter valid quantity');
    }
    else{
      const itemInfo=await retailer.methods.getItemInfo(parms.id,parms.addr).call();
      if(itemInfo.quantity-quantity>=0){
        setWait(true);
        try{
          const newaddr="Name: "+name+", Phone Number: "+phone+", Address: "+address+", State: "+state+", Country: "+country+", Pin: "+pin;
            await customer.methods.payOnOrder(parms.addr,itemInfo.price,parms.id,newaddr,quantity).send({
            from:accounts[0],gas:10000000,value:itemInfo.price*quantity
          })
          var cacheName=accounts[0]+"/"+parms.addr+"/"+parms.id;
          if ("caches" in window) {
            caches.delete(cacheName).then(function (res) {
              return res;
            });
          }
          alert('order done');
          window.location.reload(false);
        }
        catch{
          alert('metamask error');
        }

        setWait(false);
      }
      else{
        alert('item quantity not available');
      }
      
    }
  },[handleInputChange,handleQuantity,handleName,handlePhone,handleState,handleCountry,handlePin]);

  
  const addToCart=async()=>{
    const datast=parms.addr+"/"+parms.id;
    const data = new Response(JSON.stringify(datast));
    const dta= new Response(JSON.stringify(""));
    const accounts=await web3.eth.getAccounts();
    if ('caches' in window) {
     
      caches.open(accounts[0]+"/"+datast).then((cache) => {
        cache.put('https//:jd', dta);
        alert('Item Added to Cart!')
      });
    }
    
  }
  const removeCart=async()=>{
    const accounts=await web3.eth.getAccounts();
    var cacheName=accounts[0]+"/"+parms.addr+"/"+parms.id;
    if ("caches" in window) {
      caches.delete(cacheName).then(function (res) {
        return res;
      });
    }
    alert('removed from cart');
    
  }

  useEffect(()=>{
    async function result(){
      const accounts=await web3.eth.getAccounts();
      const itemInfo=await retailer.methods.getItemInfo(parms.id,parms.addr).call({from:accounts[0]});
      setItem(itemInfo);
      console.log('yes')
    }
    result();
    
  },[]);




   return (
    <div >
  <Container>
  <br/>
  
  <Row>

    <Col  md="auto">
      <Row>
        <Card.Img variant="top" style={{width:"350px",height:"250px",marginLeft:"auto",marginRight:'auto'}} src={item.imgLink} />
      </Row>
      <br/>
      <Row>
        <Button onClick={addToCart} variant="warning">Add to Cart</Button>

      </Row>
      <Row>
        <Button onClick={removeCart} variant="danger">Remove from Cart</Button>

      </Row>
      
    </Col>
    <Col>
      <Row>
        <Card.Title style={{marginLeft:"auto",marginRight:"auto"}}>{item.title}</Card.Title>
      </Row>
      <Row style={{textAlign:"left"}}>
        <h4 style={{fontWeight:"bold"}}><b>{item.price/1000000000000000000} Ether</b></h4>
      </Row>
      <Row style={{textAlign:"left",marginLeft:"auto"}}>
        {item.description}
      </Row>

    </Col>
    
    
  </Row>
  <br/>
  <Row>
  <MDBContainer >
      <MDBRow>
        <MDBCol md="12">
          <MDBCard >
            <MDBCardBody >
            <br/>
              
                <h4 className={styles.form_title}>Order</h4>

                <div className={styles.form_div}>
                <input className={styles.form_input} onChange={handleName}/>
                <label className={styles.form_label}>Name</label>
                </div>

                <div className={styles.form_div}>
                <input className={styles.form_input} onChange={handleInputChange}/>
                <label className={styles.form_label}>Address</label>
                </div>

                <div className={styles.form_div}>
                <input type="tel" className={styles.form_input} onChange={handlePhone}/>
                <label className={styles.form_label}>Phone Number</label>
                </div>

                <div className={styles.form_div}>
                <input className={styles.form_input} onChange={handleState}/>
                <label className={styles.form_label}>State</label>
                </div>
                <div className={styles.form_div}>
                <input className={styles.form_input} onChange={handleCountry}/>
                <label className={styles.form_label}>Country</label>
                </div>

                <div className={styles.form_div}>
                <input type="number" className={styles.form_input} onChange={handlePin}/>
                <label className={styles.form_label}>Pin Code</label>
                </div>

                <div className={styles.form_div}>
                <input type="number" className={styles.form_input} onChange={handleQuantity}/>
                
                <label className={styles.form_label}>Quantity</label>

                </div>
                <h4 className={styles.form_title}>Total Cost: {quantity*item.price/1000000000000000000} Ether</h4>
               {item.availableCashOnDelivery?(<div>{wait?(<> <Spinner animation="border" variant="success" /></>):(

               <>
                <Row>
                <Col><Button onClick={payOrder}> Pay and Order</Button><br/></Col>
                <Col><Button onClick={payLaterOrder}>Order</Button> </Col>
                </Row>
                  </>)}</div>

                ):(<div>{wait?(<><Spinner animation="border" variant="success" /></>):(<><Button onClick={payOrder}>pay and Order</Button></>)}</div>)}
  
              
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </Row>
  
</Container>
    </div>
  );
};

export default Order;
