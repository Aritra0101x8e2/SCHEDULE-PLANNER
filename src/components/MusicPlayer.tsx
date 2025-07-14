
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Play, Pause, SkipForward, Shuffle, Repeat, Upload, Trash2, Volume2 } from 'lucide-react';

interface MusicFile {
  id: string;
  name: string;
  url: string;
}

interface MusicPlayerProps {
  musicFiles: MusicFile[];
  onUploadMusic: (files: FileList) => void;
  onRemoveMusic: (id: string) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  musicFiles,
  onUploadMusic,
  onRemoveMusic
}) => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlayPause = () => {
    if (musicFiles.length === 0) return;
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    if (musicFiles.length === 0) return;
    
    let nextTrack;
    if (isShuffle) {
      nextTrack = Math.floor(Math.random() * musicFiles.length);
    } else {
      nextTrack = (currentTrack + 1) % musicFiles.length;
    }
    setCurrentTrack(nextTrack);
  };

  const handleTrackEnd = () => {
    if (isLoop) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      handleNext();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUploadMusic(e.target.files);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-soft rounded-2xl p-6 shadow-soft border border-primary/10">
      <h3 className="text-xl font-cursive font-bold text-primary mb-4">
        Background Music
      </h3>

      {/* File Upload */}
      <div className="mb-4">
        <Label htmlFor="music-upload" className="text-sm font-medium text-gray-700">
          Upload Music Files (Max 5)
        </Label>
        <div className="flex gap-2 mt-1">
          <Input
            ref={fileInputRef}
            id="music-upload"
            type="file"
            accept="audio/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="flex-1"
            disabled={musicFiles.length >= 5}
          >
            <Upload size={16} className="mr-2" />
            Upload Music
          </Button>
        </div>
      </div>

      {/* Music List */}
      {musicFiles.length > 0 && (
        <div className="mb-4 space-y-2 max-h-32 overflow-y-auto">
          {musicFiles.map((file, index) => (
            <div
              key={file.id}
              className={`flex items-center justify-between p-2 rounded-lg ${
                index === currentTrack ? 'bg-primary/10' : 'bg-gray-50'
              }`}
            >
              <span className="text-sm text-gray-700 truncate flex-1">
                {file.name}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveMusic(file.id)}
                className="p-1 h-auto text-gray-400 hover:text-red-500"
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Audio Element */}
      {musicFiles.length > 0 && (
        <audio
          ref={audioRef}
          src={musicFiles[currentTrack]?.url}
          onEnded={handleTrackEnd}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}

      {/* Player Controls */}
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsShuffle(!isShuffle)}
            className={isShuffle ? 'bg-primary text-white' : ''}
          >
            <Shuffle size={16} />
          </Button>
          
          <Button
            onClick={handlePlayPause}
            disabled={musicFiles.length === 0}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={musicFiles.length === 0}
          >
            <SkipForward size={16} />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLoop(!isLoop)}
            className={isLoop ? 'bg-primary text-white' : ''}
          >
            <Repeat size={16} />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <Volume2 size={16} className="text-gray-600" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="flex-1 accent-primary"
          />
        </div>
      </div>

      {/* Current Track Display */}
      {musicFiles.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Now Playing: <span className="font-medium">{musicFiles[currentTrack]?.name}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
