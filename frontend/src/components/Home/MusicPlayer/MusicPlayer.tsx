import React, { useState } from 'react';
import Howler from 'react-howler';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1.0); // от 0.0 до 1.0
    const [genre, setGenre] = useState('rock'); // начальный жанр

    const songs = {
        rock: 'url-to-rock-song.mp3',
        jazz: 'url-to-jazz-song.mp3',
        classical: 'url-to-classical-song.mp3',
        // добавьте больше жанров и URL-адресов песен по мере необходимости
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (e:any) => {
        setVolume(parseFloat(e.target.value));
    };

    const handleGenreChange = (e:any) => {
        setGenre(e.target.value);
    };

    return (
        <div>
            <Howler
                src={songs[genre as keyof typeof songs]}
                playing={isPlaying}
                volume={volume}
            />
            <button onClick={handlePlayPause}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            <label>
                Volume:
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                />
            </label>
            <label>
                Genre:
                <select value={genre} onChange={handleGenreChange}>
                    <option value="rock">Rock</option>
                    <option value="jazz">Jazz</option>
                    <option value="classical">Classical</option>
                    {/* Добавьте больше опций жанра по мере необходимости */}
                </select>
            </label>
        </div>
    );
};

export default MusicPlayer;
