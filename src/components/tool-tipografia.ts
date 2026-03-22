import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { TypographyPreset } from './canvas-tipografia';

const PRESET_OPTIONS: Array<{ value: TypographyPreset; label: string }> = [
  { value: 'benton-book', label: 'Benton Sans Book' },
  { value: 'benton-medium', label: 'Benton Sans Medium' },
  { value: 'benton-medium-italic', label: 'Benton Sans Medium Italic' },
  { value: 'tiempos-headline', label: 'Tiempos Headline Bold' },
];

@customElement('tool-tipografia')
export class ToolTipografia extends LitElement {
  @property({ type: String })
  preset: TypographyPreset = 'benton-book';

  private emitToolDragState(active: boolean) {
    this.dispatchEvent(
      new CustomEvent('tool-drag-state', {
        bubbles: true,
        composed: true,
        detail: {
          tool: 'tipografia',
          preset: this.preset,
          active,
        },
      }),
    );
  }

  private handleDragStart(event: DragEvent) {
    event.dataTransfer?.setData('application/x-ui-tool', 'tipografia');
    event.dataTransfer?.setData('text/plain', 'tipografia');
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'copy';
    }
    this.emitToolDragState(true);
  }

  private handleDragEnd() {
    this.emitToolDragState(false);
  }

  private handleInsertRequest() {
    this.dispatchEvent(
      new CustomEvent('insert-tool', {
        bubbles: true,
        composed: true,
        detail: {
          tool: 'tipografia',
          preset: this.preset,
        },
      }),
    );
  }

  private handlePresetChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.dispatchEvent(
      new CustomEvent('tool-preset-change', {
        bubbles: true,
        composed: true,
        detail: {
          tool: 'tipografia',
          preset: select.value as TypographyPreset,
        },
      }),
    );
  }

  static styles = css`
    :host {
      display: block;
    }

    .card {
      cursor: grab;
      user-select: none;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 18px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.03));
      padding: 16px;
      display: grid;
      gap: 14px;
      transition:
        transform 160ms ease,
        border-color 160ms ease,
        background 160ms ease;
    }

    .card:hover {
      transform: translateY(-1px);
      border-color: rgba(132, 168, 255, 0.24);
      background: linear-gradient(180deg, rgba(132, 168, 255, 0.12), rgba(255, 255, 255, 0.04));
    }

    .card:active {
      cursor: grabbing;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .title,
    .badge,
    .control-label {
      margin: 0;
    }

    .title {
      color: #ffffff;
      font-size: 1rem;
      font-family: var(--font-display);
      font-weight: 700;
    }

    .badge {
      min-width: 40px;
      height: 40px;
      border-radius: 12px;
      display: grid;
      place-items: center;
      background: rgba(132, 168, 255, 0.16);
      border: 1px solid rgba(132, 168, 255, 0.25);
      color: #d8e3ff;
      font-size: 0.95rem;
      font-weight: 500;
      letter-spacing: 0.02em;
    }

    .preview {
      border-radius: 14px;
      padding: 14px;
      display: grid;
      gap: 10px;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.06);
    }

    .control {
      display: grid;
      gap: 6px;
    }

    .control-label {
      color: rgba(255, 255, 255, 0.62);
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    select {
      width: 100%;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.06);
      color: #ffffff;
      padding: 10px 12px;
      font: inherit;
      font-size: 0.88rem;
      outline: none;
      appearance: none;
    }

    .line {
      height: 9px;
      border-radius: 999px;
      background: rgba(216, 227, 255, 0.9);
    }

    .line.title {
      height: 12px;
      width: 64%;
    }

    .line.medium {
      width: 84%;
      opacity: 0.72;
    }

    .line.short {
      width: 48%;
      opacity: 0.52;
    }
  `;

  render() {
    return html`
      <article
        class="card"
        draggable="true"
        role="button"
        tabindex="0"
        @click=${this.handleInsertRequest}
        @dragstart=${this.handleDragStart}
        @dragend=${this.handleDragEnd}
      >
        <div class="header">
          <div>
            <p class="title">Textos</p>
          </div>
          <p class="badge">Aa</p>
        </div>

        <div class="preview" aria-hidden="true">
          <div class="line title"></div>
          <div class="line medium"></div>
          <div class="line short"></div>
        </div>

        <div class="control">
          <p class="control-label">Preset tipografico</p>
          <select .value=${this.preset} @change=${this.handlePresetChange} @click=${(event: Event) => event.stopPropagation()}>
            ${PRESET_OPTIONS.map(
              (option) =>
                html`<option value=${option.value}>${option.label}</option>`,
            )}
          </select>
        </div>
      </article>
    `;
  }
}
