import * as vscode from 'vscode';

let isActivated = false;
let currentEditors: vscode.TextEditor[] = [];

function applyDecoration( decoration: vscode.TextEditorDecorationType ) {
  currentEditors.forEach( ( editor ) => {
    editor.setDecorations( decoration, [ new vscode.Range(
      new vscode.Position ( 0, 0 ),
      new vscode.Position( editor.document.lineCount, 9999 )
    ) ] );
  } );
}

function removeDecoration( decoration: vscode.TextEditorDecorationType ) {
  currentEditors.forEach( ( editor ) => {
    editor.setDecorations( decoration, [] );
  } );
}

export function activate( context: vscode.ExtensionContext ) {
  const decorationType = vscode.window.createTextEditorDecorationType( <vscode.DecorationRenderOptions>{
    textDecoration: `none; background: rgba(0, 0, 0, 1);`,
    rangeBehavior: vscode.DecorationRangeBehavior.OpenOpen,
  } );

  currentEditors = vscode.window.visibleTextEditors;

  context.subscriptions.push( ...[
    decorationType,

    vscode.commands.registerCommand( 'chromacoder.activate', () => {
      isActivated = true;
      applyDecoration( decorationType );
    } ),

    vscode.commands.registerCommand( 'chromacoder.deactivate', () => {
      isActivated = false;
      removeDecoration( decorationType );
    } ),

    vscode.window.onDidChangeVisibleTextEditors( ( editors ) => {
      currentEditors = editors;

      if ( isActivated ) {
        applyDecoration( decorationType );
      }
    }, null ),
  ] );
}

export function deactivate() {}
