import NoConfiguration from './src/noConfiguration.js';
import ConfigurationLoaded from './src/configurationLoaded.js';
import ConfigureAccounts from './src/configureAccounts.js';
import AddSnapshot from './src/addSnapshot.js';

const NEW_CONFIGURATION = {
  accounts: [],
  snapshots: [],
}

const App = () => {
  var configuration = null;
  var isConfigurationLoaded = false;
  var isConfiguringAccounts = false;
  var isAddingSnapshot = false;

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

  let handleAddSnapshot = () => { isAddingSnapshot = true; }
  let handleCancelSnapshot = () => { isAddingSnapshot = false; }
  let handleSaveSnapshot = (snapshot) => {
    configuration.snapshots.push(snapshot);
    isAddingSnapshot = false;
  }
  let handleDeleteSnapshot = snapshotId => {
    const idx = configuration.snapshots.findIndex(s => s.id == snapshotId);
    configuration.snapshots.splice(idx, 1);
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
      } else if (isConfigurationLoaded && isAddingSnapshot) {
        currentView = m(
          AddSnapshot,
          { accounts: configuration.accounts, handleSaveSnapshot, handleCancelSnapshot }
        )
      }
      else if (isConfigurationLoaded) {
        currentView = m(ConfigurationLoaded, { configuration, handleConfigure, handleAddSnapshot, handleDeleteSnapshot });
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
