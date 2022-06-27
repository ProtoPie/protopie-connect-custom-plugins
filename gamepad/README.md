# ProtoPie Connect Gamepad Plugin

> This project is Protopie Connect Plugin using Web [Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API)

## Installation

```bash
npm install
```

## Start

```bash
npm start
```

## Build

```bash
npm run build
```

## Zip file configuration

> You can add zip file as custom-plugin on ProtoPie Connect

1. Check the dist folder after build
2. Rename built executable file to `plugin` or `plugin.exe`
3. Create the `metadata.json` file and input `{ "name": "gamepad" }`
4. Zip `plugin` file and `metadata.json` file

## Reference

- [Protopie](https://www.protopie.io/)
- [Protopie Connect](https://www.protopie.io/learn/docs/connect/getting-started)
- [Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API)
