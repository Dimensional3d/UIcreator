import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

export const BBVA_LOGO_URL =
  'https://www.bbva.mx/content/dam/library/logos/logo-bbva.svg';

@customElement('canvas-logo')
export class CanvasLogo extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .logo {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 8px;
      display: grid;
      place-items: center;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
  `;

  render() {
    return html`
      <div class="logo" aria-label="Logo BBVA">
        <img src=${BBVA_LOGO_URL} alt="Logo BBVA" draggable="false" />
      </div>
    `;
  }
}
