import{i as e}from"../node_modules/@lit/reactive-element/css-tag.js";import{b as t}from"../node_modules/lit-html/lit-html.js";import{i as n}from"../node_modules/lit-element/lit-element.js";import"../node_modules/lit/index.js";import{t as r}from"../node_modules/@lit/reactive-element/decorators/custom-element.js";import{n as i}from"../node_modules/@lit/reactive-element/decorators/property.js";import"../node_modules/lit/decorators.js";import{__decorate as a}from"../_virtual/_@oxc-project_runtime@0.120.0/helpers/decorate.js";import{ICON_OPTIONS as o}from"./icon-library.js";var s=class extends n{constructor(...e){super(...e),this.icon=`home`,this.color=`var(--color-primary-strong)`}get selectedIcon(){return o.find(e=>e.value===this.icon)??o[0]}static{this.styles=e`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .icon {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
    }

    .glyph {
      width: 100%;
      height: 100%;
      display: block;
      background-color: var(--icon-color, #001391);
      -webkit-mask: var(--icon-src) center / contain no-repeat;
      mask: var(--icon-src) center / contain no-repeat;
    }
  `}render(){return t`
      <div
        class="icon"
        role="img"
        aria-label=${this.selectedIcon.label}
        style=${`--icon-color:${this.color};--icon-src:url('${this.selectedIcon.src}');`}
      >
        <span class="glyph" aria-hidden="true"></span>
      </div>
    `}};a([i({type:String})],s.prototype,`icon`,void 0),a([i({type:String})],s.prototype,`color`,void 0),s=a([r(`canvas-icon`)],s);