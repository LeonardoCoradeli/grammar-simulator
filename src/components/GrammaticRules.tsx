import React, { useState } from 'react';
import GrammaticLine from './GrammaticLine';

const GrammaticRules: React.FC = () => {
    const [lines, setLines] = useState<number[]>([0]);

    const addLine = () => {
        setLines([...lines, lines.length]);
    };

    return (
        <div>
            {lines.map((line, index) => (
                <GrammaticLine key={index} />
            ))}
            <button onClick={addLine}>Adicionar linha</button>
        </div>
    );
};

export default GrammaticRules;