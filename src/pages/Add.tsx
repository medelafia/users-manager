import { useContext, useRef} from "react";
import {AppContext, user} from "../App.tsx";

export default function AddPage() {
    const context = useContext(AppContext)
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const numberPhone = useRef()
    const country = useRef()
    const handleClick = (e : any) => {
        e.preventDefault()
        const user:user = {
            id: context.lastId ,
            firstName : firstName.current.value ,
            lastName : lastName.current.value ,
            email : email.current.value ,
            numberPhone : Number.parseInt(numberPhone.current.value) ,
            country : country.current.value
        };
        context.addUser(user);
        firstName.current.value = "";
        lastName.current.value = "";
        email.current.value = "";
        numberPhone.current.value ="";
        country.current.value ="";
        window.history.back()
    }
    return (
        <div>
            <h1 className="text-center text-uppercase text-primary">add user form</h1>
            <form>
                <div className="form-group my-1">
                    <label className="form-label" htmlFor="id">id</label>
                    <input type="number" disabled value={context.lastId} className="form-control" id="id"/>
                </div>
                <div className="form-group my-1">
                    <label className="form-label" htmlFor="firstName">first name</label>
                    <input type="text" className="form-control" id="firstName" ref={firstName}/>
                </div>
                <div className="form-group my-1">
                    <label className="form-label" htmlFor="lastName">last name</label>
                    <input type="text" className="form-control" ref={lastName} id="lastName"/>
                </div>
                <div className="form-group my-1">
                    <label className="form-label" htmlFor="email">email</label>
                    <input type="email" className="form-control" ref={email} id="email"/>
                </div>
                <div className="form-group my-1">
                    <label className="form-label" htmlFor="numberPhone">number phone</label>
                    <input type="number" className="form-control" ref={numberPhone} id="numberPhone"/>
                </div>
                <div className="form-group my-1">
                    <label className="form-label" htmlFor="country">country</label>
                    <select className="form-select" id="country" ref={country}>
                        <option value="ma">morroco</option>
                        <option value="sp">spain</option>
                        <option value="fr">france</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100 my-3" onClick={handleClick}>add user</button>
            </form>
        </div>
    )
}