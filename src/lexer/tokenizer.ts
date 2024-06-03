import { TokenType, Token, KEYWORDS, token } from './token';
import { isAlpha, isSkippable, isInt } from './utils';

type TokenHandler = (src: string[]) => Token | null;

const tokenHandlers: Map<string, TokenHandler> = new Map([
    ['(', (src) => token(src.shift()!, TokenType.OpenParen)],
    [')', (src) => token(src.shift()!, TokenType.CloseParen)],
    ['+', (src) => token(src.shift()!, TokenType.BinaryOperator)],
    ['-', (src) => token(src.shift()!, TokenType.BinaryOperator)],
    ['*', (src) => token(src.shift()!, TokenType.BinaryOperator)],
    ['/', (src) => token(src.shift()!, TokenType.BinaryOperator)],
    ['=', (src) => token(src.shift()!, TokenType.Equals)]
]);

function handleNumber(src: string[]): Token {
    let num = '';
    while (src.length > 0 && isInt(src[0])) {
        num += src.shift();
    }
    return token(num, TokenType.Number);
}

function handleIdentifier(src: string[]): Token {
    let identifier = '';
    while (src.length > 0 && isAlpha(src[0])) {
        identifier += src.shift();
    }

    const reserved = KEYWORDS[identifier];
    if (reserved === undefined) {
        return token(identifier, TokenType.Identifier);
    } else {
        return token(identifier, reserved);
    }
}

export function tokenize(sourceCode: string): Token[] {
    const tokens: Token[] = [];
    const src = sourceCode.split("");

    while (src.length > 0) {
        const char = src[0];

        if (tokenHandlers.has(char)) {
            const handler = tokenHandlers.get(char)!;
            tokens.push(handler(src)!);
        } else if (isInt(char)) {
            tokens.push(handleNumber(src));
        } else if (isAlpha(char)) {
            tokens.push(handleIdentifier(src));
        } else if (isSkippable(char)) {
            src.shift();
        } else {
            console.log('Unrecognized character in source: ', char);
            src.shift();
        }
    }

    return tokens;
}
