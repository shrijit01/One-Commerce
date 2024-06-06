import Navbar from "./component/Navbar/Navbar";
import SignIn from "./component/SignIn/SignIn";
import Home from "./component/Home/Home";
import SignUp from "./component/SignUp/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Order from "./component/order/Order";
import { UserProvider } from "./UserContext";
import Cart from "./component/Cart/cart";

function App() {

  const router = createBrowserRouter([
    { path: "/", element: (<UserProvider><Navbar /><Home /></UserProvider>) },
    { path: "/signIn", element: <UserProvider><Navbar /><SignIn /></UserProvider> },
    { path: "/signUp", element: <UserProvider><Navbar /><SignUp /></UserProvider> },
    { path: "/order", element: <UserProvider> <Navbar /><Order /> </UserProvider> },
    { path: "/cart", element: <UserProvider>  <Navbar /> <Cart /> </UserProvider> }

  ])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;


