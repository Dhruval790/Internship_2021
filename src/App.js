import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import {
  Inventory, LandingPage, Purchase, Sale, Tracking, Login, Dashboard, Expenses, Edit, Details, Suppliers,
  ToBePurchased, Channels, Products,
} from './pages';
import { Navbar, Footer } from './containers';
import { UserContextProvider } from './contexts/user';
import SignUp from './pages/SignUp/SignUp';
import ProtectedRoute from './routes/ProtectedRoute';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <Navbar />
          <Switch>
            <Route path="/" component={LandingPage} exact />
            <ProtectedRoute path="/inventory" component={Inventory} exact />
            <Route path="/login" component={Login} exact />
            <ProtectedRoute path="/sales" component={Sale} exact />
            <ProtectedRoute path="/purchase" component={Purchase} exact />
            <ProtectedRoute path="/tracking" component={Tracking} exact />
            <Route path="/signup" component={SignUp} exact />
            <ProtectedRoute path="/dashboard" component={Dashboard} exact />
            <ProtectedRoute path="/expenses" component={Expenses} exact />
            <ProtectedRoute path="/inventory/suppliers" component={Suppliers} exact />
            <ProtectedRoute path="/purchase/tobepurchased" component={ToBePurchased} exact />
            <ProtectedRoute path="/edit/:productId" component={Edit} exact />
            <ProtectedRoute path="/details/:productId" component={Details} exact />
            <ProtectedRoute path="/sales/channel" component={Channels} exact />
            <ProtectedRoute path="/products" component={Products} exact />
            <Redirect to="/" />
          </Switch>
          <div />
          <Footer />
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
}
export default App;
