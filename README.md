# Simple Web App

Are you seeking a simple web application without any framework, library or complicated setup process? This project might interest you. it's very basic and simple and you can start from here. It uses TypeScript though.

## Commands

```typescript
// installs all packages
npm install

// watches file changes and it runs a simple server with hot reloading
npm run watch

// builds in production mode with tree shaking, code splitting and a bunch of different optimization
npm run build

// builds in development mode without tree shaking and any optimization for fast builds
npm run build:dev

// runs all unit tests with jest
npm run test

// lints the code based on the tslint
npm run lint
```

## Folder structure

The `app.ts` script in the root of `src` is the entry point of the application. In other word, it's the `main` function in other languages.

The `utils` folder is supposed to have all utility functions or classes. In any script file, you can access any utils library by an alias

```typescript
import { theBestUtilFunctionEver } from "@utils/my-utils";
```

The `configs` folder is supposed to have all configurations. In any script file, you can access any configs library by an alias

```typescript
import { environment } from "@configs/environment";
```

The `styles` folder contains all stylesheets. This application supports `tailwind.css` but it can be removed easily by removing just the import in the `app.ts` or by removing all configurations in the webpack configs. This application also supports `scss`.

The `public` folder contains all files that need to be available publicly. It moves everything in the `assets` folder in the distributed code.
```javascript
public/my-amazing-picture.png

// will become in the distributed application

assets/my-amazing-picture.png
```

The `assets` folder contains all assets that need to be accessed via code. For instance, the `favicon.png` will be used by webpack to generate all kinds of formats for any devices. Another example might be that the implementer (you) wants to inject an image via code instead of attaching it directly in the `html`. The supported imports below will move the assets that are used in scripts into the distributed `assets` folder.

## Supported imports
- html
- png, jpg, jpeg, gif, svg
- css, scss
