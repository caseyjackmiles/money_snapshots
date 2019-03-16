const INSTRUCTIONS = 'No configuration loaded.';
const CREATE_NEW = 'Create new configuration';
const LOAD_FILE = 'Load configuration from file';

const NoConfiguration = {
  view: (vnode) => {
    const {
      handleNew,
      handleFile
    } = vnode.attrs;

    return m('#no-configuration', [
      m('p', INSTRUCTIONS),
      m('button', { type: 'button', disabled: true, onclick: handleFile }, LOAD_FILE),
      m('button', { type: 'button', onclick: handleNew }, CREATE_NEW),
    ]);
  }
}

export default NoConfiguration;
