export default function(server) {
  server.create('word', {
    id: 'cachorro',
    nome: 'cachorro',
    link: 'https://dicionariocriativo.com.br/cachorro',
    dicionario_significados: [
      '1. Cão novo e pequeno.',
      '1. Por ext. Qualquer cão.',
      '2. Cria de lobo, leão, onça, hiena etc.'
    ],
    dicionario_sinonimos: [
      { 'nome': 'cão', 'link': 'https://dicionariocriativo.com.br/cão' },
      { 'nome': 'perro', 'link': 'https://dicionariocriativo.com.br/perro' }
    ],
    palavras_relacionadas: [
      { 'nome': 'cão', 'link': 'https://dicionariocriativo.com.br/analogico/cão' },
      { 'nome': 'veado', 'link': 'https://dicionariocriativo.com.br/analogico/veado' },
      { 'nome': 'suíno', 'link': 'https://dicionariocriativo.com.br/analogico/suíno' },
      { 'nome': 'porco', 'link': 'https://dicionariocriativo.com.br/analogico/porco' },
      { 'nome': 'carneiro', 'link': 'https://dicionariocriativo.com.br/analogico/carneiro' },
      { 'nome': 'bode', 'link': 'https://dicionariocriativo.com.br/analogico/bode' }
    ],
    dicionario_expressoes: [
      'Cachorro espritado\nCão raivoso.'
    ],
    dicionario_citacoes: [
      'O uísque é o melhor amigo do homem. É o cachorro engarrafado.\nVinícius de Moraes',
      'O corpo é um parasita da alma.\nJean Cocteau'
    ]
  });
  server.create('word', {
    id: 'cão',
    nome: 'cão',
    link: 'https://dicionariocriativo.com.br/cão',
    dicionario_significados: [
      '1. Zool. Mamífero carnívoro criado no mundo todo como animal doméstico.',
      '1. Fig. Pessoa muito má.',
      '2. Bras. O diabo.'
    ],
    dicionario_sinonimos: [
      { 'nome': 'cachorro', 'link': 'https://dicionariocriativo.com.br/cachorro' },
      { 'nome': 'perro', 'link': 'https://dicionariocriativo.com.br/perro' }
    ],
    palavras_relacionadas: [
      { 'nome': 'cão', 'link': 'https://dicionariocriativo.com.br/analogico/cão' },
      { 'nome': 'veado', 'link': 'https://dicionariocriativo.com.br/analogico/veado' },
      { 'nome': 'suíno', 'link': 'https://dicionariocriativo.com.br/analogico/suíno' },
      { 'nome': 'porco', 'link': 'https://dicionariocriativo.com.br/analogico/porco' },
      { 'nome': 'carneiro', 'link': 'https://dicionariocriativo.com.br/analogico/carneiro' },
      { 'nome': 'bode', 'link': 'https://dicionariocriativo.com.br/analogico/bode' }
    ],
    dicionario_expressoes: [
      'Cachorro espritado\nCão raivoso.'
    ],
    dicionario_citacoes: [
      'O uísque é o melhor amigo do homem. É o cachorro engarrafado.\nVinícius de Moraes',
      'O corpo é um parasita da alma.\nJean Cocteau'
    ]
  })
}
