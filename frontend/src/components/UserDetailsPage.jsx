import { useEffect, useState} from "react";
import axios from "axios";

function UserDetails() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Fetch orders from your MongoDB backend
        // Make sure you have a route like app.get("/getOrders", ...) in your backend!
        axios.get(import.meta.env.VITE_BACKEND_URL+"/getUsers")
            .then((response) => {
                setOrders(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                setLoading(false);
            });
    }, []);
    if (loading) return <div className="admin-container"><h2>Loading Records...</h2></div>;

    return (
        <div className="admin-container">
            <h2 className="admin-header">Admin Dashboard - Order Records</h2>

            <div className="table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Ordered Products</th>
                            <th>Total Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center" }}>No orders found in database.</td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order._id}>

                                    <td>{order.orderId}</td>

                                    <td>{order.userId}</td>
                                    <td>{order.userName}</td>
                                    <td className="products-cell">
                                        {/* Maps through the cartItems array and joins pizza names with a comma */}
                                        {order.items.map((item) => `${item.quantity}x ${item.name}`).join(', ')}
                                    </td>

                                    <td className="amount-cell">
                                        ₹{order.amount ? order.amount : "0"}
                                    </td>

                                    <td>
                                        {/* Converts MongoDB timestamp to a readable local date string */}
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>

                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default UserDetails;