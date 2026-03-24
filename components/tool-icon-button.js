import{i as e}from"../node_modules/@lit/reactive-element/css-tag.js";import{b as t}from"../node_modules/lit-html/lit-html.js";import{i as n}from"../node_modules/lit-element/lit-element.js";import"../node_modules/lit/index.js";import{t as r}from"../node_modules/@lit/reactive-element/decorators/custom-element.js";import{n as i}from"../node_modules/@lit/reactive-element/decorators/property.js";import"../node_modules/lit/decorators.js";import{__decorate as a}from"../_virtual/_@oxc-project_runtime@0.120.0/helpers/decorate.js";import"./canvas-icon-button.js";var o=class extends n{constructor(...e){super(...e),this.selected=!1}emitToolDragState(e){this.dispatchEvent(new CustomEvent(`tool-drag-state`,{bubbles:!0,composed:!0,detail:{tool:`icon-button`,active:e}}))}handleDragStart(e){e.dataTransfer?.setData(`application/x-ui-tool`,`icon-button`),e.dataTransfer?.setData(`text/plain`,`icon-button`),e.dataTransfer&&(e.dataTransfer.effectAllowed=`copy`),this.emitToolDragState(!0)}handleDragEnd(){this.emitToolDragState(!1)}handlePreviewRequest(){this.dispatchEvent(new CustomEvent(`preview-tool`,{bubbles:!0,composed:!0,detail:{tool:`icon-button`}}))}static{this.styles=e`
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
      padding: 4px;
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
  `}render(){return t`
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
          <canvas-icon-button .icon=${`search`}></canvas-icon-button>
        </div>
        <p class="title">Icon Buton</p>
      </article>
    `}};a([i({type:Boolean})],o.prototype,`selected`,void 0),o=a([r(`tool-icon-button`)],o);