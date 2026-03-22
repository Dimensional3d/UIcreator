import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BBVA_LOGO_URL } from './canvas-logo';

@customElement('canvas-desktop-menu')
export class CanvasDesktopMenu extends LitElement {
  static styles = css`
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
      display: flex;
      align-items: center;
    }

    .logo-wrap img {
      display: block;
      width: auto;
      height: clamp(26px, 4vw, 48px);
      object-fit: contain;
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
      color: #0b1f8f;
      font-family: var(--font-sans);
      font-size: clamp(10px, 1.35vw, 15px);
      font-weight: 500;
      line-height: 1.1;
      letter-spacing: -0.01em;
      padding-bottom: 6px;
      border-bottom: 2px solid transparent;
    }

    .nav-link.active {
      color: #102694;
      border-bottom-color: #102694;
    }

    .actions {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      gap: clamp(10px, 1.6vw, 18px);
      white-space: nowrap;
    }

    .ghost-button,
    .primary-button,
    .menu-button,
    .icon-button {
      border: none;
      background: transparent;
      font: inherit;
      cursor: default;
      padding: 0;
    }

    .ghost-button,
    .primary-button {
      height: clamp(34px, 4.4vw, 56px);
      padding: 0 clamp(14px, 2vw, 26px);
      border-radius: 14px;
      font-family: var(--font-sans);
      font-size: clamp(11px, 1.35vw, 15px);
      font-weight: 500;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      letter-spacing: -0.01em;
    }

    .ghost-button {
      color: #1030a4;
      background: linear-gradient(180deg, #ffffff 0%, #f3f5fb 100%);
      box-shadow:
        inset 0 0 0 1px rgba(217, 225, 238, 0.98),
        0 10px 24px rgba(24, 37, 76, 0.08);
    }

    .primary-button {
      color: #ffffff;
      background: linear-gradient(180deg, #2d7cff 0%, #1462ee 100%);
      box-shadow: 0 14px 28px rgba(33, 94, 224, 0.24);
    }

    .icon-button,
    .menu-button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: #0f278f;
      font-family: var(--font-sans);
      font-size: clamp(11px, 1.3vw, 15px);
      font-weight: 500;
      line-height: 1;
    }

    .icon-button svg,
    .menu-button svg {
      width: clamp(18px, 2vw, 24px);
      height: clamp(18px, 2vw, 24px);
      display: block;
    }

    .menu-label {
      display: inline-block;
    }
  `;

  render() {
    return html`
      <header class="menu" aria-label="Desktop menu">
        <div class="logo-wrap">
          <img src=${BBVA_LOGO_URL} alt="BBVA" draggable="false" />
        </div>

        <nav class="nav" aria-label="Navegacion principal">
          <span class="nav-link active">Personas</span>
          <span class="nav-link">Empresas y Gobierno</span>
          <span class="nav-link">Pyme</span>
        </nav>

        <div class="actions">
          <button class="ghost-button" type="button">Acceso</button>
          <button class="primary-button" type="button">Hazte cliente</button>
          <button class="icon-button" type="button" aria-label="Buscar">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="1.8"></circle>
              <path
                d="M15.7 15.7L20 20"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              ></path>
              <path
                d="M10.5 7.8V10.7"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              ></path>
              <circle cx="10.5" cy="5.9" r="0.8" fill="currentColor"></circle>
            </svg>
          </button>
          <button class="menu-button" type="button">
            <span class="menu-label">Menú</span>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 7H20"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              ></path>
              <path
                d="M10 12H20"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              ></path>
              <path
                d="M4 17H20"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              ></path>
            </svg>
          </button>
        </div>
      </header>
    `;
  }
}
