import * as vscode from 'vscode';

function applyDecoration( editor: vscode.TextEditor ) {
  const textDecoration = vscode.window.createTextEditorDecorationType( <vscode.DecorationRenderOptions>{
    textDecoration: `none; background: rgba(0, 0, 0, 1);`,
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
  } );
  editor.setDecorations( textDecoration, [ new vscode.Range(
    new vscode.Position ( 0, 0 ),
    new vscode.Position( editor.document.lineCount, 9999 )
  ) ] );

  return textDecoration;
}

export function activate( context: vscode.ExtensionContext ) {
  console.log( 'Congratulations, your extension "chromacoder" is now active!' );

  context.subscriptions.push( ...[
    vscode.commands.registerCommand( 'chromacoder.activate', () => {
      const activeEditor = vscode.window.activeTextEditor;
      if ( !activeEditor ) { return; }

      context.subscriptions.push( applyDecoration( activeEditor ) );
    } ),
    vscode.commands.registerCommand( 'chromacoder.deactivate', () => {
      console.error( 'TODO' );
    } )
  ] );
}

export function deactivate() {}
