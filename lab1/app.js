class Pokemon {
    constructor(name, url) {
      this.name = name;
      this.url = url;
    }
    getDisplayName() {
      return this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }
  }
  
  const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=150';
  let pokemonList = [];
  
  const searchInput = document.getElementById('search');
  const totalElement = document.getElementById('total');
  const pokemonListElement = document.getElementById('pokemon-list');
  
  const renderList = (list) => {
    pokemonListElement.innerHTML = '';
    list.forEach(pokemon => {
      const listItem = document.createElement('li');
      listItem.classList.add('pokemon-item');

      const image = document.createElement('img');
      image.src = pokemon.imageUrl;
      image.alt = pokemon.name;
      image .width = 50;

      const name = document.createElement('spain');
      name.textContent = pokemon.getDisplayName();

      listItem.appendChild(image);
      listItem.appendChild(name);
      listItem.textContent = pokemon.getDisplayName();
      pokemonListElement.appendChild(listItem);
    });
  };
  
  async function getFirstPokemonDetails() {
    if (pokemonList.length > 0) {
      try {
        const firstPokemon = pokemonList[0];
        const detailResponse = await fetch(firstPokemon.url);
        const detailData = await detailResponse.json();
        console.log(`Ejemplo: Tipo principal de ${firstPokemon.getDisplayName()} = ${detailData?.types?.[0]?.type?.name ?? 'desconocido'}`);
      } catch (err) {
        console.error('Error al obtener detalles del primer Pokémon:', err);
      }
    }
  }
  
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const { results: allPokemon } = data;
      const totalPokemons = data?.count ?? 0;
      totalElement.textContent = `Total de Pokémon: ${totalPokemons}`;
      pokemonList = allPokemon.map(({ name, url }) => new Pokemon(name, url));
      renderList(pokemonList);
      getFirstPokemonDetails();
    })
    .catch(error => {
      console.error('Error al obtener los datos de Pokémon:', error);
    });
  
  searchInput.addEventListener('input', (event) => {
    let searchTerm = event.target.value.toLowerCase();
    const filteredList = pokemonList.filter(pokemon => pokemon.name.includes(searchTerm));
    renderList(filteredList);
  });