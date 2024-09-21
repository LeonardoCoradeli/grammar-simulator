export type Gramatic = {
    nonterminal: string;
    children: string[];
};

export type Rules = Gramatic[];

export default class GrammaticModel {
    rules: Rules;
    initialNonTerminal: string;

    constructor(rules: Rules, initialNonTerminal: string) {
        this.rules = rules;
        this.initialNonTerminal = initialNonTerminal;
    }

    getRules(): Rules {
        return this.rules;
    }

    getInitialNonTerminal(): string {
        return this.initialNonTerminal;
    }

    setRules(rules: Rules): void {
        this.rules = rules;
    }

    setInitialNonTerminal(initialNonTerminal: string): void {
        this.initialNonTerminal = initialNonTerminal;
    }

    setRulesChildren(children: Gramatic): void {
        this.rules.push(children);
    }

    setRulesNonterminal(nonterminal: string): void {
        this.rules.push({ nonterminal: nonterminal, children: [] });
    }

    setRulesGramaticChildren(nonterminal: string, children: string): void {
        const rule = this.rules.find(rule => rule.nonterminal === nonterminal);
        if (rule) {
            rule.children.push(children);
        } else {
            console.error(`Nonterminal ${nonterminal} not found in rules.`);
        }
    }
};