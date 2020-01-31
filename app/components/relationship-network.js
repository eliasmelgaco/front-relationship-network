import Component from '@glimmer/component';
import cytoscape from 'cytoscape';
import { set, setProperties, action } from '@ember/object';
import fetch from 'fetch';
import ENV from 'word-relationship-network/config/environment';

export default class RelationshipNetworkComponent extends Component {
  cy = null;

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
            'font-size': '8px',
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

      this._queryWord(nome).then((resultado) => {
        if (!resultado.status === 200) {
          this._clearProperties();

          this._handleNetwork(resultado);
        }
      });
    });
  }

  _queryWord = async (nome) => {
    this._clearProperties();

    set(this, 'palavra', nome);

    const resultado = await fetch(`${ENV.APP.API_RELATIONSHIP}/words?nome=${nome}`)
      .then(async (response) => {
        if (response.status === 200) {
          return response.json();
        }
        await response.json().then(({ message }) => {
          set(this, 'message', message);
        });
      });

    this._handleNetwork(resultado);
  }


  _clearProperties = () => {
    setProperties(this, {
      message: null,
      significados: null,
      relacionados: null,
      expressoes: null,
      citacoes: null
    });

    this.cy && this.cy.elements().remove();
  }

  _handleNetwork = (data) => {
    if (data) {
      setProperties(this, {
        significados: data.significados,
        relacionados: data.relacionados,
        expressoes: data.expressoes,
        citacoes: data.citacoes
      });

      this.cy.add(data.chart);

      var layout = this.cy.layout({
        name: 'cose',
        animate: true,
        animationDuration: 1000
      });
      layout.run();
    }
  };

  @action
  searchWord(nome) {
    this._queryWord(nome);
  }
}
