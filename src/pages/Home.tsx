import {useContext, useEffect, useState} from "react";
import {AppContext , user} from "../App.tsx";
import {Link} from "react-router-dom";


export  default  function Home() {
    const [users , setUsersList] = useState<user[]>([])
    const context = useContext(AppContext)
    useEffect(()=>{
        setUsersList(context.users)
    },[])
    const displayUsers = () => {
        return users?.map((user,key)=> {
            return <tr key={key}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.numberPhone}</td>
                <td>{user.country}</td>
                <td>
                    <button className="btn btn-primary mx-2"><Link className="nav-link" to={`/edit/${user.id}`}>update</Link></button>
                    <button className="btn btn-danger mx-2"><Link className="nav-link" to={`/delete/${user.id}`}>delete</Link></button>
                </td>
            </tr>
        })
    }
    return(
        <div className="p-3">
            <h5 className="text-center text-primary text-uppercase">users table</h5>
            <table className="table">
                <thead>
                <tr>
                    <th>id</th>
                    <th>first name</th>
                    <th>last name</th>
                    <th>email</th>
                    <th>number phone</th>
                    <th>country</th>
                    <th>actions</th>
                </tr>
                </thead>
                <tbody>
                {users.length > 0 ? displayUsers() : <tr><td colSpan={7} className="fw-bold text-center">no items</td></tr>}
                </tbody>
            </table>
        </div>
    )
}