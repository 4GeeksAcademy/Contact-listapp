import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const AddContact = () => {
    const { store, actions } = useContext(Context)
    const [data, setData] = useState({
        full_name: "",
        email: "",
        agenda_slug: "Augusto",
        address: "",
        phone: ""
    })

    useEffect(() => { }, [data.full_name, data.phone, data.email, data.address])

    return (
        <div className="container-fluid d-flex flex-column align-items-center p-5 my-4 w-50 bg-custom">
            <div className="row pb-3 text-center">
                <h1>Add a new Contact</h1>
            </div>
            <div className="row pb-3 w-100">Full Name
                <input
                    className="border mt-2 border-none"
                    placeholder="Full Name"
                    name="full_name"
                    required
                    value={data.full_name}
                    onChange={(e) => setData({ ...data, full_name: e.target.value })}
                />
            </div>
            <div className="row pb-3 w-100">Address
                <input
                    className="border mt-2 border-none"
                    placeholder="Enter Address"
                    name="address"
                    required
                    value={data.address}
                    onChange={(e) => setData({ ...data, address: e.target.value })}
                />
            </div>
            <div className="row pb-3 w-100">Phone Number
                <input
                    className="border mt-2 border-none"
                    placeholder="Enter Phone"
                    name="phone"
                    type="tel"
                    required
                    value={data.phone}
                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                />
            </div>
            <div className="row pb-3 w-100">Email
                <input
                    className="border mt-2 border-none"
                    placeholder="Enter Email"
                    name="email"
                    type="email"
                    required
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                />
            </div>
            <div className="row w-100 pb-3">
                <button
                    className="btn btn-sm mt-3 pb-2 btn-primary"
                    type="button"

                    onClick={async () => {
                        let { respuestaJson, response } = await actions.useFetch("/apis/fake/contact/", data, "POST")
                        if (!response.ok) {
                            alert("Oops! Contact Not Saved")
                            return
                        }
                        alert("Contact saved \n")
                    }}>Save</button>
            </div>
            <div className="row w-100 text-center">
                <br />
                <Link to="/"><b>Back to contacts</b></Link>
                <br />
            </div>
        </div>)
}


export default AddContact;