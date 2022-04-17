import './App.css';
import AppClass from './AppClass';
import {HashRouter,Route,Switch} from 'react-router-dom';
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
      <HashRouter basename='/shopping-react'>
        <Switch>
          <Route path="/" exact component={AppClass}/>
          <Route path="/second" exact component={SideNav}/>
          <Route path="/additem"  exact component={AddItem}/>
          <Route path="/signup" exact component={Signup}/>
          <Route path="/ret_order" exact component={RetailerOrder}/>
          <Route path="/cust_order" exact component={CustomerOrder}/>
          <Route path="/order/:id/:addr" exact component={Order}/>
          <Route path="/item_info/:id/:addr" exact component={ItemInfo}/>
          <Route path="/ret_info" exact component={RetailerInfo}/>
          <Route path="/cust_info" exact component={CustomerInfo}/>
          <Route path="/cust_cart" exact component={CustomerCart}/>

          
        </Switch>
      </HashRouter>
      
    </div>
  );
}

export default App;
