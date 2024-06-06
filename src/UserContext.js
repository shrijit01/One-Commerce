import { createContext, useContext, useState } from "react";
import { db } from "./firebaseInit";
import { addDoc, collection, doc, updateDoc, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const userContext = createContext();

export const useUserContext = () => {
    const value = useContext(userContext);
    return value;
}

export const UserProvider = ({ children }) => {
    const [checkUser, setCheckUser] = useState(false);
    const [cart, setCart] = useState([]);
    const [order, setOrder] = useState([]);
    const [userId, setUserId] = useState("");

    // SIGN UP 
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const newUser = (name, email, password) => {
        const user = {
            name: name,
            email: email,
            password: password,
            cart: [],
            order: [],
        }
        const useRef = collection(db, "users");
        // const docRef = addDoc(useRef, user);
        setCheckUser(true);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const signUp = () => {
        if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
            toast.error("enter valid details");
        } else {
            newUser(name, email, password);
            navigate('/');
        }
    }

    // LOG OUT
    const logOut = async () => {
        const useRef = doc(db, "users", userId);
        await updateDoc(useRef, {
            order: order,
            cart: cart
        });
        setCheckUser(false);
        toast.success("logout successfully");
    }

    //check authentication
    const authenticateUser = async (email, password) => {
        let isFound = false;
        const users = collection(db, "users");
        const querySnapshot = await getDocs(users);
        querySnapshot.forEach((doc) => {
            if (doc.data().email === email && doc.data().password === password) {
                console.log(doc.id);
                setUserId(doc.id);
                setOrder(doc.data().order);
                setCart(doc.data().cart);
                isFound = true
                setCheckUser(true);
                console.log("auth", isFound);
            }
            else if (doc.data().email !== email && doc.data().password !== password) {
            }
        })
        if (isFound) {
            return true;
        }
        else {
            return false;
        }
    }

    //SIGH IN
    const [userName, setUserName] = useState("");
    const [logInPass, setLogInPass] = useState("");
    const handlePasswordName = (e) => {
        setLogInPass(e.target.value);
    }
    const handleUserName = (e) => {
        setUserName(e.target.value);
    }
    const logIn = () => {
        if (userName.trim() === "" || logInPass.trim() === "") {
            toast.error("enter valid details");
        } else {
            authenticateUser(userName, logInPass);
            navigate('/');
        }
    }


    return (
        <userContext.Provider value={{
            newUser,
            signUp,
            handleEmailChange,
            handleNameChange,
            handlePasswordChange,
            logOut,
            logIn,
            handleUserName,
            handlePasswordName,
            setCart,
            setOrder,
            order,
            cart,
            checkUser
        }} >

            {children} </userContext.Provider>

    )
}
