import {useParams} from "react-router-dom";
import {useContext} from "react";
import {AppContext} from "../App.tsx";

export default function Delete() {
    const {id} = useParams()
    const context = useContext(AppContext)
    const handleCancel = () => {
        window.history.back()
    }
    const handleDelete = () => {
        context.deleteUser(Number.parseInt(id))
        window.history.back()
    }
    return (
        <>
            <div className="m-3 d-flex align-items-center justify-content-center flex-column">
                <h1>do you want to delete this user</h1>
                <div className="d-flex w-100 my-3">
                    <button className="btn btn-primary mx-2 w-50" onClick={handleCancel}>cancel</button>
                    <button className="btn btn-danger mx-2 w-50" onClick={handleDelete}>delete</button>
                </div>
            </div>
        </>
    )
}