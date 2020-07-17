const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('first-uppercase', function () {
		const SEP = " ";
		let editor = vscode.window.activeTextEditor;
		let text = editor.document.getText(editor.selection);
		let nameCapitalized = "";
		let arrText = text.split("\n");

		for (let l = 0; l < arrText.length; l++) {
			if (arrText[l].trim() == "") {
				nameCapitalized += arrText[l] + "\n";
				continue;
			}
			let arrLine = arrText[l].split(SEP);
			let line = "";

			for (let i = 0; i < arrLine.length; i++) {
				let parts = arrLine[i].match(/(\w)(.*)/);
				line += SEP + parts[1].toUpperCase() + parts[2].toLowerCase();
			}
			nameCapitalized += line.replace(new RegExp("^" + SEP), "") + "\n";
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

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
