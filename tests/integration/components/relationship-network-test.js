import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | relationship-network', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it should fillin the values of the panel', async function(assert) {
    assert.expect(14);

    this.server.get('/words', () => {
      return {
        'palavra': 'xícara',
        'chart': [
          {
            'data': {
              'id': 'xícara',
              'weight': 1
            }
          },
          {
            'data': {
              'id': 'chávena',
              'weight': 2
            }
          },
          {
            'data': {
              'id': 'xícarachávena',
              'source': 'xícara',
              'target': 'chávena'
            }
          }
        ],
        'significados': [
          'A bebida feita com esse fruto.',
          'Estabelecimento comercial onde se servem café e outras bebidas.'
        ],
        'relacionados': [
          'alameda',
          'povoado',
        ],
        'expressoes': [
          'Sob o mesmo teto',
          'Entre quatro paredes'
        ],
        'citacoes': [
          {
            'texto': 'Preferia ser o primeiro nesta aldeia do que o segundo em Roma.',
            'autor': 'Plutarco'
          },
          {
            'texto': 'As casas são construídas para que se viva nelas, não para serem olhadas.',
            'autor': 'Francis Bacon'
          }
        ]
      };
    });

    await render(hbs`
      <RelationshipNetwork />
    `);

    await fillIn('[data-test-panel="input"]', 'xícara');
    await click('[data-test-panel="buscar"]');

    assert.dom('[data-test-panel="input"]').exists();
    assert.dom('[data-test-panel="buscar"]').exists();
    assert.dom('[data-test-panel="message"]').doesNotExist('');
    assert.dom('[data-test-panel="significado"]').exists();
    assert.dom('[data-test-panel="significado-item"]').exists('Construção que serve para morar; habitação, moradia, residência.');
    assert.dom('[data-test-panel="relacionadas"]').exists();
    assert.dom('[data-test-panel-relacionados-index="0"]').hasText('alameda');
    assert.dom('[data-test-panel-relacionados-index="1"]').hasText('povoado');
    assert.dom('[data-test-panel="expressao"]').exists();
    assert.dom('[data-test-panel-expressao-index="0"]').hasText('Sob o mesmo teto');
    assert.dom('[data-test-panel-expressao-index="1"]').hasText('Entre quatro paredes');
    assert.dom('[data-test-panel="citacoes"]').exists();
    assert.dom('[data-test-panel-citacao-index="0"] [data-test-panel="citacao-texto"]').hasText('Preferia ser o primeiro nesta aldeia do que o segundo em Roma.');
    assert.dom('[data-test-panel-citacao-index="0"] [data-test-panel="citacao-autor"]').hasText('Plutarco');
  });
});
