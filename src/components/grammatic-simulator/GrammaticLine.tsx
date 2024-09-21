import React, { useState, useRef, useEffect } from 'react';
import '../../Styles/GrammaticLineStyles.css'; // Importando o arquivo CSS

interface GrammaticLineProps {
    index: number;
    chars: string[];
    nonterminal: string;
    onCharsChange: (newChars: string[]) => void;
    onNonterminalChange: (newNonterminal: string) => void;
    onAddLine: () => void;
}

const GrammaticLine: React.FC<GrammaticLineProps> = ({ index, chars, nonterminal, onCharsChange, onNonterminalChange, onAddLine }) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, charIndex: number) => {
        const value = event.target.value;
        if (value.includes('|')) {
            const newChars = [...chars];
            newChars[charIndex] = value.replace('|', ''); // Remove o caractere '|' do valor atual
            newChars.splice(charIndex + 1, 0, ''); // Adiciona um novo input após o atual
            onCharsChange(newChars);
            return;
        }
        const newChars = [...chars];
        newChars[charIndex] = value;
        onCharsChange(newChars);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, charIndex: number) => {
        if (event.key === 'Enter') {
            onAddLine();
            inputRefs.current[charIndex + 1]?.focus();
        }
        if (event.key === 'Backspace' && chars[charIndex] === '' && charIndex > 0) {
            const newChars = [...chars];
            newChars.splice(charIndex, 1);
            onCharsChange(newChars);
            inputRefs.current[charIndex - 1]?.focus();
        }
        if(event.key === 'ArrowRight' && event.currentTarget.selectionStart === event.currentTarget.value.length) {
            inputRefs.current[charIndex + 1]?.focus();
        }
        if(event.key === 'ArrowLeft' && event.currentTarget.selectionStart === 0) {
            inputRefs.current[charIndex - 1]?.focus();
        }
    };

    const handleNonterminalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onNonterminalChange(event.target.value);
    };

    useEffect(() => {
        // Foca no último input quando os chars são atualizados
        if (inputRefs.current.length > 0) {
          inputRefs.current[inputRefs.current.length - 1]?.focus();
        }
      }, [chars]);

    return (
        <div className='line'>
            <input
                type="text"
                value={nonterminal}
                onChange={handleNonterminalChange}
                placeholder="Nonterminal"
                className='nonterminal'
            />
            {chars.map((char, charIndex) => (
                <input
                    key={charIndex}
                    type="text"
                    value={char}
                    onChange={(event) => handleChange(event, charIndex)}
                    onKeyDown={(event) => handleKeyDown(event, charIndex)}
                    ref={(el) => (inputRefs.current[charIndex] = el)}
                    className='nonterminal'
                />
            ))}
        </div>
    );
};

export default GrammaticLine;