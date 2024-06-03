import { tokenize } from './lexer';

const source = process.argv.slice(2).join(" ");

for (const token of tokenize(source)) {
    console.log(token);
}
