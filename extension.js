// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('masterraise-first-uppercase', function () {
		let editor = vscode.window.activeTextEditor;
		let text = editor.document.getText(editor.selection);
		let separator = " ";
		let nameCapitalized = "";
		let arrText = text.split("\n");

		for (let l = 0; l < arrText.length; l++) {
			if (arrText[l].trim() == "") {
				nameCapitalized += arrText[l] + "\n";
				continue;
			}
			let arrLine = arrText[l].split(separator);
			let line = "";

			for (let i = 0; i < arrLine.length; i++) {
				let parts = arrLine[i].match(/(\w)(.*)/);
				line += separator + parts[1].toUpperCase() + parts[2].toLowerCase();
			}
			nameCapitalized += line.replace(new RegExp("^" + separator), "") + "\n";
		}
		nameCapitalized = nameCapitalized.replace(/\n$/, "")

		editor.edit(
			edit => editor.selections.forEach(
				selection => {
					edit.replace(selection, nameCapitalized)
				}
			)
		);
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

String.prototype.ucfirst = function () {
	// let ucfirst = function () {
	// let x = vscode.window.activeTextEditor;
	let x = this.split(/\s+/g);
	// let x = x.split(/\s+/g);
	for (let i = 0; i < x.length; i++) {
		let parts = x[i].match(/(\w)(\w*)/);
		x[i] = parts[1].toUpperCase() + parts[2].toLowerCase();
	}
	return x.join(' ');
};

module.exports = {
	activate,
	deactivate
}
