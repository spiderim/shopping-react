
import React,{Component} from 'react';
import retailer from './retailer';
import customer from './customer';
import web3 from './web3';
import {Card,Button,Placeholder,Form,FormControl,Spinner,Row,Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';



class CustomerCart extends Component{

  constructor(props){
    super(props);
    this.state={
    items:[],
    allCachedData:[],
    wait:true
  }  
}



  async componentDidMount(){
    
    const accounts=await web3.eth.getAccounts();
    // console.log(await customer.methods.getOrders().call({from:accounts[0]}));
    
    var data=await caches.keys();
    var _items=[];
    for(var i=0;i<data.length;i++){
        const myArr=data[i].split("/");

        if(accounts[0]==myArr[0]){
          _items.push(await retailer.methods.getItemInfo(myArr[2],myArr[1]).call({from:accounts[0]}));
        }
    }
    
    // alert(_items);
    this.setState({items:_items});
    
    this.setState({wait:false});

  }
 deleteSpecificCache = (cacheName) =>async(event)=> {
    const accounts=await web3.eth.getAccounts();
    cacheName=accounts[0]+"/"+cacheName;
    if ("caches" in window) {
        caches.delete(cacheName).then(function (res) {
            alert('sucessfully removed')
            return res;
        });
    }

    window.location.reload(false);

  }
  


  render(){
    
    let templateWait
    
   

    templateWait=<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}><Spinner animation="border" variant="info" /></div>

    return (

    <div > 


    {!this.state.items.length?(<>{this.state.wait?(<>{templateWait}</>):(<><b style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh' , color: 'red'}}>no item found!!!</b></>)} </>):(
    
    <>

    {this.state.wait?(<div>{templateWait}</div>):(<Row xs={1} md={4} className="g-4">
                {this.state.items.slice().sort((a,b)=>a.itemId<b.itemId?1:-1).map(item=>(
                  <Col>
                  <Card >
              
              
  
    
  <div style={{float:"left"}}>
  <Link style={{ textDecoration: 'none' }} to={`/shopping-react/order/${item.itemId}/${item.addrRetailer}`} key={item.itemId}>
   <Card.Img style={{height:"200px"}} variant="top" src={item.imgLink} />
   
    <Card.Body>
      <Card.Title style={{height:"60px",lineHeight:"20px",overflow:"hidden "}}>{item.title}</Card.Title>
      <Card.Text style={{textAlign:'left'}}>
        <div><b> {item.price/1000000000000000000} Ether</b></div>
        
      
            
      </Card.Text>
    </Card.Body>
    </Link>
    <Card.Footer >
      <Link to={`/shopping-react/order/${item.itemId}/${item.addrRetailer}`}><Button variant="success" >Order</Button></Link><Button variant="danger"  onClick={this.deleteSpecificCache(item.addrRetailer+"/"+item.itemId)}>Remove from Cart</Button>
    </Card.Footer>
  

</div>
                
                

             
              
              </Card>
              </Col>


    

              ))}</Row>)}
          
     </>)}
    


       
    </div>
  );
  }
  
}

export default CustomerCart;

