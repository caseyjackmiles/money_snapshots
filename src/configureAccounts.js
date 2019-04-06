const ASSET_TYPE = 'ASSET';
const LIABILITY_TYPE = 'LIABILITY';

const DUPLICATE_NAME_ERROR = 'Accounts may not have the same name.';

const AccountEntry = {
  view: (vnode) => {
    const {
      account: { id, name, type, error },
      updateAccount,
      removeAccount
    } = vnode.attrs;

    const handleNameInput = e => { updateAccount(id, { name: e.target.value }) }
    const handleTypeInput = e => { updateAccount(id, { type: e.target.value }) }

    const nameLabel = `account-${id}-name`;
    const typeLabel = `account-${id}-type`;

    return m(`.account-${id}`, [
      m('label', { for: nameLabel }, 'Name:'),
      m('input', { type: 'text', id: nameLabel, required: true, value: name, oninput: handleNameInput }),

      m('label', { for: typeLabel }, 'Type:'),
      m('select', { id: typeLabel, required: true, value: type, oninput: handleTypeInput }, [
        m('option', { value: ASSET_TYPE }, 'Asset'),
        m('option', { value: LIABILITY_TYPE }, 'Liability')
      ]),

      m('span', {'aria-live': 'polite'}, error),

      m('button', { type: 'button', onclick: () => { removeAccount(id) } }, 'Remove account'),
    ]);
  }
};

const NEW_ACCOUNT = { id: '', name: '', type: ASSET_TYPE, error: '' };

function ConfigureAccounts(initialVnode) {
  const {
    handleSaveConfiguration,
    handleCancelConfiguration
  } = initialVnode.attrs;

  // Create a copy of configuration to prevent app state
  // from being modified by changes before saving
  const accounts = Array.from(initialVnode.attrs.configuration.accounts);

  const addAccount = () => {
    accounts.push(
      Object.assign({}, NEW_ACCOUNT, { id: (new Date).getTime() })
    );
  }
  const updateAccount = (id, update) => {
    const index = accounts.findIndex(acc => acc.id === id)
    accounts[index] = Object.assign({}, accounts[index], update);
  }
  const removeAccount = (id) => {
    const index = accounts.findIndex(acc => acc.id === id);
    accounts.splice(index, 1);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    // check for duplicate account names
    const s = new Set();
    accounts.forEach(account => {
      delete account.error; // remove previous errors
      if (s.has(account.name)) {
        account.error = DUPLICATE_NAME_ERROR;
        valid = false;
      }
      s.add(account.name);
    });

    if (valid) {
      handleSaveConfiguration(accounts);
    }
  }

  return {
    view: () => {
      let accountEntryRows = accounts.map(
        account => m(AccountEntry, { account, updateAccount, removeAccount, key: account.id }));

      return m('#configure', [
        m('h2', 'Configure Accounts'),
        m('form#accountList', { onsubmit: handleSubmit }, [
          accountEntryRows,
          m('button', { type: 'button', onclick: addAccount }, 'Add account'),
          m('button', { type: 'button', onclick: handleCancelConfiguration }, 'Cancel'),
          m('button', { type: 'submit' }, 'Save configuration')
        ]),
      ]);
    }
  }
}

export default ConfigureAccounts;
