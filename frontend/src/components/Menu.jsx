import { useContext, useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
// import image01 from "../assets/Cheese Volcano Peppy Paneer.jpg"
// import image02 from "../assets/Corn & Cheese Volcano.jpg"
// import image03 from "../assets/Double Cheese Margherita.jpg"
import { context } from "../context/Cartcontext"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"
function Menu() {
    // const [cartCount, setCartCount] = useState(0);
    useEffect( ()=>{
        onAuthStateChanged(auth,(user)=>{
            if(!user){
                navigate("/login")
            }
        })
    })
const navigate = useNavigate();
    // const [pizzaItems, updatePizzaItems] = useState([{
    //     image: image01,
    //     name: "Cheese Volcano Peppy Paneer",
    //     price: "319",
    //     addedToCart: false,
    //     quantity: 1
    // },
    // {
    //     image: image02,
    //     name: "Corn & Cheese Volcano",
    //     price: "259",
    //     addedToCart: false,
    //     quantity: 1
    // },
    // {
    //     image: image03,
    //     name: "Double Cheese Margherita",
    //     price: "299",
    //     addedToCart: false,
    //     quantity: 1
    // },
    // {
    //     image: image01,
    //     name: "Cheese Volcano Peppy Paneer",
    //     price: "319",
    //     addedToCart: false,
    //     quantity: 1
    // }])
    const {pizzaItems, addToCart, updatePizzaItems} = useContext(context);
        // const cartCount = pizzaItems.filter(pizza => pizza.addedToCart === true).length;
        const totalQuantity = pizzaItems.reduce( (total, item)=>{
            return total + item.quantity;
        },0)
    // function addToCart(pizza) {
    //     updatePizzaItems((items) => {
    //         return items.map((x) => {
    //             if (x.name === pizza.name) {
    //                 return { ...x, addedToCart: true }
    //             } else {
    //                 return x;
    //             }
    //         })
    //     })
    //                         // setCartCount(pizzaItems.filter(pizza => pizza.addedToCart === true).length);
    // }
    function countChanges(from, pizza) {
        if (from === "incre") {
            updatePizzaItems((items) => {
                return items.map((x) => {
                    if (x.name === pizza.name) {
                        return { ...x, quantity: x.quantity + 1 }
                    } else {
                        return x;
                    }
                })
            })
        } else if (pizza.quantity - 1 < 1) {
            updatePizzaItems((items) => {
                return items.map((x) => {
                    if (x.name === pizza.name) {
                        return { ...x, addedToCart: false, quantity:0 }
                    } else {
                        return x;
                    }
                })
            })
        } else {
            updatePizzaItems((items) => {
                return items.map((x) => {
                    if (x.name === pizza.name) {
                        return { ...x, quantity: x.quantity - 1 }
                    } else {
                        return x;
                    }
                })
            })
        }
                // This is faster and cleaner! No useEffect needed.
// setCartCount(pizzaItems.filter(pizza => pizza.addedToCart === true).length);
    }
    return (
        <>
            <div className="menu-conatiner">
                <div className="pizza-container">
                    {pizzaItems.map((pizza) => {
                        return (<div className="pizza-dom">
                            <img src={pizza.image} alt=""></img>
                            <div className="pizza-dom-structure">
                                <div className="pizza-detail">
                                    <span className="price"><i className="rs">Rs.</i><span>{pizza.price}</span></span>
                                    <span className="name pizza-name">{pizza.name}</span>

                                </div>

                                {!pizza.addedToCart && <div className="cart-btn button" onClick={() => addToCart(pizza)}>Add +</div>}
                                {pizza.addedToCart && <div className="cart-btn button"><span onClick={() => countChanges('decre', pizza)}>-</span> <span className="count">{pizza.quantity}</span><span onClick={() => countChanges('incre',pizza)}>+</span></div>}
                            </div>

                        </div>)
                    })}
                </div>

 <div className={`added-cart-dom-fixed ${totalQuantity ? 'show' : ''}`} onClick={()=>navigate('/cart')}>
    <div className="fixed-dom-wrapper">

    <div className="fixed-dom">

    <span>{totalQuantity} items</span>
    <span><i class="fa-solid fa-cart-shopping"></i>View Cart<i class="fa-solid fa-arrow-right"></i></span>
    </div>
    </div>
</div>

            </div>
        </>
    )
}

export default Menu;