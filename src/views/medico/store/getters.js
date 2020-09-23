export default {
  ORDERNAR_MEDICOS(state) {
   let listaOrdenada = state.listaMedicos.sort((a, b) => {
        return (a.nome.toUpperCase() < b.nome.toUpperCase()) ? -1 : (a.nome.toUpperCase() > b.nome.toUpperCase()) ? 1 : 0;
    });

   
    return listaOrdenada;
  },
};
