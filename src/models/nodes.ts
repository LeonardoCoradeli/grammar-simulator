export type Production = {
    terminal: string;
    nonTerminal?: string;
  };
  
export type Grammar = {
    [nonTerminal: string]: Production[];
  };

export function isStringAccepted(grammar: Grammar, startSymbol: string, input: string): boolean {
    let currentStates = [startSymbol];
  
    for (const char of input) {
      const nextStates: string[] = [];
  
      for (const state of currentStates) {
        const productions = grammar[state] || [];
        for (const production of productions) {
          if (production.terminal === char) {
            if (production.nonTerminal) {
              nextStates.push(production.nonTerminal);
            } else if (input.indexOf(char) === input.length - 1) {
              return true;
            }
          }
        }
      }
  
      if (nextStates.length === 0) {
        return false;
      }
  
      currentStates = nextStates;
    }
  
    return currentStates.includes('');
  };  