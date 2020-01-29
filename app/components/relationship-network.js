import Component from '@glimmer/component';
import cytoscape from 'cytoscape';
import { set, setProperties, action } from '@ember/object';
import fetch from 'fetch';

export default class RelationshipNetworkComponent extends Component {
  tagName = '';

  sinonimos = [];

  relacionadas = [];

  source = [];
  elements = [];

  cy = null;

  word = 'cachorro';

  insertCytoscape = (element) => {
    set(this, 'cy', cytoscape({
      container: element,
      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(id)',
            'text-valign': 'center',
            'color': '#000000',
            'background-color': '#3a7ecf'
          }
        },

        {
          selector: 'edge',
          style: {
            'line-color': '#3a7ecf',
            'opacity': 0.5
          }
        }
      ]
    }));

    this.cy.on('click', 'node', (evt) => {
      const nome = evt.target.id();

      this._queryWord(nome);
    });
  }

  _queryWord = async (nome) => {
    this._clearProperties();

    set(this, 'word', nome);

    const palavra = await fetch(`http://localhost:5000/words?nome=${nome}`).then(function(response) {
      return response.json();
    });

    this._handleNetwork(palavra);
  }

  @action
  searchWord(nome) {
    this._queryWord(nome);
  }

  _clearProperties() {
    setProperties(this, {
      error: null,
      source: null,
      // sinonimos: null,
      relacionadas: null,
      edges: null,
      elements: null,
      significados: null,
      citacoes: null
    });

    this.cy.elements().remove();
  }

  _handleNetwork = (data) => {
    set(this, 'source', [{ data: { id: data.nome } }]);

    // set(this, 'sinonimos', data.dicionario_sinonimos.map((sinonimo, index) => ({ data: { id: sinonimo, weight: index + 1 } }) ));

    // set(this, 'edges', this.sinonimos.map((sinonimo) => {
    //   return {
    //     data: {
    //       id: data.nome + sinonimo.data.id,
    //       source: data.nome,
    //       target: sinonimo.data.id
    //     }
    //   };
    // }));
    
    // set(this, 'elements', this.source.concat(this.sinonimos).concat(this.edges));

    set(this, 'relacionadas', data.palavras_relacionadas.map((relacionada, index) => ({ data: { id: relacionada, weight: index + 1 } }) ));

    set(this, 'edges', this.relacionadas.map((sinonimo) => {
      return {
        data: {
          id: data.nome + sinonimo.data.id,
          source: data.nome,
          target: sinonimo.data.id
        }
      };
    }));

    set(this, 'elements', this.source.concat(this.relacionadas).concat(this.edges));

    set(this, 'significados', data.dicionario_significados);

    set(this, 'citacoes', data.dicionario_citacoes);

    this.cy.add(this.elements);

    var layout = this.cy.layout({
      name: 'cose',
      animate: true,
      animationDuration: 1000
    });
    layout.run();
  };
}
