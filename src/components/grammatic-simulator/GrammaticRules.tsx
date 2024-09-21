import React, { useEffect } from 'react';
import GrammaticLine from './GrammaticLine';
import { Rules } from '../../models/gramticModels';
import 'bootstrap/dist/css/bootstrap.min.css';

interface GrammaticRulesProps {
    rules: Rules;
    setRules: (rules: Rules) => void;
    onSetError: (error: string | null) => void;
}

const GrammaticRules: React.FC<GrammaticRulesProps> = ({ rules, setRules, onSetError }) => {
    useEffect(() => {
        setRules(rules);
    }, [rules, setRules]);

    const handleCharsChange = (index: number, newChars: string[]) => {
        const newRules = [...rules];
        newRules[index].children = newChars;
        setRules(newRules);
    };

    const handleNonterminalChange = (index: number, newNonterminal: string) => {
        const newRules = [...rules];
        newRules[index].nonterminal = newNonterminal;
        setRules(newRules);
    };

    const addLine = () => {
        const newRules = [...rules, { nonterminal: '', children: [''] }];
        setRules(newRules);
    };

    return (
        <div style={{textAlign:"center"}}>
            <div className='row'>
                <div className='col-3'></div>
                <div className='col-6'>
                    <p>Escreva regras na forma aaaA e use | para criar uma nova regra associada ao mesmo não terminal</p>
                    {rules.map((line, index) => (
                    <GrammaticLine
                        key={index}
                        index={index}
                        chars={line.children}
                        nonterminal={line.nonterminal}
                        onCharsChange={(newChars) => handleCharsChange(index, newChars)}
                        onNonterminalChange={(newNonterminal) => handleNonterminalChange(index, newNonterminal)}
                        onAddLine={addLine}
                    />
                ))}
            <button onClick={addLine} style={{borderRadius:5}}>Adicionar</button>
            </div>
            <div className='col-3'></div>
            </div>
            
        </div>
    );
};

export default GrammaticRules;