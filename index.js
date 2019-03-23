import NoConfiguration from './noConfiguration.js';
import ConfigurationLoaded from './configurationLoaded.js';
import ConfigureAccounts from './configureAccounts.js';
import AddSnapshot from './addSnapshot.js';

const NEW_CONFIGURATION = {
  accounts: [],
  snapshots: [],
}

const App = () => {
  var configuration = null;
  var isConfigurationLoaded = false;
  var isConfiguringAccounts = false;

  let handleConfigure = () => { isConfiguringAccounts = true; }
  let handleCancelConfiguration = () => { isConfiguringAccounts = false; };
  let handleSaveConfiguration = (accounts) => {
    configuration.accounts = accounts;
    isConfiguringAccounts = false;
  };

  let handleNew = () => {
    configuration = Object.assign({}, NEW_CONFIGURATION);
    isConfigurationLoaded = true;
  }

  let handleFile = () => {
    console.error('File loading not implemented');
  }

  return {
    view: (vNode) => {
      let currentView;
      if (isConfigurationLoaded && isConfiguringAccounts) {
        currentView = m(
          ConfigureAccounts,
          { configuration, handleCancelConfiguration, handleSaveConfiguration }
        )
      } else if (isConfigurationLoaded) {
        currentView = m(ConfigurationLoaded, { configuration, handleConfigure });
      } else {
        currentView = m(NoConfiguration, { handleNew, handleFile });
      }

      return m('main#app', [
        m('h1', 'Account Snapshots'),
        currentView
      ]);
    }
  }
}

let root = document.getElementById('root');
m.mount(root, App);
