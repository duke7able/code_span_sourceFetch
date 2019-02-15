'use babel';

import SourcefetchView from './sourcefetch-view';
import { CompositeDisposable } from 'atom';
import request from 'request';

export default {

  sourcefetchView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.sourcefetchView = new SourcefetchView(state.sourcefetchViewState);
    this.modalPanel = atom.workspace.addRightPanel({
      item: this.sourcefetchView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'sourcefetch:fetch': () => this.fetch()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.sourcefetchView.destroy();
  },

  serialize() {
    return {
      sourcefetchViewState: this.sourcefetchView.serialize()
    };
  },

  togglePanel() {
   console.log('Sourcefetch was toggled!');
   return (
     this.modalPanel.isVisible() ?
     this.modalPanel.hide() :
     this.modalPanel.show()
   );
  },

  fetch() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()

      let language = editor.getGrammar().name
      // to get the current programming language

      // selection = selection.split('').reverse().join('')
      // editor.insertText(selection)
      // this.download(selection)
      // let rp = require('request-promise')
      let options = {
          method: 'POST',
          uri: 'https://codespan.herokuapp.com/codespan/',
          form: {
              query: selection,
              lang: language
          },
          json: true // Automatically stringifies the body to JSON
      }
      // rp(options).then(function (parsedBody) {
      //     // POST succeeded...
      //     editor.insertText(parsedBody)
      // }).catch(function (err) {
      //     // POST failed...
      //     atom.notifications.addWarning(err.message)
      // })
      this.download(options).then((html) => {
        // editor.insertText(html)
        this.setResultsToView(editor,html)
      }).catch((error) => {
        atom.notifications.addWarning(error.reason)
      })
    }
  },

  download(options) {
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          resolve(body)
        } else {
          reject({
            reason: 'CodeSpan API failed'
          })
        }
      })
    })
  },

  clearPastResult() {
    this.sourcefetchView.clearWrapper()
  },

  setResultsToView(currentEditor, dataFromAPI) {
    let JSONdata = JSON.parse(dataFromAPI)
    console.log(JSONdata.length)
    if ( this.modalPanel.isVisible() ) {
        this.clearPastResult()
    }
    this.sourcefetchView.setElement(JSONdata)
    this.modalPanel = atom.workspace.addRightPanel({
      item: this.sourcefetchView.getElement()
    })
    this.modalPanel.show()
  }

};
