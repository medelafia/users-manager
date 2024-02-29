import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import Home from "./pages/Home.tsx";
import AddPage from "./pages/Add.tsx";
import Edit from "./pages/Edit.tsx";
import "bootstrap/dist/css/bootstrap.min.css"
import {createContext, useEffect, useState} from "react";
import Delete from "./pages/Delete.tsx";
export type user = {
    id : number ;
    firstName : string ;
    lastName : string ;
    email : string ;
    numberPhone : number ;
    country : string ;
}
export const AppContext = createContext<{
    users: user[];
    lastId: number;
    addUser: (data: user) => void;
    getUserById: (id: number) => user;
    updateUser: (newUser: user) => void;
    deleteUser: (id: number) => void;
}>({
    users: [],
    lastId: 0,
    addUser: () => {},
    getUserById: () => ({ id: 0, firstName: '', lastName: '', email: '', numberPhone: 0, country: '' }),
    updateUser: () => {},
    deleteUser: () => {},
});
function App() {
    const  [users , setUsers] = useState<user[]>([] )
    const [lastId,setLastId] = useState<number>(0)
    const addToLocalStorage = (user : user) => {
        const users_string = localStorage.getItem("users")
        let users : user[] ;
        if(users_string){
            users = JSON.parse(users_string)
        }else {
            users = []
        }
        users.push(user)
        localStorage.setItem("users" , JSON.stringify(users))
    }
    const deleteFromLocalStorage = (id : number) : void  => {
        let lsUsers :user[] = JSON.parse(localStorage.getItem("users") || "[]")
        lsUsers = lsUsers.filter(user => user.id !== id )
        localStorage.setItem("users" , JSON.stringify(lsUsers))
    }
    const addUser = (data:user):void => {
        addToLocalStorage(data)
        setUsers(prevState => [...prevState , data])
        setLastId(prevState => prevState + 1 )
    }
    const getUserById = (id : number): user => {
        return users.find(user => user.id === id)
    }
    const updateUser = (newUser : user ) => {
        updateFromLocalStorage(newUser)
        setUsers(prevState => prevState.map((user) => {
            if(user.id === newUser.id) {
                return newUser
            }
            return user
        }))
    }
    const updateFromLocalStorage = (newUser : user) : void => {
        let lsUsers :user[] = JSON.parse(localStorage.getItem("users") || "[]")
        lsUsers = lsUsers.map(user => {
            return user.id === newUser.id ? newUser : user ;
        })
        localStorage.setItem("users" , JSON.stringify(lsUsers))
    }
    const deleteUser = (id : number) => {
        deleteFromLocalStorage(id)
        setUsers(users.filter(user => {
            return user.id != id
        }))
    }
    const contextValues = {
        users : users ,
        lastId: lastId ,
        addUser : addUser ,
        getUserById: getUserById ,
        updateUser: updateUser ,
        deleteUser: deleteUser
    }
    useEffect(()=> {
        const lsUsers: user[] = JSON.parse(localStorage.getItem("users") || "[]");
        setUsers(lsUsers);
        setLastId(lsUsers[lsUsers.length - 1 ].id +  1 )
    },[])
    return (
      <AppContext.Provider value={contextValues}>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Layout />}>
                      <Route index element={<Home/>} />
                      <Route path="/add" element={<AddPage />} />
                      <Route path="/edit/:id" element={ users.length > 0 ? <Edit/> : <Home /> } />
                      <Route path="/delete/:id" element={ users.length > 0 ? <Delete/> : <Home /> } />
                  </Route>
              </Routes>
          </BrowserRouter>
      </AppContext.Provider>
  );
}

export default App
