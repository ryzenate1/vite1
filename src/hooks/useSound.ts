import { useRef, useEffect } from 'react';
import { Howl } from 'howler';
import { logger } from '../utils/logger';

// Define sound types we might use
type SoundType = 'uiClick' | 'gameTap' | 'gameMiss' | 'typing' | 'ambient';

// Map sound types to actual file paths (PLACEHOLDERS)
const soundFiles: Record<SoundType, string> = {
  uiClick: '/sounds/ui_click.wav', 
  gameTap: '/sounds/game_tap.wav',
  gameMiss: '/sounds/game_miss.wav', 
  typing: '/sounds/typing_key.wav', // May need multiple variations
  ambient: '/sounds/ambient_hum.mp3' // Likely a longer loop
};

interface SoundHookOptions {
  volume?: number;
  loop?: boolean;
}

// Store loaded sounds to avoid re-initialization
const loadedSounds: Partial<Record<SoundType, Howl>> = {};

export const useSound = (sound: SoundType, options: SoundHookOptions = {}) => {
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    try {
      if (loadedSounds[sound]) {
        // Use already loaded sound
        soundRef.current = loadedSounds[sound] as Howl;
        // Update options if necessary (e.g., volume)
        if (options.volume !== undefined) soundRef.current.volume(options.volume);
        if (options.loop !== undefined) soundRef.current.loop(options.loop);
      } else {
        // Load new sound
        const newSound = new Howl({
          src: [soundFiles[sound]],
          volume: options.volume ?? 0.7, // Default volume
          loop: options.loop ?? false,
          html5: true, // Often better for longer ambient sounds
          preload: true, // Preload the sound
        });

        // Add error handling for sound loading
        newSound.on('loaderror', (_id, error) => {
          console.error('Error loading sound:', error);
        });

        soundRef.current = newSound;
        loadedSounds[sound] = newSound;
      }
    } catch (error) {
      logger.error('Error initializing sound', error as Error, 'useSound');
    }

    return () => {
      // Cleanup if needed
      if (soundRef.current) {
        soundRef.current.stop();
      }
    };
  }, [sound, options.volume, options.loop]); // Re-run if sound type or options change

  const playSound = () => {
    try {
      if (soundRef.current) {
        soundRef.current.play();
      }
    } catch (error) {
      logger.error('Error playing sound', error as Error, 'useSound');
    }
  };

  const stopSound = () => {
    try {
      if (soundRef.current) {
        soundRef.current.stop();
      }
    } catch (error) {
      logger.error('Error stopping sound', error as Error, 'useSound');
    }
  };

  return {
    playSound,
    stopSound
  };
};
