import{i as e}from"../node_modules/@lit/reactive-element/css-tag.js";import{b as t}from"../node_modules/lit-html/lit-html.js";import{i as n}from"../node_modules/lit-element/lit-element.js";import"../node_modules/lit/index.js";import{t as r}from"../node_modules/@lit/reactive-element/decorators/custom-element.js";import{n as i}from"../node_modules/@lit/reactive-element/decorators/property.js";import"../node_modules/lit/decorators.js";import{__decorate as a}from"../_virtual/_@oxc-project_runtime@0.120.0/helpers/decorate.js";import"./canvas-icon.js";var o=class extends n{constructor(...e){super(...e),this.itemId=``,this.label=`Placeholder`,this.value=``,this.icon=`eye-off`,this.iconVisible=!0,this.status=`inactive`,this.enabled=!1}handleInput(e){let t=e.target;this.dispatchEvent(new CustomEvent(`input-text-change`,{bubbles:!0,composed:!0,detail:{id:this.itemId,value:t.value}}))}handleFocus(){this.dispatchEvent(new CustomEvent(`input-text-focus`,{bubbles:!0,composed:!0,detail:{id:this.itemId}}))}handleClearValue(){this.dispatchEvent(new CustomEvent(`input-text-change`,{bubbles:!0,composed:!0,detail:{id:this.itemId,value:``}})),this.updateComplete.then(()=>{this.renderRoot.querySelector(`input`)?.focus()})}static{this.styles=e`
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
  `}render(){let e=this.value.trim().length>0,n=e||this.status===`active`,r=e||this.iconVisible;return t`
      <label
        class="field"
        data-filled=${String(e)}
        data-floating=${String(n)}
        data-status=${this.status}
        data-enabled=${String(this.enabled)}
        data-has-actions=${String(r)}
      >
        <div class="content">
          <span class="label">${this.label}</span>
          <input
            class="input"
            type="text"
            .value=${this.value}
            placeholder=${this.label}
            ?readOnly=${!this.enabled}
            tabindex=${this.enabled?`0`:`-1`}
            @input=${this.handleInput}
            @focus=${this.handleFocus}
          />
        </div>
        ${r?t`<div class="actions">
          ${e?t`
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
              `:null}
          ${this.iconVisible?t`<span class="icon-slot" aria-hidden="true">
                <canvas-icon .icon=${this.icon}></canvas-icon>
              </span>`:null}
        </div>`:null}
      </label>
    `}};a([i({type:String})],o.prototype,`itemId`,void 0),a([i({type:String})],o.prototype,`label`,void 0),a([i({type:String})],o.prototype,`value`,void 0),a([i({type:String})],o.prototype,`icon`,void 0),a([i({type:Boolean})],o.prototype,`iconVisible`,void 0),a([i({type:String})],o.prototype,`status`,void 0),a([i({type:Boolean})],o.prototype,`enabled`,void 0),o=a([r(`canvas-input-text`)],o);