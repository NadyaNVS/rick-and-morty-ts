import React from "react";
import InfoModal from "./InfoModal";

interface CharacterCardProps {
  character: Record<string, any>;
  isOpen: boolean;
  setIsOpen(value: boolean): void;
  selectedCharacter: number | null;
  toggleModal: any;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  isOpen,
  setIsOpen,
  selectedCharacter,
  toggleModal,
}) => {
  return (
    <>
      <div className="card__wrapper" onClick={toggleModal(character.id)}>
        <div className="card__image-wrapper">
          <img src={character.image} alt={character.name} />
        </div>
        <div className="card__content-wrapper">
          <div className="card__content">
            <p className="card__name">{character.name}</p>
            <span>{character.gender}</span>
            <span className="card__status">
              <span className={`status-icon ${character.status}`}></span>
              {character.status} - {character.species}
            </span>
          </div>
          <div className="card__content">
            <span className="card__section">Last known location:</span>
            <span>{character.location.name}</span>
          </div>
          <div className="card__content">
            <span className="card__section">Origin:</span>
            <span>{character.origin.name}</span>
          </div>
        </div>
      </div>
      {isOpen && character.id === selectedCharacter && (
        <InfoModal character={character} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

export default CharacterCard;
