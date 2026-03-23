import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { IconName } from './icon-library';
import './canvas-icon';

@customElement('canvas-input-text')
export class CanvasInputText extends LitElement {
  @property({ type: String })
  itemId = '';

  @property({ type: String })
  label = 'Placeholder';

  @property({ type: String })
  value = '';

  @property({ type: String })
  icon: IconName = 'eye-off';

  @property({ type: Boolean })
  iconVisible = true;

  @property({ type: String })
  status: 'active' | 'inactive' = 'inactive';

  @property({ type: Boolean })
  enabled = false;

  private handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dispatchEvent(
      new CustomEvent('input-text-change', {
        bubbles: true,
        composed: true,
        detail: {
          id: this.itemId,
          value: input.value,
        },
      }),
    );
  }

  private handleFocus() {
    this.dispatchEvent(
      new CustomEvent('input-text-focus', {
        bubbles: true,
        composed: true,
        detail: {
          id: this.itemId,
        },
      }),
    );
  }

  private handleClearValue() {
    this.dispatchEvent(
      new CustomEvent('input-text-change', {
        bubbles: true,
        composed: true,
        detail: {
          id: this.itemId,
          value: '',
        },
      }),
    );
    this.updateComplete.then(() => {
      this.renderRoot.querySelector('input')?.focus();
    });
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .field {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 56px;
      box-sizing: border-box;
      border: 1.5px solid rgba(19, 30, 68, 0.42);
      border-radius: 16px;
      background: var(--color-surface);
      padding: 8px 14px 8px 18px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
      transition:
        border-color 160ms ease,
        box-shadow 160ms ease,
        background-color 160ms ease;
    }

    .field[data-has-actions='false'] {
      grid-template-columns: minmax(0, 1fr);
    }

    .field[data-status='active'] {
      border-color: var(--color-primary);
    }

    .field[data-enabled='false'] .content,
    .field[data-enabled='false'] .actions {
      pointer-events: none;
    }

    .field:focus-within {
      border-color: var(--color-primary);
      box-shadow: none;
    }

    .content {
      min-width: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 4px;
      overflow: hidden;
    }

    .label {
      margin: 0;
      color: var(--color-text-muted);
      font-family: var(--font-sans);
      font-size: 16px;
      font-weight: 400;
      line-height: 1;
      pointer-events: none;
      transition:
        color 160ms ease,
        font-size 160ms ease,
        line-height 160ms ease;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .field[data-floating='true'] .label {
      font-size: 11px;
      line-height: 1;
    }

    .input {
      width: 100%;
      min-width: 0;
      box-sizing: border-box;
      border: none;
      outline: none;
      background: transparent;
      color: var(--color-text);
      font-family: var(--font-sans);
      font-size: 16px;
      font-weight: 500;
      padding: 0;
      line-height: 1;
      opacity: 0;
      transition: opacity 160ms ease;
    }

    .field[data-floating='true'] .input,
    .field[data-filled='true'] .input,
    .field:focus-within .input {
      opacity: 1;
    }

    .input::placeholder {
      color: transparent;
    }

    .actions {
      display: inline-flex;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;
    }

    .action-button {
      width: 24px;
      height: 24px;
      border: none;
      background: transparent;
      color: inherit;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      cursor: pointer;
    }

    .action-button svg {
      width: 20px;
      height: 20px;
      display: block;
      color: var(--color-primary-strong);
    }

    .icon-slot {
      width: 24px;
      height: 24px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
      pointer-events: none;
    }

    .icon-slot canvas-icon {
      width: 20px;
      height: 20px;
    }
  `;

  render() {
    const isFilled = this.value.trim().length > 0;
    const isFloating = isFilled || this.status === 'active';
    const hasActions = isFilled || this.iconVisible;

    return html`
      <label
        class="field"
        data-filled=${String(isFilled)}
        data-floating=${String(isFloating)}
        data-status=${this.status}
        data-enabled=${String(this.enabled)}
        data-has-actions=${String(hasActions)}
      >
        <div class="content">
          <span class="label">${this.label}</span>
          <input
            class="input"
            type="text"
            .value=${this.value}
            placeholder=${this.label}
            ?readOnly=${!this.enabled}
            tabindex=${this.enabled ? '0' : '-1'}
            @input=${this.handleInput}
            @focus=${this.handleFocus}
          />
        </div>
        ${hasActions
          ? html`<div class="actions">
          ${isFilled
            ? html`
                <button
                  class="action-button"
                  type="button"
                  aria-label="Limpiar campo"
                  @click=${this.handleClearValue}
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      stroke-width="1.9"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              `
            : null}
          ${this.iconVisible
            ? html`<span class="icon-slot" aria-hidden="true">
                <canvas-icon .icon=${this.icon}></canvas-icon>
              </span>`
            : null}
        </div>`
          : null}
      </label>
    `;
  }
}
