import { Grammar,Production } from "./nodes";

export type DerivationNode = {
    terminal: string;
    nonTerminal?: string;
    children: DerivationNode[];
  };
  
export function buildDerivationTree(grammar: Grammar, startSymbol: string, input: string): DerivationNode | null {
    const root: DerivationNode = { terminal: '', nonTerminal: startSymbol, children: [] };
    let currentNodes = [root];
  
    for (const char of input) {
      const nextNodes: DerivationNode[] = [];
  
      for (const node of currentNodes) {
        const productions = grammar[node.nonTerminal || ''] || [];
        for (const production of productions) {
          if (production.terminal === char) {
            const newNode: DerivationNode = {
              terminal: production.terminal,
              nonTerminal: production.nonTerminal,
              children: [],
            };
            node.children.push(newNode);
            if (production.nonTerminal) {
              nextNodes.push(newNode);
            }
          }
        }
      }
  
      if (nextNodes.length === 0 && input.indexOf(char) !== input.length - 1) {
        return null;
      }
  
      currentNodes = nextNodes;
    }
  
    return root;
};