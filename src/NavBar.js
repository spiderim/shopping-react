import {Navbar,Nav,NavDropdown,Button,FormControl,Form,Offcanvas,Toast} from 'react-bootstrap';
import retailer from './retailer';
import customer from './customer';
import React,{Component} from 'react';
import web3 from './web3';
import CustomerOrder from './CustomerOrder';
import RetailerOrder from './RetailerOrder';
import {Link} from 'react-router-dom';
import styles from './appStyles.module.css';


class NavBar extends Component{
constructor(props){
    super(props);
    this.state={
    userExist:false,
    userName:'name',
    userType:'',
    searchText:'',
    loading:true,
    show:false,
    setShow:true

  }  
}

  

  async componentDidMount(){

    let accounts=await web3.eth.getAccounts(); 
    if(await retailer.methods.isValidUser().call({from:accounts[0]})){
      let user=await retailer.methods.getUserInfo().call({from:accounts[0]});
      this.setState({
        userExist:true,
        userName:user.name,
        userType:'Retailer'
      })
    }
    else if(await customer.methods.isValidUser().call({from:accounts[0]})){
      let user=await customer.methods.getUserInfo().call({from:accounts[0]});
      this.setState({
        userExist:true,
        userName:user.name,
        userType:'Customer'
      })
    }
    this.setState({loading:false})

  }
  handleClose=(event)=>{
    this.setState({show:false})
  }  

  handleShow=(event)=>{
    this.setState({show:true})
  } 

  render(){
    let templateUserName
    let templateUserType
    let templateRetailerOrder
      if(this.state.userExist){
        if(this.state.userType=="Customer"){
          templateUserName=<div><Nav.Link href="/shopping-react/#/cust_info" style={{color:"#F20E91"}}>{this.state.userName}</Nav.Link></div> 
        }
        else{
          templateUserName=<div><Nav.Link href="/shopping-react/#/ret_info" style={{color:"#F20E91"}}>{this.state.userName}</Nav.Link></div> 
        }
        
      }
      else{
        templateUserName=<div > <Nav.Link href="/shopping-react/#/signup" style={{color:"#F20E91"}}>signup</Nav.Link></div>
      }
        
      
      
      if(this.state.userExist && this.state.userType=="Customer"){
        templateUserType=
        <div >
          <Nav.Link href="/shopping-react/#/cust_order" style={{color:"#F20E91"}}>My orders</Nav.Link>
        </div>

      }
      else if(this.state.userExist && this.state.userType=="Retailer"){
        templateUserType=
        <div>
          <Nav.Link href="/shopping-react/#/additem" style={{color:"#F20E91"}}>Add Item</Nav.Link>
        </div>
      }

      if(this.state.userExist && this.state.userType=="Retailer"){
        templateRetailerOrder=<div style={{color:"#F20E91"}}><Nav.Link style={{color:"#22FC07"}} href="/shopping-react/#/ret_order">
            Orders
          </Nav.Link></div>
      }
      else if(this.state.userExist && this.state.userType=="Customer"){
        templateRetailerOrder=<div style={{color:"#F20E91"}}><Nav.Link style={{color:"#F2F904"}} href="/shopping-react/#/cust_cart">
            Cart
          </Nav.Link></div>
      }
      if(this.state.loading){
        return <div></div>;
      }
      else{
      
    return (
      <div >

      <div>
     

      <Offcanvas show={this.state.show} onHide={this.handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </div>

      <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark" >

       {/*<Button variant="primary" onClick={this.handleShow}>Launch</Button>)*/}


      <Navbar.Brand href="/shopping-react" style={{color:"green"}}><b>Shopping</b></Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="mr-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          {templateUserType}
          {templateUserName}
          {/*<NavDropdown style={{color:"aqua"}} title="Link" id="navbarScrollingDropdown">
            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
          </NavDropdown>*/}

          {templateRetailerOrder}
        </Nav>
 
      </Navbar.Collapse>
    </Navbar>

      </div>

      );
    }
    
  }
}

 export default NavBar;
