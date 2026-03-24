import{i as e}from"../node_modules/@lit/reactive-element/css-tag.js";import{b as t}from"../node_modules/lit-html/lit-html.js";import{i as n}from"../node_modules/lit-element/lit-element.js";import"../node_modules/lit/index.js";import{t as r}from"../node_modules/@lit/reactive-element/decorators/custom-element.js";import{n as i}from"../node_modules/@lit/reactive-element/decorators/property.js";import"../node_modules/lit/decorators.js";import{__decorate as a}from"../_virtual/_@oxc-project_runtime@0.120.0/helpers/decorate.js";import{MICRO_ILLUSTRATION_OPTIONS as o}from"./micro-illustration-library.js";var s=class extends n{constructor(...e){super(...e),this.illustration=`update-app`}get selectedIllustration(){return o.find(e=>e.value===this.illustration)??o[0]}static{this.styles=e`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .illustration {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
      user-select: none;
      pointer-events: none;
    }
  `}render(){return t`
      <div class="illustration" aria-label=${this.selectedIllustration.label}>
        <img
          src=${this.selectedIllustration.src}
          alt=${this.selectedIllustration.label}
          draggable="false"
        />
      </div>
    `}};a([i({type:String})],s.prototype,`illustration`,void 0),s=a([r(`canvas-micro-illustration`)],s);