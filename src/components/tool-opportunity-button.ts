import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('tool-opportunity-button')
export class ToolOpportunityButton extends LitElement {
  @property({ type: Boolean })
  selected = false;

  private emitToolDragState(active: boolean) {
    this.dispatchEvent(
      new CustomEvent('tool-drag-state', {
        bubbles: true,
        composed: true,
        detail: {
          tool: 'opportunity-button',
          active,
        },
      }),
    );
  }

  private handleDragStart(event: DragEvent) {
    event.dataTransfer?.setData('application/x-ui-tool', 'opportunity-button');
    event.dataTransfer?.setData('text/plain', 'opportunity-button');
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
          tool: 'opportunity-button',
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
      width: 36px;
      height: 36px;
      border-radius: 12px;
      display: grid;
      place-items: center;
      background: rgba(45, 124, 255, 0.16);
      border: 1px solid rgba(45, 124, 255, 0.28);
      color: #d8e3ff;
    }

    .title {
      margin: 0;
      color: #ffffff;
      font-size: 0.88rem;
      font-family: var(--font-sans);
      font-weight: 500;
      white-space: nowrap;
    }

    svg {
      width: 18px;
      height: 18px;
      display: block;
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
          <svg viewBox="0 0 20 20" fill="none">
            <rect x="2.5" y="5" width="15" height="10" rx="5" fill="currentColor" fill-opacity="0.24" />
            <rect x="2.5" y="5" width="15" height="10" rx="5" stroke="currentColor" stroke-width="1.6" />
            <path d="M7 10h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
          </svg>
        </div>
        <p class="title">Opportunity Button</p>
      </article>
    `;
  }
}
