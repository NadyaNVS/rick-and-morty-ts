import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { getEpisodeNumbers } from "../utils/utils";

interface InfoModalProps {
  character: Record<string, any>;
  setIsOpen(value: boolean): void;
}

interface EpisodeNames {
  name: string;
}

const InfoModal: React.FC<InfoModalProps> = ({ character, setIsOpen }) => {
  const [episodesNames, setEpisodesNames] = useState<EpisodeNames[] | any>([]);
  const onClose = () => setIsOpen(false);
  const episodesNumbers = getEpisodeNumbers(character.episode);

  useEffect(() => {
    const fetchEpisodesData = async () => {
      const episodesData = await Promise.all(
        character.episode.map(async (episodeUrl: string) => {
          const episodeRes = await fetch(episodeUrl);
          const episodeData = episodeRes.json();
          return episodeData;
        })
      );
      const episodeNamesArray = episodesData.map((episode) => {
        return episode.name;
      });

      setEpisodesNames(episodeNamesArray);
    };
    fetchEpisodesData();
  }, [character.episode]);

  const lastAppearance = episodesNames.slice(-1);

  return (
    <div className="modal">
      <div className="modal__wrapper">
        <div className="modal__image-wrapper">
          <img src={character.image} alt={character.name} />
        </div>
        <div className="modal__content-wrapper">
          <div className="modal__content">
            <p className="modal__name">{character.name}</p>
            <span>{character.gender}</span>
            <span className="modal__status">
              <span className={`status-icon ${character.status}`}></span>
              {character.status} - {character.species}
            </span>
          </div>
          <div className="modal__content">
            <span className="modal__section">Last known location:</span>
            <span>{character.location.name}</span>
          </div>
          <div className="modal__content">
            <span className="modal__section">Origin:</span>
            <span>{character.origin.name}</span>
          </div>
          <div className="modal__content">
            <span className="modal__section">Number of episodes:</span>
            <span>{episodesNumbers}</span>
          </div>
          <div className="modal__content">
            <span className="modal__section">Latest episode:</span>
            <span>{lastAppearance}</span>
          </div>
        </div>
        <FiX onClick={onClose} className="modal__close" />
      </div>
    </div>
  );
};

export default InfoModal;
