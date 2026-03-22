import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { IconName } from './icon-library';
import './canvas-icon';

@customElement('canvas-icon-button')
export class CanvasIconButton extends LitElement {
  @property({ type: String })
  icon: IconName = 'search';

  @property({ type: Boolean })
  backgroundVisible = true;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .button {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: none;
      border-radius: 999px;
      background: rgba(19, 30, 68, 0.08);
      display: grid;
      place-items: center;
      padding: 0;
      cursor: pointer;
      transition: background 160ms ease, transform 160ms ease;
    }

    .button:hover {
      background: rgba(19, 30, 68, 0.12);
    }

    .button[data-background-visible='false'] {
      background: transparent;
    }

    .button[data-background-visible='false']:hover {
      background: transparent;
    }

    .button:active {
      transform: translateY(1px);
    }

    .button canvas-icon {
      width: 18px;
      height: 18px;
    }
  `;

  render() {
    return html`
      <button
        class="button"
        data-background-visible=${String(this.backgroundVisible)}
        type="button"
        aria-label="Icon button"
      >
        <canvas-icon .icon=${this.icon} .color=${'var(--color-primary-strong)'}></canvas-icon>
      </button>
    `;
  }
}
