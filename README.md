# Mechanic Liquid Support for VS Code

This Visual Studio Code extension provides unofficial support for syntax highlighting and code snippets for the [**Mechanic app**](https://mechanic.dev) on the Shopify platform. ***The extension is currently a pre-release preview, so bugs should be expected.***

Mechanic-flavored Liquid is implemented as its own language, “Mechanic Liquid,” and so it should play nice with other liquid extensions out there, including [[Liquid *by Νίκος*](https://marketplace.visualstudio.com/items?itemName=sissel.shopify-liquid)], [[Liquid Languages Support *by Neil Ding*](https://marketplace.visualstudio.com/items?itemName=neilding.language-liquid)], and [[Shopify Liquid Template Snippets *by Franky Lau*](https://marketplace.visualstudio.com/items?itemName=killalau.vscode-liquid-snippets)].

## Enabling Mechanic-Liquid Language Support

To enable syntax highlighting and snippet support, simply change the language of your document to `Mechanic Liquid`. This can be done by clicking on the language name at the bottom of the VSCode window, or by typing the key chord `Cmd` \ `Ctrl` + `K`, `M`. This extension will automatically enable itself on filenames ending with `.mechanic.liquid`.

## Snippets
To use a snippet, type part of a snippet, press `enter` or `tab`, and the snippet will unfold. For complex snippets with multiple parameters, you can move through each input point using the `tab` key.

## Color Theming
The extension creates background highlighting for several types of objects, including **action tags**, ***shopify* filter queries**, **comments**, **log tags**, and **error tags**. You can customize these colors by adding the following to your `settings.json` file, and changing the colors to match your preferences:
```json
"workbench.colorCustomizations":{
  // wrapping your color specifications in an object with a theme name will limit these color overrides to that particular theme:
  "[Material Theme Lighter High Contrast]": {
    "mechanicLiquid.actionBackground": "#62ff0038",
    "mechanicLiquid.queryBackground": "#7700ff22",
    "mechanicLiquid.commentBackground": "#ffff004a",
    "mechanicLiquid.statusBackground": "#005eff1d",
    "mechanicLiquid.errorBackground": "#ff000022"
  }
}
```
The colors must be in 8-digit hex format (#ffffffff) with a low transparency, so that other VS Code highlighting can function correctly.
## Supporting the Extension

This extension is in active development inside my free time. I decided to write it to make life easier when coding my own Mechanic tasks. If you feel you’ve benefitted from using this extension, [how about buying me a coffee?](https://www.buymeacoffee.com/timdmackey) 😄☕️🙏

## Bug Reports / Issues / Contributing
Bug reports and issues can be reported on the extension’s [GitHub Issue Page](https://github.com/timdmackey/vscode-mechanic-liquid/issues). You're also welcome to make suggestions for improvements to the extension.

In the meantime, check out the amazing [**Mechanic app**](https://mechanic.dev) and the ever-welcoming [Mechanic Slack community](https://join.slack.com/t/usemechanic/shared_invite/zt-cq84nrs7-ggYbYTbf~CrCjTg8nmHP2A)!
## Visual Studio Marketplace Link
[https://marketplace.visualstudio.com/items?itemName=timdmackey.mechanic-liquid](https://marketplace.visualstudio.com/items?itemName=timdmackey.mechanic-liquid)