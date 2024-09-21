import React, { useState } from 'react';

interface InputStringProps {
    onSave: (value: string) => void;
}

const InputString: React.FC<InputStringProps> = ({ onSave }) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = () => {
        onSave(inputValue);
    };

    return (
        <div>
            <input 
                type="text" 
                value={inputValue} 
                onChange={handleInputChange} 
            />
            <button onClick={handleButtonClick} style={{borderRadius:5}}>Salvar</button>
        </div>
    );
};

export default InputString;