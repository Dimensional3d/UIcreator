import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('canvas-contenedor')
export class CanvasContenedor extends LitElement {
  @property({ type: String })
  background = 'transparent';

  @property({ type: Number })
  borderRadius = 0;

  @property({ type: Boolean })
  outlined = false;

  @property({ type: Boolean })
  shadowEnabled = false;

  @property({ type: Number })
  shadowX = 0;

  @property({ type: Number })
  shadowY = 12;

  @property({ type: Number })
  shadowBlur = 32;

  @property({ type: Number })
  shadowSpread = 0;

  @property({ type: Number })
  shadowOpacity = 0.18;

  @property({ type: String })
  shadowColor = 'var(--color-bg)';

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
      background: transparent;
    }
  `;

  render() {
    const shadow = this.shadowEnabled
      ? `${this.shadowX}px ${this.shadowY}px ${this.shadowBlur}px ${this.shadowSpread}px color-mix(in srgb, ${this.shadowColor} ${Math.round(this.shadowOpacity * 100)}%, transparent)`
      : 'none';

    return html`
      <article
        class="container"
        aria-label="Contenedor"
        style=${`background:${this.background};border-radius:${this.borderRadius}px;box-shadow:${shadow};border:${this.outlined ? '2px solid #2457ff' : 'none'};`}
      ></article>
    `;
  }
}
