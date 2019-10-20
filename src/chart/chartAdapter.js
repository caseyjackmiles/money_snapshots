const stack = 'accounts';

const toDataset = (account, snapshots) => ({
  label: account.name,
  stack,
  data: snapshots.map(({ date, recordings }) => {
    const record = recordings.find(r => account.id == r.accountId);
    if (record) {
      return toData(date, record.accountValue, account.type);
    }
    return toData(date, 0, account.type);
  })
});

const toData = (date, value, type) => ({
  x: date,
  y: Number(type == 'ASSET' ? value : `-${value}`)
});

export default ({ accounts, snapshots }) => ({
  datasets: accounts.map(acc => toDataset(acc, snapshots))
});
