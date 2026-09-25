# Stencil Core Patch

The patch changes two things in `@stencil/core`:

1. [CSS module declaration](#why-this-patch-exists): comments out the broad `*.css` module declaration in `internal/stencil-ext-modules.d.ts`.
2. [Host classes after hydration](#host-classes-after-hydration): keeps the host classes of child components on the first client render after server-side rendering, in `internal/client/index.js`.

## Why This Patch Exists

This patch modifies `@stencil/core@4.38.3` to comment out the broad `*.css` module declaration in `internal/stencil-ext-modules.d.ts`.

### The Problem

1. **Monorepo Structure**: `@siemens/ix` (core) is built with Stencil and exports Stencil's type definitions
2. **Transitive Types**: When packages like `ionic-test-app` import `@siemens/ix-react`, they transitively get Stencil's types
3. **Type Conflict**: Stencil declares `declare module '*.css'` which returns `string`
4. **CSS Modules Break**: TypeScript's wildcard matching means `*.css` matches `*.module.css` files, preventing proper CSS Module support
5. **Vite Incompatibility**: Vite expects CSS Modules (`*.module.css`) to have type `{ readonly [key: string]: string }`, not `string`

### Why Not Other Solutions?

- **TypeScript `paths`**: Doesn't work for internal Stencil modules
- **`skipLibCheck`**: Already enabled but doesn't help with ambient module declarations  
- **Redeclaring modules**: TypeScript's "first match wins" means `*.css` always matches before `*.module.css`
- **`typeRoots`**: Can't selectively exclude specific files from node_modules packages
- **Fixing at source**: Would require Stencil upstream changes or not exporting these types from `@siemens/ix`

### What This Patch Does

Comments out the `declare module '*.css'` statement while preserving other useful declarations (svg, txt, etc.). This allows:
- CSS Modules (*.module.css) to work correctly with Vite's typing
- Other file imports (svg, txt) to continue working
- No breaking changes to Stencil-based components

### Alternative

If you want to avoid patches entirely, the only option is to:
1. Not use CSS Modules in packages that depend on `@siemens/ix-react`
2. Or publish `@siemens/ix` without Stencil's internal types (requires build config changes)

## References

- Stencil issue: https://github.com/ionic-team/stencil/issues/3315
- Related pnpm monorepo type issues with Stencil

## Host Classes After Hydration

### The Problem

When a page rendered with `@siemens/ix/hydrate` hydrates on the client, Stencil seeds the old vnode of every child element with the element's full server `className`. With the custom elements build, a child component (e.g. `ix-dropdown-item`) is defined, hydrated and rendered before its parent (e.g. `ix-select-item`). On the parent's first render, `setAccessor` then removes every class the parent does not set itself, including the classes the child set on its own host (`disabled`, `ix-focusable`) and the `hydrated` flag. Nothing adds them again, so e.g. a disabled `ix-select-item` looks enabled.

### What This Patch Does

On the first render after hydration, `setAccessor` keeps the classes that an already rendered child component set on its own `<Host>`, and its hydrated flag. Classes the parent rendered on the server but not on the client are still removed.

### Removal

The same change is proposed for Stencil in `src/runtime/vdom/set-accessor.ts`. Remove this part of the patch once IX depends on a Stencil release that contains it.
