# User Interface Creator
## Blueprint para replicarlo en React + Tailwind

## 1. Objetivo del proyecto

Este proyecto es un constructor visual de interfaces con enfoque tipo design builder. Permite:

- crear multiples lienzos
- alternar entre viewport `desktop` y `mobile`
- arrastrar componentes desde un panel de herramientas al lienzo
- editar propiedades del componente seleccionado desde el panel derecho
- anidar componentes dentro de contenedores
- crear moleculas a partir de contenedores personalizados
- cambiar a modo `codigo` y a modo `prototipo`
- navegar entre lienzos en modo prototipo usando acciones de botones

La implementacion actual esta hecha con `Lit + TypeScript + Vite`. Este documento describe la arquitectura y los datos necesarios para reconstruirlo en `React + Tailwind`.

---

## 2. Stack actual

- Framework UI: Lit
- Lenguaje: TypeScript
- Build tool: Vite
- Routing: hash routing simple
- Estilos: CSS plano con tokens globales
- Assets:
  - iconos SVG en `public/icons`
  - micro ilustraciones remotas de BBVA
  - logo BBVA remoto

Archivos clave actuales:

- Shell principal: `/Users/carloszavalasandoval/Library/Mobile Documents/com~apple~CloudDocs/Dimensional/clientesDimensional/UserIIntefaceCreactor/src/app-root.ts`
- Pantalla principal del builder: `/Users/carloszavalasandoval/Library/Mobile Documents/com~apple~CloudDocs/Dimensional/clientesDimensional/UserIIntefaceCreactor/src/screens/home-screen.ts`
- Router: `/Users/carloszavalasandoval/Library/Mobile Documents/com~apple~CloudDocs/Dimensional/clientesDimensional/UserIIntefaceCreactor/src/router/app-router.ts`
- Tokens: `/Users/carloszavalasandoval/Library/Mobile Documents/com~apple~CloudDocs/Dimensional/clientesDimensional/UserIIntefaceCreactor/src/styles/tokens.css`
- Libreria de iconos: `/Users/carloszavalasandoval/Library/Mobile Documents/com~apple~CloudDocs/Dimensional/clientesDimensional/UserIIntefaceCreactor/src/components/icon-library.ts`
- Libreria de micro ilustraciones: `/Users/carloszavalasandoval/Library/Mobile Documents/com~apple~CloudDocs/Dimensional/clientesDimensional/UserIIntefaceCreactor/src/components/micro-illustration-library.ts`

---

## 3. Resumen funcional de la UI

### Workspace

- Fondo general azul oscuro con patron de puntos.
- A la izquierda vive el stack de lienzos.
- A la derecha vive el panel de herramientas.
- Si el ancho de pantalla no alcanza, el panel se vuelve drawer lateral derecho.

### Header del area de lienzos

- Menu hamburguesa fijo a la izquierda con la lista de lienzos.
- Toggle de viewport `Desktop / Mobile`.
- Boton `+` para agregar lienzos.
- Cada lienzo tiene nombre visible encima del canvas.

### Panel de herramientas

Estados principales:

- `Herramientas`
- `Edicion`
- `Modo codigo`
- `Modo prototipo`
- `Edicion de lienzo`

Subsecciones:

- pestañas `Atomos` y `Moleculas`
- preview flotante temporal del componente al hacer clic en la lista
- formularios de edicion del componente seleccionado

---

## 4. Catalogo de componentes

### Atomos

1. `Contenedor`
2. `Textos`
3. `Main Button`
4. `Input Text`
5. `Icon Buton`
6. `Secondary Button`
7. `Opportunity Button`
8. `Icon`
9. `Logo`
10. `Micro ilustracion`
11. `Imagen`

### Moleculas

1. `Desktop Menu`
2. moleculas custom creadas por el usuario a partir de un contenedor

### Desktop Menu

La molecula `Desktop Menu` se compone de atomos reutilizables:

- logo BBVA
- textos de navegacion
- secondary button
- opportunity button
- icono de search
- icono de menu

---

## 5. Modelo de datos actual

El builder vive casi completo en `home-screen.ts`. Los tipos actuales son estos:

```ts
type CanvasTypographyItem = {
  id: string;
  parentId: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  order: number;
  preset: TypographyPreset;
  align: TypographyAlign;
  verticalAlign: TypographyVerticalAlign;
  bold: boolean;
  italic: boolean;
  color: string;
  fontSize: number;
  text: string;
};

type CanvasButtonItem = {
  id: string;
  parentId: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  order: number;
  variant: 'main' | 'secondary' | 'opportunity' | 'icon-button';
  label: string;
  action: string;
  fontSize: number;
  icon?: IconName;
  backgroundVisible?: boolean;
};

type CanvasInputTextItem = {
  id: string;
  parentId: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  order: number;
  label: string;
  value: string;
  icon: IconName;
  iconVisible: boolean;
  status: 'active' | 'inactive';
};

type CanvasIconItem = {
  id: string;
  parentId: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  order: number;
  icon: IconName;
  color: string;
};

type CanvasDesktopMenuItem = {
  id: string;
  parentId: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  order: number;
};

type CanvasLogoItem = {
  id: string;
  parentId: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  order: number;
};

type CanvasMicroIllustrationItem = {
  id: string;
  parentId: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  order: number;
  illustration: MicroIllustrationName;
};

type CanvasImageItem = {
  id: string;
  parentId: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  order: number;
  src: string;
  alt: string;
};

type CanvasContainerItem = {
  id: string;
  parentId: string | null;
  name: string;
  y: number;
  height: number;
  autoWidth: number;
  autoHeight: number;
  widthMode: 'manual' | 'auto';
  heightMode: 'manual' | 'auto';
  order: number;
  background: string;
  borderRadius: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  scrollEnabled: boolean;
  shadowEnabled: boolean;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  shadowSpread: number;
  shadowOpacity: number;
  shadowColor: string;
  desktopStart: number;
  desktopSpan: number;
  mobileStart: number;
  mobileSpan: number;
};

type CanvasScene = {
  canvasBackground: string;
  typographyItems: CanvasTypographyItem[];
  buttonItems: CanvasButtonItem[];
  inputTextItems: CanvasInputTextItem[];
  iconItems: CanvasIconItem[];
  desktopMenuItems: CanvasDesktopMenuItem[];
  logoItems: CanvasLogoItem[];
  microIllustrationItems: CanvasMicroIllustrationItem[];
  imageItems: CanvasImageItem[];
  containerItems: CanvasContainerItem[];
  nextTypographyId: number;
  nextButtonId: number;
  nextInputTextId: number;
  nextIconId: number;
  nextDesktopMenuId: number;
  nextLogoId: number;
  nextMicroIllustrationId: number;
  nextImageId: number;
  nextContainerId: number;
  nextCanvasOrder: number;
};

type CustomMolecule = {
  id: string;
  name: string;
  scene: CanvasScene;
};
```

### Observaciones importantes del modelo

- Todos los componentes tienen `parentId`.
- `parentId = null` significa que el item vive directo en el canvas.
- Si `parentId` apunta a un contenedor, el item vive dentro de ese contenedor.
- Los contenedores usan grid semantico:
  - desktop: 12 columnas
  - mobile: 4 columnas
- Los demas items usan posicion absoluta local.
- El orden visual se controla con `order`.

---

## 6. Estado global del builder

Estados clave actuales en `home-screen.ts`:

- `viewport: 'desktop' | 'mobile'`
- `isPrototypeMode`
- `isCanvasEditing`
- `isToolsDrawerMode`
- `isToolsDrawerOpen`
- `selectedToolPreview`
- `componentTab: 'atomos' | 'moleculas'`
- `customMolecules`
- `canvases`
- `activeCanvasId`
- `canvasScenes: Map<string, CanvasScene>`
- ids de seleccion por tipo:
  - selectedTypographyId
  - selectedButtonId
  - selectedInputTextId
  - selectedIconId
  - selectedContainerId
  - etc

### Recomendacion en React

Mover todo esto a un store global, por ejemplo con `Zustand`.

Sugerencia de slices:

- `builderUiSlice`
- `canvasSlice`
- `selectionSlice`
- `dragSlice`
- `prototypeSlice`
- `moleculesSlice`

---

## 7. Reglas de interaccion

### Seleccion

- Clic simple sobre un componente: selecciona y abre el modo `Edicion` del panel.
- Doble clic sobre texto: entra a edicion inline del texto.
- Doble clic sobre boton o icono: abre su configuracion especifica.

### Drag and drop

- Los atomos y moleculas se arrastran desde el panel al lienzo.
- Los items ya colocados tambien se pueden mover dentro del lienzo.
- Un componente puede soltarse dentro de un contenedor.
- Un contenedor puede contener otros contenedores si el destino es mayor que el arrastrado.

### Handlers

- Los handlers son cuadros blancos con borde azul.
- Miden `16px`.
- Se usan para resize.
- Los contenedores tienen handlers en las 4 esquinas.

### Tecla Delete

- Elimina el componente seleccionado.
- Excepciones:
  - si el usuario esta escribiendo en un campo del panel
  - si el usuario esta editando texto inline
  - si el foco esta en un input editable del panel

### Prototipo

- El panel se colapsa a header.
- `Play` cambia a boton rojo de cerrar.
- Los botones navegan a otros lienzos si su accion es `link`.
- Los links dentro de un texto solo funcionan en prototipo.
- `Input Text` solo se vuelve interactivo en prototipo.

### Codigo

- El modo codigo genera una representacion HTML inline del contenido del lienzo activo.

---

## 8. Comportamiento especifico por componente

## 8.1 Contenedor

Caracteristicas:

- fondo configurable con tokens o transparente
- radio configurable
- padding por lado
- drop shadow configurable
- scroll interno horizontal y vertical opcional
- width/height en modo manual o auto
- grid de 12 columnas desktop / 4 mobile
- puede contener otros componentes y otros contenedores

Defaults actuales:

- background: `transparent`
- borderRadius: `0`
- padding: `8px` por lado
- shadow: desactivado
- min-height visual: `1px`

## 8.2 Textos

Caracteristicas:

- presets tipograficos
- alineacion horizontal
- alineacion vertical
- tamaño de fuente
- bold e italic
- color desde tokens
- seleccion parcial para bold/italic
- soporte de links sobre seleccion
- pega texto plano sin estilos

Presets actuales:

- `benton-book`
- `benton-medium`
- `benton-medium-italic`
- `tiempos-headline`

## 8.3 Botones

Variantes:

- `Main Button`
- `Secondary Button`
- `Opportunity Button`
- `Icon Buton`

Reglas:

- border radius: `16px`
- padding horizontal minimo: `16px`
- no tienen ancho minimo
- tipografia: Benton Sans Medium
- tamaño actual del texto: `22px`
- alturas seleccionables en el panel: `55px` y `32px`
- todos pueden configurar accion tipo `link` hacia otro lienzo

Notas visuales:

- `Main Button`: azul con gradiente
- `Secondary Button`: fondo blanco, texto azul
- `Opportunity Button`: color primario, hover 20% mas oscuro
- `Icon Buton`: circular de `34px`, fondo gris translucido opcional

## 8.4 Input Text

Caracteristicas:

- ancho default actual: `320px`
- alto actual: `56px`
- borde gris inactivo
- borde azul en activo
- placeholder flotante
- icono opcional
- status `active/inactive`
- clear action cuando tiene contenido

Reglas:

- en modo edicion se selecciona y mueve, pero no toma foco real
- en modo prototipo si se comporta como input interactivo
- el placeholder regresa a su tamaño normal cuando el valor queda vacio

## 8.5 Icon

Caracteristicas:

- selector visual desde panel
- color editable desde tokens
- la fuente actual son archivos fisicos en `public/icons`
- el render se hace por `CSS mask`, no por inline SVG, para poder recolorizar

## 8.6 Logo

Caracteristicas:

- usa el logo BBVA
- padding interno minimo de `8px`
- en mobile ya corrige escalado para no cortarse

## 8.7 Micro ilustracion

Caracteristicas:

- selector desde panel
- usa imagenes remotas de BBVA

Valores actuales:

```ts
type MicroIllustrationName =
  | 'update-app'
  | 'dollar-large'
  | 'credit-card'
  | 'saving-dollar'
  | 'security'
  | 'qr-glass'
  | 'lightning'
  | 'solar-panel'
  | 'money-simulator'
  | 'payment-device-euro'
  | 'products-bancomer-opportunity-menu'
  | 'home-loan-opportunity-menu'
  | 'tc-start-menu'
  | 'future-investment-opportunity-menu';
```

## 8.8 Imagen

Caracteristicas:

- placeholder gris
- permite subir imagen
- luego muestra `img` con `object-fit: cover`

---

## 9. Sistema de lienzos

### Concepto

El proyecto trabaja con una lista de lienzos apilados verticalmente. Cada lienzo:

- tiene `id`
- tiene `name`
- tiene su `CanvasScene`
- puede ser destino de links

### Reglas actuales

- el usuario crea nuevos lienzos con `+`
- cada nuevo lienzo aparece debajo del anterior
- el menu fijo de lienzos a la izquierda hace scroll hasta el lienzo elegido
- al hacer scroll, el menu sincroniza el lienzo visible con el activo

### Estado sugerido en React

```ts
type CanvasTab = { id: string; name: string };

type BuilderState = {
  canvases: CanvasTab[];
  activeCanvasId: string;
  scenesByCanvasId: Record<string, CanvasScene>;
};
```

---

## 10. Tabs del panel de herramientas

### Atomos

- Contenedor
- Textos
- Main Button
- Input Text
- Icon Buton
- Secondary Button
- Opportunity Button
- Icon
- Logo
- Micro ilustracion
- Imagen

### Moleculas

- Desktop Menu
- moleculas custom guardadas desde contenedores

### Preview

- click en un item de la lista muestra preview flotante
- desaparece automaticamente tras algunos segundos
- arrastrar es lo que realmente inserta al lienzo

---

## 11. Tokens de diseño

Tokens actuales principales:

```css
--palette-neutral-0: #ffffff;
--palette-neutral-25: #f4f6f8;
--palette-brand-500: #2d7cff;
--palette-brand-600: #2f6fbe;
--palette-brand-700: #1829b8;
--palette-brand-900: #131e44;
--palette-brand-950: #0b102f;
--palette-warm-50: #fdf3dd;
--palette-sky-100: #c7dbef;
--palette-ink-700: #6d7890;
--palette-border-200: #d9e1ee;
```

Semanticos:

```css
--color-bg
--color-bg-strong
--color-surface
--color-surface-soft
--color-surface-accent
--color-surface-warm
--color-card
--color-panel
--color-text
--color-text-strong
--color-text-soft
--color-text-muted
--color-text-inverse
--color-primary
--color-primary-strong
--color-primary-soft
--color-primary-ink
--color-border
--color-dots
--color-link
--color-highlight
```

Tipografias:

- `Benton Sans BBVA`
- `Tiempos Headline`

Fuente actual:

- `/Users/carloszavalasandoval/Library/Mobile Documents/com~apple~CloudDocs/Dimensional/clientesDimensional/UserIIntefaceCreactor/src/styles/tokens.css`

---

## 12. Assets

### Iconos

- fuente actual de render: `public/icons/*.svg`
- total actual: `71`
- se consumen via `src` y se colorean con mascara CSS

Ruta:

- `/Users/carloszavalasandoval/Library/Mobile Documents/com~apple~CloudDocs/Dimensional/clientesDimensional/UserIIntefaceCreactor/public/icons`

### Micro ilustraciones

- siguen siendo URLs remotas
- recomendacion para React:
  - dejar una capa de metadata local
  - opcionalmente copiarlas a `public/micro-illustrations`

### Logo

- hoy usa URL remota de BBVA
- recomendacion: descargarlo y moverlo a `public/logo-bbva.svg`

---

## 13. Arquitectura recomendada en React + Tailwind

## 13.1 Stack recomendado

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Zustand para estado global
- React Router si despues quieres mas de una ruta real
- dnd-kit si quieres endurecer drag and drop
- Radix UI o Headless UI para dropdowns, modales y switches

## 13.2 Estructura sugerida

```txt
src/
  app/
    App.tsx
    router.tsx
  builder/
    components/
      canvas/
      tools/
      panels/
      preview/
    hooks/
      useBuilderStore.ts
      useCanvasSelection.ts
      usePrototypeMode.ts
      useCanvasDnD.ts
    state/
      builder-store.ts
      selectors.ts
    types/
      builder.ts
    utils/
      geometry.ts
      container-grid.ts
      codegen.ts
      icon-mask.ts
  assets/
  styles/
    globals.css
    tokens.css
public/
  icons/
  logo-bbva.svg
  micro-illustrations/
```

## 13.3 Mapeo Lit -> React

### Shell

- `app-root.ts` -> `App.tsx`
- `home-screen.ts` -> `BuilderPage.tsx`

### Atomos canvas

- `canvas-tipografia.ts` -> `TypographyCanvasItem.tsx`
- `canvas-contenedor.ts` -> `ContainerCanvasItem.tsx`
- `canvas-main-button.ts` -> `MainButtonCanvasItem.tsx`
- `canvas-secondary-button.ts` -> `SecondaryButtonCanvasItem.tsx`
- `canvas-opportunity-button.ts` -> `OpportunityButtonCanvasItem.tsx`
- `canvas-icon-button.ts` -> `IconButtonCanvasItem.tsx`
- `canvas-input-text.ts` -> `InputTextCanvasItem.tsx`
- `canvas-icon.ts` -> `IconCanvasItem.tsx`
- `canvas-logo.ts` -> `LogoCanvasItem.tsx`
- `canvas-micro-illustration.ts` -> `MicroIllustrationCanvasItem.tsx`
- `canvas-image.ts` -> `ImageCanvasItem.tsx`

### Tool cards

- `tool-*` -> tarjetas React dentro del panel izquierdo/derecho

### Librerias

- `icon-library.ts` -> `builder/config/icon-library.ts`
- `micro-illustration-library.ts` -> `builder/config/micro-illustration-library.ts`

---

## 14. Estrategia recomendada para implementar iconos en React

Como ya existe `public/icons`, la mejor forma en React es:

1. guardar metadata de cada icono:

```ts
type IconOption = {
  value: string;
  label: string;
  src: string;
};
```

2. renderizar el icono con `mask-image`

```tsx
function MaskIcon({
  src,
  color = 'var(--color-primary-strong)',
  className,
}: {
  src: string;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={className}
      aria-hidden="true"
      style={{
        backgroundColor: color,
        WebkitMask: `url(${src}) center / contain no-repeat`,
        mask: `url(${src}) center / contain no-repeat`,
      }}
    />
  );
}
```

Esto mantiene:

- cambio de color por token
- misma fuente unica de SVGs
- HTML mas limpio

---

## 15. Estrategia recomendada para contenedores en React

Separar dos conceptos:

### A. Datos del contenedor

- spans desktop/mobile
- padding
- background
- shadow
- borderRadius
- widthMode / heightMode
- scrollEnabled

### B. Layout real

Crear utilidades:

- `getContainerRect(container, viewport, canvasWidth)`
- `getContainerContentRect(container, rect)`
- `canNestContainer(dragged, target)`
- `resolveContainerCollision(containers)`

Tambien conviene tener:

- una lista flat de todos los items
- helpers para obtener arbol por `parentId`

---

## 16. Estrategia recomendada para texto editable en React

El texto actual usa `contenteditable`.

### Recomendacion

Mantener `contentEditable` en React solo para:

- edicion inline
- aplicar bold / italic parcial
- crear links sobre seleccion

Necesitaras helpers para:

- guardar y restaurar seleccion
- aplicar `document.execCommand` o Range API
- sanitizar el pegado como texto plano
- activar links solo en prototipo

Si despues quieres un editor mas robusto:

- Slate
- Lexical
- TipTap

Pero para replicar exactamente este proyecto, `contentEditable` + Range API es suficiente.

---

## 17. Codegen recomendado

El proyecto actual ya genera una vista HTML de los componentes del lienzo.

En React/Tailwind te recomiendo generar dos niveles:

### A. Preview HTML

Para mostrar al usuario el codigo rapido.

### B. Export React JSX

Con transformaciones como:

- estilos absolutos -> clases Tailwind + `style` para posicion
- iconos -> `MaskIcon`
- botones con accion -> props `onClick` o metadata `data-link-target`
- input -> componente reusable

Modulo sugerido:

- `src/builder/utils/codegen.ts`

Entradas:

- `CanvasScene`
- `viewport`
- metadata de assets

Salidas:

- `html`
- `jsx`
- `cssVariables`

---

## 18. Persistencia recomendada

Hoy las moleculas custom viven en memoria.

Para React, si quieres ir un paso adelante, agrega:

- `localStorage` para escenas y moleculas
- opcion futura de export/import JSON

Formato sugerido:

```ts
type BuilderSnapshot = {
  version: 1;
  canvases: CanvasTab[];
  scenesByCanvasId: Record<string, CanvasScene>;
  customMolecules: CustomMolecule[];
};
```

---

## 19. Roadmap para reconstruirlo en React + Tailwind

### Fase 1

- crear shell
- panel de herramientas fijo
- stack de lienzos
- viewport desktop/mobile
- fondo y tokens

### Fase 2

- store global
- data model
- render de todos los atomos
- seleccion simple

### Fase 3

- drag/drop
- movimiento
- resize con handlers
- nesting dentro de contenedores

### Fase 4

- paneles de edicion por componente
- modo codigo
- modo prototipo
- links entre lienzos

### Fase 5

- moleculas custom
- persistencia
- export React JSX

---

## 20. Checklist de paridad funcional

- [ ] multi-canvas
- [ ] desktop/mobile viewport
- [ ] panel de herramientas responsive
- [ ] preview flotante de componentes
- [ ] drag/drop al lienzo
- [ ] seleccion con click
- [ ] resize con handlers
- [ ] contenedores con grid 12/4
- [ ] nesting de componentes
- [ ] nesting de contenedores
- [ ] editor inline de texto
- [ ] bold/italic parcial
- [ ] links dentro de texto
- [ ] botones con link a otros lienzos
- [ ] input text con placeholder flotante
- [ ] iconos desde carpeta local
- [ ] micro ilustraciones
- [ ] logo
- [ ] modo codigo
- [ ] modo prototipo
- [ ] creacion de moleculas custom

---

## 21. Recomendacion final

Si quieres replicarlo en React + Tailwind sin perder control, la mejor estrategia es:

- mantener el mismo modelo de datos
- separar el builder en slices de estado
- usar Tailwind solo para layout, spacing, borders y colores
- mantener logica de geometria en utilidades puras
- usar componentes React pequeños por tipo de item
- usar la carpeta `public/icons` como fuente oficial unica de iconos

Si despues quieres, el siguiente paso natural es crear otro `.md` mas operativo con:

- estructura exacta de carpetas en React
- store de Zustand ya definido
- tipos TypeScript listos para copiar
- mapping de cada componente Lit a su equivalente React
- roadmap de implementacion sprint por sprint
