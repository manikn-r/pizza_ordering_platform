import { createContext, useState, useEffect } from "react";
import image01 from "../assets/Cheese Volcano Peppy Paneer.jpg"
import image02 from "../assets/Corn & Cheese Volcano.jpg"
import image03 from "../assets/Double Cheese Margherita.jpg"
import image04 from "../assets/Farmhouse.jpg"
import image05 from "../assets/Veggie Paradise.jpg"
import image06 from "../assets/Cheese Overload.jpg"
import image07 from "../assets/Chicken Maxx - BBQ.jpg"
import image08 from "../assets/Chicken Pepperoni.jpg"
import image09 from "../assets/Indi Chicken Tikka.jpg"
import image10 from "../assets/Korean Chicken Burst.jpg"
import { auth } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const context = createContext();
function CartProvider({ children }) {
    console.log(children);
    const [user, setUser] = useState(null);
    const [isAdmin, setAdmin] = useState(false);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {

                setUser(currentUser); // Sets the Firebase user object globally
                if (currentUser.uid === "9GX9jZ1wS2SRU03X0cfQFui7bDZ2") {
                    setAdmin(true);
                }
            }
        });
        return () => unsubscribe();
    }, []);
    const [pizzaItems, updatePizzaItems] = useState([{
        image: image01,
        name: "Cheese Volcano Peppy Paneer",
        price: 319,
        addedToCart: false,
        quantity: 0
    },
    {
        image: image02,
        name: "Corn & Cheese Volcano",
        price: 259,
        addedToCart: false,
        quantity: 0
    },
    {
        image: image03,
        name: "Double Cheese Margherita",
        price: 299,
        addedToCart: false,
        quantity: 0
    },
    {
        image: image04,
        name: "Farmhouse",
        price: "459",
        addedToCart: false,
        quantity: 0
    },
    {
        image: image05,
        name: "Veggie Paradise",
        price: "459",
        addedToCart: false,
        quantity: 0
    },
    {
        image: image06,
        name: "Cheese Overload",
        price: "639",
        addedToCart: false,
        quantity: 0
    },
    {
        image: image07,
        name: "Chicken Maxx - BBQ",
        price: "299",
        addedToCart: false,
        quantity: 0
    },
    {
        image: image08,
        name: "Chicken Pepperoni",
        price: "599",
        addedToCart: false,
        quantity: 0
    },
    {
        image: image09,
        name: "Indi Chicken Tikka",
        price: "599",
        addedToCart: false,
        quantity: 0
    },
    {
        image: image10,
        name: "Korean Chicken Burst",
        price: "349",
        addedToCart: false,
        quantity: 0
    }
    ])

    function addToCart(pizza) {
        updatePizzaItems((items) => {
            return items.map((x) => {
                if (x.name === pizza.name) {
                    return { ...x, addedToCart: true, quantity: 1 }
                } else {
                    return x;
                }
            })
        })
        // setCartCount(pizzaItems.filter(pizza => pizza.addedToCart === true).length);
    }
    return (
        <context.Provider value={{ pizzaItems, user, isAdmin,setAdmin, addToCart, updatePizzaItems }}>
            {children}
        </context.Provider>
    )
}
export default CartProvider;
export { context }