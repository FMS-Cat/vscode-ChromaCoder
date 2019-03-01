import * as vscode from 'vscode';

let isActivated = false;
let currentDecoration: vscode.TextEditorDecorationType | null = null;

function applyDecoration( editor: vscode.TextEditor ) {
  const textDecoration = vscode.window.createTextEditorDecorationType( <vscode.DecorationRenderOptions>{
    textDecoration: `none; background: rgba(0, 0, 0, 1);`,
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
  } );
  editor.setDecorations( textDecoration, [ new vscode.Range(
    new vscode.Position ( 0, 0 ),
    new vscode.Position( editor.document.lineCount, 9999 )
  ) ] );

  currentDecoration = textDecoration;
  return textDecoration;
}

export function activate( context: vscode.ExtensionContext ) {
  context.subscriptions.push( ...[
    vscode.commands.registerCommand( 'chromacoder.activate', () => {
      const activeEditor = vscode.window.activeTextEditor;
      if ( !activeEditor ) { return; }

      isActivated = true;
      context.subscriptions.push( applyDecoration( activeEditor ) );
    } ),

    vscode.commands.registerCommand( 'chromacoder.deactivate', () => {
      isActivated = false;

      if ( currentDecoration ) {
        currentDecoration.dispose();
      }
    } ),

    vscode.window.onDidChangeActiveTextEditor( ( editor ) => {
      if ( !isActivated ) { return; }

      if ( editor ) {
        context.subscriptions.push( applyDecoration( editor ) );
      }
    }, null )
  ] );
}

export function deactivate() {}
