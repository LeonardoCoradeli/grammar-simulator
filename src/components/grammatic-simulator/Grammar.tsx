import React, { useState, useEffect } from "react";
import InputString from "./InputString";
import GrammaticRules from "./GrammaticRules";
import GrammaticModel, { Rules, Gramatic } from '../../models/gramticModels';

type DerivationTree = {
    nonterminal: string;
    children: string[];
};

const firstGrammatic = (rules: Rules, string: string): boolean => {
    //verifica se a gramatica é a do S e se há alguma regra que seja compativel com a string
        let correctRule:Gramatic|undefined = rules.find((rule) => rule.nonterminal === 'S');
        let correctChildren:string[]|undefined = correctRule?.children.filter((child) => child[0] === string[0]);
        if ((!correctChildren) || correctChildren?.length == 0)
            return false;

        let terminalStrings = inGrammatic(rules, correctChildren as string[]);




        let correto = terminalStrings.includes(string);
        console.log('Correto:', correto);
        return correto;
};

const inGrammatic = (rules: Rules, children: string[]): string[] => {
    let terminalStrings: string[] = [];

    const findRule = (nonterminal: string): string[] => {
        const rule = rules.find(r => r.nonterminal === nonterminal);
        return rule ? rule.children : [];
    };

    const expand = (str: string): string[] => {
        if (!str.match(/[A-Z]/)) {
            // Se a string só tem letras minúsculas, ela é terminal
            return [str];
        }

        let array:string[] = [];
        for(let i=0;i<str.length;i++){
            array.push(str[i]);
        }
        if (array[1].match(/[A-Z]/)) {
            const newStrings = findRule(array[1]).flatMap(child =>
                expand(array[0] + child + array.slice(2).join(''))
            );
            return newStrings;
        }
        return [str]; // Caso a segunda letra não seja maiúscula, retorna a string original
    };

    children.forEach(child => {
        terminalStrings.push(...expand(child));
    });

    console.log('Strings terminais:', terminalStrings);
    return terminalStrings;
};



const Grammar = () => {
    const [rules, setRules] = useState<Rules>([{ nonterminal: 'S', children: [''] }]);
    const [savedString, setSavedString] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [grammaticModel] = useState<GrammaticModel>(new GrammaticModel(rules, 'S'));

    const handleSave = (value: string) => {
        setSavedString(value);
        setIsValid(firstGrammatic(rules, value));
    };

    const handleRulesChange = (newRules: Rules) => {
        setRules(newRules);
    };

    const handleSetError = (error: string | null) => {
        setError(error);
    };

    useEffect(() => {
        console.log('Regras atualizadas:', rules);
    }, [rules]);

    return (
        <div style={{textAlign:"center",alignContent:"center",justifyContent:"center"}}>
            <h1>Insira uma gramatica</h1>
            <GrammaticRules rules={rules} setRules={setRules} onSetError={handleSetError} />
            <h1>Insira a string para ser verificada</h1>
            <InputString onSave={handleSave} />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {isValid !== null && (
                <div>
                    {isValid ? (
                        <div style={{ color: 'green' }}>A string pertence à gramática.</div>
                    ) : (
                        <div style={{ color: 'red' }}>A string não pertence à gramática.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Grammar;