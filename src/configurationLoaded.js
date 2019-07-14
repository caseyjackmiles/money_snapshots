const ConfigurationLoaded = {
  view: (vnode) => {
    const { accounts, snapshots } = vnode.attrs.configuration;
    return m('#configuration-loaded', [
      m('p', `${accounts.length} account(s) configured, with ${snapshots.length} snapshot(s) captured`),
      m('button', {type:'button', onclick: vnode.attrs.handleConfigure }, 'Configure accounts'),
      m('button', {type:'button', disabled: (accounts.length == 0), onclick: vnode.attrs.handleAddSnapshot}, 'Add Snapshot')
    ]);
  }
}

export default ConfigurationLoaded;
