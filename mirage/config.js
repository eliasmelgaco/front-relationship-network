import { Response } from 'miragejs';

export default function() {
  this.get('/words', ({ words }, { queryParams }) => {
    const foundWord = words.findBy({ nome: queryParams.nome });
    if (foundWord) {
      return foundWord;
    }

    return new Response(404, { 'Content-Type': 'application/json' }, { errors: [ 'Palavra não encontrada' ] });
  });
}
