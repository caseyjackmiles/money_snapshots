const NEW_SNAPSHOT = { id: '', date: '', recordings: [] };
const NEW_RECORD = { account: '', amount: '' };

const AccountRecord = {
  view: ({ attrs }) => {
    const { snapshotId, accountId, accountName, accountValue } = attrs;

    const handleInput = () => { }
    const valueLabel = `snapshot-${snapshotId}--account-${accountId}-value`;

    return m(`accountentryplaceholder`, [
      m('label', { for: valueLabel }, `${accountName}:`),
      m('input', { type: 'number', id: valueLabel, required: true, value: accountValue, oninput: handleInput })
    ]);
  }
}

const AddSnapshot = {
  view: () => {}
}

export default AddSnapshot;
