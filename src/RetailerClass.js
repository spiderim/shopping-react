import AddItem from './AddItem';
import React,{Component} from 'react';
import retailer from './retailer';
import customer from './customer';
import web3 from './web3';
import {Card,Button,Placeholder,Form,FormControl,Spinner,Row,Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';


class RetailerClass extends Component{
// 
  constructor(props){
    super(props);
    this.state={
    items:[],
    searchText:'',
    wait:true

  }  
}
  async componentDidMount(){
    const accounts=await web3.eth.getAccounts();
    var _items=await retailer.methods.getItems().call({from:accounts[0]});
    this.setState({wait:false});
    this.setState({items:_items})
    // console.log(_items)
  }

  changeText=async(event)=>{
    this.setState({searchText:event.target.value.toLowerCase()});
  }
  searchClick=async(event)=>{
    event.preventDefault();
    this.setState({wait:true});
    const accounts=await web3.eth.getAccounts();
    var data=[];
    var v=await retailer.methods.getItems().call({from:accounts[0]});
    this.setState({items:v});
    if(this.state.searchText.length>2){
      var search=this.state.searchText.split(' ');
      console.log(search);
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


  render(){
    let templateAllItems
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
          <Button type="submit" onClick={this.searchClick} variant="outline-success">Search</Button>
        </Form>
    </div>

     templateWait=<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh' , color: 'red'}}><Spinner animation="border" variant="info" /></div>
          return (
          
          <div > 

    {templateSearch}
    {!this.state.items.length?(<>{this.state.wait?(<>{templateWait}</>):(<><b style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh' , color: 'red'}}>no item found!!!</b></>)} </>):(
    
    <>
    {this.state.wait?(<div>{templateWait}</div>):(<Row xs={1} md={4} className="g-4">
                {this.state.items.slice().sort((a,b)=>a.itemId<b.itemId?1:-1).map(item=>(
                  <Col>
                  <Card >
              <Link to={`/order/${item.itemId}/${item.addrRetailer}`} key={item.itemId}>
              
  
    
  <div style={{float:"left"}}  >
   <Card.Img style={{height:"200px"}} variant="top" src={item.imgLink} />
    <Card.Body>
      <Card.Title style={{height:"60px",lineHeight:"20px",overflow:"hidden "}}>{item.title}</Card.Title>
      <Card.Text style={{textAlign:'left'}}>
        <div><b> {item.price/1000000000000000000} Ether</b></div>
        
      
            
      </Card.Text>
    </Card.Body>
    <Card.Footer >
      <Link to={`/item_info/${item.itemId}/${item.addrRetailer}`}><Button style={{width:"100%"}}>Update</Button></Link>
    </Card.Footer>
  

</div>
                
                

             
              </Link>
              </Card>
              </Col>


    

              ))}</Row>)}
          
     </>)}
    


       
    </div>
        );
  }
  
}

export default RetailerClass;
