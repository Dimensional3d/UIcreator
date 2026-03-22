import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('home-screen')
export class HomeScreen extends LitElement {
  @state()
  private viewport: 'desktop' | 'mobile' = 'desktop';

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
    }

    .workspace {
      min-height: 100vh;
      padding: 24px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) 320px;
      gap: 24px;
      box-sizing: border-box;
    }

    .stage {
      min-height: calc(100vh - 48px);
      border: 1px solid rgba(217, 225, 238, 0.9);
      border-radius: 34px;
      padding: 28px;
      display: grid;
      place-items: center;
      background:
        radial-gradient(circle, var(--color-dots) 1.2px, transparent 1.2px),
        linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(245, 248, 252, 0.95));
      background-size: 24px 24px, auto;
      overflow: hidden;
      position: relative;
    }

    .canvas-shell {
      width: min(100%, 960px);
      min-height: 720px;
      margin-top: 8px;
      border-radius: 30px;
      padding: 18px;
      box-sizing: border-box;
      background: #ffffff;
      border: 1px solid rgba(217, 225, 238, 0.95);
      box-shadow: 0 24px 70px rgba(37, 52, 84, 0.12);
      transition: width 180ms ease;
    }

    .canvas-shell[data-mode='mobile'] {
      width: min(100%, 430px);
    }

    .canvas {
      min-height: 684px;
      border-radius: 24px;
      background: linear-gradient(180deg, #ffffff, #f9fbff);
      border: 1px solid rgba(217, 225, 238, 0.95);
      overflow: hidden;
      display: grid;
      grid-template-rows: auto 1fr;
    }

    .canvas-toolbar {
      padding: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      border-bottom: 1px solid rgba(217, 225, 238, 0.9);
      background: rgba(248, 250, 253, 0.96);
    }

    .segmented {
      display: inline-flex;
      padding: 4px;
      border-radius: 999px;
      background: #eef3fb;
      border: 1px solid rgba(217, 225, 238, 0.9);
      gap: 4px;
    }

    .segment-button {
      border: none;
      background: transparent;
      color: var(--color-muted);
      padding: 10px 16px;
      border-radius: 999px;
      font: inherit;
      font-weight: 700;
      cursor: pointer;
      transition: background 140ms ease, color 140ms ease, box-shadow 140ms ease;
    }

    .segment-button[data-active='true'] {
      background: var(--color-surface);
      color: var(--color-text);
      box-shadow: 0 6px 18px rgba(35, 55, 102, 0.1);
    }

    .canvas-meta {
      color: var(--color-muted);
      font-size: 0.9rem;
      font-weight: 700;
    }

    .canvas-body {
      padding: 28px;
      display: grid;
      place-items: center;
    }

    .page-preview {
      width: min(100%, 820px);
      min-height: 540px;
      border-radius: 24px;
      background: #ffffff;
      border: 1px dashed rgba(164, 176, 197, 0.8);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
      padding: 28px;
      box-sizing: border-box;
      display: grid;
      gap: 18px;
      align-content: start;
    }

    .page-preview[data-mode='mobile'] {
      width: 100%;
      max-width: 338px;
    }

    .preview-hero {
      height: 168px;
      border-radius: 20px;
      background: linear-gradient(135deg, #f4f7ff 0%, #eef3ff 100%);
      border: 1px solid rgba(217, 225, 238, 0.85);
      display: grid;
      align-content: center;
      gap: 12px;
      padding: 24px;
      box-sizing: border-box;
    }

    .preview-row {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
    }

    .preview-card {
      height: 112px;
      border-radius: 18px;
      background: #f8faff;
      border: 1px solid rgba(217, 225, 238, 0.85);
    }

    .preview-line {
      height: 12px;
      border-radius: 999px;
      background: #dbe5f5;
    }

    .preview-line.short {
      width: 36%;
    }

    .preview-line.medium {
      width: 58%;
    }

    .preview-line.long {
      width: 82%;
    }

    .tools-panel {
      align-self: start;
      min-height: calc(100vh - 48px);
      background: var(--color-surface);
      border: 1px solid rgba(217, 225, 238, 0.95);
      border-radius: 30px;
      box-shadow: var(--shadow-md);
      padding: 28px;
      box-sizing: border-box;
      display: grid;
      gap: 24px;
      align-content: start;
    }

    .panel-kicker,
    .panel-title,
    .panel-copy,
    .section-title,
    .item-label {
      margin: 0;
    }

    .panel-kicker {
      color: var(--color-primary);
      font-size: 0.82rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 800;
    }

    .panel-title {
      font-size: 1.45rem;
      line-height: 1.1;
      color: var(--color-text);
    }

    .panel-copy {
      color: var(--color-muted);
    }

    .tool-section {
      display: grid;
      gap: 12px;
    }

    .tool-group {
      border: 1px solid rgba(217, 225, 238, 0.95);
      border-radius: 20px;
      padding: 16px;
      background: #fbfcff;
      display: grid;
      gap: 12px;
    }

    .section-title {
      font-size: 0.95rem;
      color: var(--color-text);
      font-weight: 800;
    }

    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      color: var(--color-text);
      font-size: 0.94rem;
    }

    .item-label {
      font-weight: 700;
    }

    .item-value {
      color: var(--color-muted);
      font-weight: 700;
    }

    .placeholder {
      min-height: 120px;
      border-radius: 20px;
      border: 1px dashed rgba(176, 187, 206, 0.95);
      background: linear-gradient(180deg, #ffffff, #f8fbff);
    }

    @media (max-width: 1100px) {
      .workspace {
        grid-template-columns: 1fr;
      }

      .stage,
      .tools-panel {
        min-height: auto;
      }
    }

    @media (max-width: 720px) {
      .workspace {
        padding: 16px;
      }

      .stage,
      .tools-panel {
        border-radius: 24px;
        padding: 18px;
      }

      .canvas-shell {
        min-height: 620px;
        padding: 12px;
      }

      .canvas {
        min-height: 594px;
      }

      .canvas-toolbar {
        flex-direction: column;
        align-items: stretch;
      }

      .segmented {
        width: 100%;
      }

      .segment-button {
        flex: 1;
      }

      .preview-row {
        grid-template-columns: 1fr;
      }
    }
  `;

  render() {
    return html`
      <div class="workspace">
        <section class="stage">
          <div class="canvas-shell" data-mode=${this.viewport}>
            <div class="canvas">
              <div class="canvas-toolbar">
                <div class="segmented" aria-label="Viewport selector">
                  <button
                    class="segment-button"
                    data-active=${String(this.viewport === 'desktop')}
                    @click=${() => {
                      this.viewport = 'desktop';
                    }}
                  >
                    Desktop
                  </button>
                  <button
                    class="segment-button"
                    data-active=${String(this.viewport === 'mobile')}
                    @click=${() => {
                      this.viewport = 'mobile';
                    }}
                  >
                    Mobile
                  </button>
                </div>

                <span class="canvas-meta">
                  ${this.viewport === 'desktop' ? '1440 px' : '390 px'}
                </span>
              </div>

              <div class="canvas-body">
                <div class="page-preview" data-mode=${this.viewport}>
                  <div class="preview-hero">
                    <div class="preview-line short"></div>
                    <div class="preview-line long"></div>
                    <div class="preview-line medium"></div>
                  </div>

                  <div class="preview-row">
                    <div class="preview-card"></div>
                    <div class="preview-card"></div>
                    <div class="preview-card"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside class="tools-panel">
          <div class="tool-section">
            <p class="panel-kicker">Workspace</p>
            <h2 class="panel-title">Panel de herramientas</h2>
            <p class="panel-copy">
              Un espacio limpio para editar componentes y visualizar el lienzo.
            </p>
          </div>

          <div class="tool-group">
            <h3 class="section-title">Vista</h3>
            <div class="item">
              <p class="item-label">Modo activo</p>
              <span class="item-value">
                ${this.viewport === 'desktop' ? 'Desktop' : 'Mobile'}
              </span>
            </div>
            <div class="item">
              <p class="item-label">Lienzo</p>
              <span class="item-value">Listo</span>
            </div>
          </div>

          <div class="tool-group">
            <h3 class="section-title">Herramientas</h3>
            <div class="placeholder"></div>
          </div>
        </aside>
      </div>
    `;
  }
}
