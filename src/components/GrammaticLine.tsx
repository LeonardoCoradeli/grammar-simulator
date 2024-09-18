import React, { useState, useRef } from 'react';
import '../Styles/GrammaticLineStyles.css'; // Importando o arquivo CSS

const GrammaticLine: React.FC = () => {
    const [chars, setChars] = useState<string[]>(['']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newChars = [...chars];
        newChars[index] = event.target.value;
        setChars(newChars);

        if (event.target.value.length === 1) {
            if (index === chars.length - 1) {
                setChars([...newChars, '']);
            }
            if (inputRefs.current[index + 1]) {
                inputRefs.current[index + 1]?.focus();
            }
        }
        if(newChars.length > 1 && newChars[newChars.length - 1] === '') {
            if (chars[index] === '') {
                if (index > 0) {
                    inputRefs.current[index - 1]?.focus();
                }
                const newChars = chars.slice(0, -1);
                setChars(newChars);
            } else {
                if (index > 0) {
                    const newChars = [...chars];
                    newChars.splice(index, 1);
                    setChars(newChars);
                }
            }
        }
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowRight' && index < chars.length - 1 && event.currentTarget.selectionStart === event.currentTarget.value.length) {
            inputRefs.current[index + 1]?.focus();
        } else if (event.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className='line'>
            <div className='non-terminal'>
                <input type='text' className='input' />
            </div>
            <div className='divider'>
                &rarr;
            </div>
            <div className='final'>{"{"}</div>
            {chars.map((char, index) => (
                <div className='after-arrow' key={index}>
                    <input
                        type='text'
                        value={char}
                        onChange={(event) => handleChange(index, event)}
                        onKeyDown={(event) => handleKeyDown(index, event)}
                        maxLength={1}
                        ref={(el) => (inputRefs.current[index] = el)}
                    />
                </div>
            ))}
            <div className='final'>{"}"}</div>
        </div>
    );
};

export default GrammaticLine;