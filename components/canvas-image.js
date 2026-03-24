import{i as e}from"../node_modules/@lit/reactive-element/css-tag.js";import{b as t}from"../node_modules/lit-html/lit-html.js";import{i as n}from"../node_modules/lit-element/lit-element.js";import"../node_modules/lit/index.js";import{t as r}from"../node_modules/@lit/reactive-element/decorators/custom-element.js";import{n as i}from"../node_modules/@lit/reactive-element/decorators/property.js";import"../node_modules/lit/decorators.js";import{__decorate as a}from"../_virtual/_@oxc-project_runtime@0.120.0/helpers/decorate.js";var o=class extends n{constructor(...e){super(...e),this.src=``,this.alt=`Imagen`}static{this.styles=e`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .frame {
      width: 100%;
      height: 100%;
      border-radius: 16px;
      overflow: hidden;
      background: linear-gradient(180deg, rgba(19, 30, 68, 0.1), rgba(19, 30, 68, 0.06));
      border: 1px solid rgba(19, 30, 68, 0.14);
      display: grid;
      place-items: center;
      box-sizing: border-box;
    }

    .placeholder {
      display: grid;
      place-items: center;
      gap: 8px;
      color: rgba(19, 30, 68, 0.52);
      font-family: var(--font-sans);
      font-size: 13px;
      font-weight: 500;
      text-align: center;
      padding: 16px;
    }

    .placeholder svg {
      width: 24px;
      height: 24px;
      display: block;
    }

    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      user-select: none;
      pointer-events: none;
    }
  `}render(){return t`
      <div class="frame">
        ${this.src?t`<img src=${this.src} alt=${this.alt||`Imagen`} draggable="false" />`:t`<div class="placeholder" aria-label="Subir imagen">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="4" stroke="currentColor" stroke-width="1.7" />
                <path d="M7 15l3.5-3.5 2.5 2.5 3.5-4 3.5 5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                <circle cx="9" cy="9" r="1.4" fill="currentColor" />
              </svg>
              <span>Subir imagen</span>
            </div>`}
      </div>
    `}};a([i({type:String})],o.prototype,`src`,void 0),a([i({type:String})],o.prototype,`alt`,void 0),o=a([r(`canvas-image`)],o);