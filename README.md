# Daymark

Daymark is a focused task list built with React, TypeScript, and Vite. Tasks can
be created, edited, completed, deleted, searched, and filtered by due date or
status. Data is saved in the browser's local storage.

## Development

```sh
npm install
npm run dev
```

## Checks

```sh
npm run build
npm run lint
```

## Project structure

- `src/components/ui` contains reusable form and dialog controls.
- `src/components/layout` contains the app shell, navigation, and header.
- `src/features/todos` contains task types, components, hooks, persistence,
  date helpers, and the task page.
