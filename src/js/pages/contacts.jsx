import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Contactos = () => {
    const [showForm, setShowForm] = useState(false);
    const { store, actions } = useContext(Context)
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [lista, setLista] = useState(store.listaContactos)
    const [refresh, setRefresh] = useState(false)
    const [estadoTemporal, setEstadotemporal] = useState({})
    const [data, setData] = useState({
        full_name: "",
        email: "",
        address: "",
        phone: ""
    })
    const handleEditClick = () => {
        setShowForm(true);
    };
    const handleSaveClick = async () => {
        try {
          await actions.addContact(data);
    
          setShowForm(false);
          setData({
            full_name: "",
            address: "",
            phone: "",
            email: "",
          });
        } catch (error) {
          console.error("Error al guardar los datos:", error);
        }
      };
    
      const handleCancelClick = () => {
        setShowForm(false);
        setData({
          full_name: "",
          address: "",
          phone: "",
          email: "",
        });
      };

    useEffect(() => {
        let funcionCarga = async () => {
            actions.funcionCarga()
        }
        funcionCarga()

    }, [refresh])

    useEffect(() => { }, [lista, nombre])

    return (<>
        <div className="container-fluid ms-2">
            <div className="row p-5">
                <div className="col-md-12 d-flex justify-content-end">
                    <button className="btn btn-success">
                        <Link to="/add-contact" style={{ color: 'white' }}>Add a New Contact</Link>
                    </button>
                </div>
            </div>
            <div className="d-flex justify-content-center col-10 m-auto">
                <div className="col-12 col-md-8 col-lg-6 w-100">
                    <ul className="list-group">
                        {store.listaContactos && store.listaContactos.length > 0 ? (
                            store.listaContactos.map((item, index) => {
                                return (
                                    <div key={index} className="row py-3 mb-4 bg-custom">
                                        <div className="col-3 m-4">
                                            <img className="img-thumbnail" src="https://th.bing.com/th?id=OIF.qItolixmw3nTkrmX%2bG413g&pid=ImgDet&rs=1" />
                                        </div>
                                        <div className="col-6">
                                            <h3 className="mb-3">{item.full_name}</h3>
                                            <p className="text-white"><i className="fas fa-map-marker-alt text-secondary"></i><span className="ms-3">{item.address}</span></p>
                                            <p className="text-white"><i className="fas fa-at text-secondary"></i><span className="ms-3">{item.email}</span></p>
                                            <p className="text-white"><i className="fas fa-phone text-secondary"></i><span className="ms-3">{item.phone}</span></p>
                                        </div>
                                        <div className="col-2 d-flex align-items-center justify-content-end">
                                            <button
                                                className="btn btn-lg text-success m-2"
                                                onClick={handleEditClick}
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            {showForm && (
                                                <div>
                                                    <div>
                                                        Full Name
                                                        <input
                                                            className="border mt-2 border-none"
                                                            placeholder="Full Name"
                                                            name="full_name"
                                                            required
                                                            value={data.full_name}
                                                            onChange={(e) => setData({ ...data, full_name: e.target.value })}
                                                        />
                                                    </div>
                                                    <div>
                                                        Address
                                                        <input
                                                            className="border mt-2 border-none"
                                                            placeholder="Enter Address"
                                                            name="address"
                                                            required
                                                            value={data.address}
                                                            onChange={(e) => setData({ ...data, address: e.target.value })}
                                                        />
                                                    </div>
                                                    <div>
                                                        Phone Number
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
                                                    <div>
                                                        Email
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
                                                    <button onClick={handleSaveClick}>Save</button>
                                                    <button onClick={handleCancelClick}>Cancel</button>
                                                </div>
                                            )}
                                            <button
                                                className="btn btn-lg m-2 text-danger"
                                                type="button"
                                                onClick={async () => {
                                                    actions.deleteContact(item.id);
                                                    if (window.confirm("Are you sure you want to delete this contact?")) {
                                                        actions.useFetch(`/apis/fake/contact/${item.id}`, null, "DELETE");
                                                        const updatedLista = lista.filter((contact) => contact.id !== item.id);
                                                        setLista(updatedLista);
                                                    }
                                                }}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>

                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-3">
                                <i className="fas fa-sad-tear fa-lg"></i>
                                This Contact List Is Empty
                                <i className="fas fa-sad-tear fa-lg"></i></div>
                        )}
                    </ul>
                </div>
            </div>
        </div >
    </>)
}

export default Contactos;