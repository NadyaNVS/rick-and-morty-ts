import React from "react";
import CharacterCard from "./CharacterCard";

interface CharactersProps {
  characters: Record<string, any>[];
  isOpen: boolean;
  setIsOpen(value: boolean): void;
  selectedCharacter: number | null;
  toggleModal: any;
}

const Characters: React.FC<CharactersProps> = ({
  characters,
  isOpen,
  setIsOpen,
  selectedCharacter,
  toggleModal,
}) => {
  return (
    <section className="characters">
      <div className="characters__wrapper">
        {characters?.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            selectedCharacter={selectedCharacter}
            toggleModal={toggleModal}
          />
        ))}
      </div>
    </section>
  );
};

export default Characters;
