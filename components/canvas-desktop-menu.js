import{i as e}from"../node_modules/@lit/reactive-element/css-tag.js";import{b as t}from"../node_modules/lit-html/lit-html.js";import{i as n}from"../node_modules/lit-element/lit-element.js";import"../node_modules/lit/index.js";import{t as r}from"../node_modules/@lit/reactive-element/decorators/custom-element.js";import"../node_modules/lit/decorators.js";import{__decorate as i}from"../_virtual/_@oxc-project_runtime@0.120.0/helpers/decorate.js";import"./canvas-tipografia.js";import"./canvas-icon.js";import"./canvas-logo.js";import"./canvas-opportunity-button.js";import"./canvas-secondary-button.js";var a=class extends n{static{this.styles=e`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .menu {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: clamp(12px, 2vw, 26px);
      padding: clamp(12px, 2vw, 22px) clamp(16px, 2.4vw, 30px);
      border-radius: 28px;
      background: #ffffff;
      box-shadow: 0 14px 34px rgba(24, 37, 76, 0.1);
      overflow: hidden;
    }

    .logo-wrap {
      flex: 0 0 auto;
      width: clamp(96px, 14vw, 146px);
      height: clamp(24px, 3.4vw, 38px);
    }

    .nav {
      flex: 1 1 auto;
      min-width: 0;
      display: flex;
      align-items: center;
      gap: clamp(10px, 1.8vw, 26px);
      overflow: hidden;
      white-space: nowrap;
    }

    .nav-link {
      display: inline-grid;
      align-items: center;
      letter-spacing: -0.01em;
      padding-bottom: 6px;
      border-bottom: 2px solid transparent;
    }

    .nav-link.active {
      border-bottom-color: #102694;
    }

    .nav-link canvas-tipografia {
      width: 100%;
      height: 18px;
    }

    .actions {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      gap: clamp(10px, 1.6vw, 18px);
      white-space: nowrap;
    }

    .ghost-button,
    .primary-button {
      flex: 0 0 auto;
      height: clamp(34px, 4.4vw, 56px);
    }

    .ghost-button {
      width: clamp(88px, 10vw, 124px);
    }

    .primary-button {
      width: clamp(118px, 14vw, 170px);
    }

    .icon-button,
    .menu-button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .icon-button canvas-icon,
    .menu-button canvas-icon {
      width: clamp(18px, 2vw, 24px);
      height: clamp(18px, 2vw, 24px);
      display: block;
    }

    .menu-label {
      width: clamp(34px, 4.2vw, 46px);
      height: 18px;
    }
  `}render(){return t`
      <header class="menu" aria-label="Desktop menu">
        <div class="logo-wrap">
          <canvas-logo></canvas-logo>
        </div>

        <nav class="nav" aria-label="Navegacion principal">
          <span class="nav-link active">
            <canvas-tipografia
              .itemId=${`desktop-menu-personas`}
              .preset=${`benton-medium`}
              .text=${`Personas`}
              .align=${`left`}
              .bold=${!0}
              .italic=${!1}
              .color=${`var(--color-primary-strong)`}
              .fontSize=${16}
              .editing=${!1}
            ></canvas-tipografia>
          </span>
          <span class="nav-link">
            <canvas-tipografia
              .itemId=${`desktop-menu-empresas`}
              .preset=${`benton-medium`}
              .text=${`Empresas y Gobierno`}
              .align=${`left`}
              .bold=${!1}
              .italic=${!1}
              .color=${`var(--color-primary-strong)`}
              .fontSize=${16}
              .editing=${!1}
            ></canvas-tipografia>
          </span>
          <span class="nav-link">
            <canvas-tipografia
              .itemId=${`desktop-menu-pyme`}
              .preset=${`benton-medium`}
              .text=${`Pyme`}
              .align=${`left`}
              .bold=${!1}
              .italic=${!1}
              .color=${`var(--color-primary-strong)`}
              .fontSize=${16}
              .editing=${!1}
            ></canvas-tipografia>
          </span>
        </nav>

        <div class="actions">
          <div class="ghost-button">
            <canvas-secondary-button .label=${`Acceso`} .fontSize=${16}></canvas-secondary-button>
          </div>
          <div class="primary-button">
            <canvas-opportunity-button
              .label=${`Hazte cliente`}
              .fontSize=${16}
            ></canvas-opportunity-button>
          </div>
          <span class="icon-button" aria-label="Buscar">
            <canvas-icon .icon=${`search`}></canvas-icon>
          </span>
          <span class="menu-button">
            <span class="menu-label">
              <canvas-tipografia
                .itemId=${`desktop-menu-menu`}
                .preset=${`benton-medium`}
                .text=${`Menú`}
                .align=${`left`}
                .bold=${!1}
                .italic=${!1}
                .color=${`var(--color-primary-strong)`}
                .fontSize=${16}
                .editing=${!1}
              ></canvas-tipografia>
            </span>
            <canvas-icon .icon=${`menu`}></canvas-icon>
          </span>
        </div>
      </header>
    `}};a=i([r(`canvas-desktop-menu`)],a);