"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
// this method is called when vs code is activated
function activate(context) {

    console.log('Mechanic Liquid decorator is activated');
    let timeout = undefined,
        decorationTypes = {};

    function createDecorations() {
        console.log("createDecorations()");
        // create a decorator type that we use to decorate comments
        if (typeof decorationTypes.commentInlineDecorationType != "object") {
            decorationTypes.commentInlineDecorationType = vscode.window.createTextEditorDecorationType({
                // use a themable color. See package.json for the declaration and default values.
                backgroundColor: { id: 'mechanicLiquid.commentBackground' },
                // isWholeLine: true
            });
        }
        if (typeof decorationTypes.commentBlockDecorationType != "object") {
            decorationTypes.commentBlockDecorationType = vscode.window.createTextEditorDecorationType({
                // use a themable color. See package.json for the declaration and default values.
                backgroundColor: { id: 'mechanicLiquid.commentBackground' },
                // gutterIconPath: vscode.Uri.file(context.asAbsolutePath("images/color-bar-grey.png")),
                // gutterIconSize: "cover",
                isWholeLine: true
            });
        }
        if (typeof decorationTypes.actionBlockDecorationType != "object") {
            decorationTypes.actionBlockDecorationType = vscode.window.createTextEditorDecorationType({
                // use a themable color. See package.json for the declaration and default values.
                backgroundColor: { id: 'mechanicLiquid.actionBackground' },
                // gutterIconPath: vscode.Uri.file(context.asAbsolutePath("images/color-bar-red.png")),
                // gutterIconSize: "cover",
                isWholeLine: true
            });
        }
        if (typeof decorationTypes.queryInlineDecorationType != "object") {
            decorationTypes.queryInlineDecorationType = vscode.window.createTextEditorDecorationType({
                // use a themable color. See package.json for the declaration and default values.
                backgroundColor: { id: 'mechanicLiquid.queryBackground' },
                // gutterIconPath: vscode.Uri.file(context.asAbsolutePath("images/color-bar-red.png")),
                // gutterIconSize: "cover",
                // isWholeLine: true
            });
        }
        if (typeof decorationTypes.statusBlockDecorationType != "object") {
            decorationTypes.statusBlockDecorationType = vscode.window.createTextEditorDecorationType({
                // use a themable color. See package.json for the declaration and default values.
                backgroundColor: { id: 'mechanicLiquid.statusBackground' },
                // gutterIconPath: vscode.Uri.file(context.asAbsolutePath("images/color-bar-red.png")),
                // gutterIconSize: "cover",
                isWholeLine: true
            });
        }
        if (typeof decorationTypes.errorBlockDecorationType != "object") {
            decorationTypes.errorBlockDecorationType = vscode.window.createTextEditorDecorationType({
                // use a themable color. See package.json for the declaration and default values.
                backgroundColor: { id: 'mechanicLiquid.errorBackground' },
                // gutterIconPath: vscode.Uri.file(context.asAbsolutePath("images/color-bar-red.png")),
                // gutterIconSize: "cover",
                isWholeLine: true
            });
        }
    }
    createDecorations();

    let activeEditor = vscode.window.activeTextEditor;
    function updateDecorations() {
        console.log("updateDecorations()");
        if (!activeEditor) {
            return;
        }
        const matchSets = [
            [
                decorationTypes.commentInlineDecorationType,
                [
                    /{%-?\s*comment\s*-?%}[\S \t]*?{%-?\s*endcomment\s*-?%}/gm
                ]
            ],
            [
                decorationTypes.commentBlockDecorationType,
                [
                    /^[ \t]*?\/\/[\S\s]*?$/gm,
                    /^[ \t]*?\/\*[\S\s]*?\*\/\s*?$/gm,
                    /{%-?\s*comment\s*-?%}(?:(?!{%-?\s*endcomment\s*-?%}).)*[\r\n][\S\s]*?{%-?\s*endcomment\s*-?%}/g
                ]
            ],
            [
                decorationTypes.queryInlineDecorationType,
                [
                    /{%-?\s*assign(?:(?!-?%}).)*shopify[\S\s]-?%}/g
                ]
            ],
            [
                decorationTypes.actionBlockDecorationType,
                [
                    /{%-?\s*action[\S\s]*?-?%}[\S\s]*?{%-?\s*endaction\s*?-?%}/g
                ]
            ],
            [
                decorationTypes.statusBlockDecorationType,
                [
                    /{%-?\s*log[\s]*?-?%}[\S\s]*?{%-?\s*endlog\s*?-?%}/g
                ]
            ],
            [
                decorationTypes.errorBlockDecorationType,
                [
                    /{%-?\s*error[\s]*?-?%}[\S\s]*?{%-?\s*enderror\s*?-?%}/g
                ]
            ]
        ];
        for (let index = 0; index < matchSets.length; index++) {
            const regExps = matchSets[index][1];
            const decorationType = matchSets[index][0];
            const text = activeEditor.document.getText();
            const decorationMatches = [];
            let match;
            for (let index = 0; index < regExps.length; index++) {
                const regEx = regExps[index];
                while ((match = regEx.exec(text))) {
                    const startPos = activeEditor.document.positionAt(match.index);
                    const endPos = activeEditor.document.positionAt(match.index + match[0].length);
                    const decoration = {
                        range: new vscode.Range(startPos, endPos),
                        // hoverMessage: 'Comment **' + match[0] + '**'
                    };
                    decorationMatches.push(decoration);
                }
            }
            activeEditor.setDecorations(decorationType, decorationMatches);
        }
    }
    function triggerUpdateDecorations() {
        if (timeout) {
            clearTimeout(timeout);
            timeout = undefined;
        }
        timeout = setTimeout(updateDecorations, 500);
    }
    function disposeDecorations() {
        console.log("disposeDecorations()");
        let disposal = [
            decorationTypes.actionBlockDecorationType,
            decorationTypes.queryInlineDecorationType,
            decorationTypes.commentBlockDecorationType,
            decorationTypes.commentInlineDecorationType,
            decorationTypes.statusBlockDecorationType,
            decorationTypes.errorBlockDecorationType
        ]
        decorationTypes = {};
        for (let index = 0; index < disposal.length; index++) {
            console.log("disposeDecorations() [" + index + "]");
            disposal[index].dispose();
        }
    }
    if (activeEditor) {
        triggerUpdateDecorations();
    }
    vscode.window.onDidChangeActiveTextEditor(editor => {
        console.log("<onDidChangeActiveTextEditor>");
        activeEditor = editor;
        if (activeEditor && activeEditor.document.languageId === "mechanic-liquid") {
            createDecorations();
            triggerUpdateDecorations();
        }
    }, null, context.subscriptions);
    vscode.workspace.onDidChangeTextDocument(event => {
        console.log("<onDidChangeTextDocument>");
        if (activeEditor && event.document === activeEditor.document && activeEditor.document.languageId === "mechanic-liquid") {
            triggerUpdateDecorations();
        }
    }, null, context.subscriptions);
    vscode.workspace.onDidOpenTextDocument(event => {
        console.log("<onDidOpenTextDocument>");
        if (activeEditor && event.uri === activeEditor.document.uri) {
            console.log("match1");
            if(activeEditor.document.languageId === "mechanic-liquid") {
                console.log("match2");
                createDecorations();
                triggerUpdateDecorations();
            }
            else {
                console.log("!match2");
                disposeDecorations();
            }
        }
    }, null, context.subscriptions);
    /**
    * other events (https://code.visualstudio.com/api/references/vscode-api)
    * onDidChangeActiveColorTheme
    * onDidChangeTextEditorOptions
    */
}
exports.activate = activate;