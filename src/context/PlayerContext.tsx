import { createContext, useState, ReactNode } from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

interface PlayerContextData {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode:Episode) => void; // recebe um parametro com a interface setada de Episode
    togglePlay: () => void; // nao recebe nenhum parametro e não tem retorno
    setPlayingState: (state: boolean) => void;
}

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode;
}

export function PlayerContextProvider({ children }:PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    function play(episode: Episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function togglePlay() {
        setIsPlaying(!isPlaying); // seta o valor contrario do estato de isPlaying
    }
    function setPlayingState(state: boolean) {
        setIsPlaying(state);
    }

    return (
        <PlayerContext.Provider 
            value={{ 
                episodeList: episodeList, 
                currentEpisodeIndex: currentEpisodeIndex, 
                play, 
                togglePlay, 
                setPlayingState, 
                isPlaying: isPlaying
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
}