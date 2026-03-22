import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('canvas-contenedor')
export class CanvasContenedor extends LitElement {
  @property({ type: String })
  background = 'transparent';

  @property({ type: Number })
  borderRadius = 0;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .container {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: 2px solid #2457ff;
      background: transparent;
    }
  `;

  render() {
    return html`
      <article
        class="container"
        aria-label="Contenedor"
        style=${`background:${this.background};border-radius:${this.borderRadius}px;`}
      ></article>
    `;
  }
}
