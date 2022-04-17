import './App.css';
import AppClass from './AppClass';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
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
      <BrowserRouter>
        <Switch>
          <Route path="/shopping-react/" component={AppClass}exact/>
          <Route path="/shopping-react/second" component={SideNav}/>
          <Route path="/shopping-react/additem" component={AddItem}/>
          <Route path="/shopping-react/signup" component={Signup}/>
          <Route path="/shopping-react/ret_order" component={RetailerOrder}/>
          <Route path="/shopping-react/cust_order" component={CustomerOrder}/>
          <Route path="/shopping-react/order/:id/:addr" component={Order}/>
          <Route path="/shopping-react/item_info/:id/:addr" component={ItemInfo}/>
          <Route path="/shopping-react/ret_info" component={RetailerInfo}/>
          <Route path="/shopping-react/cust_info" component={CustomerInfo}/>
          <Route path="/shopping-react/cust_cart" component={CustomerCart}/>

          
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
