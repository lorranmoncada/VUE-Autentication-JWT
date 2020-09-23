import axios from "axios";
export default {
  SET_DOCUMENTO({ commit }, file) {
    let formData = new FormData();
    formData.append("file", file[0]);
    try {
      axios
        .post("https://localhost:44393/api/paciente/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((payload) => {
          if (payload) {
            commit("SET_DOC", payload.data);
            alert("cehgou");
          }
        });
    } catch (error) {
      console.log(error);
    }
  },
  LIST_DOCS({ commit }) {
    try {
      axios
        .get("https://localhost:44393/api/paciente/listBlob")
        .then((payload) => {
          commit("SET_LIST", payload.data);
        });
    } catch (error) {
      console.log(error);
    }
  },

  // eslint-disable-next-line no-unused-vars
  BAIXAR_DOC({ commit }, doc) {
    try {
      axios
        .get(`https://localhost:44393/api/paciente/donwload/${doc}`)
        .then((payload) => {
          if (payload) {
            console.log("baixou?");
          }
        });
    } catch (error) {
      console.log(error);
    }
  },
};
