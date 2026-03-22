# Boilerplate base para proyecto con Lit + TypeScript + HTML

> Nota: aunque muchas personas todavía dicen **"lit-element"**, hoy lo recomendado es instalar el paquete **`lit`** y usar `LitElement` desde ahí.

## Objetivo

Crear una base de proyecto que te permita construir **pantallas a partir de componentes reutilizables** usando:

- **Lit / LitElement**
- **TypeScript**
- **HTML declarativo con templates de Lit**
- **Vite** como entorno de desarrollo y build

Este boilerplate está pensado para:

- separar **pantallas** (`screens`) de **componentes compartidos** (`components`)
- tener un **shell principal** de app
- usar un **router simple por hash**
- escalar a un pequeño design system interno

---

## 1) Crear el proyecto

```bash
npm create vite@latest lit-screens-app -- --template lit-ts
cd lit-screens-app
npm install
npm run dev
```

---

## 2) Estructura recomendada

```txt
lit-screens-app/
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ ui-button.ts
│  │  └─ ui-card.ts
│  ├─ screens/
│  │  ├─ home-screen.ts
│  │  └─ settings-screen.ts
│  ├─ router/
│  │  └─ app-router.ts
│  ├─ styles/
│  │  └─ tokens.css
│  ├─ app-root.ts
│  ├─ main.ts
│  └─ vite-env.d.ts
├─ index.html
├─ package.json
├─ tsconfig.json
└─ vite.config.ts
```

---

## 3) Convención de arquitectura

### `components/`
Componentes reutilizables y pequeños.

Ejemplos:
- botones
- cards
- inputs
- headers
- modales

### `screens/`
Pantallas completas compuestas por varios componentes.

Ejemplos:
- dashboard
- login
- settings
- profile

### `router/`
Lógica de navegación.

### `app-root.ts`
Shell principal de la app. Aquí vive el layout general y el render de la pantalla activa.

---

## 4) Configuración de TypeScript

Usa este `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "strict": true,
    "noEmit": true,
    "allowJs": false,
    "isolatedModules": true,
    "skipLibCheck": true,
    "types": ["vite/client"]
  },
  "include": ["src/**/*.ts"]
}
```

---

## 5) `index.html`

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lit Screens App</title>
  </head>
  <body>
    <app-root></app-root>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

---

## 6) `src/main.ts`

```ts
import './app-root';
```

---

## 7) Tokens globales `src/styles/tokens.css`

```css
:root {
  --color-bg: #0f172a;
  --color-surface: #111827;
  --color-card: #1f2937;
  --color-text: #f9fafb;
  --color-muted: #94a3b8;
  --color-primary: #22c55e;
  --radius-md: 14px;
  --radius-lg: 20px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --shadow-md: 0 10px 30px rgba(0, 0, 0, 0.25);
  font-family: Inter, system-ui, sans-serif;
}

html,
body {
  margin: 0;
  min-height: 100%;
  background: var(--color-bg);
  color: var(--color-text);
}
```

---

## 8) Router simple `src/router/app-router.ts`

```ts
export type AppRoute = 'home' | 'settings';

const DEFAULT_ROUTE: AppRoute = 'home';

export function getCurrentRoute(): AppRoute {
  const hash = window.location.hash.replace('#/', '') as AppRoute;

  if (hash === 'home' || hash === 'settings') {
    return hash;
  }

  return DEFAULT_ROUTE;
}

export function goTo(route: AppRoute) {
  window.location.hash = `/${route}`;
}
```

---

## 9) Componente UI reutilizable `src/components/ui-button.ts`

```ts
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ui-button')
export class UIButton extends LitElement {
  @property({ type: String })
  label = 'Botón';

  static styles = css`
    button {
      border: none;
      border-radius: 999px;
      padding: 12px 18px;
      font: inherit;
      cursor: pointer;
      background: var(--color-primary);
      color: #052e16;
      font-weight: 700;
    }
  `;

  render() {
    return html`<button><slot>${this.label}</slot></button>`;
  }
}
```

---

## 10) Componente UI reutilizable `src/components/ui-card.ts`

```ts
import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ui-card')
export class UICard extends LitElement {
  static styles = css`
    .card {
      background: var(--color-card);
      border-radius: var(--radius-lg);
      padding: var(--space-6);
      box-shadow: var(--shadow-md);
    }
  `;

  render() {
    return html`<div class="card"><slot></slot></div>`;
  }
}
```

---

## 11) Pantalla `src/screens/home-screen.ts`

```ts
import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../components/ui-card';
import '../components/ui-button';

@customElement('home-screen')
export class HomeScreen extends LitElement {
  static styles = css`
    .stack {
      display: grid;
      gap: var(--space-4);
    }

    h2,
    p {
      margin: 0;
    }

    p {
      color: var(--color-muted);
    }
  `;

  render() {
    return html`
      <div class="stack">
        <ui-card>
          <h2>Home</h2>
          <p>Esta pantalla está compuesta por componentes reutilizables.</p>
        </ui-card>

        <ui-card>
          <ui-button label="Acción principal"></ui-button>
        </ui-card>
      </div>
    `;
  }
}
```

---

## 12) Pantalla `src/screens/settings-screen.ts`

```ts
import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../components/ui-card';

@customElement('settings-screen')
export class SettingsScreen extends LitElement {
  static styles = css`
    h2,
    p {
      margin: 0;
    }

    p {
      color: var(--color-muted);
    }
  `;

  render() {
    return html`
      <ui-card>
        <h2>Settings</h2>
        <p>Aquí puedes colocar configuración, preferencias o formularios.</p>
      </ui-card>
    `;
  }
}
```

---

## 13) Shell principal `src/app-root.ts`

```ts
import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getCurrentRoute, goTo, type AppRoute } from './router/app-router';
import './screens/home-screen';
import './screens/settings-screen';
import './styles/tokens.css';

@customElement('app-root')
export class AppRoot extends LitElement {
  @state()
  private route: AppRoute = getCurrentRoute();

  private onHashChange = () => {
    this.route = getCurrentRoute();
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('hashchange', this.onHashChange);
  }

  disconnectedCallback() {
    window.removeEventListener('hashchange', this.onHashChange);
    super.disconnectedCallback();
  }

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: var(--color-bg);
      color: var(--color-text);
    }

    .layout {
      max-width: 1100px;
      margin: 0 auto;
      padding: 24px;
      display: grid;
      gap: 24px;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    nav {
      display: flex;
      gap: 12px;
    }

    button {
      border: 1px solid #334155;
      background: #0b1220;
      color: white;
      border-radius: 999px;
      padding: 10px 14px;
      cursor: pointer;
      font: inherit;
    }
  `;

  private renderScreen() {
    switch (this.route) {
      case 'settings':
        return html`<settings-screen></settings-screen>`;
      case 'home':
      default:
        return html`<home-screen></home-screen>`;
    }
  }

  render() {
    return html`
      <div class="layout">
        <header>
          <div>
            <h1>Lit Screens App</h1>
            <p>Arquitectura basada en pantallas y componentes</p>
          </div>

          <nav>
            <button @click=${() => goTo('home')}>Home</button>
            <button @click=${() => goTo('settings')}>Settings</button>
          </nav>
        </header>

        <main>
          ${this.renderScreen()}
        </main>
      </div>
    `;
  }
}
```

---

## 14) Cómo crear una nueva pantalla

Cada nueva pantalla debe vivir en `src/screens/`.

Ejemplo:

```ts
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('profile-screen')
export class ProfileScreen extends LitElement {
  render() {
    return html`<h2>Profile</h2>`;
  }
}
```

Después:

1. la importas en `app-root.ts`
2. agregas la ruta al tipo `AppRoute`
3. la renderizas en el `switch`

---

## 15) Regla de diseño recomendada

Usa esta lógica:

- **si se reutiliza**, va en `components/`
- **si representa una vista completa**, va en `screens/`
- **si solo navega o resuelve estado global de pantalla**, va en `app-root.ts` o `router/`

---

## 16) Scripts útiles

En `package.json` normalmente tendrás algo como:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

---

## 17) Boilerplate mínimo final

Si quieres el resumen más corto posible, la base es:

- `app-root` = shell principal
- `screens/*` = pantallas
- `components/*` = piezas reutilizables
- `router/app-router.ts` = navegación
- `tokens.css` = variables globales

---

## 18) Recomendación importante

Aunque tu idea original dice **lit-element**, para un proyecto nuevo conviene usar:

```ts
import { LitElement, html, css } from 'lit';
```

y no:

```ts
import { LitElement, html, css } from 'lit-element';
```

---

## 19) Prompt/brief interno para generar más componentes con IA

Puedes usar este texto como instrucción base:

```md
Genera componentes en Lit con TypeScript siguiendo esta arquitectura:
- componentes reutilizables en /src/components
- pantallas completas en /src/screens
- usar decorators de Lit
- usar templates con html``
- usar estilos con css``
- mantener nombres kebab-case para custom elements
- evitar lógica de negocio en componentes UI pequeños
- preferir props reactivas tipadas
- respetar tokens globales CSS
- no usar frameworks extra
```

---

## 20) Siguiente evolución sugerida

Cuando este boilerplate ya funcione, puedes crecerlo con:

- estado global
- formularios
- consumo de APIs
- lazy loading de pantallas
- tests
- Storybook
- design tokens avanzados
- publicación de componentes compartidos como librería

---

## 21) Resumen

Este boilerplate te deja trabajar con una arquitectura muy clara:

- **Lit** para componentes
- **TypeScript** para tipado
- **Vite** para desarrollo y build
- **pantallas** compuestas por **componentes reutilizables**

Si quieres, el siguiente paso natural es que te entregue también el **boilerplate completo archivo por archivo** listo para copiar y pegar.
