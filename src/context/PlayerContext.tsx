import { createContext, useState, ReactNode, useContext } from 'react';

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
    playList: (list:Episode[], index:number) => void;
    playPrevious: () => void;
    playNext: () => void;
    togglePlay: () => void; // nao recebe nenhum parametro e não tem retorno
    setPlayingState: (state: boolean) => void;
    hasNext: boolean;
    hasPrevious: boolean;
    isLooping: boolean;
    toggleLoop: () => void;
    isShuffling: boolean;
    toggleShuffle: () => void;
    clearPlayerState: () => void;
}

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode;
}

export function PlayerContextProvider({ children }:PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

    function play(episode: Episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function playList(list: Episode[], index: number){
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    function toggleShuffle() {
        setIsShuffling(!isShuffling);
    }

    function toggleLoop() {
        setIsLooping(!isLooping);
    }

    function togglePlay() {
        setIsPlaying(!isPlaying); // seta o valor contrario do estato de isPlaying
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state);
    }

    function clearPlayerState() {
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || (currentEpisodeIndex+1) < episodeList.length;

    function playNext() {
        if(isShuffling){
            const nextRamdomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
            setCurrentEpisodeIndex(nextRamdomEpisodeIndex);
        }else if(hasNext){
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }

    }

    function playPrevious() {
        if(hasPrevious){
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        }
        
    }

    return (
        <PlayerContext.Provider 
            value={{ 
                episodeList: episodeList, 
                currentEpisodeIndex: currentEpisodeIndex, 
                play,
                playList,
                playPrevious, 
                playNext,
                togglePlay, 
                setPlayingState, 
                isPlaying: isPlaying,
                hasNext,
                hasPrevious,
                isLooping,
                isShuffling,
                toggleShuffle,
                toggleLoop,
                clearPlayerState
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
}


// export para eu nao precisar ficar importando 2 coisas sempre,
// aqui eu import useContext e PlayerContext, onde eu chamar vai
// importar somente o usePlayer. #REPASSE
export const usePlayer = () => {
    return useContext(PlayerContext);
}