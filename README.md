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

{/_ Active filter indicators _/}
<div className="active-filters">
{filters.status !== "all" && (
<span className="filter-badge">
Status: {filters.status}{" "}
<button onClick={() => clearFilter("status")}>×</button>
</span>
)}
{filters.priority !== "all" && (
<span className="filter-badge">
Priority: {filters.priority}{" "}
<button onClick={() => clearFilter("priority")}>×</button>
</span>
)}
{filters.search && (
<span className="filter-badge">
Search: "{filters.search}" <button onClick={() => clearFilter("search")}>×</button>
</span>
)}
</div>
</div>
);
}

----------------------- in Dashboard
{/_ Task statistics _/}
<UtilityDashboard tasks={tasks} />
</div>
import { filterTask, sortTask } from "../utils/utils";

const filteredTasks = filterTask(tasks, filters);
const sortedTasks = sortTask(filteredTasks, filters.sortBy);
Then render sortedTasks in your <TaskList>.

TaskForm.tsx → Uses validateTask
ts
Copy code
import { validateTask } from "../utils/utils";

const error = validateTask(formData);
if (error) {
   setError(error);
   return;
}


      
      ---------------------------

      But you never created filters or onChangeFilters inside Dashboard.

✔️ Missing:

filter state
filtered task logic
passing filters into list
