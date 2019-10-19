import SnapshotChart from './chart/snapshotChart.js';

const ConfigurationLoaded = {
  view: (vnode) => {
    const {
      configuration: { accounts, snapshots },
      handleAddSnapshot,
      handleDeleteSnapshot,
      handleConfigure
    } = vnode.attrs;

    const snapshotEntries = snapshots.map(s => (
      m('li', [s.date, m('button', { onclick: () => { handleDeleteSnapshot(s.id) } }, 'Remove snapshot')])
    ));

    return m('#configuration-loaded', [
      m('p', `${accounts.length} account(s) configured.`),
      m('p', `${snapshots.length} snapshot(s) recorded:`),
      m('ul', [
        snapshotEntries
      ]),
      m('button', { type: 'button', onclick: handleConfigure }, 'Configure accounts'),
      m('button', { type: 'button', disabled: (accounts.length == 0), onclick: handleAddSnapshot }, 'Add New Snapshot'),
      m(SnapshotChart)
    ]);
  }
}

export default ConfigurationLoaded;
