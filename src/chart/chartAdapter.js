const stack = 'accounts';

const ASSET_COLORS = [
  '#A5BA93', '#2A603B', '#224634', '#48929B', '#1D697C', '#003171', '#749F8D', '#3A6960', '#006442'
];
const LIABILITY_COLORS = [
  '#C3272B', '#9D2933', '#F58F84', '#E69B3A', '#FFB61E', '#E2BE9F', '#ff3500', '#E35C38', '#F9906F'
];

function* colorGenerator() {
  let assetColors = [...ASSET_COLORS];
  let liabilityColors = [...LIABILITY_COLORS];
  let color;
  while (true) {
    var accountType = yield color;
    if (accountType == 'ASSET') {
      color = assetColors.shift();
      assetColors.push(color);
    } else {
      color = liabilityColors.shift();
      liabilityColors.push(color);
    }
  }
}

let accountColors = colorGenerator();
accountColors.next();

const toDataset = (account, snapshots) => ({
  label: account.name,
  stack,
  backgroundColor: accountColors.next(account.type).value,
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
