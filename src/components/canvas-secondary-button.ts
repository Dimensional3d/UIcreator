import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('canvas-secondary-button')
export class CanvasSecondaryButton extends LitElement {
  @property({ type: String })
  label = 'Conoce más';

  @property({ type: Number })
  fontSize = 22;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .button {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 18px;
      background: #ffffff;
      color: #1829b8;
      font-family: var(--font-sans);
      font-weight: 500;
      line-height: 1;
      letter-spacing: -0.01em;
      box-shadow: 0 16px 32px rgba(10, 19, 92, 0.14);
      padding: 0 28px;
      cursor: pointer;
      transition:
        background 160ms ease,
        color 160ms ease,
        transform 160ms ease,
        box-shadow 160ms ease;
    }

    .button:hover {
      background: #f5f7ff;
      color: #141c73;
      box-shadow: 0 18px 34px rgba(8, 14, 66, 0.18);
    }

    .button:active {
      transform: translateY(1px);
    }
  `;

  render() {
    return html`
      <button class="button" type="button" style=${`font-size:${this.fontSize}px;`}>
        ${this.label}
      </button>
    `;
  }
}
