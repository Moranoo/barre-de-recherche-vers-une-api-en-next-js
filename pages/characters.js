import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import Link from 'next/link';

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
        setCharacters(response.data.results);
        setTotalPages(response.data.info.pages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData().then(r => console.log('done'));
  }, [currentPage]);

  const handleSelectCharacter = id => {
    setSelectedCharacter(id);
  };
  const handlePageChange = page => {
    setCurrentPage(page);
  };
  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };
  const filteredCharacters = characters.filter(character => {
    return character.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
        {number}
      </Pagination.Item>
    );
  }
  return (
    <div className="row" >
      {selectedCharacter !== null && (
        <div className="character-details">         
          {characters.map((character, index) => {
            if (character.id === selectedCharacter) {
              return (                
                <div className="col-sm-3">
                     <h2 className="col-sm-6">Détails du personnage</h2>
           <div className="card">
              <div className="card-body">
                   <img src={character.image} alt={character.name} />
                   <h5 className="card-title">{character.name}</h5>
                  <h6> Genre {character.species}</h6>
                  <h6 className="card-title"> Origine {character.origin.name}</h6>
                    <h6 className="card-title"> Statut {character.status}</h6>
                    <h6> Apparue dans {character.episode.length} epiosode(s)</h6>
                    <h6> Lieu de résidence {character.location.name}</h6>
               </div>
            </div>
        </div>
              );
            }
          })}
        </div>
      )}
      <h1 className="col-sm-6">Personnages de Rick et Morty</h1>
      <div className="character-list">
      <nav className="navbar navbar-light bg-light">
        <form className="form-inline" >
        <input className="form-control mr-sm-2" type="text" placeholder="Rechercher un personnage" onChange={handleSearch} />
        <Link className="btn btn-outline-success my-2 my-sm-0" href="/">Menu principal</Link>
        </form>
        </nav>
        <ul>
          {filteredCharacters.map((character, index) => {
           if (index % 4 === 0) {
    return (
      <div key={index} className="row">
        {filteredCharacters
          .slice(index, index + 4)
          .map((character, subIndex) => (
            <div className="col-sm-3" key={subIndex} onClick={() => handleSelectCharacter(character.id)}>
              <div className="card">
                <div className="card-body">
                  <img src={character.image} alt={character.name} />
                  <h5 className="card-title">{character.name}</h5>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
  return null;
})}
        </ul>
      </div>
    <Pagination>{paginationItems}</Pagination>
    </div>
    );
  };
export default Home;
