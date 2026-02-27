import axios from "axios";

// Configuración inicial
const instance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon/",
  method: "get",
});

async function getPokemon() {
  const response = await instance.get("2")
  console.log(response.data)
}
