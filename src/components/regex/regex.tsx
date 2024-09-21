import React, { useState } from 'react';
import '../../Styles/RegexStyles.css';

interface InputState {
    value: string;
  }
  
  const Regex: React.FC = () => {
    const [regex, setRegex] = useState<string>('');
    const [input1, setInput1] = useState<InputState>({ value: '' });
    const [input2, setInput2] = useState<InputState>({ value: '' });
  
    const getBackgroundColor = (input: string): string => {
      if (!regex) {
        return '';
      }
      return validateText(input) ? 'correto' : 'errado';
    };
  
    const validateText = (string: string): boolean => {
      try {
        const pattern = new RegExp(regex);
        return pattern.test(string);
      } catch {
        return false;
      }
    };
  
    const handleRegexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRegex(event.target.value);
    };
  
    const handleInput1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInput1({ value: event.target.value });
    };
  
    const handleInput2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInput2({ value: event.target.value });
    };
  
    return (
      <>
        <div className='regex App'>
          <p className='titulo'>Regex</p>
          <input
            type='text'
            value={regex}
            onChange={handleRegexChange}
            placeholder='Digite seu regex'
          />
        </div>
        <div>
          <p className='titulo'>Teste 1</p>
          <input
            className={getBackgroundColor(input1.value)}
            type='text'
            value={input1.value}
            onChange={handleInput1Change}
            placeholder='Teste seu regex'
          />
        </div>
        <div>
          <p className='titulo'>Teste 2</p>
          <input
            className={getBackgroundColor(input2.value)}
            type='text'
            value={input2.value}
            onChange={handleInput2Change}
            placeholder='Teste seu regex'
          />
        </div>
      </>
    );
  };
  
  export default Regex;