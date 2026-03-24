import{i as e}from"../node_modules/@lit/reactive-element/css-tag.js";import{b as t}from"../node_modules/lit-html/lit-html.js";import{i as n}from"../node_modules/lit-element/lit-element.js";import"../node_modules/lit/index.js";import{t as r}from"../node_modules/@lit/reactive-element/decorators/custom-element.js";import{n as i}from"../node_modules/@lit/reactive-element/decorators/property.js";import"../node_modules/lit/decorators.js";import{__decorate as a}from"../_virtual/_@oxc-project_runtime@0.120.0/helpers/decorate.js";var o=class extends n{constructor(...e){super(...e),this.label=`Conoce más`,this.fontSize=22}static{this.styles=e`
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
      border-radius: 16px;
      background: var(--color-primary);
      color: #ffffff;
      font-family: var(--font-sans);
      font-weight: 500;
      line-height: 1;
      letter-spacing: -0.01em;
      box-shadow: 0 16px 32px rgba(45, 124, 255, 0.22);
      padding: 0 16px;
      cursor: pointer;
      transition:
        background 160ms ease,
        transform 160ms ease,
        box-shadow 160ms ease;
    }

    .button:hover {
      background: #2463cc;
      box-shadow: 0 18px 34px rgba(24, 41, 184, 0.24);
    }

    .button:active {
      transform: translateY(1px);
    }
  `}render(){return t`
      <button class="button" type="button" style=${`font-size:${this.fontSize}px;`}>
        ${this.label}
      </button>
    `}};a([i({type:String})],o.prototype,`label`,void 0),a([i({type:Number})],o.prototype,`fontSize`,void 0),o=a([r(`canvas-opportunity-button`)],o);