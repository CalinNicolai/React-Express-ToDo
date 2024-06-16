import React, {useState} from 'react';
import Howler from 'react-howler';
import {Howler as HowlerJS} from 'howler';
import './style.css';
// @ts-ignore
import song from './song.mp3';
// @ts-ignore
import song2 from './song2.mp3';
// @ts-ignore
import play from './play.png';
// @ts-ignore
import pause from './pause.png';

const MusicPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(song);
    const [volume, setVolume] = useState(1.0);

    const songs = [song, song2]; // Массив с песнями

    const handlePlayPause = async () => {
        if (!isPlaying) {
            try {
                await HowlerJS.ctx.resume();
            } catch (e) {
                console.error('Error resuming audio context:', e);
            }
        }
        setIsPlaying(!isPlaying);
    };

    const handleNextSong = () => {
        const currentIndex = songs.indexOf(currentSong);
        const nextIndex = (currentIndex + 1) % songs.length;
        setCurrentSong(songs[nextIndex]);
        if (isPlaying) {
            setIsPlaying(false); // Остановить воспроизведение текущей песни
            setTimeout(() => {
                setIsPlaying(true); // Запустить воспроизведение следующей песни
            }, 100);
        }
    };

    const handlePrevSong = () => {
        const currentIndex = songs.indexOf(currentSong);
        const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
        setCurrentSong(songs[prevIndex]);
        if (isPlaying) {
            setIsPlaying(false); // Остановить воспроизведение текущей песни
            setTimeout(() => {
                setIsPlaying(true); // Запустить воспроизведение предыдущей песни
            }, 100);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(parseFloat(e.target.value));
    };

    return (
        <div className="d-flex align-items-center">
            <Howler
                src={currentSong}
                playing={isPlaying}
                volume={volume}
            />
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="custom-range ml-2"
                style={{width: '100px'}}
            />
            <button onClick={handlePrevSong} className="ml-2 button">&lt;</button>
            <button onClick={handlePlayPause} className="ml-2 button">
                {isPlaying ? <img src={pause} alt="Pause" className="playpause-icon"/> :
                    <img src={play} alt="Play" className="playpause-icon"/>}
            </button>
            <button onClick={handleNextSong} className="ml-2 button">&gt;</button>
        </div>
    );
};

export default MusicPlayer;
