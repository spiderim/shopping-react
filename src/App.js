import './App.css';
import AppClass from './AppClass';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import SideNav from './components/SideNav';
import Signup from './Signup';
import NavBar from './NavBar';
import AddItem from './AddItem';
import RetailerOrder from './RetailerOrder';
import CustomerOrder from './CustomerOrder';
import Order from './Order';
import ItemInfo from './ItemInfo';
import RetailerInfo from './RetailerInfo';
import CustomerInfo from './CustomerInfo';
import CustomerCart from './CustomerCart';


function App() {
  return (
    <div className="App">
    <NavBar/>
     
          <Route exact path="/" component={AppClass}/>
          <Route exact path="/second" component={SideNav}/>
          <Route exact path="/additem"  component={AddItem}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/ret_order" component={RetailerOrder}/>
          <Route exact path="/cust_order " component={CustomerOrder}/>
          <Route exact path="/order/:id/:addr"  component={Order}/>
          <Route exact path="/item_info/:id/:addr"  component={ItemInfo}/>
          <Route exact path="/ret_info"  component={RetailerInfo}/>
          <Route exact path="/cust_info"  component={CustomerInfo}/>
          <Route exact path="/cust_cart"  component={CustomerCart}/>

          
        
      
    </div>
  );
}

export default App;
