import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ui-button')
export class UIButton extends LitElement {
  @property({ type: String })
  label = 'Boton';

  static styles = css`
    button {
      border: none;
      border-radius: 999px;
      padding: 12px 18px;
      font: inherit;
      cursor: pointer;
      background: var(--color-primary);
      color: var(--color-primary-ink);
      font-weight: 700;
      transition: transform 140ms ease, filter 140ms ease;
    }

    button:hover {
      filter: brightness(1.08);
      transform: translateY(-1px);
    }

    button:active {
      transform: translateY(0);
    }
  `;

  render() {
    return html`<button type="button"><slot>${this.label}</slot></button>`;
  }
}
