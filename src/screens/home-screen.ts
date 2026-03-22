import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import {
  TYPOGRAPHY_PRESET_OPTIONS,
  type TypographyAlign,
  type TypographyPreset,
} from '../components/canvas-tipografia';
import '../components/canvas-tipografia';
import '../components/tool-tipografia';

type CanvasTypographyItem = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  preset: TypographyPreset;
  align: TypographyAlign;
  bold: boolean;
  italic: boolean;
  fontSize: number;
  text: string;
};

type CanvasItemDragState = {
  id: string;
  offsetX: number;
  offsetY: number;
  canvasWidth: number;
  canvasHeight: number;
  itemWidth: number;
  itemHeight: number;
};

@customElement('home-screen')
export class HomeScreen extends LitElement {
  @state()
  private viewport: 'desktop' | 'mobile' = 'desktop';

  @state()
  private isViewportTransitioning = false;

  @state()
  private isCanvasDragActive = false;

  @state()
  private activeDraggedTool: string | null = null;

  @state()
  private toolTypographyPreset: TypographyPreset = 'benton-book';

  @state()
  private typographyItems: CanvasTypographyItem[] = [];

  @state()
  private selectedTypographyId: string | null = null;

  @state()
  private editingTypographyId: string | null = null;

  private viewportAnimationTimeout?: number;
  private nextTypographyId = 1;
  private dragState: CanvasItemDragState | null = null;
  private resizeObserver?: ResizeObserver;

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
    }

    .workspace[data-dragging='true'] {
      cursor: grabbing;
    }

    .workspace[data-dragging='true'] * {
      cursor: grabbing !important;
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
      border: none;
      border-radius: 0;
      padding: 0;
      display: grid;
      justify-items: center;
      align-items: start;
      background: radial-gradient(circle, var(--color-dots) 1.1px, transparent 1.1px);
      background-size: 16px 16px;
      overflow: visible;
    }

    .canvas-frame {
      width: min(100%, 960px);
      min-height: 820px;
      margin-top: 8px;
      display: grid;
      gap: 8px;
      transition: width 280ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    .canvas-frame[data-mode='mobile'] {
      width: min(100%, 430px);
    }

    .canvas-controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .canvas-title {
      margin: 0;
      color: #ffffff;
      font-size: 1rem;
      font-family: var(--font-display);
      font-weight: 700;
      letter-spacing: 0.01em;
    }

    .canvas-controls-right {
      display: flex;
      justify-content: flex-end;
    }

    .canvas-shell {
      width: 100%;
      min-height: 780px;
      border-radius: 30px;
      padding: 0;
      box-sizing: border-box;
      background: transparent;
      border: none;
      box-shadow: none;
      transition:
        transform 280ms cubic-bezier(0.22, 1, 0.36, 1),
        opacity 220ms ease;
    }

    .canvas {
      min-height: 780px;
      border-radius: 24px;
      background: linear-gradient(180deg, #ffffff, #f9fbff);
      border: 1px solid rgba(217, 225, 238, 0.95);
      overflow: hidden;
      display: flex;
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

    .canvas-body {
      width: 100%;
      flex: 1;
    }

    .page-preview {
      width: 100%;
      min-height: 100%;
      height: 100%;
      border-radius: 0;
      background:
        radial-gradient(circle, rgba(36, 87, 255, 0.16) 1px, transparent 1px),
        #ffffff;
      background-size: 8px 8px;
      border: none;
      box-shadow: none;
      padding: 0;
      box-sizing: border-box;
      display: block;
      position: relative;
      transition:
        width 280ms cubic-bezier(0.22, 1, 0.36, 1),
        max-width 280ms cubic-bezier(0.22, 1, 0.36, 1),
        transform 280ms cubic-bezier(0.22, 1, 0.36, 1),
        opacity 220ms ease,
        background-color 180ms ease;
    }

    .page-preview[data-drag-active='true'] {
      background:
        radial-gradient(circle, rgba(36, 87, 255, 0.22) 1px, transparent 1px),
        #f8fbff;
      background-size: 8px 8px;
    }

    .page-preview-empty {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      pointer-events: none;
      color: rgba(19, 30, 68, 0.44);
      font-size: 0.92rem;
      font-weight: 500;
      letter-spacing: 0.01em;
    }

    .canvas-item {
      position: absolute;
      z-index: 1;
      min-width: 220px;
      min-height: 72px;
      resize: both;
      overflow: hidden;
      cursor: text;
      outline: 1px solid transparent;
      transition: outline-color 140ms ease, box-shadow 140ms ease;
      touch-action: none;
    }

    .canvas-item[data-selected='true'] {
      outline-color: #2457ff;
      box-shadow: 0 0 0 3px rgba(36, 87, 255, 0.18);
    }

    .canvas-item::after {
      content: '';
      position: absolute;
      right: 6px;
      bottom: 6px;
      width: 12px;
      height: 12px;
      border-right: 2px solid rgba(19, 30, 68, 0.25);
      border-bottom: 2px solid rgba(19, 30, 68, 0.25);
      opacity: 0;
      pointer-events: none;
      transition: opacity 140ms ease;
    }

    .canvas-item:hover::after {
      opacity: 1;
    }

    .handle {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 3px;
      background: #ffffff;
      border: 2px solid #2457ff;
      box-sizing: border-box;
      opacity: 0;
      pointer-events: none;
      transition: opacity 140ms ease;
    }

    .canvas-item[data-selected='true'] .handle {
      opacity: 1;
    }

    .handle.top-left {
      top: -6px;
      left: -6px;
    }

    .handle.top-right {
      top: -6px;
      right: -6px;
    }

    .handle.bottom-left {
      bottom: -6px;
      left: -6px;
    }

    .handle.bottom-right {
      bottom: -6px;
      right: -6px;
    }

    .canvas-frame[data-mode='mobile'] .canvas-item {
      min-width: 184px;
    }

    .canvas-frame[data-transitioning='true'] .canvas-shell,
    .canvas-frame[data-transitioning='true'] .page-preview {
      opacity: 0.72;
      transform: scale(0.985);
    }

    .tools-panel {
      align-self: start;
      min-height: calc(100vh - 48px);
      background: #000000;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 30px;
      box-shadow: 0 18px 45px rgba(0, 0, 0, 0.32);
      padding: 28px;
      box-sizing: border-box;
      display: grid;
      gap: 24px;
      align-content: start;
    }

    .panel-title,
    .section-title {
      margin: 0;
    }

    .panel-title {
      font-size: 1.45rem;
      line-height: 1.1;
      color: #ffffff;
      font-family: var(--font-display);
      font-weight: 700;
    }

    .tool-section {
      display: grid;
      gap: 12px;
    }

    .panel-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .panel-action {
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.06);
      color: #ffffff;
      width: 36px;
      height: 36px;
      padding: 0;
      display: inline-grid;
      place-items: center;
      font: inherit;
      font-size: 0.82rem;
      cursor: pointer;
    }

    .tool-group {
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      padding: 16px;
      background: rgba(255, 255, 255, 0.04);
      display: grid;
      gap: 12px;
    }

    .tool-group.components-group {
      padding-left: 8px;
      padding-right: 8px;
    }

    .section-title {
      font-size: 0.95rem;
      color: #ffffff;
      font-weight: 500;
    }

    .editor-stack {
      display: grid;
      gap: 14px;
    }

    .editor-row {
      display: grid;
      gap: 8px;
    }

    .editor-label {
      margin: 0;
      color: rgba(255, 255, 255, 0.68);
      font-size: 0.74rem;
      font-weight: 500;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .editor-select {
      width: 100%;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.06);
      color: #ffffff;
      padding: 10px 12px;
      font: inherit;
      font-size: 0.88rem;
      outline: none;
    }

    .editor-select option {
      color: #172033;
    }

    .editor-actions {
      display: flex;
      gap: 8px;
    }

    .editor-range-wrap {
      display: grid;
      gap: 8px;
    }

    .editor-range-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .editor-range-value {
      color: #ffffff;
      font-size: 0.84rem;
      font-weight: 500;
    }

    .editor-range {
      width: 100%;
      accent-color: #84a8ff;
      cursor: pointer;
    }

    .editor-button {
      flex: 1;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.04);
      color: #ffffff;
      padding: 10px 12px;
      font: inherit;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 140ms ease, border-color 140ms ease;
    }

    .editor-button[data-active='true'] {
      background: rgba(132, 168, 255, 0.18);
      border-color: rgba(132, 168, 255, 0.28);
    }

    .align-icon {
      display: block;
      width: 18px;
      height: 18px;
      margin: 0 auto;
      color: currentColor;
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

      .stage {
        padding: 0;
      }

      .tools-panel {
        border-radius: 24px;
        padding: 18px;
      }

      .canvas-frame {
        min-height: 700px;
      }

      .canvas {
        min-height: 660px;
      }

      .segmented {
        width: 100%;
      }

      .canvas-controls {
        flex-direction: column;
        align-items: stretch;
      }

      .canvas-controls-right {
        width: 100%;
      }

      .segment-button {
        flex: 1;
      }
    }
  `;

  disconnectedCallback() {
    window.clearTimeout(this.viewportAnimationTimeout);
    window.removeEventListener('pointermove', this.handleWindowPointerMove);
    window.removeEventListener('pointerup', this.handleWindowPointerUp);
    this.resizeObserver?.disconnect();
    super.disconnectedCallback();
  }

  protected firstUpdated() {
    this.resizeObserver = new ResizeObserver((entries) => {
      const updates = new Map<string, { width: number; height: number }>();

      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        const itemId = element.dataset.itemId;
        if (!itemId) {
          continue;
        }

        updates.set(itemId, {
          width: Math.round(entry.contentRect.width),
          height: Math.round(entry.contentRect.height),
        });
      }

      if (updates.size === 0) {
        return;
      }

      let didChange = false;
      const nextItems = this.typographyItems.map((item) => {
        const nextSize = updates.get(item.id);
        if (!nextSize) {
          return item;
        }

        if (item.width === nextSize.width && item.height === nextSize.height) {
          return item;
        }

        didChange = true;
        return { ...item, width: nextSize.width, height: nextSize.height };
      });

      if (didChange) {
        this.typographyItems = nextItems;
      }
    });
  }

  protected updated() {
    if (!this.resizeObserver) {
      return;
    }

    this.resizeObserver.disconnect();
    this.renderRoot.querySelectorAll<HTMLElement>('.canvas-item').forEach((element) => {
      this.resizeObserver?.observe(element);
    });
  }

  private getDefaultFontSize(preset: TypographyPreset) {
    return preset === 'tiempos-headline' ? 42 : 32;
  }

  private createTypographyItem(x: number, y: number) {
    const width = this.viewport === 'mobile' ? 208 : 240;
    const height = 120;
    this.typographyItems = [
      ...this.typographyItems,
      {
        id: `typo-${this.nextTypographyId++}`,
        x,
        y,
        width,
        height,
        preset: this.toolTypographyPreset,
        align: 'left',
        bold: false,
        italic: false,
        fontSize: this.getDefaultFontSize(this.toolTypographyPreset),
        text: 'Texto de ejemplo',
      },
    ];
  }

  private get selectedTypographyItem() {
    return this.typographyItems.find((item) => item.id === this.selectedTypographyId) ?? null;
  }

  private updateSelectedTypographyItem(updates: Partial<CanvasTypographyItem>) {
    if (!this.selectedTypographyId) {
      return;
    }

    this.typographyItems = this.typographyItems.map((item) =>
      item.id === this.selectedTypographyId ? { ...item, ...updates } : item,
    );
  }

  private handleToolDragState(event: CustomEvent<{ tool: string; active: boolean; preset: TypographyPreset }>) {
    this.activeDraggedTool = event.detail.active ? event.detail.tool : null;
    this.toolTypographyPreset = event.detail.preset;
    if (!event.detail.active) {
      this.isCanvasDragActive = false;
    }
  }

  private handleInsertTool(event: CustomEvent<{ tool: string; preset: TypographyPreset }>) {
    if (event.detail.tool !== 'tipografia') {
      return;
    }

    this.toolTypographyPreset = event.detail.preset;

    const itemWidth = this.viewport === 'mobile' ? 208 : 240;
    this.createTypographyItem(Math.max(16, 24), Math.max(16, 24));

    // Keep newly inserted items inside the visible canvas width when multiple are added.
    const lastItem = this.typographyItems[this.typographyItems.length - 1];
    if (lastItem && this.viewport === 'mobile' && lastItem.x + itemWidth > 338) {
      this.typographyItems = this.typographyItems.map((item, index, items) =>
        index === items.length - 1 ? { ...item, x: 16 } : item,
      );
    }
  }

  private handleToolPresetChange(event: CustomEvent<{ tool: string; preset: TypographyPreset }>) {
    if (event.detail.tool !== 'tipografia') {
      return;
    }

    this.toolTypographyPreset = event.detail.preset;
  }

  private handleCanvasClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.selectedTypographyId = null;
      this.editingTypographyId = null;
    }
  }

  private handleCanvasItemDoubleClick(itemId: string) {
    this.handleWindowPointerUp();
    this.selectedTypographyId = itemId;
    this.editingTypographyId = itemId;
  }

  private handleCanvasItemPointerDown(event: PointerEvent, itemId: string) {
    if (event.button !== 0) {
      return;
    }

    if (this.editingTypographyId === itemId || event.detail >= 2) {
      return;
    }

    const element = event.currentTarget as HTMLElement;
    const canvas = element.parentElement;
    if (!canvas) {
      return;
    }

    const elementRect = element.getBoundingClientRect();
    const resizeHotspot = 18;
    const isResizeIntent =
      event.clientX >= elementRect.right - resizeHotspot &&
      event.clientY >= elementRect.bottom - resizeHotspot;

    if (isResizeIntent) {
      return;
    }

    const canvasRect = canvas.getBoundingClientRect();
    this.selectedTypographyId = itemId;
    if (this.editingTypographyId && this.editingTypographyId !== itemId) {
      this.editingTypographyId = null;
    }
    this.dragState = {
      id: itemId,
      offsetX: event.clientX - elementRect.left,
      offsetY: event.clientY - elementRect.top,
      canvasWidth: canvasRect.width,
      canvasHeight: canvasRect.height,
      itemWidth: elementRect.width,
      itemHeight: elementRect.height,
    };

    window.addEventListener('pointermove', this.handleWindowPointerMove);
    window.addEventListener('pointerup', this.handleWindowPointerUp);
    event.preventDefault();
  }

  private handleWindowPointerMove = (event: PointerEvent) => {
    if (!this.dragState) {
      return;
    }

    const canvas = this.renderRoot.querySelector('.page-preview') as HTMLElement | null;
    if (!canvas) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const nextX = Math.max(
      0,
      Math.min(
        rect.width - this.dragState.itemWidth,
        event.clientX - rect.left - this.dragState.offsetX,
      ),
    );
    const nextY = Math.max(
      0,
      Math.min(
        rect.height - this.dragState.itemHeight,
        event.clientY - rect.top - this.dragState.offsetY,
      ),
    );

    this.typographyItems = this.typographyItems.map((item) =>
      item.id === this.dragState?.id ? { ...item, x: nextX, y: nextY } : item,
    );
  };

  private handleWindowPointerUp = () => {
    this.dragState = null;
    window.removeEventListener('pointermove', this.handleWindowPointerMove);
    window.removeEventListener('pointerup', this.handleWindowPointerUp);
  };

  private handleSelectedPresetChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.updateSelectedTypographyItem({ preset: select.value as TypographyPreset });
  }

  private handleTypographyTextChange(event: CustomEvent<{ id: string; text: string }>) {
    const { id, text } = event.detail;
    this.typographyItems = this.typographyItems.map((item) =>
      item.id === id ? { ...item, text } : item,
    );
  }

  private handleTypographyEditFinish(event: CustomEvent<{ id: string }>) {
    if (this.editingTypographyId === event.detail.id) {
      this.editingTypographyId = null;
    }
  }

  private setSelectedAlignment(align: TypographyAlign) {
    this.updateSelectedTypographyItem({ align });
  }

  private toggleSelectedBold() {
    if (!this.selectedTypographyItem) {
      return;
    }

    this.updateSelectedTypographyItem({ bold: !this.selectedTypographyItem.bold });
  }

  private toggleSelectedItalic() {
    if (!this.selectedTypographyItem) {
      return;
    }

    this.updateSelectedTypographyItem({ italic: !this.selectedTypographyItem.italic });
  }

  private handleSelectedFontSizeInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedTypographyItem({ fontSize: input.valueAsNumber });
  }

  private handleCanvasDragOver(event: DragEvent) {
    const draggedTool =
      this.activeDraggedTool ??
      event.dataTransfer?.getData('application/x-ui-tool') ??
      event.dataTransfer?.getData('text/plain');

    if (draggedTool !== 'tipografia') {
      return;
    }

    event.preventDefault();
    this.isCanvasDragActive = true;
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
  }

  private handleCanvasDragLeave(event: DragEvent) {
    const relatedTarget = event.relatedTarget as Node | null;
    const currentTarget = event.currentTarget as HTMLElement;

    if (relatedTarget && currentTarget.contains(relatedTarget)) {
      return;
    }

    this.isCanvasDragActive = false;
  }

  private handleCanvasDrop(event: DragEvent) {
    event.preventDefault();
    this.isCanvasDragActive = false;

    const tool =
      this.activeDraggedTool ??
      event.dataTransfer?.getData('application/x-ui-tool') ??
      event.dataTransfer?.getData('text/plain');

    this.activeDraggedTool = null;

    if (tool !== 'tipografia') {
      return;
    }

    const canvas = event.currentTarget as HTMLElement;
    const rect = canvas.getBoundingClientRect();
    const itemWidth = this.viewport === 'mobile' ? 208 : 240;
    const itemHeight = 120;
    const x = Math.max(0, Math.min(rect.width - itemWidth, event.clientX - rect.left - itemWidth / 2));
    const y = Math.max(0, Math.min(rect.height - itemHeight, event.clientY - rect.top - itemHeight / 2));

    this.createTypographyItem(x, y);
  }

  private setViewport(viewport: 'desktop' | 'mobile') {
    if (this.viewport === viewport) {
      return;
    }

    this.isViewportTransitioning = true;
    this.viewport = viewport;
    window.clearTimeout(this.viewportAnimationTimeout);
    this.viewportAnimationTimeout = window.setTimeout(() => {
      this.isViewportTransitioning = false;
    }, 280);
  }

  render() {
    return html`
      <div class="workspace" data-dragging=${String(this.activeDraggedTool !== null)}>
        <section class="stage">
          <div
            class="canvas-frame"
            data-mode=${this.viewport}
            data-transitioning=${String(this.isViewportTransitioning)}
          >
            <div class="canvas-controls">
              <h2 class="canvas-title">Lienzo</h2>

              <div class="canvas-controls-right">
                <div class="segmented" aria-label="Viewport selector">
                  <button
                    class="segment-button"
                    data-active=${String(this.viewport === 'desktop')}
                    @click=${() => this.setViewport('desktop')}
                  >
                    Desktop
                  </button>
                  <button
                    class="segment-button"
                    data-active=${String(this.viewport === 'mobile')}
                    @click=${() => this.setViewport('mobile')}
                  >
                    Mobile
                  </button>
                </div>
              </div>
            </div>

            <div class="canvas-shell">
            <div class="canvas">
              <div class="canvas-body">
                <div
                  class="page-preview"
                  data-mode=${this.viewport}
                  data-drag-active=${String(this.isCanvasDragActive)}
                  @click=${this.handleCanvasClick}
                  @dragover=${this.handleCanvasDragOver}
                  @dragleave=${this.handleCanvasDragLeave}
                  @drop=${this.handleCanvasDrop}
                  @text-change=${this.handleTypographyTextChange}
                  @text-edit-finish=${this.handleTypographyEditFinish}
                >
                  ${this.typographyItems.length === 0
                    ? html`<div class="page-preview-empty">
                        Arrastra "Tipografia" desde el panel para comenzar.
                      </div>`
                    : null}

                  ${this.typographyItems.map(
                    (item) => html`
                      <div
                        class="canvas-item"
                        data-item-id=${item.id}
                        data-selected=${String(this.selectedTypographyId === item.id)}
                        style=${`left:${item.x}px; top:${item.y}px; width:${item.width}px; height:${item.height}px;`}
                        @dblclick=${() => this.handleCanvasItemDoubleClick(item.id)}
                        @pointerdown=${(event: PointerEvent) =>
                          this.handleCanvasItemPointerDown(event, item.id)}
                      >
                        <span class="handle top-left"></span>
                        <span class="handle top-right"></span>
                        <span class="handle bottom-left"></span>
                        <span class="handle bottom-right"></span>
                        <canvas-tipografia
                          .itemId=${item.id}
                          .preset=${item.preset}
                          .text=${item.text}
                          .align=${item.align}
                          .bold=${item.bold}
                          .italic=${item.italic}
                          .fontSize=${item.fontSize}
                          .editing=${this.editingTypographyId === item.id}
                        ></canvas-tipografia>
                      </div>
                    `,
                  )}
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>

        <aside class="tools-panel">
          <div class="tool-section">
            <div class="panel-head">
              <h2 class="panel-title">
                ${this.selectedTypographyItem ? 'Edicion de texto' : 'Herramientas'}
              </h2>
              ${this.selectedTypographyItem
                ? html`
                    <button class="panel-action" @click=${() => (this.selectedTypographyId = null)}>
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path
                          d="M5 5l10 10M15 5L5 15"
                          stroke="currentColor"
                          stroke-width="1.8"
                          stroke-linecap="round"
                        />
                      </svg>
                    </button>
                  `
                : null}
            </div>
          </div>

          ${this.selectedTypographyItem
            ? html`
                <div class="tool-group">
                  <h3 class="section-title">Texto seleccionado</h3>
                  <div class="editor-stack">
                    <div class="editor-row">
                      <p class="editor-label">Tipografia</p>
                      <select
                        class="editor-select"
                        .value=${this.selectedTypographyItem.preset}
                        @change=${this.handleSelectedPresetChange}
                      >
                        ${TYPOGRAPHY_PRESET_OPTIONS.map(
                          (option) =>
                            html`<option value=${option.value}>${option.label}</option>`,
                        )}
                      </select>
                    </div>

                    <div class="editor-row">
                      <p class="editor-label">Alineacion</p>
                      <div class="editor-actions">
                        <button
                          class="editor-button"
                          data-active=${String(this.selectedTypographyItem.align === 'left')}
                          @click=${() => this.setSelectedAlignment('left')}
                          aria-label="Alinear a la izquierda"
                          title="Alinear a la izquierda"
                        >
                          <svg class="align-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path d="M3 5h10M3 8.5h7M3 12h10M3 15.5h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                          </svg>
                        </button>
                        <button
                          class="editor-button"
                          data-active=${String(this.selectedTypographyItem.align === 'center')}
                          @click=${() => this.setSelectedAlignment('center')}
                          aria-label="Centrar texto"
                          title="Centrar texto"
                        >
                          <svg class="align-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path d="M5 5h10M6.5 8.5h7M5 12h10M7 15.5h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                          </svg>
                        </button>
                        <button
                          class="editor-button"
                          data-active=${String(this.selectedTypographyItem.align === 'right')}
                          @click=${() => this.setSelectedAlignment('right')}
                          aria-label="Alinear a la derecha"
                          title="Alinear a la derecha"
                        >
                          <svg class="align-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path d="M7 5h10M10 8.5h7M7 12h10M11 15.5h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div class="editor-row">
                      <p class="editor-label">Estilo</p>
                      <div class="editor-actions">
                        <button
                          class="editor-button"
                          data-active=${String(this.selectedTypographyItem.bold)}
                          @click=${this.toggleSelectedBold}
                        >
                          Bold
                        </button>
                        <button
                          class="editor-button"
                          data-active=${String(this.selectedTypographyItem.italic)}
                          @click=${this.toggleSelectedItalic}
                        >
                          Italic
                        </button>
                      </div>
                    </div>

                    <div class="editor-row">
                      <div class="editor-range-wrap">
                        <div class="editor-range-head">
                          <p class="editor-label">Tamano</p>
                          <span class="editor-range-value">
                            ${this.selectedTypographyItem.fontSize}px
                          </span>
                        </div>
                        <input
                          class="editor-range"
                          type="range"
                          min="16"
                          max="96"
                          step="1"
                          .value=${String(this.selectedTypographyItem.fontSize)}
                          @input=${this.handleSelectedFontSizeInput}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              `
            : html`
                <div class="tool-group components-group">
                  <h3 class="section-title">Componentes</h3>
                  <tool-tipografia
                    .preset=${this.toolTypographyPreset}
                    @tool-drag-state=${this.handleToolDragState}
                    @insert-tool=${this.handleInsertTool}
                    @tool-preset-change=${this.handleToolPresetChange}
                  ></tool-tipografia>
                </div>
              `}
        </aside>
      </div>
    `;
  }
}
