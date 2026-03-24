import{i as e}from"../node_modules/@lit/reactive-element/css-tag.js";import{b as t}from"../node_modules/lit-html/lit-html.js";import{i as n}from"../node_modules/lit-element/lit-element.js";import"../node_modules/lit/index.js";import{t as r}from"../node_modules/@lit/reactive-element/decorators/custom-element.js";import{n as i}from"../node_modules/@lit/reactive-element/decorators/property.js";import"../node_modules/lit/decorators.js";import{__decorate as a}from"../_virtual/_@oxc-project_runtime@0.120.0/helpers/decorate.js";import"./canvas-icon.js";var o=class extends n{constructor(...e){super(...e),this.icon=`search`,this.backgroundVisible=!0}static{this.styles=e`
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
  `}render(){return t`
      <button
        class="button"
        data-background-visible=${String(this.backgroundVisible)}
        type="button"
        aria-label="Icon button"
      >
        <canvas-icon .icon=${this.icon} .color=${`var(--color-primary-strong)`}></canvas-icon>
      </button>
    `}};a([i({type:String})],o.prototype,`icon`,void 0),a([i({type:Boolean})],o.prototype,`backgroundVisible`,void 0),o=a([r(`canvas-icon-button`)],o);