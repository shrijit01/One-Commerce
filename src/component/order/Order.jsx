import styles from "./order.module.css";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../UserContext";

const Order = () => {
  const { checkUser , order } = useUserContext();

  if (!checkUser) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.head}>My Orders</h1>
        {order.map((orders) => {
          return (
            <div key={order.id} className={styles.orderDetails}>
              <h2>Order on:- {orders.date}</h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.order.map((item) => {
                    return (
                      <tr>
                        <td>{item.title}</td>
                        <td>{item.price}</td>
                        <td>{item.count}</td>
                        <td>{item.price * item.count}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpanSpan={2}></th>
                    <th></th>
                    <th>Total:-</th>
                    <th>
                      &#x20B9;{" "}
                      {orders.order.reduce(
                        (total, product) =>
                          total + product.price * product.count,
                        0
                      )}
                      /-
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Order;
