const NEW_SNAPSHOT = { id: '', date: '', recordings: [] };
const NEW_RECORD = { accountId: '', accountValue: '' };

const AccountRecordEntry = {
  view: (vnode) => {
    const { updateAccountRecord, accountId, accountName, accountValue } = vnode.attrs;

    const handleValueEntry = e => { updateAccountRecord(accountId, e.target.value); }

    const accountRecordLabel = `account-${accountId}-record`;

    return m('', [
      m('label', { for: accountRecordLabel }, `${accountName}`),
      m('input', { type: 'number', step: '0.01', min: '0', id: accountRecordLabel, required: true, value: accountValue, oninput: handleValueEntry })
    ]);
  }
}

function AddSnapshot(initialVnode) {
  const {
    accounts,
    handleSaveSnapshot,
    handleCancelSnapshot
  } = initialVnode.attrs;

  let now = new Date();
  let id = now.getTime();
  let date = now.toISOString().split('T')[0];
  let recordings = accounts.map(({ id: accountId }) => Object.assign({}, NEW_RECORD, { accountId }));

  const snapshot = Object.assign({}, NEW_SNAPSHOT, { id, date, recordings })

  const getName = id => accounts.find(acc => acc.id == id).name;
  const updateSnapshotDate = e => { snapshot.date = e.target.value; }
  const updateAccountRecord = (accountId, accountValue) => {
    const index = snapshot.recordings.findIndex(rec => rec.accountId == accountId);
    snapshot.recordings[index] = Object.assign({}, { accountId, accountValue });
  }
  const handleSubmit = e => {
    e.preventDefault();
    handleSaveSnapshot(snapshot);
  }

  return {
    view: () => {
      let recordRows = snapshot.recordings.map(({ accountId, accountValue }) => {
        const accountName = getName(accountId);
        return m(AccountRecordEntry, { updateAccountRecord, accountId, accountName, accountValue });
      });
      return m('#addSnapshot', [
        m('h2', 'Add Snapshot'),
        m('form#addSnapshot', { onsubmit: handleSubmit }, [
          m('label', { for: 'snapshotDate' }, 'Date (YYYY-MM-DD)'),
          // TODO: Better checks for legitimate date
          m('input', {type:'text', id: 'snapshotDate', required: true, pattern: '\\d{4}-\\d{2}-\\d{2}', value: snapshot.date, oninput: updateSnapshotDate}),
          recordRows,
          m('button', { type: 'button', onclick: handleCancelSnapshot }, 'Cancel'),
          m('button', { type: 'submit' }, 'Save snapshot')
        ])
      ])
    }
  };
}

export default AddSnapshot;
