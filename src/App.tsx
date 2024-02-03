import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import Home from "./pages/Home.tsx";
import AddPage from "./pages/Add.tsx";
import Edit from "./pages/Edit.tsx";
import "bootstrap/dist/css/bootstrap.min.css"
import {createContext, useState} from "react";
import Delete from "./pages/Delete.tsx";
export interface user {
    id : number ;
    firstName : string ;
    lastName : string ;
    email : string ;
    numberPhone : number ;
    country : string ;
}
export const AppContext = createContext({
    users : [] ,
    lastId : 0 ,
    addUser : null ,
    getUserById : null ,
    updateUser : null ,
    deleteUser : null
})
function App() {
    const  [users , setUsers] = useState<user[]>([])
    const [lastId,setLastId] = useState<number>(0)
    const addUser = (data:user):any => {
        setUsers(prevState => [...prevState , data])
        setLastId(prevState => prevState + 1 )
    }
    const getUserById = (id : number): user => {
        return users.filter(user=> user.id === id)[0]
    }
    const updateUser = (newUser : user ) => {
        setUsers(prevState => prevState.map((user) => {
            if(user.id === newUser.id) {
                return newUser
            }
            return user
        }))
    }
    const deleteUser = (id : number) => {
        setUsers(prevState => prevState.filter(user => user.id !== id))
    }
    const contextValues = {users : users ,
        lastId: lastId ,
        addUser : addUser ,
        getUserById: getUserById ,
        updateUser: updateUser ,
        deleteUser: deleteUser}
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
