import { useEffect, useState, useRef } from "react";
import Characters from "../../components/Characters";
import Filters from "../../components/Filter/Filters";

const urlCharacters = "https://rickandmortyapi.com/api/character/";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: string[];
  location: string[];
  image: string;
  episode: string[];
  url: string;
  created: string;
}

const Home: React.FC = () => {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [nameFilter, setNameFilter] = useState<string>("");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [speciesFilter, setSpeciesFilter] = useState<string>("all");
  const shouldFetch = useRef<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchData = async (url: string) => {
      const res = await fetch(url);
      const data = await res.json();

      setAllCharacters((characters) => {
        return [...characters, ...data.results];
      });

      if (data.info && data.info.next) {
        fetchData(data.info.next);
      }
    };

    if (shouldFetch.current) {
      shouldFetch.current = false;
      fetchData(urlCharacters);
    }
  }, []);

  const genderOptions = [
    ...new Set(allCharacters.map((character) => character.gender)),
  ];

  const speciesOptions = [
    ...new Set(allCharacters.map((character) => character.species)),
  ];

  const charactersData = allCharacters
    .filter((character) => {
      return character.name.toLowerCase().includes(nameFilter.toLowerCase());
    })
    .filter((character) => {
      if (genderFilter === "all") {
        return true;
      } else {
        return character.gender === genderFilter;
      }
    })
    .filter((character) => {
      if (speciesFilter === "all") {
        return true;
      } else {
        return character.species === speciesFilter;
      }
    });

  const handleFilter = (data: any) => {
    if (data.key === "Name") {
      setNameFilter(data.value);
    } else if (data.key === "Gender") {
      setGenderFilter(data.value);
    } else if (data.key === "Species") {
      setSpeciesFilter(data.value);
    }
  };

  const handleChange = (e: any) => {
    console.log(e.target.name);
    handleFilter({
      key: e.target.name,
      value: e.target.value,
    });
  };

  const resetFilter = (e: any) => {
    e.preventDefault();
    setSpeciesFilter("all");
    setGenderFilter("all");
    setNameFilter("");
  };

  const toggleModal = (characterId: number) => () => {
    console.log(`clicking ${characterId}`);
    setIsOpen(!isOpen);
    setSelectedCharacter(characterId);
  };

  return (
    <>
      <h1 className="main-title">The Rick and Morty Characters</h1>
      <Filters
        valueGender="Gender"
        valueSpecies="Species"
        valueName="Name"
        genderOptions={genderOptions}
        speciesOptions={speciesOptions}
        genderFilter={genderFilter}
        speciesFilter={speciesFilter}
        nameFilter={nameFilter}
        handleChange={handleChange}
        resetFilter={resetFilter}
      />

      <Characters
        characters={charactersData}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedCharacter={selectedCharacter}
        toggleModal={toggleModal}
      />
    </>
  );
};

export default Home;
