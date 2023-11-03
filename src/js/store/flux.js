import { exampleStore, exampleActions } from "./exampleStore.js"; 
import { usuarioStore, usuarioActions } from "./usuario.js";
import { contactStore, contactActions } from "./contact.js";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      ...exampleStore, 
      ...usuarioStore,
      ...contactStore,
    },
    actions: {
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      changeColor: (index, color) => {
        const store = getStore();

        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        setStore({ ...store, demo: demo });
      },
      ...exampleActions(getStore, getActions, setStore), 
      ...usuarioActions(getStore, getActions, setStore),
      ...contactActions(getStore, getActions, setStore),
      useFetch: async (endpoint, body, method = "GET") => {
        let url = "https://assets.breatheco.de" + endpoint;
        let response = await fetch(url, {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: body ? JSON.stringify(body) : null,
        });

        let respuestaJson = await response.json();

        return { respuestaJson, response };
      },
    },
  };
};

export default getState;