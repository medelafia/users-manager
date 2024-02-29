import {useContext, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {AppContext, user} from "../App.tsx";

export default function Edit() {
    const  {id} = useParams()
    const context = useContext(AppContext)
    const [ currentUser , setCurrentUser ] = useState<user>(context.getUserById(Number.parseInt(id)))
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const numberPhone = useRef()
    const country = useRef()
    const handleClick = (e:any) => {
        e.preventDefault()
        const user:user = {
            id: Number.parseInt(id) ,
            firstName : firstName.current.value ,
            lastName : lastName.current.value ,
            email : email.current.value ,
            numberPhone : Number.parseInt(numberPhone.current.value) ,
            country : country.current.value
        };
        context.updateUser(user)
        window.history.back()
    }
    return (
        <>
            <div>
                <h1 className="text-center text-uppercase text-primary">add user form</h1>
                <form>
                    <div className="form-group my-1">
                        <label className="form-label" htmlFor="id">id</label>
                        <input type="number" disabled value={id} className="form-control" id="id"/>
                    </div>
                    <div className="form-group my-1">
                        <label className="form-label" htmlFor="firstName">first name</label>
                        <input defaultValue={currentUser?.firstName} type="text" className="form-control" id="firstName" ref={firstName}/>
                    </div>
                    <div className="form-group my-1">
                        <label className="form-label" htmlFor="lastName">last name</label>
                        <input defaultValue={currentUser?.lastName} type="text" className="form-control" ref={lastName} id="lastName"/>
                    </div>
                    <div className="form-group my-1">
                        <label className="form-label" htmlFor="email">email</label>
                        <input defaultValue={currentUser?.email} type="email" className="form-control" ref={email} id="email"/>
                    </div>
                    <div className="form-group my-1">
                        <label className="form-label" htmlFor="numberPhone">number phone</label>
                        <input defaultValue={currentUser?.numberPhone} type="number" className="form-control" ref={numberPhone} id="numberPhone"/>
                    </div>
                    <div className="form-group my-1">
                        <label className="form-label" htmlFor="country">country</label>
                        <select defaultValue={currentUser?.country} className="form-select" id="country" ref={country}>
                            <option value="ma">morroco</option>
                            <option value="sp">spain</option>
                            <option value="fr">france</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 my-3" onClick={handleClick}>update user</button>
                </form>
            </div>
        </>
    )
}