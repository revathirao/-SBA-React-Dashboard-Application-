# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-  [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
-  [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
   globalIgnores(["dist"]),
   {
      files: ["**/*.{ts,tsx}"],
      extends: [
         // Other configs...

         // Remove tseslint.configs.recommended and replace with this
         tseslint.configs.recommendedTypeChecked,
         // Alternatively, use this for stricter rules
         tseslint.configs.strictTypeChecked,
         // Optionally, add this for stylistic rules
         tseslint.configs.stylisticTypeChecked,

         // Other configs...
      ],
      languageOptions: {
         parserOptions: {
            project: ["./tsconfig.node.json", "./tsconfig.app.json"],
            tsconfigRootDir: import.meta.dirname,
         },
         // other options...
      },
   },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
   globalIgnores(["dist"]),
   {
      files: ["**/*.{ts,tsx}"],
      extends: [
         // Other configs...
         // Enable lint rules for React
         reactX.configs["recommended-typescript"],
         // Enable lint rules for React DOM
         reactDom.configs.recommended,
      ],
      languageOptions: {
         parserOptions: {
            project: ["./tsconfig.node.json", "./tsconfig.app.json"],
            tsconfigRootDir: import.meta.dirname,
         },
         // other options...
      },
   },
]);
```

naging State and Updates

Challenge: Tasks, filters, and sorting all needed to work together. Changing a filter, adding a task, or editing a task could affect multiple components.

Solution: Used useState for tasks, filters, and theme. Lifted state up to App.tsx to manage it centrally and passed handlers (onAddTask, onUpdateTask, onChangeFilters) down to child components.

2 Sorting and Filtering

Challenge: Sorting by due date, priority, and status while also applying filters was tricky. Filtering had to work with search, status, and priority simultaneously.

Solution: Created utility functions filterTask and sortTask. Ensured that the list is first filtered, then sorted before rendering.

Issue: Sorting by date initially didn’t work because dueDate strings needed conversion to Date objects for comparison.

3Task Editing

Challenge: Implementing edit functionality so that the form could handle both adding and updating tasks without losing state.

Solution: Maintained an editingTask state in the Dashboard. Prefilled the form when editing and used the same TaskForm for both add and edit actions.

4 Handling Local Storage

Challenge: Keeping tasks and filters persistent across page reloads.

Solution: Used useEffect to save tasks and filters to localStorage whenever they changed. Loaded them on app initialization.

5Theme Switching

Challenge: Implementing a light/dark theme toggle while saving user preference.

Solution: Created setupTheme utility that reads/writes theme from localStorage and applies it to document.body.

Challenge: Ensuring all components update visually when theme changes.

6 Validation and User Input

Challenge: Ensuring tasks have title, description, due date, and valid priority/status.

Solution: Added validateTask utility to check inputs before adding or editing. Displayed error messages in the form.

7 UI Layout Issues

Challenge: Displaying priority badges, status dropdown, and edit/delete buttons clearly without overlapping.

Solution: Used CSS flexbox and spacing. Styled priority badges separately and ensured select and buttons align correctly.

8 Asynchronous Updates

Challenge: React’s setState is asynchronous. Editing a task while filtering or sorting could temporarily show inconsistent results.

Solution: Always computed filtered + sorted tasks at render time rather than storing a separate sorted list in state.

9 Debugging

Challenge: Console was slow or cluttered, making it hard to debug sorting and filtering issues.

Solution: Added temporary logs in filterTask and sortTask functions. Tested with hardcoded tasks to ensure logic works before adding dynamic input.
Key Takeaways

Learned how to lift state up and pass handlers to manage complex interactions.

Understood filtering + sorting order and sequence matters.

Learned to persist state with localStorage.

Practiced form handling for both add and edit.

Learned responsive UI design for task display.
