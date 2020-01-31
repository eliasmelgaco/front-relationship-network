import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { set, setProperties } from '@ember/object';

module('Integration | Component | relationship-network/panel', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders default state', async function(assert) {
    assert.expect(11);

    setProperties(this, {
      searchWord() {}
    });

    await render(hbs`
      <RelationshipNetwork::Panel
        @searchWord={{this.searchWord}}
      />
    `);

    assert.dom('[data-test-panel="input"]').exists();
    assert.dom('[data-test-panel="buscar"]').exists();
    assert.dom('[data-test-panel="message"]').doesNotExist();
    assert.dom('[data-test-panel="significado"]').doesNotExist();
    assert.dom('[data-test-panel="significado-item"]').doesNotExist();
    assert.dom('[data-test-panel="relacionadas"]').doesNotExist();
    assert.dom('[data-test-panel="expressao"]').doesNotExist();
    assert.dom('[data-test-panel="expressao-item"]').doesNotExist();
    assert.dom('[data-test-panel="citacoes"]').doesNotExist();
    assert.dom('[data-test-panel="citacao-texto"]').doesNotExist();
    assert.dom('[data-test-panel="citacao-autor"]').doesNotExist();
  });

  test('it renders panel fillout all values', async function(assert) {
    assert.expect(13);

    setProperties(this, {
      message: 'Não encontrado. Certifique-se de que a palavra está em português.',
      significados: ['Construção que serve para morar; habitação, moradia, residência.'],
      relacionados: ['residência', 'moradia'],
      expressoes: ['Sob o mesmo teto'],
      citacoes: [{
        texto: 'As casas são construídas para que se viva nelas, não para serem olhadas.',
        autor: 'Francis Bacon'
      }],
      searchWord() {}
    });

    await render(hbs`
      <RelationshipNetwork::Panel
        @message={{this.message}}
        @significados={{this.significados}}
        @relacionados={{this.relacionados}}
        @expressoes={{this.expressoes}}
        @citacoes={{this.citacoes}}
        @searchWord={{this.searchWord}}
      />
    `);

    assert.dom('[data-test-panel="input"]').exists();
    assert.dom('[data-test-panel="buscar"]').exists();
    assert.dom('[data-test-panel="message"]').hasText('Não encontrado. Certifique-se de que a palavra está em português.');
    assert.dom('[data-test-panel="significado"]').exists();
    assert.dom('[data-test-panel="significado-item"]').exists('Construção que serve para morar; habitação, moradia, residência.');
    assert.dom('[data-test-panel="relacionadas"]').exists();
    assert.dom('[data-test-panel-relacionados-index="0"]').hasText('residência');
    assert.dom('[data-test-panel-relacionados-index="1"]').hasText('moradia');
    assert.dom('[data-test-panel="expressao"]').exists();
    assert.dom('[data-test-panel-expressao-index="0"]').hasText('Sob o mesmo teto');
    assert.dom('[data-test-panel="citacoes"]').exists();
    assert.dom('[data-test-panel-citacao-index="0"] [data-test-panel="citacao-texto"]').hasText('As casas são construídas para que se viva nelas, não para serem olhadas.');
    assert.dom('[data-test-panel-citacao-index="0"] [data-test-panel="citacao-autor"]').hasText('Francis Bacon');
  });

  test('it receives new values when click in search word. When try with wrong word, should clean values', async function(assert) {
    assert.expect(20);

    set(this, 'searchWord', (palavra) => {
      if (palavra === 'wrong word') {
        setProperties(this, {
          message: null,
          significados: null,
          relacionados: null,
          expressoes: null,
          citacoes: null
        });
      } else {
        setProperties(this, {
          message: 'Não encontrado. Certifique-se de que a palavra está em português.',
          significados: ['Construção que serve para morar; habitação, moradia, residência.'],
          relacionados: ['residência', 'moradia'],
          expressoes: ['Sob o mesmo teto'],
          citacoes: [{
            texto: 'As casas são construídas para que se viva nelas, não para serem olhadas.',
            autor: 'Francis Bacon'
          }]
        });
      }
    });

    await render(hbs`
      <RelationshipNetwork::Panel
        @palavra={{this.palavra}}
        @message={{this.message}}
        @significados={{this.significados}}
        @relacionados={{this.relacionados}}
        @expressoes={{this.expressoes}}
        @citacoes={{this.citacoes}}
        @searchWord={{this.searchWord}}
      />
    `);

    await fillIn('[data-test-panel="input"]', 'Café');
    await click('[data-test-panel="buscar"]');

    assert.dom('[data-test-panel="input"]').exists();
    assert.dom('[data-test-panel="buscar"]').exists();
    assert.dom('[data-test-panel="message"]').exists();
    assert.dom('[data-test-panel="significado"]').exists();
    assert.dom('[data-test-panel="significado-item"]').exists();
    assert.dom('[data-test-panel="relacionadas"]').exists();
    assert.dom('[data-test-panel="expressao"]').exists();
    assert.dom('[data-test-panel="citacoes"]').exists();
    assert.dom('[data-test-panel="citacao-texto"]').exists();
    assert.dom('[data-test-panel="citacao-autor"]').exists();

    await fillIn('[data-test-panel="input"]', 'wrong word');
    await click('[data-test-panel="buscar"]');

    assert.dom('[data-test-panel="input"]').exists();
    assert.dom('[data-test-panel="buscar"]').exists();
    assert.dom('[data-test-panel="message"]').doesNotExist();
    assert.dom('[data-test-panel="significado"]').doesNotExist();
    assert.dom('[data-test-panel="significado-item"]').doesNotExist();
    assert.dom('[data-test-panel="relacionadas"]').doesNotExist();
    assert.dom('[data-test-panel="expressao"]').doesNotExist();
    assert.dom('[data-test-panel="citacoes"]').doesNotExist();
    assert.dom('[data-test-panel="citacao-texto"]').doesNotExist();
    assert.dom('[data-test-panel="citacao-autor"]').doesNotExist();
  });

  test('it should search word when clicks on relacionados item', async function(assert) {
    assert.expect(15);

    set(this, 'searchWord', (palavra) => {
      if(palavra === 'moradia') {
        assert.ok('it search for moradia');

        setProperties(this, {
          significados: ['Tempo em que se morou em um lugar.'],
          relacionados: ['habitação', 'sede'],
          expressoes: ['Assento etéreo', 'Morada celeste'],
          citacoes: [{
            texto: 'As casas são construídas para que se viva nelas, não para serem olhadas.',
            autor: 'Francis Bacon'
          },
          {
            texto: 'Num voo direto o pássaro volta procurando um teto.',
            autor: 'Eugénia Tabosa'
          }]
        });
      }
    });

    setProperties(this, {
      significados: ['Construção que serve para morar; habitação, moradia, residência.'],
      relacionados: ['residência', 'moradia'],
      expressoes: ['Sob o mesmo teto'],
      citacoes: [{
        texto: 'As casas são construídas para que se viva nelas, não para serem olhadas.',
        autor: 'Francis Bacon'
      }]
    });

    await render(hbs`
      <RelationshipNetwork::Panel
        @palavra={{this.palavra}}
        @message={{this.message}}
        @significados={{this.significados}}
        @relacionados={{this.relacionados}}
        @expressoes={{this.expressoes}}
        @citacoes={{this.citacoes}}
        @searchWord={{this.searchWord}}
      />
    `);

    await click('[data-test-panel-relacionados-index="1"]');

    assert.dom('[data-test-panel="input"]').exists();
    assert.dom('[data-test-panel="buscar"]').exists();
    assert.dom('[data-test-panel="message"]').doesNotExist('');
    assert.dom('[data-test-panel="significado"]').exists();
    assert.dom('[data-test-panel="significado-item"]').exists('Construção que serve para morar; habitação, moradia, residência.');
    assert.dom('[data-test-panel="relacionadas"]').exists();
    assert.dom('[data-test-panel-relacionados-index="0"]').hasText('habitação');
    assert.dom('[data-test-panel-relacionados-index="1"]').hasText('sede');
    assert.dom('[data-test-panel="expressao"]').exists();
    assert.dom('[data-test-panel-expressao-index="0"]').hasText('Assento etéreo');
    assert.dom('[data-test-panel-expressao-index="1"]').hasText('Morada celeste');
    assert.dom('[data-test-panel="citacoes"]').exists();
    assert.dom('[data-test-panel-citacao-index="0"] [data-test-panel="citacao-texto"]').hasText('As casas são construídas para que se viva nelas, não para serem olhadas.');
    assert.dom('[data-test-panel-citacao-index="0"] [data-test-panel="citacao-autor"]').hasText('Francis Bacon');
  });
});
