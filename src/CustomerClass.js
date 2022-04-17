
import React,{Component} from 'react';
import retailer from './retailer';
import customer from './customer';
import web3 from './web3';
import {Card,Button,Placeholder,Form,FormControl,Spinner,Row,Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';



class CustomerClass extends Component{

  constructor(props){
    super(props);
    this.state={
    items:[],
    address:'',
    searchText:'',
    wait:true,
    cart:false
  }  
}

  async componentDidMount(){
    
    const accounts=await web3.eth.getAccounts();
    // console.log(await customer.methods.getOrders().call({from:accounts[0]}));
    var _items=await retailer.methods.getAllItems().call({from:accounts[0]});
    this.setState({items:_items});
    this.setState({wait:false});

  }
  deliveryAddress=(event)=>{
    this.setState({address:event.target.value})
  }
  changeText=async(event)=>{
    this.setState({searchText:event.target.value.toLowerCase()});

  }
  searchClick=async(event)=>{
    event.preventDefault();
    this.setState({wait:true});
    const accounts=await web3.eth.getAccounts();
    var data=[];
    var v=await retailer.methods.getAllItems().call({from:accounts[0]});
    this.setState({items:v});
    if(this.state.searchText.length>2){
      var text=this.state.searchText;
      var search=text.split(' ');
      for(var i=0;i<v.length;i++){
        var b=false;
        for(var j=0;j<search.length;j++){
          if(search[j].length>1){
             if(v[i].title.toLowerCase().includes(search[j]) || v[i].description.toLowerCase().includes(search[j])){
              b=true;
             } 
          }
          
        }
        if(b){
          data.push(v[i]);
        }
        
      }
      this.setState({items:data});      
    }
    this.setState({wait:false});
  }
  deliveryAddress=(event)=>{
      this.setState({address:event.target.value})
  }

  addCartClick=(itemId,addrRetailer)=>async(event)=>{
    
    const accounts=await web3.eth.getAccounts();

    try{
      this.setState({cart:true});
      await customer.methods.addtoCart(itemId,addrRetailer).send({
        from:accounts[0],
        gas:10000000
      })    
      alert('added to cart sucess');
      
    }
    catch{
      alert('metamask error');
    }

    this.setState({cart:false});

  }

  addDataIntoCache=(cacheName, url, datast)=>async(event)=>{
    const data = new Response(JSON.stringify(datast));
    const dta= new Response(JSON.stringify(""));
    const accounts=await web3.eth.getAccounts();
    if ('caches' in window) {
     
      caches.open(accounts[0]+"/"+datast).then((cache) => {
        cache.put(url, dta);
        alert('Item Added to Cart!')
      });
    }
    
  }
 



  render(){
    let templateSearch
    let templateWait
    templateSearch=<div>
      <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            onChange={this.changeText}
            className="mr-2"
            style={{borderStyle:"solid",borderColor:"blue"}}
            aria-label="Search"
          />
          <Button type="submit" onClick={this.searchClick} variant="primary">Search</Button>
        </Form>
        
    </div>

    templateWait=<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}><Spinner animation="border" variant="info" /></div>

    return (

    <div > 

    {templateSearch}


    {!this.state.items.length?(<>{this.state.wait?(<>{templateWait}</>):(<><b style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh' , color: 'red'}}>no item found!!!</b></>)} </>):(
    
    <>
    {this.state.wait?(<div>{templateWait}</div>):(<Row xs={1} md={4} className="g-4">
                {this.state.items.slice().sort((a,b)=>a.itemId<b.itemId?1:-1).map(item=>(
                  <Col>
                  <Card >
              
              
  
    
  <div style={{float:"left"}}  >
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
      
       <Button style={{width:"100%"}} onClick={this.addDataIntoCache('MyCache',
      'https://localhost:300/cust_cart',item.addrRetailer+"/"+item.itemId)} >
        Add to Cart</Button>

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

export default CustomerClass;

