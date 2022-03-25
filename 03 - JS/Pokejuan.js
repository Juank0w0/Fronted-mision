const pokeCard = document.querySelector('[datos-pokedex]');
const pokeName = document.querySelector('[pokename]');
const pokeImg = document.querySelector('[imagenpokemon]');
const pokeImgContainer = document.querySelector('[pokeimg]');
const pokeId = document.querySelector('[pokeid]');
const pokeTypes = document.querySelector('[poketipo]');
const pokeStats = document.querySelector('[estadistica]');


const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const buscarpokemon = () =>{
    event.preventDefault();
    const PokeName = document.getElementById("PokeName");
    let pokeinput = PokeName.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeinput}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./image/pikallorando.gif");
        }
        else {
            return res.json();
        }
    }).then((data) =>{
        console.log(data);
        //let pokeimg = data.sprites.front_default;
        const sprite = data.sprites.front_default;
        const {stats, types} = data;

        pokeName.textContent = data.name;
        pokeImg.setAttribute('src', sprite);
        pokeId.textContent = `Nº ${data.id}`;
        setCardColor(types);
        tiposdepokemones(types);
        estatspokemones(stats);
    })
}
const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';

}
const tiposdepokemones = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    })
}
const pokeImage = (url) => {
    const pokeImg = document.getElementById("pokeImage");
    pokeImg.src = url;
    pokeName.textContent = 'No encontrado';
    pokeImg.style.background =  '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}
const estatspokemones = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

