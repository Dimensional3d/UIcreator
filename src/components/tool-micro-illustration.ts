import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './canvas-micro-illustration';

@customElement('tool-micro-illustration')
export class ToolMicroIllustration extends LitElement {
  @property({ type: Boolean })
  selected = false;

  private emitToolDragState(active: boolean) {
    this.dispatchEvent(
      new CustomEvent('tool-drag-state', {
        bubbles: true,
        composed: true,
        detail: {
          tool: 'micro-illustration',
          active,
        },
      }),
    );
  }

  private handleDragStart(event: DragEvent) {
    event.dataTransfer?.setData('application/x-ui-tool', 'micro-illustration');
    event.dataTransfer?.setData('text/plain', 'micro-illustration');
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'copy';
    }
    this.emitToolDragState(true);
  }

  private handleDragEnd() {
    this.emitToolDragState(false);
  }

  private handlePreviewRequest() {
    this.dispatchEvent(
      new CustomEvent('preview-tool', {
        bubbles: true,
        composed: true,
        detail: {
          tool: 'micro-illustration',
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
      padding: 12px 14px;
      display: flex;
      align-items: center;
      gap: 10px;
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

    .card[data-selected='true'] {
      border-color: rgba(132, 168, 255, 0.32);
      background: linear-gradient(180deg, rgba(132, 168, 255, 0.16), rgba(255, 255, 255, 0.05));
      box-shadow: 0 0 0 1px rgba(132, 168, 255, 0.18);
    }

    .badge {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      display: grid;
      place-items: center;
      background: rgba(255, 255, 255, 0.96);
      border: 1px solid rgba(217, 225, 238, 0.95);
      padding: 5px;
      box-sizing: border-box;
      overflow: hidden;
    }

    .title {
      margin: 0;
      color: #ffffff;
      font-size: 0.88rem;
      font-family: var(--font-sans);
      font-weight: 500;
      white-space: nowrap;
    }
  `;

  render() {
    return html`
      <article
        class="card"
        data-selected=${String(this.selected)}
        draggable="true"
        role="button"
        tabindex="0"
        @click=${this.handlePreviewRequest}
        @dragstart=${this.handleDragStart}
        @dragend=${this.handleDragEnd}
      >
        <div class="badge" aria-hidden="true">
          <canvas-micro-illustration .illustration=${'update-app'}></canvas-micro-illustration>
        </div>
        <p class="title">Micro ilustracion</p>
      </article>
    `;
  }
}
