export const contactStore = {
    listaContactos: [
      {
        full_name: "Joe Cass",
        email: "Joe@gmail.com",
        agenda_slug: "",
        address: "Calle Gran Via 36,p-6,p-2",
        phone: "978654321",
      },
    ],
  };
  
  export function contactActions(getStore, getActions, setStore) {
    return {
      funcionCarga: async () => {
        let store = getStore();
        let actions = getActions();
        let { respuestaJson, response } = await actions.useFetch(
          "/apis/fake/contact/agenda/Bernardo",
          null
        );
        setStore({ ...store, listaContactos: respuestaJson });
      },
  
      addContact: async (obj) => {
        let store = getStore();
        let arrTemp = store.listaContactos.slice();
  
        arrTemp.push(obj);
        setStore({ ...store, listaContactos: arrTemp });
  
        return store.listaContactos;
      },
      deleteContact: (id) => {
        let actions = getActions();
        actions.deleteFetch(id);
      },
  
      editContact: (indice, nombre, email, telefono, direccion) => {
        let store = getStore();
        let arrTemp = store.listaContactos.slice();
  
        arrTemp[indice]["full_name"] = nombre;
        arrTemp[indice]["email"] = email;
        arrTemp[indice]["phone"] = telefono;
        arrTemp[indice]["address"] = direccion;
  
        setStore({ ...store, listaContactos: arrTemp });
      },
  
      getFetch: async (endpoint) => {
        let url = "https://assets.breatheco.de/apis/fake/contact/" + endpoint;
        let response = await fetch(url);
  
        let respuestaJson = await response.json();
        return { respuestaJson, response };
      },
  
      putFetch: async (endpoint, body) => {
        let actions = getActions();
        let url = "https://assets.breatheco.de/apis/fake/contact/" + endpoint;
        let response = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: body ? JSON.stringify(body) : null,
        });
  
        if (response.ok) {
          let respuestaJson = await response.json();
          actions.funcionCarga();
          return { respuestaJson, response };
        }
  
        return null;
      },
  
      deleteFetch: async (endpoint) => {
        let actions = getActions();
        let url = "https://assets.breatheco.de/apis/fake/contact/" + endpoint;
        let response = await fetch(url, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
  
        if (response.ok) {
          let respuestaJson = await response.json();
          actions.funcionCarga();
          return { respuestaJson, response };
        }
  
        return null;
      },
  
      peticionEjemplo: async () => {
        let suma = 4;
  
        let respuesta = await fetch("https://assets.breatheco.de/apis/fake/contact/agenda");
  
        if (respuesta.ok) {
          let respuestaJSON = await respuesta.json(); 
        }
      },
      fetchPost: async () => {
        let respuesta = await fetch(
          "https://assets.breatheco.de/apis/fake/contact/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                full_name: "Joe Cass",
                email: "Joe@gmail.com",
                agenda_slug: "",
                address: "Calle Gran Via 36,p-6,p-2",
                phone: "978654321",
            }),
          }
        );
        let respuestaJSON = await respuesta.json();
      },
    };
  }