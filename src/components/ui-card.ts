import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ui-card')
export class UICard extends LitElement {
  static styles = css`
    .card {
      background: var(--color-card);
      border: 1px solid rgba(148, 163, 184, 0.14);
      border-radius: var(--radius-lg);
      padding: var(--space-6);
      box-shadow: var(--shadow-md);
    }
  `;

  render() {
    return html`<div class="card"><slot></slot></div>`;
  }
}
