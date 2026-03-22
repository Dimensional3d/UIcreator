import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('canvas-opportunity-button')
export class CanvasOpportunityButton extends LitElement {
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
      background: var(--color-primary);
      color: #ffffff;
      font-family: var(--font-sans);
      font-weight: 500;
      line-height: 1;
      letter-spacing: -0.01em;
      box-shadow: 0 16px 32px rgba(45, 124, 255, 0.22);
      padding: 0 28px;
      cursor: pointer;
      transition:
        background 160ms ease,
        transform 160ms ease,
        box-shadow 160ms ease;
    }

    .button:hover {
      background: #2463cc;
      box-shadow: 0 18px 34px rgba(24, 41, 184, 0.24);
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
