import {
  IDisposable, DisposableDelegate
} from '@phosphor/disposable';

import {
  toArray
} from "@phosphor/algorithm";

import {
  PanelLayout
} from "@phosphor/widgets";

import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
  ToolbarButton
} from '@jupyterlab/apputils';

import {
  DocumentRegistry
} from '@jupyterlab/docregistry';

import {
  NotebookActions, NotebookPanel, INotebookModel
} from '@jupyterlab/notebook';

/**
 * Initialization data for the toolbar_launcher_button extension.
 */
const extension: JupyterLabPlugin<void> = {
  activate,
  id: 'toolbar_launcher_button',
  autoStart: true
};

/**
 * A notebook widget extension that adds a button to the toolbar.
 */
export
class ButtonExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
  /**
   * Create a new extension object.
   */
  createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
    let callback = () => {
      NotebookActions.clearAllOutputs(panel.content);
    };
    let button = new ToolbarButton({
      className: 'myButton',
      iconClassName: 'jp-MoreHorizIcon jp-Icon jp-Icon-16 jp-ToolbarButtonComponent-icon',
      onClick: callback,
      tooltip: 'Clear All Output'
    });

    panel.toolbar.insertItem(0, 'newLauncher', button);
    return new DisposableDelegate(() => {
      button.dispose();
    });
  }
}

/**
 * A notebook widget extension that removes the save button
 */
export
class RemoveSaveButtonExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
  createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
    let toolbar = panel.toolbar;

    // remove the save button
    const pos = toArray(toolbar.names()).indexOf('save');
    let layout = toolbar.layout as PanelLayout;
    let widget = layout.widgets[pos];
    widget.parent = null;

    return new DisposableDelegate(() => {});
  }
}

function activate(app: JupyterLab) {
  console.log('JupyterLab extension toolbar_launcher_button is activated!');
  app.docRegistry.addWidgetExtension('Notebook', new ButtonExtension());
  app.docRegistry.addWidgetExtension('Notebook', new RemoveSaveButtonExtension());
};

export default extension;
