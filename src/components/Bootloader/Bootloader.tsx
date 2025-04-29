import React, { useEffect, useState } from 'react';

interface BootloaderProps {
  onBootComplete: () => void;
}

const Bootloader: React.FC<BootloaderProps> = ({ onBootComplete }) => {
  console.log('Bootloader component rendering...');
  
  const [displayLines, setDisplayLines] = useState<string[]>(['']);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showAccessGranted, setShowAccessGranted] = useState(false);
  const [cleared, setCleared] = useState(false);

  const randomIP = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

  const bootSequence = [
    `ssh ssh@${randomIP} -u ryzen`,
    'Password: ********',
    '',
    'Welcome to Ubuntu 22.04.2 LTS (GNU/Linux 5.15.0-78-generic x86_64)',
    '',
    ' * Documentation:  https://help.ubuntu.com',
    ' * Management:     https://landscape.canonical.com',
    ' * Support:        https://ubuntu.com/advantage',
    '',
    'System information as of Mon Apr 28 17:50:05 UTC 2025',
    '',
    'System load:  0.03    Processes: 111    Memory usage: 24%',
    '',
    'ryzen@ubuntu:~$ bash ./.stealth_init',
    '[+] Initializing modules...',
    '[+] Preparing to unpack...',
    '[+] Unpacking payload...',
    '[+] Setting up environment...',
    '[+] Bypassing security protocols...',
    '[+] Injecting stealth backdoor...',
    '[+] Access logs purged successfully...',
    '[+] Initialization complete.',
    'ryzen@ubuntu:~$'
  ];

  useEffect(() => {
    console.log('Bootloader useEffect running...');
    
    if (currentLineIndex < bootSequence.length) {
      const currentLine = bootSequence[currentLineIndex];

      if (currentLineIndex <= 1) {
        // First two lines: character by character
        if (currentCharIndex < currentLine.length) {
          const timeout = setTimeout(() => {
            setDisplayLines(prev => {
              const newLines = [...prev];
              newLines[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1);
              return newLines;
            });
            setCurrentCharIndex(prev => prev + 1);
          }, 50);
          return () => clearTimeout(timeout);
        } else {
          setCurrentCharIndex(0);
          setCurrentLineIndex(prev => prev + 1);
        }
      } else {
        // Remaining lines: line by line
        const timeout = setTimeout(() => {
          setDisplayLines(prev => [...prev, currentLine]);
          setCurrentLineIndex(prev => prev + 1);
        }, 200);
        return () => clearTimeout(timeout);
      }
    } else if (!showAccessGranted) {
      // Show "Access Granted" message
      const timeout = setTimeout(() => {
        setShowAccessGranted(true);
      }, 1000);
      return () => clearTimeout(timeout);
    } else if (!cleared) {
      // Clear the screen
      const timeout = setTimeout(() => {
        setCleared(true);
        console.log('Bootloader complete, calling onBootComplete...');
        onBootComplete();
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex, showAccessGranted, cleared, onBootComplete]);

  if (cleared) {
    console.log('Bootloader cleared, returning null');
    return null;
  }

  return (
    <div className="mac-terminal">
      <div className="mac-terminal-header">
        <div className="mac-terminal-dot red"></div>
        <div className="mac-terminal-dot yellow"></div>
        <div className="mac-terminal-dot green"></div>
      </div>
      <div className="mac-terminal-body">
        {displayLines.map((line, index) => (
          <div key={index} className="terminal-output-text">
            {line}
          </div>
        ))}
        {showAccessGranted && (
          <div className="terminal-output-text access-granted">
            [✓] Access Granted
          </div>
        )}
      </div>
    </div>
  );
};

export default Bootloader;
