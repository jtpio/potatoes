import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { Widget } from '@phosphor/widgets';

const extension: JupyterFrontEndPlugin<void> = {
  activate,
  id: 'header-logo',
  autoStart: true
};

function activate(app: JupyterFrontEnd) {
  let logo = new Widget();
  logo.addClass('jp-MainAreaPortraitIcon');
  logo.addClass('jp-JupyterIcon');
  logo.node.style.height = "28px";
  logo.id = 'jp-MainLogo-header';
  app.shell.add(logo, 'header');
};

export default extension;
