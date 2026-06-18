# headlo-client-angular

Example Angular app showing how to integrate the [headlo-angular](https://github.com/headlohq/headlo-angular) SDK.

## What it shows

- Bootstrapping `PropServerService` with a publishable key and API URL
- Using `<prop-preload>` to load Headlo components at startup
- Rendering a `<prop-card>` in your Angular template

## Setup

```bash
npm install
```

Create a `.env` file (or set the values on `window.__env` before the app boots):

```
HEADLO_PROP_KEY=pk_live_...
HEADLO_API_URL=https://api.headlo.com
```

## Dev server

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Related

- [headlo-angular](https://github.com/headlohq/headlo-angular) — Angular SDK
- [Headlo](https://headlo.com) — affiliate-powered sales channels
