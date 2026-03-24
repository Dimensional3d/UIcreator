import{i as e}from"../node_modules/@lit/reactive-element/css-tag.js";import{b as t}from"../node_modules/lit-html/lit-html.js";import{i as n}from"../node_modules/lit-element/lit-element.js";import"../node_modules/lit/index.js";import{t as r}from"../node_modules/@lit/reactive-element/decorators/custom-element.js";import"../node_modules/lit/decorators.js";import{__decorate as i}from"../_virtual/_@oxc-project_runtime@0.120.0/helpers/decorate.js";var a=`https://www.bbva.mx/content/dam/library/logos/logo-bbva.svg`,o=class extends n{static{this.styles=e`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .logo {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      overflow: hidden;
    }

    img {
      width: auto;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      display: block;
      object-fit: contain;
    }
  `}render(){return t`
      <div class="logo" aria-label="Logo BBVA">
        <img src=${a} alt="Logo BBVA" draggable="false" />
      </div>
    `}};o=i([r(`canvas-logo`)],o);