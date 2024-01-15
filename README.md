# tha-ships

## Filtering:

The filtering operations have a time complexity of O(n), where n is the number of items in your array. This is because you iterate through each item once and apply the filtering condition.

## Sorting:

The sorting operation has a time complexity of O(n log n), where n is the number of items in your array. This is due to the use of the JavaScript `sort` method, which typically implements a comparison sort algorithm with an average and worst-case time complexity of O(n log n).

## Overall Complexity:

Combining filtering and sorting, the overall time complexity becomes dominated by the sorting operation, so it's O(n log n).

## Space Complexity:

The space complexity is relatively low, as you are primarily using additional space for the result arrays in the filtering and sorting operations. The space complexity is O(n) for the filtered arrays and O(1) for in-place sorting.

## Search Values Extraction:

The `getSearchValuesFromSearchString` function has a time complexity of O(m), where m is the length of the search string. The function splits the string and trims each value.

Overall, the implementation seems efficient. The time complexity is reasonable for the size of the data you're working with, and the space complexity is minimal. Keep in mind that the actual performance might vary based on the JavaScript engine used (e.g., V8 in Chrome, SpiderMonkey in Firefox). Additionally, if you have very large datasets, further optimizations might be considered.

# IDE Configuration

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
