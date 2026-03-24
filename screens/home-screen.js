import{i as e}from"../node_modules/@lit/reactive-element/css-tag.js";import{A as t,b as n}from"../node_modules/lit-html/lit-html.js";import{i as r}from"../node_modules/lit-element/lit-element.js";import"../node_modules/lit/index.js";import{t as i}from"../node_modules/@lit/reactive-element/decorators/custom-element.js";import{r as a}from"../node_modules/@lit/reactive-element/decorators/state.js";import"../node_modules/lit/decorators.js";import{__decorate as o}from"../_virtual/_@oxc-project_runtime@0.120.0/helpers/decorate.js";import{TYPOGRAPHY_PRESET_OPTIONS as s}from"../components/canvas-tipografia.js";import"../components/canvas-contenedor.js";import{ICON_OPTIONS as c}from"../components/icon-library.js";import"../components/canvas-icon.js";import"../components/canvas-logo.js";import"../components/canvas-opportunity-button.js";import"../components/canvas-secondary-button.js";import"../components/canvas-desktop-menu.js";import"../components/canvas-icon-button.js";import"../components/canvas-image.js";import"../components/canvas-input-text.js";import"../components/canvas-main-button.js";import{MICRO_ILLUSTRATION_OPTIONS as l}from"../components/micro-illustration-library.js";import"../components/canvas-micro-illustration.js";import"../components/tool-contenedor.js";import"../components/tool-desktop-menu.js";import"../components/tool-icon.js";import"../components/tool-icon-button.js";import"../components/tool-image.js";import"../components/tool-input-text.js";import"../components/tool-logo.js";import"../components/tool-main-button.js";import"../components/tool-micro-illustration.js";import"../components/tool-opportunity-button.js";import"../components/tool-secondary-button.js";import"../components/tool-tipografia.js";var u=[55,32],d=16,f=`var(--color-surface)`,p=`var(--color-text-inverse)`,m={shadowEnabled:!1,shadowX:0,shadowY:12,shadowBlur:32,shadowSpread:0,shadowOpacity:.18,shadowColor:`var(--color-bg)`},h=[{value:f,label:`White`},{value:`var(--color-surface-soft)`,label:`Surface Soft`},{value:`var(--color-primary-soft)`,label:`Primary Soft`},{value:`var(--color-surface-warm)`,label:`Surface Warm`},{value:`var(--color-surface-accent)`,label:`Surface Accent`},{value:`var(--color-highlight)`,label:`Highlight`},{value:`var(--color-text-muted)`,label:`Text Muted`},{value:`var(--color-primary)`,label:`Primary`},{value:`var(--color-text-soft)`,label:`Text Soft`},{value:`var(--color-link)`,label:`Link`},{value:`var(--color-primary-strong)`,label:`Primary Strong`},{value:`var(--color-text)`,label:`Text`},{value:`var(--color-bg)`,label:`Background`},{value:`var(--color-bg-strong)`,label:`Background Strong`},{value:`var(--color-text-strong)`,label:`Text Strong`}],g=[{value:`transparent`,label:`Transparente`},...h],_=h,v=h,y=class extends r{constructor(...e){super(...e),this.viewport=`desktop`,this.isViewportTransitioning=!1,this.isCanvasDragActive=!1,this.activeDraggedTool=null,this.toolTypographyPreset=`benton-book`,this.selectedToolPreview=null,this.componentTab=`atomos`,this.customMolecules=[],this.isCreateComponentModalOpen=!1,this.draftComponentName=``,this.typographyItems=[],this.buttonItems=[],this.inputTextItems=[],this.iconItems=[],this.desktopMenuItems=[],this.logoItems=[],this.microIllustrationItems=[],this.imageItems=[],this.containerItems=[],this.selectedTypographyId=null,this.editingTypographyId=null,this.editingButtonId=null,this.editingIconId=null,this.editingLogoId=null,this.editingMicroIllustrationId=null,this.editingImageId=null,this.editingContainerId=null,this.isEditingSelectedContainerName=!1,this.isCanvasEditing=!1,this.canvasBackground=`var(--color-surface)`,this.isCodeView=!1,this.isPrototypeMode=!1,this.openColorDropdown=null,this.canvases=[{id:`canvas-1`,name:`Lienzo 1`}],this.activeCanvasId=`canvas-1`,this.isCanvasMenuOpen=!1,this.isToolsDrawerMode=!1,this.isToolsDrawerOpen=!1,this.nextCustomMoleculeId=1,this.nextTypographyId=1,this.nextButtonId=1,this.nextInputTextId=1,this.nextIconId=1,this.nextDesktopMenuId=1,this.nextLogoId=1,this.nextMicroIllustrationId=1,this.nextImageId=1,this.nextContainerId=1,this.nextCanvasOrder=1,this.dragState=null,this.pendingImageUploadItemId=null,this.colorValueCache=new Map,this.canvasScenes=new Map,this.toolsDrawerBreakpoint=1360,this.handleWindowKeyDown=e=>{if(!(e.key!==`Delete`&&e.key!==`Backspace`||!this.selectedTypographyId)&&this.editingTypographyId!==this.selectedTypographyId&&!(e.composedPath().some(e=>this.isEditableFieldTarget(e))||this.isEditableFieldTarget(this.shadowRoot?.activeElement??null)||this.isEditableFieldTarget(document.activeElement))){if(this.selectedTypographyId.startsWith(`typo-`)){this.typographyItems=this.typographyItems.filter(e=>e.id!==this.selectedTypographyId),this.clearActiveEditingState(),e.preventDefault();return}if(this.selectedTypographyId.startsWith(`button-`)){this.buttonItems=this.buttonItems.filter(e=>e.id!==this.selectedTypographyId),this.clearActiveEditingState(),e.preventDefault();return}if(this.selectedTypographyId.startsWith(`input-`)){this.inputTextItems=this.inputTextItems.filter(e=>e.id!==this.selectedTypographyId),this.clearActiveEditingState(),e.preventDefault();return}if(this.selectedTypographyId.startsWith(`icon-`)){this.iconItems=this.iconItems.filter(e=>e.id!==this.selectedTypographyId),this.clearActiveEditingState(),e.preventDefault();return}if(this.selectedTypographyId.startsWith(`desktop-menu-`)){this.desktopMenuItems=this.desktopMenuItems.filter(e=>e.id!==this.selectedTypographyId),this.clearActiveEditingState(),e.preventDefault();return}if(this.selectedTypographyId.startsWith(`logo-`)){this.logoItems=this.logoItems.filter(e=>e.id!==this.selectedTypographyId),this.clearActiveEditingState(),e.preventDefault();return}if(this.selectedTypographyId.startsWith(`micro-`)){this.microIllustrationItems=this.microIllustrationItems.filter(e=>e.id!==this.selectedTypographyId),this.clearActiveEditingState(),e.preventDefault();return}if(this.selectedTypographyId.startsWith(`image-`)){this.imageItems=this.imageItems.filter(e=>e.id!==this.selectedTypographyId),this.clearActiveEditingState(),e.preventDefault();return}if(this.selectedTypographyId.startsWith(`container-`)){let t=new Set([this.selectedTypographyId,...this.getNestedContainerIds(this.selectedTypographyId)]);this.typographyItems=this.typographyItems.filter(e=>!e.parentId||!t.has(e.parentId)),this.buttonItems=this.buttonItems.filter(e=>!e.parentId||!t.has(e.parentId)),this.inputTextItems=this.inputTextItems.filter(e=>!e.parentId||!t.has(e.parentId)),this.iconItems=this.iconItems.filter(e=>!e.parentId||!t.has(e.parentId)),this.desktopMenuItems=this.desktopMenuItems.filter(e=>!e.parentId||!t.has(e.parentId)),this.logoItems=this.logoItems.filter(e=>!e.parentId||!t.has(e.parentId)),this.microIllustrationItems=this.microIllustrationItems.filter(e=>!e.parentId||!t.has(e.parentId)),this.imageItems=this.imageItems.filter(e=>!e.parentId||!t.has(e.parentId)),this.containerItems=this.containerItems.filter(e=>!t.has(e.id)),this.clearActiveEditingState(),e.preventDefault()}}},this.handleWindowPointerMove=e=>{if(!this.dragState)return;let t=this.dragState.parentId?this.getContainerContentElement(this.dragState.parentId):this.getCanvasHostElement();if(!t)return;let n=t.getBoundingClientRect();if(this.dragState.mode===`resize`&&this.dragState.id.startsWith(`container-`)){let t=this.getGridColumns(),r=n.width/t,i=this.dragState.resizeHandle,a=this.containerItems.find(e=>e.id===this.dragState?.id);if(!i||!a)return;let o=this.viewport===`mobile`?this.dragState.originMobileStart??a.mobileStart:this.dragState.originDesktopStart??a.desktopStart,s=this.viewport===`mobile`?this.dragState.originMobileSpan??a.mobileSpan:this.dragState.originDesktopSpan??a.desktopSpan,c=o+s-1,l=Math.max(0,Math.min(n.width,e.clientX-n.left)),u=o,d=s;i===`top-left`||i===`bottom-left`?(u=Math.max(0,Math.min(c-1,Math.round(l/r)))+1,d=c-u+1):d=Math.max(o,Math.min(t,Math.round(l/r)))-o+1;let f=this.dragState.originY??a.y,p=this.dragState.originHeight??a.height,m=f,h=p;if(i===`top-left`||i===`top-right`){let t=f+(e.clientY-(this.dragState.originClientY??e.clientY));m=Math.max(0,Math.min(f+p-1,t)),h=p-(m-f)}else h=Math.max(1,Math.min(n.height-f,p+(e.clientY-(this.dragState.originClientY??e.clientY))));this.containerItems=this.containerItems.map(e=>{if(e.id!==this.dragState?.id)return e;let t=this.viewport===`mobile`?{...e,y:m,height:h,widthMode:`manual`,heightMode:`manual`,mobileStart:u,mobileSpan:d}:{...e,y:m,height:h,widthMode:`manual`,heightMode:`manual`,desktopStart:u,desktopSpan:d};return this.resolveContainerCollision(t)});return}let r=Math.max(0,Math.min(n.width-this.dragState.itemWidth,e.clientX-n.left-this.dragState.offsetX)),i=Math.max(0,Math.min(n.height-this.dragState.itemHeight,e.clientY-n.top-this.dragState.offsetY));this.typographyItems=this.typographyItems.map(e=>e.id===this.dragState?.id?{...e,x:r,y:i}:e),this.buttonItems=this.buttonItems.map(e=>e.id===this.dragState?.id?{...e,x:r,y:i}:e),this.inputTextItems=this.inputTextItems.map(e=>e.id===this.dragState?.id?{...e,x:r,y:i}:e),this.iconItems=this.iconItems.map(e=>e.id===this.dragState?.id?{...e,x:r,y:i}:e),this.desktopMenuItems=this.desktopMenuItems.map(e=>e.id===this.dragState?.id?{...e,x:r,y:i}:e),this.logoItems=this.logoItems.map(e=>e.id===this.dragState?.id?{...e,x:r,y:i}:e),this.microIllustrationItems=this.microIllustrationItems.map(e=>e.id===this.dragState?.id?{...e,x:r,y:i}:e),this.imageItems=this.imageItems.map(e=>e.id===this.dragState?.id?{...e,x:r,y:i}:e),this.containerItems=this.containerItems.map(e=>{if(e.id!==this.dragState?.id)return e;let t=this.getGridColumns(),a=this.viewport===`mobile`?e.mobileSpan:e.desktopSpan,o=this.getContainerStartFromX(r,n.width,t,a),s=this.viewport===`mobile`?{...e,y:i,mobileStart:o}:{...e,y:i,desktopStart:o};return this.resolveContainerCollision(s)})},this.handleWindowPointerUp=e=>{e&&this.dragState?.mode===`move`&&(this.moveDraggedLeafItemIntoContainer(e),this.moveDraggedContainerIntoContainer(e)),this.dragState=null,window.removeEventListener(`pointermove`,this.handleWindowPointerMove),window.removeEventListener(`pointerup`,this.handleWindowPointerUp)},this.handleSelectedImageUploadClick=()=>{this.selectedImageItem&&this.requestImageUpload(this.selectedImageItem.id)},this.syncToolsDrawerMode=()=>{let e=window.innerWidth<=this.toolsDrawerBreakpoint;this.isToolsDrawerMode=e,e||(this.isToolsDrawerOpen=!1)},this.handleWindowPointerDown=e=>{let t=e.composedPath(),n=t.some(e=>e instanceof HTMLElement&&e.dataset.colorDropdown===`true`),r=t.some(e=>e instanceof HTMLElement&&e.dataset.canvasMenu===`true`);n||(this.openColorDropdown=null),r||(this.isCanvasMenuOpen=!1)},this.handleWindowScroll=()=>{this.queueCanvasViewportSync()}}static{this.styles=e`
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

    .workspace[data-prototype-mode='true'] .canvas-item {
      resize: none;
      cursor: default;
    }

    .workspace[data-prototype-mode='true'] .canvas-item[data-kind='button'] {
      cursor: pointer;
    }

    .workspace[data-prototype-mode='true'] .canvas-item::after,
    .workspace[data-prototype-mode='true'] .handle {
      display: none;
    }

    .workspace {
      min-height: 100vh;
      padding: 24px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) 320px;
      gap: 24px;
      box-sizing: border-box;
    }

    .workspace[data-tools-drawer-mode='true'] {
      grid-template-columns: 1fr;
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
      width: min(100%, 1120px);
      min-height: 820px;
      margin-top: 8px;
      display: grid;
      gap: 8px;
      transition: width 280ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    .canvas-stack {
      display: grid;
      gap: 28px;
    }

    .canvas-stack-item {
      display: grid;
      gap: 8px;
      scroll-margin-top: 112px;
    }

    .canvas-surface-name {
      border: none;
      background: transparent;
      padding: 0;
      margin: 0;
      justify-self: start;
      color: #ffffff;
      font-family: var(--font-sans);
      font-size: 18px;
      line-height: 1.2;
      font-weight: 500;
      letter-spacing: 0;
      cursor: pointer;
      transition: opacity 140ms ease, color 140ms ease;
    }

    .canvas-surface-name[data-active='false'] {
      opacity: 0.74;
    }

    .canvas-surface-name[data-active='true'] {
      color: #ffffff;
      opacity: 1;
    }

    .canvas-frame[data-mode='mobile'] {
      width: min(100%, 430px);
    }

    .canvas-controls {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 16px;
    }

    .canvas-controls-left {
      flex: 0 0 auto;
      min-width: 0;
    }

    .canvas-menu {
      position: fixed;
      top: 24px;
      left: 24px;
      display: inline-block;
      z-index: 26;
    }

    .canvas-menu-button {
      min-width: 56px;
      height: 40px;
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 999px;
      background: rgba(0, 0, 0, 0.92);
      color: #ffffff;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 0 14px;
      font: inherit;
      font-size: 0.84rem;
      font-weight: 500;
      cursor: pointer;
      box-shadow: 0 14px 32px rgba(0, 0, 0, 0.24);
      transition:
        transform 140ms ease,
        box-shadow 140ms ease,
        border-color 140ms ease,
        background 140ms ease;
    }

    .canvas-menu-button:hover {
      transform: translateY(-1px);
      border-color: rgba(255, 255, 255, 0.24);
      background: rgba(18, 18, 18, 0.96);
      box-shadow: 0 18px 36px rgba(0, 0, 0, 0.28);
    }

    .canvas-menu-button svg {
      width: 18px;
      height: 18px;
      display: block;
      flex: 0 0 auto;
    }

    .canvas-menu-label {
      white-space: nowrap;
    }

    .canvas-menu-panel {
      position: absolute;
      left: 0;
      top: calc(100% + 10px);
      width: min(320px, calc(100vw - 64px));
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 18px;
      background: rgba(0, 0, 0, 0.96);
      box-shadow: 0 24px 54px rgba(0, 0, 0, 0.32);
      padding: 12px;
      display: grid;
      gap: 8px;
      z-index: 27;
      max-height: min(70vh, 420px);
      overflow: auto;
    }

    .canvas-menu-title {
      margin: 0;
      color: rgba(255, 255, 255, 0.72);
      font-size: 0.76rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .canvas-controls-right {
      flex: 0 0 auto;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 8px;
    }

    .canvas-add-button {
      width: 40px;
      height: 40px;
      border: 1px solid rgba(217, 225, 238, 0.95);
      border-radius: 999px;
      background: #ffffff;
      color: #102694;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      cursor: pointer;
      box-shadow: 0 10px 24px rgba(24, 37, 76, 0.08);
      transition:
        transform 140ms ease,
        box-shadow 140ms ease,
        border-color 140ms ease;
    }

    .canvas-add-button:hover {
      transform: translateY(-1px);
      border-color: rgba(36, 87, 255, 0.22);
      box-shadow: 0 14px 28px rgba(24, 37, 76, 0.12);
    }

    .canvas-add-button svg {
      width: 18px;
      height: 18px;
      display: block;
    }

    .canvas-tabs {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .canvas-tab {
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.12);
      color: #ffffff;
      padding: 8px 14px;
      font: inherit;
      font-size: 0.84rem;
      font-weight: 500;
      cursor: pointer;
      box-shadow: none;
      transition:
        background 140ms ease,
        border-color 140ms ease,
        color 140ms ease;
    }

    .canvas-tab:hover {
      background: rgba(255, 255, 255, 0.18);
      border-color: rgba(255, 255, 255, 0.16);
    }

    .canvas-tab[data-active='true'] {
      background: rgba(255, 255, 255, 0.24);
      border-color: rgba(255, 255, 255, 0.24);
      color: #ffffff;
    }

    .canvas-menu-panel .canvas-tab {
      width: 100%;
      justify-content: flex-start;
      box-shadow: none;
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

    .canvas-stack-item[data-active='true'] .canvas {
      box-shadow:
        0 0 0 3px rgba(36, 87, 255, 0.18),
        0 18px 34px rgba(19, 30, 68, 0.08);
    }

    .canvas-stack-item[data-active='false'] .canvas {
      box-shadow: 0 16px 32px rgba(19, 30, 68, 0.08);
    }

    .canvas {
      min-height: 780px;
      border-radius: 16px;
      background: linear-gradient(180deg, #ffffff, #f9fbff);
      border: 1px solid rgba(217, 225, 238, 0.95);
      overflow: hidden;
      display: flex;
    }

    .segmented {
      display: inline-flex;
      padding: 3px;
      border-radius: 999px;
      background: #eef3fb;
      border: 1px solid rgba(217, 225, 238, 0.9);
      gap: 3px;
    }

    .segment-button {
      border: none;
      background: transparent;
      color: var(--color-muted);
      padding: 8px 12px;
      border-radius: 999px;
      font: inherit;
      font-size: 0.82rem;
      font-weight: 700;
      line-height: 1;
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
      background-color: var(--canvas-background, #ffffff);
      background-image: radial-gradient(circle, rgba(36, 87, 255, 0.16) 1px, transparent 1px);
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
        background-color 180ms ease,
        box-shadow 180ms ease;
    }

    .page-preview[data-active-canvas='false'] {
      cursor: pointer;
    }

    .page-preview[data-drag-active='true'] {
      background-image: radial-gradient(circle, rgba(36, 87, 255, 0.22) 1px, transparent 1px);
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

    .canvas-item[data-kind='button'] {
      min-width: 1px;
      min-height: 32px;
      cursor: grab;
    }

    .canvas-item[data-kind='button'][data-button-variant='icon-button'] {
      min-width: 1px;
      min-height: 34px;
      resize: none;
    }

    .canvas-item[data-kind='button']:active {
      cursor: grabbing;
    }

    .canvas-item[data-kind='input-text'] {
      min-width: 200px;
      min-height: 56px;
      resize: horizontal;
      cursor: text;
    }

    .canvas-item[data-kind='typography'] {
      min-width: min-content;
      min-height: 1px;
    }

    .canvas-item[data-kind='icon'] {
      min-width: 24px;
      min-height: 24px;
      cursor: grab;
    }

    .canvas-item[data-kind='icon']:active {
      cursor: grabbing;
    }

    .canvas-item[data-kind='logo'] {
      min-width: 48px;
      min-height: 16px;
      cursor: grab;
    }

    .canvas-item[data-kind='logo']:active {
      cursor: grabbing;
    }

    .canvas-item[data-kind='micro-illustration'] {
      min-width: 72px;
      min-height: 72px;
      cursor: grab;
    }

    .canvas-item[data-kind='micro-illustration']:active {
      cursor: grabbing;
    }

    .canvas-item[data-kind='image'] {
      min-width: 48px;
      min-height: 48px;
      cursor: grab;
    }

    .canvas-item[data-kind='image']:active {
      cursor: grabbing;
    }

    .canvas-item[data-kind='container'] {
      min-width: 0;
      min-height: 1px;
      resize: none;
      overflow: visible;
      cursor: grab;
    }

    .canvas-item[data-kind='container']:active {
      cursor: grabbing;
    }

    .canvas-item[data-kind='container']::after {
      display: none;
    }

    .container-content {
      position: absolute;
      overflow: hidden;
      overscroll-behavior: contain;
      z-index: 1;
    }

    .container-hover-tint {
      position: absolute;
      inset: 0;
      background: rgba(19, 30, 68, 0.1);
      opacity: 0;
      pointer-events: none;
      transition: opacity 140ms ease;
      z-index: 2;
    }

    .workspace[data-prototype-mode='false'] .canvas-item[data-kind='container']:hover .container-hover-tint {
      opacity: 1;
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
      width: 16px;
      height: 16px;
      border-radius: 3px;
      background: #ffffff;
      border: 2px solid #2457ff;
      box-sizing: border-box;
      z-index: 2;
      opacity: 0;
      pointer-events: none;
      transition: opacity 140ms ease;
    }

    .canvas-item[data-selected='true'] .handle {
      opacity: 1;
    }

    .canvas-item[data-kind='container'] .handle {
      width: 16px;
      height: 16px;
      border-radius: 0;
      border-width: 1px;
      pointer-events: none;
    }

    .canvas-item[data-kind='container'][data-selected='true'] .handle {
      pointer-events: auto;
    }

    .handle.top-left {
      top: -8px;
      left: -8px;
    }

    .handle.top-right {
      top: -8px;
      right: -8px;
    }

    .handle.bottom-left {
      bottom: -8px;
      left: -8px;
    }

    .handle.bottom-right {
      bottom: -8px;
      right: -8px;
    }

    .canvas-item[data-kind='container'] .handle.top-left,
    .canvas-item[data-kind='container'] .handle.top-right {
      top: -8px;
    }

    .canvas-item[data-kind='container'] .handle.bottom-left,
    .canvas-item[data-kind='container'] .handle.bottom-right {
      bottom: -8px;
    }

    .canvas-item[data-kind='container'] .handle.top-left,
    .canvas-item[data-kind='container'] .handle.bottom-left {
      left: -8px;
    }

    .canvas-item[data-kind='container'] .handle.top-right,
    .canvas-item[data-kind='container'] .handle.bottom-right {
      right: -8px;
    }

    .canvas-item[data-kind='container'] .handle.top-left,
    .canvas-item[data-kind='container'] .handle.bottom-right {
      cursor: nwse-resize;
    }

    .canvas-item[data-kind='container'] .handle.top-right,
    .canvas-item[data-kind='container'] .handle.bottom-left {
      cursor: nesw-resize;
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
      position: fixed;
      top: 24px;
      right: 24px;
      bottom: 24px;
      width: 320px;
      max-height: calc(100vh - 48px);
      overflow: auto;
      z-index: 20;
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

    .tools-panel[data-collapsed='true'] {
      bottom: auto;
      min-height: 0;
      max-height: none;
      overflow: visible;
      gap: 0;
    }

    .tools-drawer-toggle {
      display: none;
    }

    .tools-drawer-backdrop {
      display: none;
    }

    .workspace[data-tools-drawer-mode='true'] .tools-drawer-toggle {
      position: fixed;
      top: 24px;
      right: 24px;
      z-index: 25;
      height: 40px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 999px;
      background: rgba(0, 0, 0, 0.88);
      color: #ffffff;
      padding: 0 14px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font: inherit;
      font-size: 0.84rem;
      font-weight: 500;
      cursor: pointer;
      box-shadow: 0 18px 34px rgba(0, 0, 0, 0.26);
      transition:
        transform 160ms ease,
        opacity 160ms ease,
        box-shadow 160ms ease;
    }

    .workspace[data-tools-drawer-mode='true'] .tools-drawer-toggle:hover {
      transform: translateY(-1px);
      box-shadow: 0 22px 40px rgba(0, 0, 0, 0.32);
    }

    .workspace[data-tools-drawer-mode='true'][data-tools-drawer-open='true'] .tools-drawer-toggle {
      opacity: 0;
      pointer-events: none;
      transform: translateY(-6px);
    }

    .workspace[data-tools-drawer-mode='true'] .tools-drawer-toggle svg {
      width: 16px;
      height: 16px;
      display: block;
      flex: 0 0 auto;
    }

    .workspace[data-tools-drawer-mode='true'] .tools-drawer-backdrop {
      position: fixed;
      inset: 0;
      z-index: 24;
      display: block;
      border: none;
      padding: 0;
      margin: 0;
      background: rgba(6, 10, 25, 0.34);
      backdrop-filter: blur(2px);
      opacity: 0;
      pointer-events: none;
      transition: opacity 180ms ease;
    }

    .workspace[data-tools-drawer-mode='true'][data-tools-drawer-open='true'] .tools-drawer-backdrop {
      opacity: 1;
      pointer-events: none;
    }

    .workspace[data-tools-drawer-mode='true'] .tools-panel {
      position: fixed;
      top: 24px;
      right: 24px;
      bottom: 24px;
      width: min(360px, calc(100vw - 48px));
      max-height: calc(100vh - 48px);
      min-height: auto;
      overflow: auto;
      z-index: 30;
      transform: translateX(calc(100% + 40px));
      opacity: 0;
      pointer-events: none;
      transition:
        transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
        opacity 180ms ease;
    }

    .workspace[data-tools-drawer-mode='true'][data-tools-drawer-open='true'] .tools-panel {
      transform: translateX(0);
      opacity: 1;
      pointer-events: auto;
    }

    .workspace[data-tools-drawer-mode='true'] .tools-panel[data-collapsed='true'] {
      bottom: auto;
      max-height: none;
      min-height: 0;
      overflow: visible;
    }

    .panel-title,
    .section-title {
      margin: 0;
    }

    .panel-title {
      font-size: 1.18rem;
      line-height: 1.1;
      color: #ffffff;
      font-family: var(--font-display);
      font-weight: 700;
    }

    .panel-title[data-compact='true'] {
      font-size: 0.95rem;
      line-height: 1.2;
      font-family: var(--font-sans);
      font-weight: 500;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .tool-section {
      display: grid;
      gap: 12px;
    }

    .panel-head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }

    .panel-head-main {
      flex: 1 1 auto;
      min-width: 0;
      display: grid;
      gap: 10px;
      justify-items: start;
    }

    .panel-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 0 0 auto;
    }

    .panel-actions-stack {
      display: grid;
      justify-items: end;
      align-content: start;
      gap: 8px;
      flex: 0 0 auto;
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

    .panel-action[data-active='true'] {
      background: rgba(132, 168, 255, 0.18);
      border-color: rgba(132, 168, 255, 0.28);
    }

    .panel-action-code {
      background: rgba(255, 214, 10, 0.22);
      border-color: rgba(255, 214, 10, 0.3);
      color: #fff7d1;
    }

    .panel-action-code[data-active='true'] {
      background: rgba(255, 214, 10, 0.32);
      border-color: rgba(255, 214, 10, 0.42);
      color: #fffbe8;
    }

    .panel-action-prototype {
      background: rgba(72, 214, 151, 0.18);
      border-color: rgba(72, 214, 151, 0.28);
      color: #dcfff0;
    }

    .panel-action-prototype[data-active='true'] {
      background: rgba(255, 96, 96, 0.22);
      border-color: rgba(255, 96, 96, 0.34);
      color: #ffe8e8;
    }

    .panel-action-create {
      width: auto;
      min-width: 36px;
      padding: 0 12px;
      background: rgba(132, 168, 255, 0.16);
      border-color: rgba(132, 168, 255, 0.24);
      color: #eef4ff;
      font-size: 0.76rem;
      font-weight: 500;
      letter-spacing: 0.03em;
    }

    .panel-action-dismiss {
      flex: 0 0 auto;
    }

    .tools-drawer-close {
      display: none;
      background: rgba(255, 214, 10, 0.22);
      border-color: rgba(255, 214, 10, 0.3);
      color: #fff7d1;
    }

    .tools-drawer-close:hover {
      background: rgba(255, 214, 10, 0.3);
      border-color: rgba(255, 214, 10, 0.4);
    }

    .workspace[data-tools-drawer-mode='true'] .tools-drawer-close {
      display: inline-grid;
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

    .component-tabs {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }

    .component-tab {
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.04);
      color: rgba(255, 255, 255, 0.78);
      padding: 10px 12px;
      font: inherit;
      font-size: 0.84rem;
      font-weight: 500;
      cursor: pointer;
      transition:
        background 140ms ease,
        border-color 140ms ease,
        color 140ms ease;
    }

    .component-tab[data-active='true'] {
      background: rgba(132, 168, 255, 0.18);
      border-color: rgba(132, 168, 255, 0.28);
      color: #ffffff;
    }

    .tool-preview-anchor {
      position: relative;
    }

    .tool-preview-popover {
      position: absolute;
      left: 50%;
      bottom: calc(100% + 10px);
      transform: translateX(-50%);
      width: min(248px, calc(100vw - 72px));
      border: 1px solid rgba(217, 225, 238, 0.96);
      border-radius: 18px;
      background: #ffffff;
      box-shadow: 0 20px 48px rgba(24, 37, 76, 0.18);
      padding: 12px;
      display: grid;
      place-items: center;
      z-index: 6;
      pointer-events: none;
      animation: preview-popover-in 180ms ease;
    }

    .tool-preview-popover[data-tool='desktop-menu'] {
      width: min(440px, calc(100vw - 72px));
      padding: 14px;
    }

    .tool-preview-popover[data-tool^='custom-molecule:'] {
      width: min(360px, calc(100vw - 72px));
      padding: 14px;
    }

    .tool-preview-popover::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 100%;
      width: 14px;
      height: 14px;
      background: #ffffff;
      border-right: 1px solid rgba(217, 225, 238, 0.96);
      border-bottom: 1px solid rgba(217, 225, 238, 0.96);
      transform: translate(-50%, -50%) rotate(45deg);
    }

    .preview-canvas {
      width: 100%;
      min-height: 112px;
      display: grid;
      place-items: center;
    }

    .preview-text {
      width: min(100%, 220px);
    }

    .preview-button {
      width: min(100%, 236px);
      height: 55px;
    }

    .preview-container {
      width: min(100%, 240px);
      height: 132px;
    }

    .preview-desktop-menu {
      width: min(100%, 400px);
      height: 96px;
    }

    .preview-custom-molecule {
      position: relative;
      width: min(100%, 320px);
      min-height: 140px;
    }

    @keyframes preview-popover-in {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(6px) scale(0.96);
      }

      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0) scale(1);
      }
    }

    .section-title {
      font-size: 0.95rem;
      color: #ffffff;
      font-weight: 500;
    }

    .section-title-button {
      border: none;
      background: transparent;
      padding: 0;
      margin: 0;
      color: inherit;
      font: inherit;
      font-size: inherit;
      font-weight: inherit;
      text-align: left;
      cursor: text;
    }

    .section-title-input {
      width: 100%;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.06);
      color: #ffffff;
      padding: 10px 12px;
      font: inherit;
      font-size: 0.95rem;
      font-weight: 500;
      box-sizing: border-box;
      outline: none;
    }

    .editor-stack {
      display: grid;
      gap: 14px;
    }

    .editor-row {
      display: grid;
      gap: 8px;
      position: relative;
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

    .editor-input {
      width: 100%;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.06);
      color: #ffffff;
      padding: 10px 12px;
      font: inherit;
      font-size: 0.88rem;
      outline: none;
      box-sizing: border-box;
    }

    .editor-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }

    .editor-field {
      display: grid;
      gap: 6px;
    }

    .editor-field-label {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.74rem;
      font-weight: 500;
      letter-spacing: 0.02em;
    }

    .editor-help {
      margin: 0;
      color: rgba(255, 255, 255, 0.56);
      font-size: 0.76rem;
      line-height: 1.45;
    }

    .editor-switch-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .editor-switch {
      position: relative;
      display: inline-flex;
      align-items: center;
      width: 44px;
      height: 26px;
      flex: 0 0 auto;
      cursor: pointer;
    }

    .editor-switch-input {
      position: absolute;
      inset: 0;
      margin: 0;
      opacity: 0;
      cursor: pointer;
    }

    .editor-switch-track {
      width: 100%;
      height: 100%;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.16);
      border: 1px solid rgba(255, 255, 255, 0.12);
      transition: background 140ms ease, border-color 140ms ease;
      box-sizing: border-box;
    }

    .editor-switch-track::after {
      content: '';
      position: absolute;
      top: 3px;
      left: 3px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #ffffff;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.24);
      transition: transform 140ms ease;
    }

    .editor-switch-input:checked + .editor-switch-track {
      background: rgba(36, 87, 255, 0.34);
      border-color: rgba(132, 168, 255, 0.34);
    }

    .editor-switch-input:checked + .editor-switch-track::after {
      transform: translateX(18px);
    }

    .editor-select option {
      color: #172033;
    }

    .color-dropdown {
      position: relative;
    }

    .color-dropdown-trigger {
      width: 100%;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.06);
      color: #ffffff;
      padding: 10px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      cursor: pointer;
      font: inherit;
      text-align: left;
      transition: border-color 140ms ease, background 140ms ease;
    }

    .color-dropdown-trigger[data-open='true'] {
      border-color: rgba(132, 168, 255, 0.28);
      background: rgba(132, 168, 255, 0.12);
    }

    .color-dropdown-trigger-main {
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .color-dropdown-value {
      min-width: 0;
      display: grid;
      gap: 2px;
    }

    .color-dropdown-label {
      font-size: 0.88rem;
      color: #ffffff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .color-dropdown-meta {
      font-size: 0.73rem;
      color: rgba(255, 255, 255, 0.54);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .color-dropdown-chevron {
      width: 16px;
      height: 16px;
      color: rgba(255, 255, 255, 0.72);
      flex: 0 0 auto;
      transition: transform 140ms ease;
    }

    .color-dropdown-trigger[data-open='true'] .color-dropdown-chevron {
      transform: rotate(180deg);
    }

    .color-dropdown-panel {
      position: absolute;
      left: 0;
      right: 0;
      top: calc(100% + 8px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 18px;
      background: rgb(12, 18, 53);
      box-shadow: 0 20px 48px rgba(0, 0, 0, 0.32);
      padding: 12px;
      display: grid;
      gap: 10px;
      z-index: 8;
    }

    .icon-dropdown-panel {
      padding: 12px;
      display: grid;
      gap: 10px;
    }

    .icon-picker-panel {
      border-color: rgba(180, 189, 208, 0.9);
      background: #e9edf5;
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
    }

    .icon-picker-panel .color-dropdown-title {
      color: rgba(19, 30, 68, 0.72);
    }

    .icon-picker-panel .icon-swatch {
      border-color: rgba(180, 189, 208, 0.9);
      background: rgba(255, 255, 255, 0.92);
    }

    .icon-picker-panel .icon-swatch[data-active='true'] {
      background: rgba(36, 87, 255, 0.14);
      border-color: rgba(36, 87, 255, 0.24);
    }

    .icon-swatch-grid {
      display: grid;
      gap: 8px;
      grid-template-columns: repeat(auto-fit, minmax(42px, 42px));
      justify-content: start;
    }

    .icon-swatch {
      width: 42px;
      height: 42px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.04);
      display: grid;
      place-items: center;
      padding: 8px;
      cursor: pointer;
      transition: background 140ms ease, border-color 140ms ease;
      box-sizing: border-box;
    }

    .icon-swatch[data-active='true'] {
      background: rgba(132, 168, 255, 0.18);
      border-color: rgba(132, 168, 255, 0.28);
    }

    .icon-swatch-preview {
      width: 20px;
      height: 20px;
      display: block;
    }

    .micro-swatch-preview {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 10px;
      overflow: hidden;
    }

    .color-dropdown-title {
      margin: 0;
      color: rgba(255, 255, 255, 0.62);
      font-size: 0.74rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .color-swatch-grid {
      display: grid;
      gap: 8px;
      grid-template-columns: repeat(auto-fit, minmax(16px, 16px));
      justify-content: start;
    }

    .color-swatch {
      border: 1px solid rgba(255, 255, 255, 0.12);
      width: 16px;
      height: 16px;
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.04);
      color: #ffffff;
      padding: 0;
      display: block;
      cursor: pointer;
      text-align: left;
      font: inherit;
      transition: background 140ms ease, border-color 140ms ease;
    }

    .color-swatch[data-active='true'] {
      background: rgba(132, 168, 255, 0.18);
      border-color: rgba(132, 168, 255, 0.28);
    }

    .color-swatch-chip {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 14px;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      box-sizing: border-box;
      flex: 0 0 auto;
    }

    .color-swatch-chip[data-transparent='true'] {
      background:
        linear-gradient(45deg, rgba(255, 255, 255, 0.14) 25%, transparent 25%),
        linear-gradient(-45deg, rgba(255, 255, 255, 0.14) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.14) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.14) 75%);
      background-size: 8px 8px;
      background-position: 0 0, 0 4px, 4px -4px, -4px 0;
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

    .custom-molecule-card {
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

    .custom-molecule-card:hover {
      transform: translateY(-1px);
      border-color: rgba(132, 168, 255, 0.24);
      background: linear-gradient(180deg, rgba(132, 168, 255, 0.12), rgba(255, 255, 255, 0.04));
    }

    .custom-molecule-card:active {
      cursor: grabbing;
    }

    .custom-molecule-card[data-selected='true'] {
      border-color: rgba(132, 168, 255, 0.32);
      background: linear-gradient(180deg, rgba(132, 168, 255, 0.16), rgba(255, 255, 255, 0.05));
      box-shadow: 0 0 0 1px rgba(132, 168, 255, 0.18);
    }

    .custom-molecule-badge {
      width: 56px;
      height: 36px;
      border-radius: 12px;
      background: #ffffff;
      box-shadow: 0 8px 18px rgba(24, 37, 76, 0.08);
      border: 1px solid rgba(217, 225, 238, 0.92);
      position: relative;
      overflow: hidden;
      flex: 0 0 auto;
    }

    .custom-molecule-badge::before {
      content: '';
      position: absolute;
      inset: 7px;
      border: 1.5px solid #2457ff;
      border-radius: 8px;
      background: rgba(237, 243, 255, 0.9);
    }

    .custom-molecule-badge::after {
      content: '';
      position: absolute;
      left: 16px;
      right: 16px;
      top: 16px;
      height: 4px;
      border-radius: 999px;
      background: rgba(19, 30, 68, 0.24);
    }

    .custom-molecule-title {
      margin: 0;
      color: #ffffff;
      font-size: 0.88rem;
      font-family: var(--font-sans);
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .component-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(6, 10, 25, 0.42);
      backdrop-filter: blur(4px);
      z-index: 40;
      display: grid;
      place-items: center;
      padding: 24px;
      box-sizing: border-box;
    }

    .component-modal {
      width: min(420px, 100%);
      border-radius: 24px;
      background: #0f163f;
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.34);
      padding: 24px;
      display: grid;
      gap: 18px;
      box-sizing: border-box;
    }

    .component-modal-title {
      margin: 0;
      color: #ffffff;
      font-size: 1.05rem;
      font-weight: 500;
    }

    .component-modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }

    .component-modal-button {
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.06);
      color: #ffffff;
      min-height: 38px;
      padding: 0 16px;
      font: inherit;
      font-size: 0.86rem;
      font-weight: 500;
      cursor: pointer;
    }

    .component-modal-button[data-primary='true'] {
      background: rgba(132, 168, 255, 0.18);
      border-color: rgba(132, 168, 255, 0.28);
    }

    .component-modal-button:disabled {
      opacity: 0.42;
      cursor: not-allowed;
    }

    .align-icon {
      display: block;
      width: 18px;
      height: 18px;
      margin: 0 auto;
      color: currentColor;
    }

    .page-preview.code-view {
      background: #0d122b;
      overflow: auto;
    }

    .code-block {
      margin: 0;
      min-height: 100%;
      box-sizing: border-box;
      padding: 24px;
      color: #d8e3ff;
      font: 500 13px/1.6 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      white-space: pre-wrap;
      word-break: break-word;
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

      .workspace[data-tools-drawer-mode='true'] .tools-drawer-toggle {
        top: 16px;
        right: 16px;
      }

      .workspace[data-tools-drawer-mode='true'] .tools-panel {
        top: 16px;
        right: 16px;
        bottom: 16px;
        width: calc(100vw - 32px);
        max-height: calc(100vh - 32px);
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

      .canvas-controls-left {
        width: auto;
      }

      .canvas-menu {
        top: 16px;
        left: 16px;
      }

      .canvas-menu-button {
        width: auto;
        max-width: calc(100vw - 32px);
        justify-content: space-between;
      }

      .canvas-menu-panel {
        width: min(320px, calc(100vw - 32px));
      }

      .canvas-controls-right {
        width: 100%;
        justify-content: space-between;
      }

      .segment-button {
        flex: 1;
      }
    }
  `}disconnectedCallback(){window.clearTimeout(this.viewportAnimationTimeout),window.clearTimeout(this.toolPreviewTimeout),window.cancelAnimationFrame(this.autoContainerSizeFrame??0),window.cancelAnimationFrame(this.canvasViewportSyncFrame??0),window.removeEventListener(`keydown`,this.handleWindowKeyDown),window.removeEventListener(`resize`,this.syncToolsDrawerMode),window.removeEventListener(`scroll`,this.handleWindowScroll,{capture:!1}),window.removeEventListener(`pointermove`,this.handleWindowPointerMove),window.removeEventListener(`pointerup`,this.handleWindowPointerUp),window.removeEventListener(`pointerdown`,this.handleWindowPointerDown),this.resizeObserver?.disconnect(),super.disconnectedCallback()}firstUpdated(){window.addEventListener(`keydown`,this.handleWindowKeyDown),window.addEventListener(`pointerdown`,this.handleWindowPointerDown),window.addEventListener(`resize`,this.syncToolsDrawerMode),window.addEventListener(`scroll`,this.handleWindowScroll,{passive:!0}),this.syncToolsDrawerMode(),this.queueCanvasViewportSync(),this.resizeObserver=new ResizeObserver(e=>{let t=new Map;for(let n of e){let e=n.target.dataset.itemId;e&&t.set(e,{width:Math.round(n.contentRect.width),height:Math.round(n.contentRect.height)})}if(t.size===0)return;let n=!1,r=this.typographyItems.map(e=>{let r=t.get(e.id);return!r||e.width===r.width&&e.height===r.height?e:(n=!0,{...e,width:r.width,height:r.height})}),i=!1,a=this.buttonItems.map(e=>{let n=t.get(e.id);return!n||e.width===n.width&&e.height===n.height?e:(i=!0,{...e,width:n.width,height:n.height})}),o=!1,s=this.inputTextItems.map(e=>{let n=t.get(e.id);return!n||e.width===n.width&&e.height===n.height?e:(o=!0,{...e,width:n.width,height:e.height})}),c=!1,l=this.iconItems.map(e=>{let n=t.get(e.id);return!n||e.width===n.width&&e.height===n.height?e:(c=!0,{...e,width:n.width,height:n.height})}),u=!1,d=this.desktopMenuItems.map(e=>{let n=t.get(e.id);return!n||e.width===n.width&&e.height===n.height?e:(u=!0,{...e,width:n.width,height:n.height})}),f=!1,p=this.logoItems.map(e=>{let n=t.get(e.id);return!n||e.width===n.width&&e.height===n.height?e:(f=!0,{...e,width:n.width,height:n.height})}),m=!1,h=this.microIllustrationItems.map(e=>{let n=t.get(e.id);return!n||e.width===n.width&&e.height===n.height?e:(m=!0,{...e,width:n.width,height:n.height})}),g=!1,_=this.imageItems.map(e=>{let n=t.get(e.id);return!n||e.width===n.width&&e.height===n.height?e:(g=!0,{...e,width:n.width,height:n.height})});n&&(this.typographyItems=r),i&&(this.buttonItems=a),o&&(this.inputTextItems=s),c&&(this.iconItems=l),u&&(this.desktopMenuItems=d),f&&(this.logoItems=p),m&&(this.microIllustrationItems=h),g&&(this.imageItems=_)})}updated(){this.resizeObserver&&(this.resizeObserver.disconnect(),this.renderRoot.querySelectorAll(`.canvas-item`).forEach(e=>{this.resizeObserver?.observe(e)}),window.cancelAnimationFrame(this.autoContainerSizeFrame??0),this.autoContainerSizeFrame=window.requestAnimationFrame(()=>{this.syncAutoContainerSizes()}))}cloneCanvasScene(e){return{canvasBackground:e.canvasBackground,typographyItems:e.typographyItems.map(e=>({...e})),buttonItems:e.buttonItems.map(e=>({...e})),inputTextItems:e.inputTextItems.map(e=>({...e})),iconItems:e.iconItems.map(e=>({...e})),desktopMenuItems:e.desktopMenuItems.map(e=>({...e})),logoItems:e.logoItems.map(e=>({...e})),microIllustrationItems:e.microIllustrationItems.map(e=>({...e})),imageItems:e.imageItems.map(e=>({...e})),containerItems:e.containerItems.map(e=>({...e})),nextTypographyId:e.nextTypographyId,nextButtonId:e.nextButtonId,nextInputTextId:e.nextInputTextId,nextIconId:e.nextIconId,nextDesktopMenuId:e.nextDesktopMenuId,nextLogoId:e.nextLogoId,nextMicroIllustrationId:e.nextMicroIllustrationId,nextImageId:e.nextImageId,nextContainerId:e.nextContainerId,nextCanvasOrder:e.nextCanvasOrder}}createEmptyCanvasScene(){return{canvasBackground:`var(--color-surface)`,typographyItems:[],buttonItems:[],inputTextItems:[],iconItems:[],desktopMenuItems:[],logoItems:[],microIllustrationItems:[],imageItems:[],containerItems:[],nextTypographyId:1,nextButtonId:1,nextInputTextId:1,nextIconId:1,nextDesktopMenuId:1,nextLogoId:1,nextMicroIllustrationId:1,nextImageId:1,nextContainerId:1,nextCanvasOrder:1}}getActiveCanvasScene(){return{canvasBackground:this.canvasBackground,typographyItems:this.typographyItems,buttonItems:this.buttonItems,inputTextItems:this.inputTextItems,iconItems:this.iconItems,desktopMenuItems:this.desktopMenuItems,logoItems:this.logoItems,microIllustrationItems:this.microIllustrationItems,imageItems:this.imageItems,containerItems:this.containerItems,nextTypographyId:this.nextTypographyId,nextButtonId:this.nextButtonId,nextInputTextId:this.nextInputTextId,nextIconId:this.nextIconId,nextDesktopMenuId:this.nextDesktopMenuId,nextLogoId:this.nextLogoId,nextMicroIllustrationId:this.nextMicroIllustrationId,nextImageId:this.nextImageId,nextContainerId:this.nextContainerId,nextCanvasOrder:this.nextCanvasOrder}}getCanvasScene(e){return e===this.activeCanvasId?this.getActiveCanvasScene():this.canvasScenes.get(e)??this.createEmptyCanvasScene()}saveActiveCanvasScene(){this.canvasScenes.set(this.activeCanvasId,this.cloneCanvasScene(this.getActiveCanvasScene()))}setActiveCanvasState(e,t){let n=this.canvasScenes.get(e)??this.createEmptyCanvasScene();this.activeCanvasId=e,this.loadCanvasScene(n),this.isCanvasEditing=t,t&&this.openToolsDrawerIfNeeded()}activateCanvas(e,t){if(this.isCanvasMenuOpen=!1,e===this.activeCanvasId){t?this.enterCanvasEditing():(this.handleWindowPointerUp(),this.clearActiveEditingState()),this.scrollCanvasIntoView(e);return}this.saveActiveCanvasScene(),this.setActiveCanvasState(e,t),this.scrollCanvasIntoView(e)}syncActiveCanvasToViewport(){let e=Array.from(this.renderRoot.querySelectorAll(`[data-canvas-surface-id]`));if(e.length===0)return;let t=window.innerHeight-32,n=null,r=0,i=1/0;for(let a of e){let e=a.getBoundingClientRect(),o=Math.max(e.top,96),s=Math.min(e.bottom,t),c=Math.max(0,s-o),l=a.dataset.canvasSurfaceId;if(!l)continue;let u=Math.abs(e.top-96);(c>r||c===r&&u<i)&&(r=c,i=u,n=l)}!n||n===this.activeCanvasId||(this.saveActiveCanvasScene(),this.setActiveCanvasState(n,!this.isPrototypeMode))}queueCanvasViewportSync(){window.cancelAnimationFrame(this.canvasViewportSyncFrame??0),this.canvasViewportSyncFrame=window.requestAnimationFrame(()=>{this.syncActiveCanvasToViewport()})}get activeCanvas(){return this.canvases.find(e=>e.id===this.activeCanvasId)??this.canvases[0]??null}getCanvasFallbackName(e){let t=this.canvases.findIndex(t=>t.id===e);return t>=0?`Lienzo ${t+1}`:`Lienzo`}scrollCanvasIntoView(e){window.requestAnimationFrame(()=>{this.renderRoot.querySelector(`[data-canvas-surface-id="${e}"]`)?.scrollIntoView({behavior:`smooth`,block:`start`})})}enterCanvasEditing(){this.handleWindowPointerUp(),this.clearActiveEditingState(),this.isCanvasEditing=!0,this.openToolsDrawerIfNeeded()}loadCanvasScene(e){let t=this.cloneCanvasScene(e);this.handleWindowPointerUp(),this.activeDraggedTool=null,this.isCanvasDragActive=!1,this.selectedToolPreview=null,this.clearActiveEditingState(),this.canvasBackground=t.canvasBackground,this.typographyItems=t.typographyItems,this.buttonItems=t.buttonItems,this.inputTextItems=t.inputTextItems,this.iconItems=t.iconItems,this.desktopMenuItems=t.desktopMenuItems,this.logoItems=t.logoItems,this.microIllustrationItems=t.microIllustrationItems,this.imageItems=t.imageItems,this.containerItems=t.containerItems,this.nextTypographyId=t.nextTypographyId,this.nextButtonId=t.nextButtonId,this.nextInputTextId=t.nextInputTextId,this.nextIconId=t.nextIconId,this.nextDesktopMenuId=t.nextDesktopMenuId,this.nextLogoId=t.nextLogoId,this.nextMicroIllustrationId=t.nextMicroIllustrationId,this.nextImageId=t.nextImageId,this.nextContainerId=t.nextContainerId,this.nextCanvasOrder=t.nextCanvasOrder}handleCreateCanvas(){this.saveActiveCanvasScene();let e=this.canvases.length+1,t={id:`canvas-${e}`,name:`Lienzo ${e}`},n=this.createEmptyCanvasScene();this.canvasScenes.set(t.id,this.cloneCanvasScene(n)),this.canvases=[...this.canvases,t],this.activeCanvasId=t.id,this.loadCanvasScene(n),this.isCanvasMenuOpen=!1,this.isCanvasEditing=!this.isPrototypeMode,this.isPrototypeMode||this.openToolsDrawerIfNeeded(),this.scrollCanvasIntoView(t.id)}handleSelectCanvas(e){this.activateCanvas(e,!this.isPrototypeMode)}getDefaultFontSize(e){return e===`tiempos-headline`?42:32}getDefaultTypographyHeight(e){return Math.max(1,Math.ceil(this.getDefaultFontSize(e)*1.1))}getGridColumns(e=this.viewport){return e===`mobile`?4:12}clampContainerStart(e,t,n){return Math.max(1,Math.min(n-t+1,e))}getContainerPercentage(e,t){return Math.round(e/t*100)}getCanvasReferenceWidth(e=this.viewport){let t=this.getCanvasHostElement();return t?t.getBoundingClientRect().width:e===`mobile`?430:1120}getContainerLeftPercent(e,t){return(e-1)/t*100}getContainerWidthPercent(e,t){return e/t*100}getContainerRenderedWidth(e,t=this.viewport){if(e.widthMode===`auto`&&e.autoWidth>0)return e.autoWidth;let n=this.getGridColumns(t),r=t===`mobile`?e.mobileSpan:e.desktopSpan;return this.getCanvasReferenceWidth(t)*this.getContainerWidthPercent(r,n)/100}getContainerRenderedHeight(e){return e.heightMode===`auto`&&e.autoHeight>0?e.autoHeight:e.height}getContainerWidthInputValue(e){return Math.round(this.getContainerRenderedWidth(e))}getContainerHeightInputValue(e){return Math.round(this.getContainerRenderedHeight(e))}syncAutoContainerSizes(){let e=!1,t=this.containerItems.map(t=>{if(t.widthMode!==`auto`&&t.heightMode!==`auto`)return t;let n=this.getContainerContentElement(t.id);if(!n)return t;let r=t.widthMode===`auto`?Math.max(32,Math.ceil(n.scrollWidth+t.paddingLeft+t.paddingRight)):t.autoWidth,i=t.heightMode===`auto`?Math.max(1,Math.ceil(n.scrollHeight+t.paddingTop+t.paddingBottom)):t.autoHeight;return r===t.autoWidth&&i===t.autoHeight?t:(e=!0,{...t,autoWidth:r,autoHeight:i})});e&&(this.containerItems=t)}getContainerStartFromX(e,t,n,r){let i=t/n,a=Math.round(e/i)+1;return this.clampContainerStart(a,r,n)}getContainerViewportPlacement(e,t=this.viewport){let n=t===`mobile`?e.mobileStart:e.desktopStart;return{start:n,end:n+(t===`mobile`?e.mobileSpan:e.desktopSpan)-1,top:e.y,bottom:e.y+this.getContainerRenderedHeight(e)}}containersOverlap(e,t,n=this.viewport){let r=this.getContainerViewportPlacement(e,n),i=this.getContainerViewportPlacement(t,n),a=r.start<=i.end&&r.end>=i.start,o=r.top<i.bottom&&r.bottom>i.top;return a&&o}resolveContainerCollision(e,t=this.containerItems,n=this.viewport){let r=t.filter(t=>t.id!==e.id&&t.parentId===e.parentId).sort((e,t)=>e.y-t.y),i={...e,y:Math.max(0,e.y)},a=!0,o=0;for(;a&&o<=r.length;){a=!1,o+=1;for(let e of r)this.containersOverlap(i,e,n)&&(i={...i,y:e.y+e.height+d},a=!0)}return i}createTypographyItem(e,t,n=null){let r=this.viewport===`mobile`?208:240,i=this.getDefaultTypographyHeight(this.toolTypographyPreset);this.typographyItems=[...this.typographyItems,{id:`typo-${this.nextTypographyId++}`,parentId:n,x:e,y:t,width:r,height:i,order:this.nextCanvasOrder++,preset:this.toolTypographyPreset,align:`left`,verticalAlign:`top`,bold:!1,italic:!1,color:`var(--color-text)`,fontSize:this.getDefaultFontSize(this.toolTypographyPreset),text:`Texto de ejemplo`}]}createButtonItem(e,t,n,r=null){let i=e===`icon-button`?34:this.viewport===`mobile`?248:304,a=e===`icon-button`?34:55;this.buttonItems=[...this.buttonItems,{id:`button-${this.nextButtonId++}`,parentId:r,x:t,y:n,width:i,height:a,order:this.nextCanvasOrder++,variant:e,label:e===`icon-button`?``:`Conoce más`,action:``,fontSize:22,icon:e===`icon-button`?`search`:void 0,backgroundVisible:e===`icon-button`?!0:void 0}]}createInputTextItem(e,t,n=null){this.inputTextItems=[...this.inputTextItems,{id:`input-${this.nextInputTextId++}`,parentId:n,x:e,y:t,width:320,height:56,order:this.nextCanvasOrder++,label:`Número de Tarjeta`,value:``,icon:`eye-off`,iconVisible:!0,status:`inactive`}]}createIconItem(e,t,n=null){this.iconItems=[...this.iconItems,{id:`icon-${this.nextIconId++}`,parentId:n,x:e,y:t,width:40,height:40,order:this.nextCanvasOrder++,icon:c[0].value,color:`var(--color-primary-strong)`}]}createDesktopMenuItem(e,t=null,n=this.viewport===`mobile`?430:1120,r=1,i=1){let a=Math.max(.72,Math.min(1,n/1040)),o=(e,t=1)=>Math.max(t,Math.round(e*a)),s=this.resolveContainerCollision({id:`container-${this.nextContainerId++}`,parentId:t,name:`Desktop Menu`,y:e,height:o(118,96),autoWidth:0,autoHeight:0,widthMode:`manual`,heightMode:`manual`,order:this.nextCanvasOrder++,background:`var(--color-surface)`,borderRadius:o(28),paddingTop:o(16),paddingRight:o(18),paddingBottom:o(16),paddingLeft:o(18),scrollEnabled:!1,shadowEnabled:!0,shadowX:0,shadowY:o(16,10),shadowBlur:o(36,20),shadowSpread:0,shadowOpacity:.12,shadowColor:`var(--color-bg)`,desktopStart:this.clampContainerStart(r,12,12),desktopSpan:12,mobileStart:this.clampContainerStart(i,4,4),mobileSpan:4});this.containerItems=[...this.containerItems,s];let c=s.id;this.logoItems=[...this.logoItems,{id:`logo-${this.nextLogoId++}`,parentId:c,x:o(12),y:o(14),width:o(118),height:o(36,24),order:this.nextCanvasOrder++}],this.typographyItems=[...this.typographyItems,{id:`typo-${this.nextTypographyId++}`,parentId:c,x:o(170),y:o(28),width:o(92),height:o(24,18),order:this.nextCanvasOrder++,preset:`benton-medium`,align:`left`,verticalAlign:`center`,bold:!0,italic:!1,color:`var(--color-primary-strong)`,fontSize:o(16,12),text:`Personas`},{id:`typo-${this.nextTypographyId++}`,parentId:c,x:o(286),y:o(28),width:o(184),height:o(24,18),order:this.nextCanvasOrder++,preset:`benton-medium`,align:`left`,verticalAlign:`center`,bold:!1,italic:!1,color:`var(--color-primary-strong)`,fontSize:o(16,12),text:`Empresas y Gobierno`},{id:`typo-${this.nextTypographyId++}`,parentId:c,x:o(494),y:o(28),width:o(54),height:o(24,18),order:this.nextCanvasOrder++,preset:`benton-medium`,align:`left`,verticalAlign:`center`,bold:!1,italic:!1,color:`var(--color-primary-strong)`,fontSize:o(16,12),text:`Pyme`},{id:`typo-${this.nextTypographyId++}`,parentId:c,x:o(978),y:o(28),width:o(48),height:o(24,18),order:this.nextCanvasOrder++,preset:`benton-medium`,align:`left`,verticalAlign:`center`,bold:!1,italic:!1,color:`var(--color-primary-strong)`,fontSize:o(16,12),text:`Menú`}],this.buttonItems=[...this.buttonItems,{id:`button-${this.nextButtonId++}`,parentId:c,x:o(604),y:o(10),width:o(124,92),height:o(55,42),order:this.nextCanvasOrder++,variant:`secondary`,label:`Acceso`,action:``,fontSize:o(16,12)},{id:`button-${this.nextButtonId++}`,parentId:c,x:o(750),y:o(10),width:o(172,120),height:o(55,42),order:this.nextCanvasOrder++,variant:`opportunity`,label:`Hazte cliente`,action:``,fontSize:o(16,12)}],this.iconItems=[...this.iconItems,{id:`icon-${this.nextIconId++}`,parentId:c,x:o(942),y:o(25),width:o(24,18),height:o(24,18),order:this.nextCanvasOrder++,icon:`search`,color:`var(--color-primary-strong)`},{id:`icon-${this.nextIconId++}`,parentId:c,x:o(1032),y:o(25),width:o(24,18),height:o(24,18),order:this.nextCanvasOrder++,icon:`menu`,color:`var(--color-primary-strong)`}],this.selectedTypographyId=c,this.editingTypographyId=null,this.editingButtonId=null,this.editingIconId=null,this.editingLogoId=null,this.editingMicroIllustrationId=null,this.editingImageId=null,this.editingContainerId=c,this.isCanvasEditing=!1}createLogoItem(e,t,n=null){this.logoItems=[...this.logoItems,{id:`logo-${this.nextLogoId++}`,parentId:n,x:e,y:t,width:120,height:32,order:this.nextCanvasOrder++}]}createMicroIllustrationItem(e,t,n=null){this.microIllustrationItems=[...this.microIllustrationItems,{id:`micro-${this.nextMicroIllustrationId++}`,parentId:n,x:e,y:t,width:96,height:96,order:this.nextCanvasOrder++,illustration:l[0].value}]}createImageItem(e,t,n=null){let r={id:`image-${this.nextImageId++}`,parentId:n,x:e,y:t,width:200,height:200,order:this.nextCanvasOrder++,src:``,alt:`Imagen`};this.imageItems=[...this.imageItems,r],this.selectedTypographyId=r.id,this.editingTypographyId=null,this.editingButtonId=null,this.editingIconId=null,this.editingLogoId=null,this.editingMicroIllustrationId=null,this.editingImageId=r.id,this.editingContainerId=null,this.isCanvasEditing=!1,this.requestImageUpload(r.id)}createContainerItem(e,t=1,n=1,r=null){let i=this.resolveContainerCollision({id:`container-${this.nextContainerId++}`,parentId:r,name:`Contenedor`,y:e,height:168,autoWidth:0,autoHeight:0,widthMode:`manual`,heightMode:`manual`,order:this.nextCanvasOrder++,background:`transparent`,borderRadius:0,paddingTop:8,paddingRight:8,paddingBottom:8,paddingLeft:8,scrollEnabled:!1,...m,desktopStart:this.clampContainerStart(t,6,12),desktopSpan:6,mobileStart:this.clampContainerStart(n,4,4),mobileSpan:4});this.containerItems=[...this.containerItems,i],this.selectedTypographyId=i.id,this.editingTypographyId=null,this.editingButtonId=null,this.editingIconId=null,this.editingLogoId=null,this.editingMicroIllustrationId=null,this.editingImageId=null,this.editingContainerId=i.id,this.isCanvasEditing=!1}getCanvasHostElement(){return this.renderRoot.querySelector(`.page-preview`)}getContainerContentElement(e){return this.renderRoot.querySelector(`[data-container-content-id="${e}"]`)}getDropContainerAtPoint(e,t,n){let r=[...this.containerItems].sort((e,t)=>e.order-t.order).reverse();for(let i of r){if(n&&(i.id===n||this.isContainerDescendant(i.id,n)))continue;let r=this.getContainerContentElement(i.id);if(!r)continue;let a=r.getBoundingClientRect();if(e>=a.left&&e<=a.right&&t>=a.top&&t<=a.bottom)return{container:i,element:r,rect:a}}return null}isContainerDescendant(e,t){let n=this.containerItems.find(t=>t.id===e)?.parentId??null;for(;n;){if(n===t)return!0;n=this.containerItems.find(e=>e.id===n)?.parentId??null}return!1}canAbsorbDraggedContainer(e,t,n){return e.id===n||this.isContainerDescendant(e.id,n)?!1:t.width>this.dragState.itemWidth&&t.height>this.dragState.itemHeight}getSelectedContainerHostId(){return this.selectedContainerItem?.id??null}get selectedTypographyItem(){return this.typographyItems.find(e=>e.id===this.selectedTypographyId)??null}get selectedButtonItem(){return this.buttonItems.find(e=>e.id===this.selectedTypographyId)??null}get selectableButtonLinkCanvases(){return this.canvases.filter(e=>e.id!==this.activeCanvasId)}get selectedButtonActionType(){return this.selectedButtonItem?.action.trim()??``?`link`:`none`}get selectedButtonLinkTargetId(){return this.selectedButtonItem?.action?this.resolveCanvasTargetFromAction(this.selectedButtonItem.action)?.id??``:``}get selectedInputTextItem(){return this.inputTextItems.find(e=>e.id===this.selectedTypographyId)??null}get selectedContainerItem(){return this.containerItems.find(e=>e.id===this.selectedTypographyId)??null}get selectedIconItem(){return this.iconItems.find(e=>e.id===this.selectedTypographyId)??null}get selectedLogoItem(){return this.logoItems.find(e=>e.id===this.selectedTypographyId)??null}get selectedMicroIllustrationItem(){return this.microIllustrationItems.find(e=>e.id===this.selectedTypographyId)??null}get selectedImageItem(){return this.imageItems.find(e=>e.id===this.selectedTypographyId)??null}get isPanelEditingMode(){return!!(this.selectedTypographyItem||this.selectedInputTextItem||this.editingImageId&&this.selectedImageItem||this.editingMicroIllustrationId&&this.selectedMicroIllustrationItem||this.editingLogoId&&this.selectedLogoItem||this.editingIconId&&this.selectedIconItem||this.editingButtonId&&this.selectedButtonItem||this.editingContainerId&&this.selectedContainerItem||this.isCanvasEditing)}get panelTitleText(){return this.isPrototypeMode?`Modo prototipo`:this.isPanelEditingMode?`Edicion`:`Herramientas`}getCustomMoleculePreviewKey(e){return`custom-molecule:${e}`}getCustomMoleculeIdFromTool(e){return e.startsWith(`custom-molecule:`)?e.slice(16):null}getCustomMoleculeById(e){return this.customMolecules.find(t=>t.id===e)??null}getCustomMoleculeRootContainer(e){return e.scene.containerItems.find(e=>e.parentId===null)??null}buildCustomMoleculeScene(e){if(!this.containerItems.find(t=>t.id===e))return null;let t=new Set([e,...this.getNestedContainerIds(e)]),n=this.createEmptyCanvasScene();return n.containerItems=this.containerItems.filter(e=>t.has(e.id)).map(t=>t.id===e?{...t,parentId:null,y:0,desktopStart:1,mobileStart:1}:{...t}),n.typographyItems=this.typographyItems.filter(e=>e.parentId&&t.has(e.parentId)).map(e=>({...e})),n.buttonItems=this.buttonItems.filter(e=>e.parentId&&t.has(e.parentId)).map(e=>({...e})),n.inputTextItems=this.inputTextItems.filter(e=>e.parentId&&t.has(e.parentId)).map(e=>({...e})),n.iconItems=this.iconItems.filter(e=>e.parentId&&t.has(e.parentId)).map(e=>({...e})),n.desktopMenuItems=this.desktopMenuItems.filter(e=>e.parentId&&t.has(e.parentId)).map(e=>({...e})),n.logoItems=this.logoItems.filter(e=>e.parentId&&t.has(e.parentId)).map(e=>({...e})),n.microIllustrationItems=this.microIllustrationItems.filter(e=>e.parentId&&t.has(e.parentId)).map(e=>({...e})),n.imageItems=this.imageItems.filter(e=>e.parentId&&t.has(e.parentId)).map(e=>({...e})),n}instantiateCustomMolecule(e,t,n,r,i){let a=this.getCustomMoleculeRootContainer(e);if(!a)return;let o=this.getGridColumns(),s=this.viewport===`mobile`?a.mobileSpan:a.desktopSpan,c=this.getContainerStartFromX(r,i,o,s),l=this.getOrderedCanvasItems(e.scene),u=new Map,d=new Map,f=e=>e===`typography`?`typo-${this.nextTypographyId++}`:e===`button`?`button-${this.nextButtonId++}`:e===`input-text`?`input-${this.nextInputTextId++}`:e===`icon`?`icon-${this.nextIconId++}`:e===`desktop-menu`?`desktop-menu-${this.nextDesktopMenuId++}`:e===`logo`?`logo-${this.nextLogoId++}`:e===`micro-illustration`?`micro-${this.nextMicroIllustrationId++}`:e===`image`?`image-${this.nextImageId++}`:`container-${this.nextContainerId++}`;l.forEach(e=>{u.set(e.item.id,f(e.kind)),d.set(e.item.id,this.nextCanvasOrder++)});let p=e.scene.containerItems.map(e=>{let r=u.get(e.id);return e.id===a.id?this.resolveContainerCollision({...e,id:r,parentId:n,y:t,order:d.get(e.id),desktopStart:this.viewport===`desktop`?c:1,mobileStart:this.viewport===`mobile`?c:1}):{...e,id:r,parentId:e.parentId?u.get(e.parentId):n,order:d.get(e.id)}}),m=e=>e.parentId?u.get(e.parentId)??n:n;this.containerItems=[...this.containerItems,...p],this.typographyItems=[...this.typographyItems,...e.scene.typographyItems.map(e=>({...e,id:u.get(e.id),parentId:m(e),order:d.get(e.id)}))],this.buttonItems=[...this.buttonItems,...e.scene.buttonItems.map(e=>({...e,id:u.get(e.id),parentId:m(e),order:d.get(e.id)}))],this.inputTextItems=[...this.inputTextItems,...e.scene.inputTextItems.map(e=>({...e,id:u.get(e.id),parentId:m(e),order:d.get(e.id)}))],this.iconItems=[...this.iconItems,...e.scene.iconItems.map(e=>({...e,id:u.get(e.id),parentId:m(e),order:d.get(e.id)}))],this.desktopMenuItems=[...this.desktopMenuItems,...e.scene.desktopMenuItems.map(e=>({...e,id:u.get(e.id),parentId:m(e),order:d.get(e.id)}))],this.logoItems=[...this.logoItems,...e.scene.logoItems.map(e=>({...e,id:u.get(e.id),parentId:m(e),order:d.get(e.id)}))],this.microIllustrationItems=[...this.microIllustrationItems,...e.scene.microIllustrationItems.map(e=>({...e,id:u.get(e.id),parentId:m(e),order:d.get(e.id)}))],this.imageItems=[...this.imageItems,...e.scene.imageItems.map(e=>({...e,id:u.get(e.id),parentId:m(e),order:d.get(e.id)}))]}openCreateComponentModal(){this.selectedContainerItem&&(this.draftComponentName=``,this.isCreateComponentModalOpen=!0,this.openToolsDrawerIfNeeded())}closeCreateComponentModal(){this.isCreateComponentModalOpen=!1,this.draftComponentName=``}handleDraftComponentNameInput(e){this.draftComponentName=e.target.value}handleDraftComponentNameKeyDown(e){e.key===`Enter`&&(e.preventDefault(),this.handleCreateComponentFromSelection())}handleCreateComponentFromSelection(){let e=this.selectedContainerItem,t=this.draftComponentName.trim();if(!e||!t)return;let n=this.buildCustomMoleculeScene(e.id);if(!n)return;let r=`custom-${this.nextCustomMoleculeId++}`;this.customMolecules=[...this.customMolecules,{id:r,name:t,scene:n}],this.componentTab=`moleculas`,this.selectedToolPreview=this.getCustomMoleculePreviewKey(r),window.clearTimeout(this.toolPreviewTimeout),this.toolPreviewTimeout=window.setTimeout(()=>{this.selectedToolPreview=null},5e3),this.closeCreateComponentModal()}handleCustomMoleculePreview(e){window.clearTimeout(this.toolPreviewTimeout),this.selectedToolPreview=this.getCustomMoleculePreviewKey(e),this.toolPreviewTimeout=window.setTimeout(()=>{this.selectedToolPreview=null},5e3)}handleCustomMoleculeDragStart(e,t){let n=this.getCustomMoleculePreviewKey(t);e.dataTransfer?.setData(`application/x-ui-tool`,n),e.dataTransfer?.setData(`text/plain`,n),e.dataTransfer&&(e.dataTransfer.effectAllowed=`copy`),this.activeDraggedTool=n}handleCustomMoleculeDragEnd(){this.activeDraggedTool=null,this.isCanvasDragActive=!1}sceneHasCanvasItems(e){return e.typographyItems.length>0||e.buttonItems.length>0||e.inputTextItems.length>0||e.iconItems.length>0||e.desktopMenuItems.length>0||e.logoItems.length>0||e.microIllustrationItems.length>0||e.imageItems.length>0||e.containerItems.length>0}get hasCanvasItems(){return this.sceneHasCanvasItems(this.getActiveCanvasScene())}getOrderedCanvasItems(e){return[...e.typographyItems.map(e=>({kind:`typography`,item:e})),...e.buttonItems.map(e=>({kind:`button`,item:e})),...e.inputTextItems.map(e=>({kind:`input-text`,item:e})),...e.iconItems.map(e=>({kind:`icon`,item:e})),...e.desktopMenuItems.map(e=>({kind:`desktop-menu`,item:e})),...e.logoItems.map(e=>({kind:`logo`,item:e})),...e.microIllustrationItems.map(e=>({kind:`micro-illustration`,item:e})),...e.imageItems.map(e=>({kind:`image`,item:e})),...e.containerItems.map(e=>({kind:`container`,item:e}))].sort((e,t)=>e.item.order-t.item.order)}get orderedCanvasItems(){return this.getOrderedCanvasItems(this.getActiveCanvasScene())}getRootCanvasItems(e){return this.getOrderedCanvasItems(e).filter(({item:e})=>e.parentId===null)}get rootCanvasItems(){return this.getRootCanvasItems(this.getActiveCanvasScene())}getContainerChildren(e){return this.getContainerChildrenForScene(this.getActiveCanvasScene(),e)}getContainerChildrenForScene(e,t){return this.getOrderedCanvasItems(e).filter(e=>e.item.parentId===t)}updateSelectedTypographyItem(e){this.selectedTypographyId&&(this.typographyItems=this.typographyItems.map(t=>t.id===this.selectedTypographyId?{...t,...e}:t))}updateSelectedButtonItem(e){this.selectedTypographyId&&(this.buttonItems=this.buttonItems.map(t=>t.id===this.selectedTypographyId?{...t,...e}:t))}updateSelectedInputTextItem(e){this.selectedTypographyId&&(this.inputTextItems=this.inputTextItems.map(t=>t.id===this.selectedTypographyId?{...t,...e,label:(e.label??t.label).trim()||`Número de Tarjeta`,icon:e.icon??t.icon??`eye-off`,iconVisible:e.iconVisible??t.iconVisible??!0,status:e.status??t.status??`inactive`}:t))}updateSelectedIconItem(e){this.selectedTypographyId&&(this.iconItems=this.iconItems.map(t=>t.id===this.selectedTypographyId?{...t,...e,color:this.normalizeColorValue(e.color??t.color??`var(--color-primary-strong)`)}:t))}updateSelectedLogoItem(e){this.selectedTypographyId&&(this.logoItems=this.logoItems.map(t=>t.id===this.selectedTypographyId?{...t,...e}:t))}updateSelectedMicroIllustrationItem(e){this.selectedTypographyId&&(this.microIllustrationItems=this.microIllustrationItems.map(t=>t.id===this.selectedTypographyId?{...t,...e}:t))}updateSelectedContainerItem(e){this.selectedTypographyId&&(this.containerItems=this.containerItems.map(t=>{if(t.id!==this.selectedTypographyId)return t;let n=Math.max(1,Math.min(12,e.desktopSpan??t.desktopSpan)),r=Math.max(1,Math.min(4,e.mobileSpan??t.mobileSpan)),i=this.clampContainerStart(e.desktopStart??t.desktopStart,n,12),a=this.clampContainerStart(e.mobileStart??t.mobileStart,r,4),o={...t,...e,height:Math.max(1,e.height??t.height),borderRadius:Math.max(0,Math.min(40,e.borderRadius??t.borderRadius)),paddingTop:Math.max(0,Math.min(120,e.paddingTop??t.paddingTop)),paddingRight:Math.max(0,Math.min(120,e.paddingRight??t.paddingRight)),paddingBottom:Math.max(0,Math.min(120,e.paddingBottom??t.paddingBottom)),paddingLeft:Math.max(0,Math.min(120,e.paddingLeft??t.paddingLeft)),autoWidth:Math.max(0,e.autoWidth??t.autoWidth),autoHeight:Math.max(0,e.autoHeight??t.autoHeight),widthMode:e.widthMode??t.widthMode,heightMode:e.heightMode??t.heightMode,name:(e.name??t.name).trim()||`Contenedor`,scrollEnabled:e.scrollEnabled??t.scrollEnabled,shadowEnabled:e.shadowEnabled??t.shadowEnabled,shadowX:Math.max(-80,Math.min(80,e.shadowX??t.shadowX)),shadowY:Math.max(-80,Math.min(80,e.shadowY??t.shadowY)),shadowBlur:Math.max(0,Math.min(120,e.shadowBlur??t.shadowBlur)),shadowSpread:Math.max(-40,Math.min(80,e.shadowSpread??t.shadowSpread)),shadowOpacity:Math.max(0,Math.min(1,e.shadowOpacity??t.shadowOpacity)),shadowColor:this.normalizeColorValue(e.shadowColor??t.shadowColor??m.shadowColor),desktopSpan:n,mobileSpan:r,desktopStart:i,mobileStart:a};return this.resolveContainerCollision(o)}))}getContainerBoxShadow(e){if(!e.shadowEnabled)return`none`;let t=this.normalizeColorValue(e.shadowColor??m.shadowColor);return`${e.shadowX}px ${e.shadowY}px ${e.shadowBlur}px ${e.shadowSpread}px color-mix(in srgb, ${t} ${Math.round(e.shadowOpacity*100)}%, transparent)`}getItemParentId(e){return e.startsWith(`typo-`)?this.typographyItems.find(t=>t.id===e)?.parentId??null:e.startsWith(`button-`)?this.buttonItems.find(t=>t.id===e)?.parentId??null:e.startsWith(`input-`)?this.inputTextItems.find(t=>t.id===e)?.parentId??null:e.startsWith(`icon-`)?this.iconItems.find(t=>t.id===e)?.parentId??null:e.startsWith(`desktop-menu-`)?this.desktopMenuItems.find(t=>t.id===e)?.parentId??null:e.startsWith(`logo-`)?this.logoItems.find(t=>t.id===e)?.parentId??null:e.startsWith(`micro-`)?this.microIllustrationItems.find(t=>t.id===e)?.parentId??null:e.startsWith(`image-`)?this.imageItems.find(t=>t.id===e)?.parentId??null:e.startsWith(`container-`)?this.containerItems.find(t=>t.id===e)?.parentId??null:null}clearActiveEditingState(){this.selectedTypographyId=null,this.editingTypographyId=null,this.editingButtonId=null,this.editingIconId=null,this.editingLogoId=null,this.editingMicroIllustrationId=null,this.editingImageId=null,this.editingContainerId=null,this.isEditingSelectedContainerName=!1,this.isCanvasEditing=!1,this.openColorDropdown=null}getNestedContainerIds(e){let t=[],n=[e];for(;n.length>0;){let e=n.pop(),r=this.containerItems.filter(t=>t.parentId===e).map(e=>e.id);t.push(...r),n.push(...r)}return t}isEditableFieldTarget(e){return e instanceof HTMLInputElement&&!e.readOnly&&!e.disabled||e instanceof HTMLTextAreaElement&&!e.readOnly&&!e.disabled||e instanceof HTMLSelectElement&&!e.disabled||e instanceof HTMLElement&&e.isContentEditable}handleToolDragState(e){this.activeDraggedTool=e.detail.active?e.detail.tool:null,e.detail.preset&&(this.toolTypographyPreset=e.detail.preset),e.detail.active||(this.isCanvasDragActive=!1)}handleToolPreview(e){window.clearTimeout(this.toolPreviewTimeout),this.selectedToolPreview=e.detail.tool,e.detail.preset&&(this.toolTypographyPreset=e.detail.preset),e.detail.tool&&(this.toolPreviewTimeout=window.setTimeout(()=>{this.selectedToolPreview=null},5e3))}handleInsertTool(e){let t=this.getSelectedContainerHostId();if(e.detail.tool===`tipografia`){e.detail.preset&&(this.toolTypographyPreset=e.detail.preset);let n=this.viewport===`mobile`?208:240;this.createTypographyItem(t?16:24,t?16:24,t);let r=this.typographyItems[this.typographyItems.length-1];r&&!t&&this.viewport===`mobile`&&r.x+n>338&&(this.typographyItems=this.typographyItems.map((e,t,n)=>t===n.length-1?{...e,x:16}:e));return}if(e.detail.tool===`main-button`){this.createButtonItem(`main`,t?16:24,t?16:24,t);return}if(e.detail.tool===`input-text`){this.createInputTextItem(t?16:24,t?16:24,t);return}if(e.detail.tool===`secondary-button`){this.createButtonItem(`secondary`,t?16:24,t?16:24,t);return}if(e.detail.tool===`icon-button`){this.createButtonItem(`icon-button`,t?16:24,t?16:24,t);return}if(e.detail.tool===`opportunity-button`){this.createButtonItem(`opportunity`,t?16:24,t?16:24,t);return}if(e.detail.tool===`icon`){this.createIconItem(t?16:24,t?16:24,t);return}if(e.detail.tool===`desktop-menu`){this.createDesktopMenuItem(t?16:24,t,t?320:1040);return}if(e.detail.tool===`logo`){this.createLogoItem(t?16:24,t?16:24,t);return}if(e.detail.tool===`micro-illustration`){this.createMicroIllustrationItem(t?16:24,t?16:24,t);return}if(e.detail.tool===`image`){this.createImageItem(t?16:24,t?16:24,t);return}e.detail.tool===`contenedor`&&this.createContainerItem(24)}handleToolPresetChange(e){e.detail.tool===`tipografia`&&(this.toolTypographyPreset=e.detail.preset)}handleCanvasClick(e){e.target===e.currentTarget&&(this.selectedTypographyId=null,this.editingTypographyId=null,this.editingButtonId=null,this.editingIconId=null,this.editingLogoId=null,this.editingMicroIllustrationId=null,this.editingImageId=null,this.editingContainerId=null,this.isCanvasEditing=!1)}handleActiveCanvasNameInput(e){let t=e.target;this.canvases=this.canvases.map(e=>e.id===this.activeCanvasId?{...e,name:t.value}:e)}activateComponentEditing(e,t=!1){this.isCanvasEditing=!1,this.selectedTypographyId=e,this.isEditingSelectedContainerName=!1,this.editingTypographyId=e.startsWith(`typo-`)&&t?e:null,this.editingButtonId=e.startsWith(`button-`)?e:null,this.editingIconId=e.startsWith(`icon-`)?e:null,this.editingLogoId=e.startsWith(`logo-`)?e:null,this.editingMicroIllustrationId=e.startsWith(`micro-`)?e:null,this.editingImageId=e.startsWith(`image-`)?e:null,this.editingContainerId=e.startsWith(`container-`)?e:null}handleCanvasItemDoubleClick(e){this.handleWindowPointerUp(),this.openToolsDrawerIfNeeded(),this.activateComponentEditing(e,e.startsWith(`typo-`))}handleContainerResizePointerDown(e,t,n){if(e.button!==0)return;e.stopPropagation();let r=t.parentId,i=r?this.getContainerContentElement(r):this.getCanvasHostElement(),a=e.currentTarget.closest(`.canvas-item`);if(!i||!a)return;let o=i.getBoundingClientRect(),s=a.getBoundingClientRect();this.openToolsDrawerIfNeeded(),this.activateComponentEditing(t.id),this.dragState={id:t.id,parentId:r,mode:`resize`,offsetX:e.clientX-s.left,offsetY:e.clientY-s.top,canvasWidth:o.width,canvasHeight:o.height,itemWidth:s.width,itemHeight:s.height,resizeHandle:n,originClientX:e.clientX,originClientY:e.clientY,originY:t.y,originHeight:t.height,originDesktopStart:t.desktopStart,originDesktopSpan:t.desktopSpan,originMobileStart:t.mobileStart,originMobileSpan:t.mobileSpan},window.addEventListener(`pointermove`,this.handleWindowPointerMove),window.addEventListener(`pointerup`,this.handleWindowPointerUp),e.preventDefault()}handleCanvasItemPointerDown(e,t){if(e.button!==0||this.editingTypographyId===t||e.detail>=2)return;let n=e.currentTarget,r=this.getItemParentId(t),i=r?this.getContainerContentElement(r):this.getCanvasHostElement();if(!i)return;let a=n.getBoundingClientRect();if(e.clientX>=a.right-18&&e.clientY>=a.bottom-18)return;let o=i.getBoundingClientRect();this.openToolsDrawerIfNeeded(),this.activateComponentEditing(t),this.dragState={id:t,parentId:r,mode:`move`,offsetX:e.clientX-a.left,offsetY:e.clientY-a.top,canvasWidth:o.width,canvasHeight:o.height,itemWidth:a.width,itemHeight:a.height},window.addEventListener(`pointermove`,this.handleWindowPointerMove),window.addEventListener(`pointerup`,this.handleWindowPointerUp),e.preventDefault()}moveDraggedLeafItemIntoContainer(e){if(!this.dragState||this.dragState.mode!==`move`||this.dragState.id.startsWith(`container-`))return;let t=this.getDropContainerAtPoint(e.clientX,e.clientY);if(!t||t.container.id===this.dragState.parentId)return;let n=Math.max(0,Math.min(t.rect.width-this.dragState.itemWidth,e.clientX-t.rect.left-this.dragState.offsetX)),r=Math.max(0,Math.min(t.rect.height-this.dragState.itemHeight,e.clientY-t.rect.top-this.dragState.offsetY));this.typographyItems=this.typographyItems.map(e=>e.id===this.dragState?.id?{...e,parentId:t.container.id,x:n,y:r}:e),this.buttonItems=this.buttonItems.map(e=>e.id===this.dragState?.id?{...e,parentId:t.container.id,x:n,y:r}:e),this.inputTextItems=this.inputTextItems.map(e=>e.id===this.dragState?.id?{...e,parentId:t.container.id,x:n,y:r}:e),this.iconItems=this.iconItems.map(e=>e.id===this.dragState?.id?{...e,parentId:t.container.id,x:n,y:r}:e),this.desktopMenuItems=this.desktopMenuItems.map(e=>e.id===this.dragState?.id?{...e,parentId:t.container.id,x:n,y:r}:e),this.logoItems=this.logoItems.map(e=>e.id===this.dragState?.id?{...e,parentId:t.container.id,x:n,y:r}:e),this.microIllustrationItems=this.microIllustrationItems.map(e=>e.id===this.dragState?.id?{...e,parentId:t.container.id,x:n,y:r}:e),this.imageItems=this.imageItems.map(e=>e.id===this.dragState?.id?{...e,parentId:t.container.id,x:n,y:r}:e)}updateSelectedImageItem(e){this.selectedTypographyId&&(this.imageItems=this.imageItems.map(t=>t.id===this.selectedTypographyId?{...t,...e,alt:(e.alt??t.alt).trim()||`Imagen`}:t))}moveDraggedContainerIntoContainer(e){if(!this.dragState||this.dragState.mode!==`move`||!this.dragState.id.startsWith(`container-`))return;let t=this.containerItems.find(e=>e.id===this.dragState?.id);if(!t)return;let n=this.getDropContainerAtPoint(e.clientX,e.clientY);if(!n||!this.canAbsorbDraggedContainer(n.container,n.rect,t.id))return;let r=this.getGridColumns(),i=this.viewport===`mobile`?t.mobileSpan:t.desktopSpan,a=Math.max(0,Math.min(n.rect.width-this.dragState.itemWidth,e.clientX-n.rect.left-this.dragState.offsetX)),o=Math.max(0,Math.min(n.rect.height-this.dragState.itemHeight,e.clientY-n.rect.top-this.dragState.offsetY)),s=this.getContainerStartFromX(a,n.rect.width,r,i);this.containerItems=this.containerItems.map(e=>{if(e.id!==t.id)return e;let r=this.viewport===`mobile`?{...e,parentId:n.container.id,y:o,mobileStart:s}:{...e,parentId:n.container.id,y:o,desktopStart:s};return this.resolveContainerCollision(r)})}handleSelectedPresetChange(e){let t=e.target;this.updateSelectedTypographyItem({preset:t.value})}handleTypographyTextChange(e){let{id:t,text:n}=e.detail;this.typographyItems=this.typographyItems.map(e=>e.id===t?{...e,text:n}:e)}handleTypographyEditFinish(e){this.editingTypographyId===e.detail.id&&(this.editingTypographyId=null)}handleInputTextChange(e){let{id:t,value:n}=e.detail;this.inputTextItems=this.inputTextItems.map(e=>e.id===t?{...e,value:n}:e)}handleInputTextFocus(e){this.selectedTypographyId=e.detail.id,this.editingTypographyId=null,this.editingButtonId=null,this.editingIconId=null,this.editingLogoId=null,this.editingMicroIllustrationId=null,this.editingImageId=null,this.editingContainerId=null,this.isCanvasEditing=!1}setSelectedAlignment(e){this.updateSelectedTypographyItem({align:e})}setSelectedVerticalAlignment(e){this.updateSelectedTypographyItem({verticalAlign:e})}preserveInlineTypographySelection(e){this.editingTypographyId===this.selectedTypographyId&&(e.preventDefault(),this.getEditingTypographyElement()?.captureSelection?.())}createTypographyMarkupHost(e){let t=document.createElement(`div`);return e.includes(`<`)||e.includes(`&`)?t.innerHTML=e:t.textContent=e,t}normalizeTypographyLinkHref(e){let t=e.trim();return t?t.startsWith(`http://`)||t.startsWith(`https://`)||t.startsWith(`mailto:`)||t.startsWith(`tel:`)||t.startsWith(`/`)||t.startsWith(`#`)?t:`https://${t}`:``}getTypographyLinkHref(e){return this.createTypographyMarkupHost(e).querySelector(`a`)?.getAttribute(`href`)??``}stripTypographyLinks(e){let t=this.createTypographyMarkupHost(e);return t.querySelectorAll(`a`).forEach(e=>{e.replaceWith(...Array.from(e.childNodes))}),t.innerHTML}setTypographyLinkHref(e,t){let n=this.normalizeTypographyLinkHref(t);if(!n)return this.stripTypographyLinks(e);let r=this.createTypographyMarkupHost(e),i=Array.from(r.querySelectorAll(`a`));if(i.length===0){let e=document.createElement(`a`);for(e.setAttribute(`href`,n),e.setAttribute(`target`,`_blank`),e.setAttribute(`rel`,`noreferrer noopener`);r.firstChild;)e.append(r.firstChild);return r.append(e),r.innerHTML}return i.forEach(e=>{e.setAttribute(`href`,n),e.setAttribute(`target`,`_blank`),e.setAttribute(`rel`,`noreferrer noopener`)}),r.innerHTML}get selectedTypographyLinkHref(){return this.selectedTypographyItem?this.getTypographyLinkHref(this.selectedTypographyItem.text):``}get selectedTypographyHasLink(){return this.selectedTypographyLinkHref.length>0}getEditingTypographyElement(){return this.editingTypographyId?this.renderRoot.querySelector(`[data-item-id="${this.editingTypographyId}"] canvas-tipografia`):null}applyInlineTypographyFormat(e){let t=this.getEditingTypographyElement()?.applyInlineFormat?.(e);return t==null?!1:(this.updateSelectedTypographyItem({text:t}),!0)}handleSelectedTypographyLinkToggle(e){if(this.selectedTypographyItem){if(e.target.checked){let e=this.selectedTypographyLinkHref||`https://`;this.updateSelectedTypographyItem({text:this.setTypographyLinkHref(this.selectedTypographyItem.text,e)});return}this.updateSelectedTypographyItem({text:this.stripTypographyLinks(this.selectedTypographyItem.text)})}}handleSelectedTypographyLinkInput(e){if(!this.selectedTypographyItem)return;let t=e.target;this.updateSelectedTypographyItem({text:this.setTypographyLinkHref(this.selectedTypographyItem.text,t.value)})}toggleSelectedBold(){this.selectedTypographyItem&&(this.editingTypographyId===this.selectedTypographyId&&this.applyInlineTypographyFormat(`bold`)||this.updateSelectedTypographyItem({bold:!this.selectedTypographyItem.bold}))}toggleSelectedItalic(){this.selectedTypographyItem&&(this.editingTypographyId===this.selectedTypographyId&&this.applyInlineTypographyFormat(`italic`)||this.updateSelectedTypographyItem({italic:!this.selectedTypographyItem.italic}))}handleSelectedFontSizeInput(e){let t=e.target;this.updateSelectedTypographyItem({fontSize:t.valueAsNumber})}handleSelectedButtonActionTypeChange(e){if(e.target.value===`none`){this.updateSelectedButtonItem({action:``});return}let t=this.selectedButtonLinkTargetId||this.selectableButtonLinkCanvases[0]?.id||``;this.updateSelectedButtonItem({action:t?`canvas:${t}`:`canvas:`})}handleSelectedButtonLinkTargetChange(e){let t=e.target.value.trim();this.updateSelectedButtonItem({action:t?`canvas:${t}`:`canvas:`})}handleSelectedButtonLabelInput(e){let t=e.target;this.updateSelectedButtonItem({label:t.value})}handleSelectedButtonHeightChange(e){let t=e.target;this.updateSelectedButtonItem({height:Number(t.value)})}handleSelectedIconButtonBackgroundChange(e){let t=e.target;this.updateSelectedButtonItem({backgroundVisible:t.value===`visible`})}handleSelectedInputLabelInput(e){let t=e.target;this.updateSelectedInputTextItem({label:t.value})}handleSelectedInputStatusChange(e){let t=e.target;this.updateSelectedInputTextItem({status:t.value})}handleSelectedInputIconVisibilityChange(e){let t=e.target;this.updateSelectedInputTextItem({iconVisible:t.value===`visible`})}requestImageUpload(e){this.pendingImageUploadItemId=e;let t=this.renderRoot.querySelector(`.image-upload-input`);t&&(t.value=``,t.click())}handleImageUploadChange(e){let t=e.target,n=t.files?.[0],r=this.pendingImageUploadItemId;if(this.pendingImageUploadItemId=null,!n||!r){t.value=``;return}let i=new FileReader;i.addEventListener(`load`,()=>{let e=typeof i.result==`string`?i.result:``;e&&(this.imageItems=this.imageItems.map(t=>t.id===r?{...t,src:e,alt:n.name||t.alt}:t))}),i.readAsDataURL(n),t.value=``}handleSelectedContainerDesktopSpanChange(e){let t=e.target;this.updateSelectedContainerItem({desktopSpan:Number(t.value)})}handleSelectedContainerMobileSpanChange(e){let t=e.target;this.updateSelectedContainerItem({mobileSpan:Number(t.value)})}handleSelectedContainerHeightInput(e){let t=e.target;this.updateSelectedContainerItem({height:t.valueAsNumber,heightMode:`manual`})}handleSelectedContainerWidthModeChange(e){let t=e.target;this.updateSelectedContainerItem({widthMode:t.value})}handleSelectedContainerHeightModeChange(e){let t=e.target;this.updateSelectedContainerItem({heightMode:t.value})}handleSelectedContainerWidthInput(e){let t=e.target,n=this.selectedContainerItem,r=t.valueAsNumber;if(!n||Number.isNaN(r))return;let i=this.viewport,a=this.getGridColumns(i),o=this.getCanvasReferenceWidth(i)/a,s=Math.max(1,Math.min(a,Math.round(r/o)));this.updateSelectedContainerItem(i===`mobile`?{mobileSpan:s,widthMode:`manual`}:{desktopSpan:s,widthMode:`manual`})}handleSelectedContainerRadiusInput(e){let t=e.target;this.updateSelectedContainerItem({borderRadius:t.valueAsNumber})}handleSelectedContainerPaddingTopInput(e){let t=e.target;this.updateSelectedContainerItem({paddingTop:t.valueAsNumber})}handleSelectedContainerPaddingRightInput(e){let t=e.target;this.updateSelectedContainerItem({paddingRight:t.valueAsNumber})}handleSelectedContainerPaddingBottomInput(e){let t=e.target;this.updateSelectedContainerItem({paddingBottom:t.valueAsNumber})}handleSelectedContainerPaddingLeftInput(e){let t=e.target;this.updateSelectedContainerItem({paddingLeft:t.valueAsNumber})}startSelectedContainerNameEditing(){this.selectedContainerItem&&(this.isEditingSelectedContainerName=!0)}stopSelectedContainerNameEditing(){this.isEditingSelectedContainerName=!1}handleSelectedContainerNameInput(e){let t=e.target;this.updateSelectedContainerItem({name:t.value})}handleSelectedContainerNameKeyDown(e){e.key===`Enter`&&(e.preventDefault(),this.stopSelectedContainerNameEditing())}handleSelectedContainerScrollToggle(e){let t=e.target;this.updateSelectedContainerItem({scrollEnabled:t.checked})}handleSelectedContainerShadowToggle(e){let t=e.target;this.updateSelectedContainerItem({shadowEnabled:t.checked})}handleSelectedContainerShadowXInput(e){let t=e.target;this.updateSelectedContainerItem({shadowX:t.valueAsNumber})}handleSelectedContainerShadowYInput(e){let t=e.target;this.updateSelectedContainerItem({shadowY:t.valueAsNumber})}handleSelectedContainerShadowBlurInput(e){let t=e.target;this.updateSelectedContainerItem({shadowBlur:t.valueAsNumber})}handleSelectedContainerShadowSpreadInput(e){let t=e.target;this.updateSelectedContainerItem({shadowSpread:t.valueAsNumber})}handleSelectedContainerShadowOpacityInput(e){let t=e.target;this.updateSelectedContainerItem({shadowOpacity:t.valueAsNumber/100})}setComponentTab(e){this.componentTab=e,this.selectedToolPreview=null}openToolsDrawerIfNeeded(){this.isToolsDrawerMode&&(this.isToolsDrawerOpen=!0)}toggleToolsDrawer(){this.isToolsDrawerOpen=!this.isToolsDrawerOpen}closeToolsDrawer(){this.isToolsDrawerOpen=!1}toggleCanvasMenu(){this.isCanvasMenuOpen=!this.isCanvasMenuOpen}toggleColorDropdown(e){this.openColorDropdown=this.openColorDropdown===e?null:e}rgbStringToHex(e){let t=e.trim();if(t.startsWith(`#`))return t.toUpperCase();let n=t.match(/[\d.]+/g);if(!n||n.length<3)return t.toUpperCase();let[r,i,a,o]=n.map(Number),s=e=>Math.max(0,Math.min(255,Math.round(e))).toString(16).padStart(2,`0`).toUpperCase(),c=`#${s(r)}${s(i)}${s(a)}`;return typeof o!=`number`||Number.isNaN(o)||o>=1?c:`${c}${s(o*255)}`}getSelectedColorHex(e){if(e===`transparent`)return`TRANSPARENT`;let t=this.colorValueCache.get(e);if(t)return t;let n=document.createElement(`span`);n.style.position=`fixed`,n.style.opacity=`0`,n.style.pointerEvents=`none`,n.style.color=e,document.body.appendChild(n);let r=getComputedStyle(n).color;document.body.removeChild(n);let i=this.rgbStringToHex(r);return this.colorValueCache.set(e,i),i}normalizeColorValue(e){return e===p?f:e}renderColorDropdown(e,t,r,i){let a=this.normalizeColorValue(r),o=t.find(e=>e.value===a)??t[0],s=this.openColorDropdown===e,c=this.getSelectedColorHex(o.value);return n`
      <div class="color-dropdown" data-color-dropdown="true">
        <button
          class="color-dropdown-trigger"
          type="button"
          data-open=${String(s)}
          @click=${()=>this.toggleColorDropdown(e)}
        >
          <span class="color-dropdown-trigger-main">
            <span
              class="color-swatch-chip"
              data-transparent=${String(o.value===`transparent`)}
              style=${o.value===`transparent`?``:`background:${o.value}; width: 18px; min-height: 18px; border-radius: 6px;`}
            ></span>
            <span class="color-dropdown-value">
              <span class="color-dropdown-label">${o.label}</span>
              <span class="color-dropdown-meta">${c}</span>
            </span>
          </span>
          <svg class="color-dropdown-chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        ${s?n`
              <div class="color-dropdown-panel">
                <p class="color-dropdown-title">Selecciona un color</p>
                <div class="color-swatch-grid">
                  ${t.map(e=>n`
                      <button
                        class="color-swatch"
                        type="button"
                        data-active=${String(e.value===r)}
                        @click=${()=>{i(e.value),this.openColorDropdown=null}}
                        aria-label=${e.label}
                        title=${e.label}
                      >
                        <span
                          class="color-swatch-chip"
                          data-transparent=${String(e.value===`transparent`)}
                          style=${e.value===`transparent`?``:`background:${e.value};`}
                        ></span>
                      </button>
                    `)}
                </div>
              </div>
            `:null}
      </div>
    `}renderIconDropdown(e,t){let r=c.find(t=>t.value===e)??c[0],i=this.openColorDropdown===`icon`;return n`
      <div class="color-dropdown" data-color-dropdown="true">
        <button
          class="color-dropdown-trigger"
          type="button"
          data-open=${String(i)}
          @click=${()=>this.toggleColorDropdown(`icon`)}
        >
          <span class="color-dropdown-trigger-main">
            <canvas-icon class="icon-swatch-preview" .icon=${r.value}></canvas-icon>
            <span class="color-dropdown-value">
              <span class="color-dropdown-label">${r.label}</span>
              <span class="color-dropdown-meta">SVG</span>
            </span>
          </span>
          <svg class="color-dropdown-chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        ${i?n`
              <div class="color-dropdown-panel icon-dropdown-panel icon-picker-panel">
                <p class="color-dropdown-title">Selecciona un icono</p>
                <div class="icon-swatch-grid">
                  ${c.map(r=>n`
                      <button
                        class="icon-swatch"
                        type="button"
                        data-active=${String(r.value===e)}
                        @click=${()=>{t(r.value),this.openColorDropdown=null}}
                        aria-label=${r.label}
                        title=${r.label}
                      >
                        <canvas-icon class="icon-swatch-preview" .icon=${r.value}></canvas-icon>
                      </button>
                    `)}
                </div>
              </div>
            `:null}
      </div>
    `}renderMicroIllustrationDropdown(e,t){let r=l.find(t=>t.value===e)??l[0],i=this.openColorDropdown===`micro-illustration`;return n`
      <div class="color-dropdown" data-color-dropdown="true">
        <button
          class="color-dropdown-trigger"
          type="button"
          data-open=${String(i)}
          @click=${()=>this.toggleColorDropdown(`micro-illustration`)}
        >
          <span class="color-dropdown-trigger-main">
            <div class="micro-swatch-preview" style="width:32px;height:32px;">
              <canvas-micro-illustration
                .illustration=${r.value}
              ></canvas-micro-illustration>
            </div>
            <span class="color-dropdown-value">
              <span class="color-dropdown-label">${r.label}</span>
              <span class="color-dropdown-meta">PNG</span>
            </span>
          </span>
          <svg class="color-dropdown-chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        ${i?n`
              <div class="color-dropdown-panel icon-dropdown-panel">
                <p class="color-dropdown-title">Selecciona una micro ilustracion</p>
                <div class="icon-swatch-grid">
                  ${l.map(r=>n`
                      <button
                        class="icon-swatch"
                        type="button"
                        data-active=${String(r.value===e)}
                        @click=${()=>{t(r.value),this.openColorDropdown=null}}
                        aria-label=${r.label}
                        title=${r.label}
                      >
                        <div class="micro-swatch-preview">
                          <canvas-micro-illustration
                            .illustration=${r.value}
                          ></canvas-micro-illustration>
                        </div>
                      </button>
                    `)}
                </div>
              </div>
            `:null}
      </div>
    `}renderToolPreview(){if(!this.selectedToolPreview)return null;let e=this.getCustomMoleculeIdFromTool(this.selectedToolPreview),t=e?this.getCustomMoleculeById(e):null;return t?n`
        <div class="preview-canvas">
          <div class="preview-custom-molecule">
            ${this.getRootCanvasItems(t.scene).map(e=>this.renderCanvasEntry(e,t.scene,!1,!1))}
          </div>
        </div>
      `:this.selectedToolPreview===`tipografia`?n`
        <div class="preview-canvas">
          <div class="preview-text">
            <canvas-tipografia
              .itemId=${`preview-tipografia`}
              .preset=${this.toolTypographyPreset}
              .text=${`Texto de ejemplo`}
              .align=${`left`}
              .verticalAlign=${`top`}
              .bold=${!1}
              .italic=${!1}
              .color=${`var(--color-text)`}
              .fontSize=${32}
              .editing=${!1}
            ></canvas-tipografia>
          </div>
        </div>
      `:this.selectedToolPreview===`main-button`?n`
        <div class="preview-canvas">
          <div class="preview-button">
            <canvas-main-button .label=${`Conoce más`}></canvas-main-button>
          </div>
        </div>
      `:this.selectedToolPreview===`input-text`?n`
        <div class="preview-canvas">
          <div style="width:280px; height:56px;">
            <canvas-input-text
              .itemId=${`preview-input-text`}
              .label=${`Número de Tarjeta`}
              .value=${``}
              .icon=${`eye-off`}
              .iconVisible=${!0}
              .status=${`inactive`}
              .enabled=${!1}
            ></canvas-input-text>
          </div>
        </div>
      `:this.selectedToolPreview===`icon-button`?n`
        <div class="preview-canvas">
          <div style="width:34px; height:34px;">
            <canvas-icon-button .icon=${`search`}></canvas-icon-button>
          </div>
        </div>
      `:this.selectedToolPreview===`secondary-button`?n`
        <div class="preview-canvas">
          <div class="preview-button">
            <canvas-secondary-button .label=${`Conoce más`}></canvas-secondary-button>
          </div>
        </div>
      `:this.selectedToolPreview===`opportunity-button`?n`
        <div class="preview-canvas">
          <div class="preview-button">
            <canvas-opportunity-button .label=${`Conoce más`}></canvas-opportunity-button>
          </div>
        </div>
      `:this.selectedToolPreview===`icon`?n`
        <div class="preview-canvas">
          <div style="width:40px; height:40px;">
            <canvas-icon .icon=${c[0].value}></canvas-icon>
          </div>
        </div>
      `:this.selectedToolPreview===`desktop-menu`?n`
        <div class="preview-canvas">
          <div class="preview-desktop-menu">
            <canvas-desktop-menu></canvas-desktop-menu>
          </div>
        </div>
      `:this.selectedToolPreview===`logo`?n`
        <div class="preview-canvas">
          <div style="width:120px; height:32px;">
            <canvas-logo></canvas-logo>
          </div>
        </div>
      `:this.selectedToolPreview===`micro-illustration`?n`
        <div class="preview-canvas">
          <div style="width:96px; height:96px;">
            <canvas-micro-illustration
              .illustration=${l[0].value}
            ></canvas-micro-illustration>
          </div>
        </div>
      `:this.selectedToolPreview===`image`?n`
        <div class="preview-canvas">
          <div style="width:120px; height:120px;">
            <canvas-image></canvas-image>
          </div>
        </div>
      `:n`
      <div class="preview-canvas">
        <div class="preview-container">
          <canvas-contenedor
            .background=${`transparent`}
            .borderRadius=${0}
            .outlined=${!0}
            .shadowEnabled=${!1}
          ></canvas-contenedor>
        </div>
      </div>
    `}renderToolPreviewPopover(e){return this.selectedToolPreview===e?n`<div class="tool-preview-popover" data-tool=${e??``}>${this.renderToolPreview()}</div>`:null}renderCustomMoleculeTool(e){let t=this.getCustomMoleculePreviewKey(e.id);return n`
      <div class="tool-preview-anchor">
        ${this.renderToolPreviewPopover(t)}
        <article
          class="custom-molecule-card"
          data-selected=${String(this.selectedToolPreview===t)}
          draggable="true"
          role="button"
          tabindex="0"
          @click=${()=>this.handleCustomMoleculePreview(e.id)}
          @dragstart=${t=>this.handleCustomMoleculeDragStart(t,e.id)}
          @dragend=${this.handleCustomMoleculeDragEnd}
        >
          <div class="custom-molecule-badge" aria-hidden="true"></div>
          <p class="custom-molecule-title">${e.name}</p>
        </article>
      </div>
    `}toggleCodeView(){this.handleWindowPointerUp(),this.isCanvasDragActive=!1,this.openColorDropdown=null,this.isPrototypeMode=!1,this.isCodeView=!this.isCodeView}togglePrototypeMode(){if(this.handleWindowPointerUp(),this.isCanvasDragActive=!1,this.openColorDropdown=null,this.selectedToolPreview=null,this.isCodeView=!1,this.isPrototypeMode){this.isPrototypeMode=!1,this.enterCanvasEditing();return}this.clearActiveEditingState(),this.isPrototypeMode=!0}resolveCanvasTargetFromAction(e){let t=e.replace(/^(goto|canvas|screen)\s*:/i,``).trim().toLowerCase();return t?this.canvases.find(e=>e.id.toLowerCase()===t)??this.canvases.find(e=>e.name.trim().toLowerCase()===t)??null:null}handlePrototypeButtonClick(e,t){if(!this.isPrototypeMode)return;e.stopPropagation();let n=t.action.trim();if(!n)return;if(/^https?:\/\//i.test(n)){window.open(n,`_blank`,`noopener,noreferrer`);return}let r=this.resolveCanvasTargetFromAction(n);r&&this.activateCanvas(r.id,!1)}getFontFamilyForPreset(e){return e===`tiempos-headline`?`'Tiempos Headline', serif`:`'Benton Sans BBVA', sans-serif`}getFontWeightForItem(e){let t=e.preset===`benton-book`?400:e.preset===`tiempos-headline`?700:500;return e.bold?e.preset===`tiempos-headline`?800:700:t}getFontStyleForItem(e){return e.preset===`benton-medium-italic`||e.italic?`italic`:`normal`}getTypographyMarkup(e){return e.text.includes(`<`)||e.text.includes(`&`)?e.text:this.escapeCodeText(e.text)}escapeCodeText(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`)}buildTypographyCode(e){let t=e.verticalAlign===`center`?`center`:e.verticalAlign===`bottom`?`flex-end`:`flex-start`;return`  <div style="${[`position: absolute`,`left: ${Math.round(e.x)}px`,`top: ${Math.round(e.y)}px`,`width: ${Math.round(e.width)}px`,`height: ${Math.round(e.height)}px`,`display: flex`,`flex-direction: column`,`justify-content: ${t}`,`box-sizing: border-box`,`overflow: hidden`].join(`; `)}"><p style="${[`font-family: ${this.getFontFamilyForPreset(e.preset)}`,`font-size: ${e.fontSize}px`,`color: ${e.color}`,`font-weight: ${this.getFontWeightForItem(e)}`,`font-style: ${this.getFontStyleForItem(e)}`,`text-align: ${e.align}`,`line-height: 0.95`,`white-space: nowrap`,`overflow: hidden`,`text-overflow: ellipsis`,`margin: 0`].join(`; `)}">${this.getTypographyMarkup(e)}</p></div>`}buildButtonCode(e){let t=e.fontSize??22;if(e.variant===`icon-button`){let t=c.find(t=>t.value===(e.icon??`search`))??c[0];return`  <button type="button" style="${[`position: absolute`,`left: ${Math.round(e.x)}px`,`top: ${Math.round(e.y)}px`,`width: ${Math.round(e.width)}px`,`height: ${Math.round(e.height)}px`,`box-sizing: border-box`,`border: none`,`border-radius: 999px`,`background: ${e.backgroundVisible===!1?`transparent`:`rgba(19, 30, 68, 0.08)`}`,`display: grid`,`place-items: center`,`padding: 0`].join(`; `)}"${e.action?` data-action="${this.escapeCodeText(e.action)}"`:``}><span aria-hidden="true" style="${[`width: 18px`,`height: 18px`,`display: block`,`background-color: var(--color-primary-strong)`,`-webkit-mask: url('${t.src}') center / contain no-repeat`,`mask: url('${t.src}') center / contain no-repeat`].join(`; `)}"></span></button>`}let n=e.variant===`secondary`?`#ffffff`:e.variant===`opportunity`?`var(--color-primary)`:`linear-gradient(180deg, #1829b8 0%, #1220a0 100%)`,r=e.variant===`secondary`?`#1829b8`:`#ffffff`,i=e.variant===`secondary`?`0 16px 32px rgba(10, 19, 92, 0.14)`:e.variant===`opportunity`?`0 16px 32px rgba(45, 124, 255, 0.22)`:`0 16px 32px rgba(10, 19, 92, 0.18)`;return`  <button style="${[`position: absolute`,`left: ${Math.round(e.x)}px`,`top: ${Math.round(e.y)}px`,`width: ${Math.round(e.width)}px`,`height: ${Math.round(e.height)}px`,`box-sizing: border-box`,`border: none`,`border-radius: 16px`,`background: ${n}`,`color: ${r}`,`font-family: 'Benton Sans BBVA', sans-serif`,`font-size: ${t}px`,`font-weight: 500`,`line-height: 1`,`letter-spacing: -0.01em`,`padding: 0 16px`,`box-shadow: ${i}`].join(`; `)}"${e.action?` data-action="${this.escapeCodeText(e.action)}"`:``}>${this.escapeCodeText(e.label)}</button>`}buildInputTextCode(e){let t=c.find(t=>t.value===(e.icon??`eye-off`))??c[0],n=e.value.trim().length>0||(e.status??`inactive`)===`active`,r=e.iconVisible??!0,i=e.value.trim().length>0||r,a=[`position: absolute`,`left: ${Math.round(e.x)}px`,`top: ${Math.round(e.y)}px`,`width: ${Math.round(e.width)}px`,`height: ${Math.round(e.height)}px`,`box-sizing: border-box`,`border: 1.5px solid ${(e.status??`inactive`)===`active`?`var(--color-primary)`:`rgba(19, 30, 68, 0.42)`}`,`border-radius: 16px`,`background: var(--color-surface)`,`padding: 8px 14px 8px 18px`,`display: grid`,`grid-template-columns: ${i?`minmax(0, 1fr) auto`:`minmax(0, 1fr)`}`,`align-items: center`,`gap: 12px`].join(`; `),o=[`display: block`,`font-family: 'Benton Sans BBVA', sans-serif`,`font-size: ${n?11:16}px`,`color: var(--color-text-muted)`,`line-height: 1`,`margin-bottom: ${n?4:0}px`,`white-space: nowrap`,`overflow: hidden`,`text-overflow: ellipsis`].join(`; `),s=[`min-width: 0`,`height: 100%`,`display: flex`,`flex-direction: column`,`justify-content: center`,`gap: 4px`,`overflow: hidden`].join(`; `),l=[`width: 100%`,`border: none`,`outline: none`,`background: transparent`,`color: var(--color-text)`,`font-family: 'Benton Sans BBVA', sans-serif`,`font-size: 16px`,`font-weight: 500`,`line-height: 1`,`padding: 0`,`opacity: ${n?1:0}`].join(`; `),u=[`display: inline-flex`,`align-items: center`,`justify-content: flex-end`,`gap: 8px`].join(`; `),d=[`width: 20px`,`height: 20px`,`display: block`,`background-color: #001391`,`-webkit-mask: url('${t.src}') center / contain no-repeat`,`mask: url('${t.src}') center / contain no-repeat`].join(`; `),f=[`width: 20px`,`height: 20px`,`display: block`,`color: #001391`].join(`; `);return[`  <label style="${a}">`,`    <div style="${s}">`,`      <span style="${o}">${this.escapeCodeText(e.label)}</span>`,`      <input type="text" value="${this.escapeCodeText(e.value)}" style="${l}" />`,`    </div>`,i?`    <div style="${u}">`:``,e.value.trim().length>0?`      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="${f}"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" /></svg>`:``,r?`      <span aria-hidden="true" style="${d}"></span>`:``,i?`    </div>`:``,`  </label>`].filter(Boolean).join(`
`)}buildIconCode(e){let t=c.find(t=>t.value===e.icon)??c[0],n=this.normalizeColorValue(e.color??`var(--color-primary-strong)`);return`  <div style="${[`position: absolute`,`left: ${Math.round(e.x)}px`,`top: ${Math.round(e.y)}px`,`width: ${Math.round(e.width)}px`,`height: ${Math.round(e.height)}px`].join(`; `)}"><span aria-hidden="true" style="${[`width: 100%`,`height: 100%`,`display: block`,`background-color: ${n}`,`-webkit-mask: url('${t.src}') center / contain no-repeat`,`mask: url('${t.src}') center / contain no-repeat`].join(`; `)}"></span></div>`}buildDesktopMenuCode(e){let t=[`position: absolute`,`left: ${Math.round(e.x)}px`,`top: ${Math.round(e.y)}px`,`width: ${Math.round(e.width)}px`,`height: ${Math.round(e.height)}px`,`box-sizing: border-box`,`display: flex`,`align-items: center`,`justify-content: space-between`,`gap: 24px`,`padding: 22px 30px`,`border-radius: 28px`,`background: #ffffff`,`box-shadow: 0 14px 34px rgba(24, 37, 76, 0.1)`,`overflow: hidden`,`font-family: 'Benton Sans BBVA', sans-serif`].join(`; `),n=[`display: flex`,`align-items: center`,`gap: 26px`,`white-space: nowrap`,`color: #0b1f8f`,`font-size: 15px`,`font-weight: 500`,`line-height: 1.1`,`letter-spacing: -0.01em`].join(`; `),r=[`display: flex`,`align-items: center`,`gap: 18px`,`white-space: nowrap`].join(`; `);return[`  <header style="${t}">`,`    <img src="https://www.bbva.mx/content/dam/library/logos/logo-bbva.svg" alt="BBVA" style="height:48px;width:auto;display:block;" />`,`    <nav style="${n}" aria-label="Navegacion principal">`,`      <span style="padding-bottom:6px;border-bottom:2px solid #102694;">Personas</span>`,`      <span>Empresas y Gobierno</span>`,`      <span>Pyme</span>`,`    </nav>`,`    <div style="${r}">`,`      <button type="button" style="height:56px;padding:0 16px;border:none;border-radius:14px;background:linear-gradient(180deg, #ffffff 0%, #f3f5fb 100%);box-shadow:inset 0 0 0 1px rgba(217, 225, 238, 0.98), 0 10px 24px rgba(24, 37, 76, 0.08);color:#1030a4;font-family:'Benton Sans BBVA', sans-serif;font-size:15px;font-weight:500;box-sizing:border-box;">Acceso</button>`,`      <button type="button" style="height:56px;padding:0 16px;border:none;border-radius:14px;background:linear-gradient(180deg, #2d7cff 0%, #1462ee 100%);box-shadow:0 14px 28px rgba(33, 94, 224, 0.24);color:#ffffff;font-family:'Benton Sans BBVA', sans-serif;font-size:15px;font-weight:500;box-sizing:border-box;">Hazte cliente</button>`,`      <span style="display:inline-flex;align-items:center;color:#0f278f;font-size:15px;font-weight:500;">Buscar</span>`,`      <span style="display:inline-flex;align-items:center;color:#0f278f;font-size:15px;font-weight:500;">Menú</span>`,`    </div>`,`  </header>`].join(`
`)}buildLogoCode(e){return`  <img src="https://www.bbva.mx/content/dam/library/logos/logo-bbva.svg" alt="Logo BBVA" style="${[`position: absolute`,`left: ${Math.round(e.x)}px`,`top: ${Math.round(e.y)}px`,`width: ${Math.round(e.width)}px`,`height: ${Math.round(e.height)}px`,`display: block`].join(`; `)}" />`}buildMicroIllustrationCode(e){let t=l.find(t=>t.value===e.illustration)??l[0],n=[`position: absolute`,`left: ${Math.round(e.x)}px`,`top: ${Math.round(e.y)}px`,`width: ${Math.round(e.width)}px`,`height: ${Math.round(e.height)}px`,`display: block`,`object-fit: contain`].join(`; `);return`  <img src="${t.src}" alt="${t.label}" style="${n}" />`}buildImageCode(e){let t=[`position: absolute`,`left: ${Math.round(e.x)}px`,`top: ${Math.round(e.y)}px`,`width: ${Math.round(e.width)}px`,`height: ${Math.round(e.height)}px`,`display: block`,`border-radius: 16px`,`overflow: hidden`,`background: linear-gradient(180deg, rgba(19, 30, 68, 0.1), rgba(19, 30, 68, 0.06))`,`border: 1px solid rgba(19, 30, 68, 0.14)`,`box-sizing: border-box`].join(`; `);return e.src?`  <img src="${e.src}" alt="${this.escapeCodeText(e.alt||`Imagen`)}" style="${t};object-fit:cover;" />`:`  <div style="${t}"></div>`}buildCanvasEntryCode(e){return e.kind===`typography`?this.buildTypographyCode(e.item):e.kind===`button`?this.buildButtonCode(e.item):e.kind===`input-text`?this.buildInputTextCode(e.item):e.kind===`icon`?this.buildIconCode(e.item):e.kind===`desktop-menu`?this.buildDesktopMenuCode(e.item):e.kind===`logo`?this.buildLogoCode(e.item):e.kind===`micro-illustration`?this.buildMicroIllustrationCode(e.item):e.kind===`image`?this.buildImageCode(e.item):this.buildContainerCode(e.item)}buildContainerCode(e){let t=this.viewport===`mobile`?4:12,n=this.viewport===`mobile`?e.mobileStart:e.desktopStart,r=this.viewport===`mobile`?e.mobileSpan:e.desktopSpan,i=e.widthMode===`auto`?`width: ${Math.round(this.getContainerRenderedWidth(e))}px`:`width: ${this.getContainerWidthPercent(r,t)}%`,a=e.heightMode===`auto`?`height: ${Math.round(this.getContainerRenderedHeight(e))}px`:`height: ${Math.round(e.height)}px`,o=[`position: absolute`,`left: ${this.getContainerLeftPercent(n,t)}%`,`top: ${Math.round(e.y)}px`,i,a,`padding: ${e.paddingTop}px ${e.paddingRight}px ${e.paddingBottom}px ${e.paddingLeft}px`,`box-sizing: border-box`,`border-radius: ${e.borderRadius}px`,`background: ${e.background}`,`overflow: ${e.scrollEnabled?`auto`:`hidden`}`,`box-shadow: ${this.getContainerBoxShadow(e)}`].join(`; `),s=this.getContainerChildren(e.id).map(e=>this.buildCanvasEntryCode(e));return s.length===0?`  <div style="${o}"></div>`:[`  <div style="${o}">`,...s.map(e=>`    ${e.trimStart()}`),`  </div>`].join(`
`)}buildCanvasCode(){return[`<div class="canvas canvas--${this.viewport}" style="position: relative; min-height: 780px; background: ${this.canvasBackground};">`,...this.rootCanvasItems.length===0?[`  <!-- Arrastra "Textos", botones o "Contenedor" desde el panel para comenzar -->`]:this.rootCanvasItems.map(e=>this.buildCanvasEntryCode(e)),`</div>`].join(`
`)}handleCanvasDragOver(e){if(this.isCodeView)return;let t=this.activeDraggedTool??e.dataTransfer?.getData(`application/x-ui-tool`)??e.dataTransfer?.getData(`text/plain`);t&&(t!==`tipografia`&&t!==`main-button`&&t!==`input-text`&&t!==`secondary-button`&&t!==`opportunity-button`&&t!==`icon-button`&&t!==`icon`&&t!==`desktop-menu`&&t!==`logo`&&t!==`micro-illustration`&&t!==`image`&&t!==`contenedor`&&!t.startsWith(`custom-molecule:`)||(e.preventDefault(),this.isCanvasDragActive=!0,e.dataTransfer&&(e.dataTransfer.dropEffect=`copy`)))}handleCanvasDragLeave(e){if(this.isCodeView)return;let t=e.relatedTarget,n=e.currentTarget;t&&n.contains(t)||(this.isCanvasDragActive=!1)}handleCanvasDrop(e){if(this.isCodeView)return;e.preventDefault(),this.isCanvasDragActive=!1;let t=this.activeDraggedTool??e.dataTransfer?.getData(`application/x-ui-tool`)??e.dataTransfer?.getData(`text/plain`);if(this.activeDraggedTool=null,!t)return;let n=e.currentTarget.getBoundingClientRect(),r=this.getDropContainerAtPoint(e.clientX,e.clientY);if(t===`tipografia`){let t=this.viewport===`mobile`?208:240,i=this.getDefaultTypographyHeight(this.toolTypographyPreset),a=r?.rect??n,o=Math.max(0,Math.min(a.width-t,e.clientX-a.left-t/2)),s=Math.max(0,Math.min(a.height-i,e.clientY-a.top-i/2));this.createTypographyItem(o,s,r?.container.id??null);return}if(t===`main-button`){let t=this.viewport===`mobile`?248:304,i=r?.rect??n,a=Math.max(0,Math.min(i.width-t,e.clientX-i.left-t/2)),o=Math.max(0,Math.min(i.height-55,e.clientY-i.top-55/2));this.createButtonItem(`main`,a,o,r?.container.id??null);return}if(t===`input-text`){let t=r?.rect??n,i=Math.max(0,Math.min(t.width-200,e.clientX-t.left-200/2)),a=Math.max(0,Math.min(t.height-56,e.clientY-t.top-56/2));this.createInputTextItem(i,a,r?.container.id??null);return}if(t===`secondary-button`){let t=this.viewport===`mobile`?248:304,i=r?.rect??n,a=Math.max(0,Math.min(i.width-t,e.clientX-i.left-t/2)),o=Math.max(0,Math.min(i.height-55,e.clientY-i.top-55/2));this.createButtonItem(`secondary`,a,o,r?.container.id??null);return}if(t===`icon-button`){let t=r?.rect??n,i=Math.max(0,Math.min(t.width-34,e.clientX-t.left-34/2)),a=Math.max(0,Math.min(t.height-34,e.clientY-t.top-34/2));this.createButtonItem(`icon-button`,i,a,r?.container.id??null);return}if(t===`opportunity-button`){let t=this.viewport===`mobile`?248:304,i=r?.rect??n,a=Math.max(0,Math.min(i.width-t,e.clientX-i.left-t/2)),o=Math.max(0,Math.min(i.height-55,e.clientY-i.top-55/2));this.createButtonItem(`opportunity`,a,o,r?.container.id??null);return}if(t===`icon`){let t=r?.rect??n,i=Math.max(0,Math.min(t.width-40,e.clientX-t.left-40/2)),a=Math.max(0,Math.min(t.height-40,e.clientY-t.top-40/2));this.createIconItem(i,a,r?.container.id??null);return}if(t===`desktop-menu`){let t=r?.rect??n,i=Math.min(t.width,this.viewport===`mobile`?430:1120),a=Math.max(0,Math.min(t.height-118,e.clientY-t.top-118/2));this.createDesktopMenuItem(a,r?.container.id??null,i);return}if(t.startsWith(`custom-molecule:`)){let i=this.getCustomMoleculeIdFromTool(t),a=i?this.getCustomMoleculeById(i):null;if(!a)return;let o=this.getCustomMoleculeRootContainer(a);if(!o)return;let s=r?.rect??n,c=o.height,l=s.width*this.getContainerWidthPercent(this.viewport===`mobile`?o.mobileSpan:o.desktopSpan,this.getGridColumns()),u=Math.max(0,Math.min(s.width-l,e.clientX-s.left-l/2)),d=Math.max(0,Math.min(s.height-c,e.clientY-s.top-c/2));this.instantiateCustomMolecule(a,d,r?.container.id??null,u,s.width);return}if(t===`logo`){let t=r?.rect??n,i=Math.max(0,Math.min(t.width-120,e.clientX-t.left-120/2)),a=Math.max(0,Math.min(t.height-32,e.clientY-t.top-32/2));this.createLogoItem(i,a,r?.container.id??null);return}if(t===`micro-illustration`){let t=r?.rect??n,i=Math.max(0,Math.min(t.width-96,e.clientX-t.left-96/2)),a=Math.max(0,Math.min(t.height-96,e.clientY-t.top-96/2));this.createMicroIllustrationItem(i,a,r?.container.id??null);return}if(t===`image`){let t=r?.rect??n,i=Math.max(0,Math.min(t.width-200,e.clientX-t.left-200/2)),a=Math.max(0,Math.min(t.height-200,e.clientY-t.top-200/2));this.createImageItem(i,a,r?.container.id??null);return}if(t===`contenedor`){let t=this.getGridColumns(),i=this.viewport===`mobile`?4:6,a=n.width*i/t,o=r&&r.rect.width>a&&r.rect.height>168,s=o?r.rect:n,c=Math.max(0,Math.min(s.width-a,e.clientX-s.left-a/2)),l=Math.max(0,Math.min(s.height-168,e.clientY-s.top-168/2)),u=this.getContainerStartFromX(c,s.width,t,i);this.createContainerItem(l,this.viewport===`desktop`?u:1,this.viewport===`mobile`?u:1,o?r.container.id:null)}}setViewport(e){this.viewport!==e&&(this.isViewportTransitioning=!0,this.viewport=e,window.clearTimeout(this.viewportAnimationTimeout),this.viewportAnimationTimeout=window.setTimeout(()=>{this.isViewportTransitioning=!1},280))}renderCanvasButton(e){let t=e.fontSize??22;return e.variant===`icon-button`?n`<canvas-icon-button
          .icon=${e.icon??`search`}
          .backgroundVisible=${e.backgroundVisible??!0}
        ></canvas-icon-button>`:e.variant===`secondary`?n`<canvas-secondary-button
          .label=${e.label}
          .fontSize=${t}
        ></canvas-secondary-button>`:e.variant===`opportunity`?n`<canvas-opportunity-button
            .label=${e.label}
            .fontSize=${t}
          ></canvas-opportunity-button>`:n`<canvas-main-button
            .label=${e.label}
            .fontSize=${t}
          ></canvas-main-button>`}renderCanvasEntry(e,r=this.getActiveCanvasScene(),i=!0,a=!1){if(e.kind===`typography`){let r=e.item,o=i&&this.selectedTypographyId===r.id;return n`
        <div
          class="canvas-item"
          data-kind="typography"
          data-item-id=${i?r.id:t}
          data-selected=${String(o)}
          style=${`left:${r.x}px; top:${r.y}px; width:${r.width}px; height:${r.height}px;`}
          @dblclick=${i?e=>{e.stopPropagation(),this.handleCanvasItemDoubleClick(r.id)}:t}
          @pointerdown=${i?e=>{e.stopPropagation(),this.handleCanvasItemPointerDown(e,r.id)}:t}
        >
          <span class="handle top-left"></span>
          <span class="handle top-right"></span>
          <span class="handle bottom-left"></span>
          <span class="handle bottom-right"></span>
          <canvas-tipografia
            .itemId=${r.id}
            .preset=${r.preset}
            .text=${r.text}
            .align=${r.align}
            .verticalAlign=${r.verticalAlign??`top`}
            .bold=${r.bold}
            .italic=${r.italic}
            .color=${r.color}
            .fontSize=${r.fontSize}
            .editing=${i&&this.editingTypographyId===r.id}
            .linksEnabled=${a}
          ></canvas-tipografia>
        </div>
      `}if(e.kind===`button`){let r=e.item,a=i&&this.selectedTypographyId===r.id;return n`
        <div
          class="canvas-item"
          data-kind="button"
          data-button-variant=${r.variant}
          data-item-id=${i?r.id:t}
          data-selected=${String(a)}
          style=${`left:${r.x}px; top:${r.y}px; width:${r.width}px; height:${r.height}px;`}
          @dblclick=${i?e=>{e.stopPropagation(),this.handleCanvasItemDoubleClick(r.id)}:t}
          @pointerdown=${i?e=>{e.stopPropagation(),this.handleCanvasItemPointerDown(e,r.id)}:t}
          @click=${this.isPrototypeMode?e=>this.handlePrototypeButtonClick(e,r):t}
        >
          <span class="handle top-left"></span>
          <span class="handle top-right"></span>
          <span class="handle bottom-left"></span>
          <span class="handle bottom-right"></span>
          ${this.renderCanvasButton(r)}
        </div>
      `}if(e.kind===`input-text`){let r=e.item,o=i&&this.selectedTypographyId===r.id;return n`
        <div
          class="canvas-item"
          data-kind="input-text"
          data-item-id=${i?r.id:t}
          data-selected=${String(o)}
          style=${`left:${r.x}px; top:${r.y}px; width:${r.width}px; height:${r.height}px;`}
          @pointerdown=${i?e=>{a&&e.composedPath().some(e=>e instanceof HTMLInputElement||e instanceof HTMLButtonElement||e instanceof SVGElement||e instanceof HTMLElement&&(e.classList.contains(`field`)||e.classList.contains(`content`)||e.classList.contains(`input`)||e.classList.contains(`label`)||e.classList.contains(`actions`)||e.classList.contains(`action-button`)))||(e.stopPropagation(),this.handleCanvasItemPointerDown(e,r.id))}:t}
        >
          <span class="handle top-left"></span>
          <span class="handle top-right"></span>
          <span class="handle bottom-left"></span>
          <span class="handle bottom-right"></span>
          <canvas-input-text
            .itemId=${r.id}
            .label=${r.label}
            .value=${r.value}
            .icon=${r.icon??`eye-off`}
            .iconVisible=${r.iconVisible??!0}
            .status=${r.status??`inactive`}
            .enabled=${a}
          ></canvas-input-text>
        </div>
      `}if(e.kind===`icon`){let r=e.item,a=i&&this.selectedTypographyId===r.id;return n`
        <div
          class="canvas-item"
          data-kind="icon"
          data-item-id=${i?r.id:t}
          data-selected=${String(a)}
          style=${`left:${r.x}px; top:${r.y}px; width:${r.width}px; height:${r.height}px;`}
          @dblclick=${i?e=>{e.stopPropagation(),this.handleCanvasItemDoubleClick(r.id)}:t}
          @pointerdown=${i?e=>{e.stopPropagation(),this.handleCanvasItemPointerDown(e,r.id)}:t}
        >
          <span class="handle top-left"></span>
          <span class="handle top-right"></span>
          <span class="handle bottom-left"></span>
          <span class="handle bottom-right"></span>
          <canvas-icon
            .icon=${r.icon}
            .color=${r.color??`var(--color-primary-strong)`}
          ></canvas-icon>
        </div>
      `}if(e.kind===`desktop-menu`){let r=e.item,a=i&&this.selectedTypographyId===r.id;return n`
        <div
          class="canvas-item"
          data-kind="desktop-menu"
          data-item-id=${i?r.id:t}
          data-selected=${String(a)}
          style=${`left:${r.x}px; top:${r.y}px; width:${r.width}px; height:${r.height}px;`}
          @dblclick=${i?e=>{e.stopPropagation(),this.handleCanvasItemDoubleClick(r.id)}:t}
          @pointerdown=${i?e=>{e.stopPropagation(),this.handleCanvasItemPointerDown(e,r.id)}:t}
        >
          <span class="handle top-left"></span>
          <span class="handle top-right"></span>
          <span class="handle bottom-left"></span>
          <span class="handle bottom-right"></span>
          <canvas-desktop-menu></canvas-desktop-menu>
        </div>
      `}if(e.kind===`logo`){let r=e.item,a=i&&this.selectedTypographyId===r.id;return n`
        <div
          class="canvas-item"
          data-kind="logo"
          data-item-id=${i?r.id:t}
          data-selected=${String(a)}
          style=${`left:${r.x}px; top:${r.y}px; width:${r.width}px; height:${r.height}px;`}
          @dblclick=${i?e=>{e.stopPropagation(),this.handleCanvasItemDoubleClick(r.id)}:t}
          @pointerdown=${i?e=>{e.stopPropagation(),this.handleCanvasItemPointerDown(e,r.id)}:t}
        >
          <span class="handle top-left"></span>
          <span class="handle top-right"></span>
          <span class="handle bottom-left"></span>
          <span class="handle bottom-right"></span>
          <canvas-logo></canvas-logo>
        </div>
      `}if(e.kind===`micro-illustration`){let r=e.item,a=i&&this.selectedTypographyId===r.id;return n`
        <div
          class="canvas-item"
          data-kind="micro-illustration"
          data-item-id=${i?r.id:t}
          data-selected=${String(a)}
          style=${`left:${r.x}px; top:${r.y}px; width:${r.width}px; height:${r.height}px;`}
          @dblclick=${i?e=>{e.stopPropagation(),this.handleCanvasItemDoubleClick(r.id)}:t}
          @pointerdown=${i?e=>{e.stopPropagation(),this.handleCanvasItemPointerDown(e,r.id)}:t}
        >
          <span class="handle top-left"></span>
          <span class="handle top-right"></span>
          <span class="handle bottom-left"></span>
          <span class="handle bottom-right"></span>
          <canvas-micro-illustration
            .illustration=${r.illustration}
          ></canvas-micro-illustration>
        </div>
      `}if(e.kind===`image`){let r=e.item,a=i&&this.selectedTypographyId===r.id;return n`
        <div
          class="canvas-item"
          data-kind="image"
          data-item-id=${i?r.id:t}
          data-selected=${String(a)}
          style=${`left:${r.x}px; top:${r.y}px; width:${r.width}px; height:${r.height}px;`}
          @dblclick=${i?e=>{e.stopPropagation(),this.handleCanvasItemDoubleClick(r.id)}:t}
          @pointerdown=${i?e=>{e.stopPropagation(),this.handleCanvasItemPointerDown(e,r.id)}:t}
        >
          <span class="handle top-left"></span>
          <span class="handle top-right"></span>
          <span class="handle bottom-left"></span>
          <span class="handle bottom-right"></span>
          <canvas-image .src=${r.src} .alt=${r.alt}></canvas-image>
        </div>
      `}let o=e.item,s=i&&this.selectedTypographyId===o.id,c=o.widthMode===`auto`?`${this.getContainerRenderedWidth(o)}px`:`${this.getContainerWidthPercent(this.viewport===`mobile`?o.mobileSpan:o.desktopSpan,this.getGridColumns())}%`,l=`${this.getContainerRenderedHeight(o)}px`;return n`
      <div
        class="canvas-item"
        data-kind="container"
        data-item-id=${i?o.id:t}
        data-selected=${String(s)}
        style=${`left:${this.getContainerLeftPercent(this.viewport===`mobile`?o.mobileStart:o.desktopStart,this.getGridColumns())}%; top:${o.y}px; width:${c}; height:${l};`}
        @dblclick=${i?e=>{e.stopPropagation(),this.handleCanvasItemDoubleClick(o.id)}:t}
        @pointerdown=${i?e=>{e.stopPropagation(),this.handleCanvasItemPointerDown(e,o.id)}:t}
      >
        <span
          class="handle top-left"
          @pointerdown=${i?e=>this.handleContainerResizePointerDown(e,o,`top-left`):t}
        ></span>
        <span
          class="handle top-right"
          @pointerdown=${i?e=>this.handleContainerResizePointerDown(e,o,`top-right`):t}
        ></span>
        <span
          class="handle bottom-left"
          @pointerdown=${i?e=>this.handleContainerResizePointerDown(e,o,`bottom-left`):t}
        ></span>
        <span
          class="handle bottom-right"
          @pointerdown=${i?e=>this.handleContainerResizePointerDown(e,o,`bottom-right`):t}
        ></span>
        <canvas-contenedor
          .background=${o.background}
          .borderRadius=${o.borderRadius}
          .outlined=${s}
          .shadowEnabled=${o.shadowEnabled}
          .shadowX=${o.shadowX}
          .shadowY=${o.shadowY}
          .shadowBlur=${o.shadowBlur}
          .shadowSpread=${o.shadowSpread}
          .shadowOpacity=${o.shadowOpacity}
          .shadowColor=${o.shadowColor??m.shadowColor}
        ></canvas-contenedor>
        <div
          class="container-hover-tint"
          style=${`border-radius:${o.borderRadius}px;`}
        ></div>
        <div
          class="container-content"
          data-container-content-id=${i?o.id:t}
          style=${`top:${o.paddingTop}px; right:${o.paddingRight}px; bottom:${o.paddingBottom}px; left:${o.paddingLeft}px; overflow:${o.scrollEnabled?`auto`:`hidden`};`}
        >
          ${this.getContainerChildrenForScene(r,o.id).map(e=>this.renderCanvasEntry(e,r,i,a))}
        </div>
      </div>
    `}renderCanvasSurface(e){let r=this.getCanvasScene(e.id),i=e.id===this.activeCanvasId,a=i&&this.isCodeView,o=i&&!this.isPrototypeMode,s=this.sceneHasCanvasItems(r);return n`
      <div
        class="canvas-stack-item"
        data-canvas-surface-id=${e.id}
        data-active=${String(i)}
      >
        <button
          class="canvas-surface-name"
          type="button"
          data-active=${String(i)}
          @click=${()=>this.handleSelectCanvas(e.id)}
        >
          ${e.name.trim()||this.getCanvasFallbackName(e.id)}
        </button>
        <div class="canvas-shell" data-active=${String(i)}>
          <div class="canvas" data-active=${String(i)}>
            <div class="canvas-body">
              <div
                class=${a?`page-preview code-view`:`page-preview`}
                data-mode=${this.viewport}
                data-active-canvas=${String(i)}
                data-drag-active=${String(o&&!this.isCodeView&&this.isCanvasDragActive)}
                style=${`--canvas-background:${r.canvasBackground};`}
                @click=${this.isPrototypeMode?i?t:()=>this.activateCanvas(e.id,!1):i?this.handleCanvasClick:()=>this.handleSelectCanvas(e.id)}
                @dragover=${o?this.handleCanvasDragOver:t}
                @dragleave=${o?this.handleCanvasDragLeave:t}
                @drop=${o?this.handleCanvasDrop:t}
                @text-change=${o?this.handleTypographyTextChange:t}
                @text-edit-finish=${o?this.handleTypographyEditFinish:t}
                @input-text-change=${i?this.handleInputTextChange:t}
                @input-text-focus=${!this.isPrototypeMode&&i?this.handleInputTextFocus:t}
              >
                ${a?n`<pre class="code-block">${this.buildCanvasCode()}</pre>`:n`
                      ${s?null:n`<div class="page-preview-empty">
                            Arrastra "Textos", botones o "Contenedor" desde el panel para comenzar.
                          </div>`}

                      ${this.getRootCanvasItems(r).map(e=>this.renderCanvasEntry(e,r,o,this.isPrototypeMode&&i))}
                    `}
              </div>
            </div>
          </div>
        </div>
      </div>
    `}render(){return n`
      <div
        class="workspace"
        data-dragging=${String(this.activeDraggedTool!==null)}
        data-prototype-mode=${String(this.isPrototypeMode)}
        data-tools-drawer-mode=${String(this.isToolsDrawerMode)}
        data-tools-drawer-open=${String(this.isToolsDrawerOpen)}
      >
        <section class="stage">
          <div
            class="canvas-frame"
            data-mode=${this.viewport}
            data-transitioning=${String(this.isViewportTransitioning)}
          >
            <div class="canvas-controls">
              <div class="canvas-controls-left">
                <div class="canvas-menu" data-canvas-menu="true">
                  <button
                    class="canvas-menu-button"
                    type="button"
                    aria-label="Abrir lista de lienzos"
                    aria-haspopup="menu"
                    aria-expanded=${String(this.isCanvasMenuOpen)}
                    @click=${this.toggleCanvasMenu}
                  >
                    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path
                        d="M4 6h12M4 10h12M4 14h12"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                      ></path>
                    </svg>
                    <span class="canvas-menu-label">
                      ${this.activeCanvas?.name.trim()||this.getCanvasFallbackName(this.activeCanvasId)}
                    </span>
                  </button>

                  ${this.isCanvasMenuOpen?n`
                        <div class="canvas-menu-panel" role="menu" aria-label="Lista de lienzos">
                          <p class="canvas-menu-title">Lienzos</p>
                          <div class="canvas-tabs">
                            ${this.canvases.map(e=>n`
                                <button
                                  class="canvas-tab"
                                  type="button"
                                  role="menuitem"
                                  data-active=${String(e.id===this.activeCanvasId)}
                                  @click=${()=>this.handleSelectCanvas(e.id)}
                                >
                                  ${e.name.trim()||this.getCanvasFallbackName(e.id)}
                                </button>
                              `)}
                          </div>
                        </div>
                      `:null}
                </div>
              </div>

              <div class="canvas-controls-right">
                <div class="segmented" aria-label="Viewport selector">
                  <button
                    class="segment-button"
                    data-active=${String(this.viewport===`desktop`)}
                    @click=${()=>this.setViewport(`desktop`)}
                  >
                    Desktop
                  </button>
                  <button
                    class="segment-button"
                    data-active=${String(this.viewport===`mobile`)}
                    @click=${()=>this.setViewport(`mobile`)}
                  >
                    Mobile
                  </button>
                </div>
                <button
                  class="canvas-add-button"
                  type="button"
                  @click=${this.handleCreateCanvas}
                  aria-label="Crear otro lienzo"
                  title="Crear otro lienzo"
                >
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                      d="M10 4v12M4 10h12"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div class="canvas-stack">
              ${this.canvases.map(e=>this.renderCanvasSurface(e))}
            </div>
          </div>
        </section>

        ${this.isToolsDrawerMode?n`
              <button
                class="tools-drawer-toggle"
                type="button"
                @click=${this.toggleToolsDrawer}
                aria-label="Abrir herramientas"
                title="Abrir herramientas"
              >
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M4 6h12M4 10h12M4 14h12"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  ></path>
                </svg>
                <span>Herramientas</span>
              </button>
            `:null}

        <aside
          class="tools-panel"
          data-collapsed=${String(this.isPrototypeMode)}
          aria-hidden=${String(this.isToolsDrawerMode&&!this.isToolsDrawerOpen)}
        >
          <div class="tool-section">
            <div class="panel-head">
              <div class="panel-head-main">
                <h2 class="panel-title" data-compact=${String(this.isPanelEditingMode)}>
                  ${this.panelTitleText}
                </h2>
                ${!this.isPrototypeMode&&(this.selectedTypographyId||this.isCanvasEditing)?n`
                      <button
                        class="panel-action panel-action-dismiss"
                        @click=${()=>{this.clearActiveEditingState()}}
                        aria-label="Cerrar edicion"
                        title="Cerrar edicion"
                      >
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                          <path
                            d="M5 5l10 10M15 5L5 15"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                          />
                        </svg>
                      </button>
                    `:null}
              </div>
              <div class="panel-actions-stack">
                <div class="panel-actions">
                  ${this.isToolsDrawerMode?n`
                        <button
                          class="panel-action tools-drawer-close"
                          @click=${this.closeToolsDrawer}
                          aria-label="Minimizar herramientas"
                          title="Minimizar herramientas"
                        >
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path
                              d="M5 10h10"
                              stroke="currentColor"
                              stroke-width="1.8"
                              stroke-linecap="round"
                            />
                          </svg>
                        </button>
                      `:null}
                  <button
                    class="panel-action panel-action-code"
                    data-active=${String(this.isCodeView)}
                    @click=${this.toggleCodeView}
                    aria-label=${this.isCodeView?`Volver al lienzo`:`Ver codigo`}
                    title=${this.isCodeView?`Volver al lienzo`:`Ver codigo`}
                  >
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path
                        d="M7 5L3 10l4 5M13 5l4 5-4 5M11 3l-2 14"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    class="panel-action panel-action-prototype"
                    data-active=${String(this.isPrototypeMode)}
                    @click=${this.togglePrototypeMode}
                    aria-label=${this.isPrototypeMode?`Cerrar prototipo`:`Activar prototipo`}
                    title=${this.isPrototypeMode?`Cerrar prototipo`:`Activar prototipo`}
                  >
                    ${this.isPrototypeMode?n`
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path
                              d="M5 5l10 10M15 5L5 15"
                              stroke="currentColor"
                              stroke-width="1.8"
                              stroke-linecap="round"
                            />
                          </svg>
                        `:n`
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path
                              d="M7 5.5v9l7-4.5-7-4.5Z"
                              fill="currentColor"
                            />
                          </svg>
                        `}
                  </button>
                </div>
                ${this.editingContainerId&&this.selectedContainerItem?n`
                      <button
                        class="panel-action panel-action-create"
                        type="button"
                        @click=${this.openCreateComponentModal}
                      >
                        + componente
                      </button>
                    `:null}
              </div>
            </div>
          </div>

          ${this.isPrototypeMode?t:this.selectedTypographyItem?n`
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
                        ${s.map(e=>n`<option value=${e.value}>${e.label}</option>`)}
                      </select>
                    </div>

                    <div class="editor-row">
                      <p class="editor-label">Alineacion</p>
                      <div class="editor-actions">
                        <button
                          class="editor-button"
                          data-active=${String(this.selectedTypographyItem.align===`left`)}
                          @click=${()=>this.setSelectedAlignment(`left`)}
                          aria-label="Alinear a la izquierda"
                          title="Alinear a la izquierda"
                        >
                          <svg class="align-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path d="M3 5h10M3 8.5h7M3 12h10M3 15.5h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                          </svg>
                        </button>
                        <button
                          class="editor-button"
                          data-active=${String(this.selectedTypographyItem.align===`center`)}
                          @click=${()=>this.setSelectedAlignment(`center`)}
                          aria-label="Centrar texto"
                          title="Centrar texto"
                        >
                          <svg class="align-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path d="M5 5h10M6.5 8.5h7M5 12h10M7 15.5h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                          </svg>
                        </button>
                        <button
                          class="editor-button"
                          data-active=${String(this.selectedTypographyItem.align===`right`)}
                          @click=${()=>this.setSelectedAlignment(`right`)}
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
                      <p class="editor-label">Alineacion vertical</p>
                      <div class="editor-actions">
                        <button
                          class="editor-button"
                          data-active=${String((this.selectedTypographyItem.verticalAlign??`top`)===`top`)}
                          @click=${()=>this.setSelectedVerticalAlignment(`top`)}
                          aria-label="Alinear arriba"
                          title="Alinear arriba"
                        >
                          Arriba
                        </button>
                        <button
                          class="editor-button"
                          data-active=${String((this.selectedTypographyItem.verticalAlign??`top`)===`center`)}
                          @click=${()=>this.setSelectedVerticalAlignment(`center`)}
                          aria-label="Centrar verticalmente"
                          title="Centrar verticalmente"
                        >
                          Centro
                        </button>
                        <button
                          class="editor-button"
                          data-active=${String((this.selectedTypographyItem.verticalAlign??`top`)===`bottom`)}
                          @click=${()=>this.setSelectedVerticalAlignment(`bottom`)}
                          aria-label="Alinear abajo"
                          title="Alinear abajo"
                        >
                          Abajo
                        </button>
                      </div>
                    </div>

                    <div class="editor-row">
                      <p class="editor-label">Color</p>
                      ${this.renderColorDropdown(`text`,v,this.selectedTypographyItem.color,e=>this.updateSelectedTypographyItem({color:e}))}
                    </div>

                    <div class="editor-row">
                      <p class="editor-label">Estilo</p>
                      <div class="editor-actions">
                        <button
                          class="editor-button"
                          data-active=${String(this.selectedTypographyItem.bold)}
                          @mousedown=${this.preserveInlineTypographySelection}
                          @click=${this.toggleSelectedBold}
                        >
                          Bold
                        </button>
                        <button
                          class="editor-button"
                          data-active=${String(this.selectedTypographyItem.italic)}
                          @mousedown=${this.preserveInlineTypographySelection}
                          @click=${this.toggleSelectedItalic}
                        >
                          Italic
                        </button>
                      </div>
                    </div>

                    <div class="editor-row">
                      <div class="editor-switch-row">
                        <p class="editor-label">Link</p>
                        <label class="editor-switch" aria-label="Activar link en texto">
                          <input
                            class="editor-switch-input"
                            type="checkbox"
                            .checked=${this.selectedTypographyHasLink}
                            @change=${this.handleSelectedTypographyLinkToggle}
                          />
                          <span class="editor-switch-track"></span>
                        </label>
                      </div>
                    </div>

                    ${this.selectedTypographyHasLink?n`
                          <div class="editor-row">
                            <p class="editor-label">URL</p>
                            <input
                              class="editor-input"
                              type="text"
                              .value=${this.selectedTypographyLinkHref}
                              placeholder="https://"
                              @input=${this.handleSelectedTypographyLinkInput}
                            />
                          </div>
                        `:t}

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
                `:this.selectedInputTextItem?n`
                    <div class="tool-group">
                      <h3 class="section-title">Input seleccionado</h3>
                      <div class="editor-stack">
                        <div class="editor-row">
                          <p class="editor-label">Placeholder</p>
                          <input
                            class="editor-input"
                            type="text"
                            .value=${this.selectedInputTextItem.label}
                            placeholder="Número de Tarjeta"
                            @input=${this.handleSelectedInputLabelInput}
                          />
                        </div>

                        <div class="editor-row">
                          <p class="editor-label">Mostrar icono</p>
                          <select
                            class="editor-select"
                            .value=${this.selectedInputTextItem.iconVisible??!0?`visible`:`hidden`}
                            @change=${this.handleSelectedInputIconVisibilityChange}
                          >
                            <option value="visible">Visible</option>
                            <option value="hidden">Oculto</option>
                          </select>
                        </div>

                        ${this.selectedInputTextItem.iconVisible??!0?n`<div class="editor-row">
                          <p class="editor-label">Icono</p>
                          ${this.renderIconDropdown(this.selectedInputTextItem.icon??`eye-off`,e=>this.updateSelectedInputTextItem({icon:e}))}
                        </div>`:t}

                        <div class="editor-row">
                          <p class="editor-label">Status</p>
                          <select
                            class="editor-select"
                            .value=${this.selectedInputTextItem.status??`inactive`}
                            @change=${this.handleSelectedInputStatusChange}
                          >
                            <option value="inactive">Inactivo</option>
                            <option value="active">Activo</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  `:this.editingIconId&&this.selectedIconItem?n`
                  <div class="tool-group">
                    <h3 class="section-title">Icono seleccionado</h3>
                    <div class="editor-stack">
                      <div class="editor-row">
                        <p class="editor-label">SVG</p>
                        ${this.renderIconDropdown(this.selectedIconItem.icon,e=>this.updateSelectedIconItem({icon:e}))}
                      </div>
                      <div class="editor-row">
                        <p class="editor-label">Color</p>
                        ${this.renderColorDropdown(`icon-color`,h,this.selectedIconItem.color??`var(--color-primary-strong)`,e=>this.updateSelectedIconItem({color:e}))}
                      </div>
                    </div>
                  </div>
                `:this.editingMicroIllustrationId&&this.selectedMicroIllustrationItem?n`
                  <div class="tool-group">
                    <h3 class="section-title">Micro ilustracion seleccionada</h3>
                    <div class="editor-stack">
                      <div class="editor-row">
                        <p class="editor-label">Micro ilustracion</p>
                        ${this.renderMicroIllustrationDropdown(this.selectedMicroIllustrationItem.illustration,e=>this.updateSelectedMicroIllustrationItem({illustration:e}))}
                      </div>
                    </div>
                  </div>
                `:this.editingImageId&&this.selectedImageItem?n`
                  <div class="tool-group">
                    <h3 class="section-title">Imagen seleccionada</h3>
                    <div class="editor-stack">
                      <div class="editor-row">
                        <p class="editor-label">Archivo</p>
                        <button
                          class="editor-button"
                          type="button"
                          @click=${this.handleSelectedImageUploadClick}
                        >
                          ${this.selectedImageItem.src?`Reemplazar imagen`:`Subir imagen`}
                        </button>
                      </div>
                      <div class="editor-row">
                        <p class="editor-label">Alt</p>
                        <input
                          class="editor-input"
                          type="text"
                          .value=${this.selectedImageItem.alt}
                          placeholder="Imagen"
                          @input=${e=>this.updateSelectedImageItem({alt:e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                `:this.editingLogoId&&this.selectedLogoItem?n`
                  <div class="tool-group">
                    <h3 class="section-title">Logo seleccionado</h3>
                    <div class="editor-stack">
                      <p class="editor-help">
                        Este componente usa el logo BBVA desde la libreria oficial y puedes moverlo o redimensionarlo en el lienzo.
                      </p>
                    </div>
                  </div>
                `:this.editingButtonId&&this.selectedButtonItem?n`
                  <div class="tool-group">
                    <h3 class="section-title">
                      ${this.selectedButtonItem.variant===`icon-button`?`Icon Buton seleccionado`:`Boton seleccionado`}
                    </h3>
                    <div class="editor-stack">
                      ${this.selectedButtonItem.variant===`icon-button`?n`
                            <div class="editor-row">
                              <p class="editor-label">SVG</p>
                              ${this.renderIconDropdown(this.selectedButtonItem.icon??`search`,e=>this.updateSelectedButtonItem({icon:e}))}
                            </div>

                            <div class="editor-row">
                              <p class="editor-label">Fondo</p>
                              <select
                                class="editor-select"
                                .value=${this.selectedButtonItem.backgroundVisible===!1?`transparent`:`visible`}
                                @change=${this.handleSelectedIconButtonBackgroundChange}
                              >
                                <option value="visible">Visible</option>
                                <option value="transparent">Sin fondo</option>
                              </select>
                            </div>

                            <div class="editor-row">
                              <p class="editor-label">Accion</p>
                              <select
                                class="editor-select"
                                .value=${this.selectedButtonActionType}
                                @change=${this.handleSelectedButtonActionTypeChange}
                              >
                                <option value="none">Sin accion</option>
                                <option value="link">Link</option>
                              </select>
                            </div>

                            ${this.selectedButtonActionType===`link`?n`
                                  <div class="editor-row">
                                    <p class="editor-label">Destino</p>
                                    <select
                                      class="editor-select"
                                      .value=${this.selectedButtonLinkTargetId}
                                      ?disabled=${this.selectableButtonLinkCanvases.length===0}
                                      @change=${this.handleSelectedButtonLinkTargetChange}
                                    >
                                      ${this.selectableButtonLinkCanvases.length===0?n`<option value="">No hay otros lienzos</option>`:this.selectableButtonLinkCanvases.map(e=>n`
                                              <option value=${e.id}>
                                                ${e.name.trim()||this.getCanvasFallbackName(e.id)}
                                              </option>
                                            `)}
                                    </select>
                                    <p class="editor-help">
                                      Selecciona el lienzo al que este boton debe navegar.
                                    </p>
                                  </div>
                                `:n`
                                  <p class="editor-help">
                                    Puedes usar este boton circular como acceso a otro lienzo.
                                  </p>
                                `}
                          `:n`
                            <div class="editor-row">
                              <p class="editor-label">Texto</p>
                              <input
                                class="editor-input"
                                type="text"
                                .value=${this.selectedButtonItem.label}
                                placeholder="Conoce más"
                                @input=${this.handleSelectedButtonLabelInput}
                              />
                            </div>

                            <div class="editor-row">
                              <p class="editor-label">Alto</p>
                              <select
                                class="editor-select"
                                .value=${String(this.selectedButtonItem.height)}
                                @change=${this.handleSelectedButtonHeightChange}
                              >
                                ${u.map(e=>n`<option value=${String(e)}>${e}px</option>`)}
                              </select>
                            </div>

                            <div class="editor-row">
                              <p class="editor-label">Accion</p>
                              <select
                                class="editor-select"
                                .value=${this.selectedButtonActionType}
                                @change=${this.handleSelectedButtonActionTypeChange}
                              >
                                <option value="none">Sin accion</option>
                                <option value="link">Link</option>
                              </select>
                            </div>

                            ${this.selectedButtonActionType===`link`?n`
                                  <div class="editor-row">
                                    <p class="editor-label">Destino</p>
                                    <select
                                      class="editor-select"
                                      .value=${this.selectedButtonLinkTargetId}
                                      ?disabled=${this.selectableButtonLinkCanvases.length===0}
                                      @change=${this.handleSelectedButtonLinkTargetChange}
                                    >
                                      ${this.selectableButtonLinkCanvases.length===0?n`<option value="">No hay otros lienzos</option>`:this.selectableButtonLinkCanvases.map(e=>n`
                                              <option value=${e.id}>
                                                ${e.name.trim()||this.getCanvasFallbackName(e.id)}
                                              </option>
                                            `)}
                                    </select>
                                    <p class="editor-help">
                                      Selecciona el lienzo al que este boton debe navegar.
                                    </p>
                                  </div>
                                `:n`
                                  <p class="editor-help">
                                    Elige una accion para definir la interaccion de este boton.
                                  </p>
                                `}
                          `}
                    </div>
                  </div>
                `:this.editingContainerId&&this.selectedContainerItem?n`
                    <div class="tool-group">
                      ${this.isEditingSelectedContainerName?n`
                            <input
                              class="section-title-input"
                              type="text"
                              .value=${this.selectedContainerItem.name}
                              @input=${this.handleSelectedContainerNameInput}
                              @keydown=${this.handleSelectedContainerNameKeyDown}
                              @blur=${this.stopSelectedContainerNameEditing}
                            />
                          `:n`
                            <button
                              class="section-title section-title-button"
                              type="button"
                              @click=${this.startSelectedContainerNameEditing}
                            >
                              ${this.selectedContainerItem.name||`Contenedor`}
                            </button>
                          `}
                      <div class="editor-stack">
                        <div class="editor-row">
                          <p class="editor-label">Fondo</p>
                          ${this.renderColorDropdown(`container`,g,this.selectedContainerItem.background,e=>this.updateSelectedContainerItem({background:e}))}
                        </div>

                        <div class="editor-row">
                          <p class="editor-label">Desktop</p>
                          <select
                            class="editor-select"
                            .value=${String(this.selectedContainerItem.desktopSpan)}
                            @change=${this.handleSelectedContainerDesktopSpanChange}
                          >
                            ${Array.from({length:12},(e,t)=>{let r=t+1;return n`
                                <option value=${String(r)}>
                                  ${r} columnas · ${this.getContainerPercentage(r,12)}%
                                </option>
                              `})}
                          </select>
                        </div>

                        <div class="editor-row">
                          <p class="editor-label">Mobile</p>
                          <select
                            class="editor-select"
                            .value=${String(this.selectedContainerItem.mobileSpan)}
                            @change=${this.handleSelectedContainerMobileSpanChange}
                          >
                            ${Array.from({length:4},(e,t)=>{let r=t+1;return n`
                                <option value=${String(r)}>
                                  ${r} columnas · ${this.getContainerPercentage(r,4)}%
                                </option>
                              `})}
                          </select>
                        </div>

                        <div class="editor-row">
                          <div class="editor-range-wrap">
                            <div class="editor-range-head">
                              <p class="editor-label">Radio</p>
                              <span class="editor-range-value">
                                ${this.selectedContainerItem.borderRadius}px
                              </span>
                            </div>
                            <input
                              class="editor-range"
                              type="range"
                              min="0"
                              max="40"
                              step="1"
                              .value=${String(this.selectedContainerItem.borderRadius)}
                              @input=${this.handleSelectedContainerRadiusInput}
                            />
                          </div>
                        </div>

                        <div class="editor-row">
                          <div class="editor-range-wrap">
                            <div class="editor-range-head">
                              <p class="editor-label">Ancho</p>
                              <span class="editor-range-value">
                                ${this.getContainerWidthInputValue(this.selectedContainerItem)}px
                              </span>
                            </div>
                            <div class="editor-grid">
                              <label class="editor-field">
                                <span class="editor-field-label">Modo</span>
                                <select
                                  class="editor-select"
                                  .value=${this.selectedContainerItem.widthMode}
                                  @change=${this.handleSelectedContainerWidthModeChange}
                                >
                                  <option value="manual">Manual</option>
                                  <option value="auto">Auto</option>
                                </select>
                              </label>
                              <label class="editor-field">
                                <span class="editor-field-label">Ancho</span>
                                <input
                                  class="editor-input"
                                  type="number"
                                  min="1"
                                  max="1120"
                                  step="1"
                                  .value=${String(this.getContainerWidthInputValue(this.selectedContainerItem))}
                                  ?disabled=${this.selectedContainerItem.widthMode===`auto`}
                                  @input=${this.handleSelectedContainerWidthInput}
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div class="editor-row">
                          <div class="editor-range-wrap">
                            <div class="editor-range-head">
                              <p class="editor-label">Altura</p>
                              <span class="editor-range-value">
                                ${this.getContainerHeightInputValue(this.selectedContainerItem)}px
                              </span>
                            </div>
                            <div class="editor-grid">
                              <label class="editor-field">
                                <span class="editor-field-label">Modo</span>
                                <select
                                  class="editor-select"
                                  .value=${this.selectedContainerItem.heightMode}
                                  @change=${this.handleSelectedContainerHeightModeChange}
                                >
                                  <option value="manual">Manual</option>
                                  <option value="auto">Auto</option>
                                </select>
                              </label>
                              <label class="editor-field">
                                <span class="editor-field-label">Altura</span>
                                <input
                                  class="editor-input"
                                  type="number"
                                  min="1"
                                  max="420"
                                  step="4"
                                  .value=${String(this.getContainerHeightInputValue(this.selectedContainerItem))}
                                  ?disabled=${this.selectedContainerItem.heightMode===`auto`}
                                  @input=${this.handleSelectedContainerHeightInput}
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div class="editor-row">
                          <div class="editor-range-wrap">
                            <div class="editor-range-head">
                              <p class="editor-label">Padding</p>
                              <span class="editor-range-value">
                                ${this.selectedContainerItem.paddingTop}px /
                                ${this.selectedContainerItem.paddingRight}px /
                                ${this.selectedContainerItem.paddingBottom}px /
                                ${this.selectedContainerItem.paddingLeft}px
                              </span>
                            </div>
                            <div class="editor-grid">
                              <label class="editor-field">
                                <span class="editor-field-label">Top</span>
                                <input
                                  class="editor-input"
                                  type="number"
                                  min="0"
                                  max="120"
                                  step="1"
                                  .value=${String(this.selectedContainerItem.paddingTop)}
                                  @input=${this.handleSelectedContainerPaddingTopInput}
                                />
                              </label>
                              <label class="editor-field">
                                <span class="editor-field-label">Right</span>
                                <input
                                  class="editor-input"
                                  type="number"
                                  min="0"
                                  max="120"
                                  step="1"
                                  .value=${String(this.selectedContainerItem.paddingRight)}
                                  @input=${this.handleSelectedContainerPaddingRightInput}
                                />
                              </label>
                              <label class="editor-field">
                                <span class="editor-field-label">Bottom</span>
                                <input
                                  class="editor-input"
                                  type="number"
                                  min="0"
                                  max="120"
                                  step="1"
                                  .value=${String(this.selectedContainerItem.paddingBottom)}
                                  @input=${this.handleSelectedContainerPaddingBottomInput}
                                />
                              </label>
                              <label class="editor-field">
                                <span class="editor-field-label">Left</span>
                                <input
                                  class="editor-input"
                                  type="number"
                                  min="0"
                                  max="120"
                                  step="1"
                                  .value=${String(this.selectedContainerItem.paddingLeft)}
                                  @input=${this.handleSelectedContainerPaddingLeftInput}
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div class="editor-row">
                          <div class="editor-switch-row">
                            <p class="editor-label">Scroll interno</p>
                            <label class="editor-switch" aria-label="Activar scroll interno">
                              <input
                                class="editor-switch-input"
                                type="checkbox"
                                .checked=${this.selectedContainerItem.scrollEnabled}
                                @change=${this.handleSelectedContainerScrollToggle}
                              />
                              <span class="editor-switch-track"></span>
                            </label>
                          </div>
                          <p class="editor-help">
                            Permite scroll horizontal y vertical dentro del contenedor.
                          </p>
                        </div>

                        <div class="editor-row">
                          <div class="editor-switch-row">
                            <p class="editor-label">Drop Shadow</p>
                            <label class="editor-switch" aria-label="Activar sombra">
                              <input
                                class="editor-switch-input"
                                type="checkbox"
                                .checked=${this.selectedContainerItem.shadowEnabled}
                                @change=${this.handleSelectedContainerShadowToggle}
                              />
                              <span class="editor-switch-track"></span>
                            </label>
                          </div>
                          <p class="editor-help">
                            Activa una sombra editable para destacar el contenedor.
                          </p>
                        </div>

                        ${this.selectedContainerItem.shadowEnabled?n`
                              <div class="editor-row">
                                <p class="editor-label">Color de sombra</p>
                                ${this.renderColorDropdown(`container-shadow`,h,this.selectedContainerItem.shadowColor,e=>this.updateSelectedContainerItem({shadowColor:e}))}
                              </div>
                              <div class="editor-row">
                                <div class="editor-range-wrap">
                                  <div class="editor-range-head">
                                    <p class="editor-label">Sombra</p>
                                    <span class="editor-range-value">
                                      X ${this.selectedContainerItem.shadowX}px / Y
                                      ${this.selectedContainerItem.shadowY}px / Blur
                                      ${this.selectedContainerItem.shadowBlur}px
                                    </span>
                                  </div>
                                  <div class="editor-grid">
                                    <label class="editor-field">
                                      <span class="editor-field-label">Offset X</span>
                                      <input
                                        class="editor-input"
                                        type="number"
                                        min="-80"
                                        max="80"
                                        step="1"
                                        .value=${String(this.selectedContainerItem.shadowX)}
                                        @input=${this.handleSelectedContainerShadowXInput}
                                      />
                                    </label>
                                    <label class="editor-field">
                                      <span class="editor-field-label">Offset Y</span>
                                      <input
                                        class="editor-input"
                                        type="number"
                                        min="-80"
                                        max="80"
                                        step="1"
                                        .value=${String(this.selectedContainerItem.shadowY)}
                                        @input=${this.handleSelectedContainerShadowYInput}
                                      />
                                    </label>
                                    <label class="editor-field">
                                      <span class="editor-field-label">Blur</span>
                                      <input
                                        class="editor-input"
                                        type="number"
                                        min="0"
                                        max="120"
                                        step="1"
                                        .value=${String(this.selectedContainerItem.shadowBlur)}
                                        @input=${this.handleSelectedContainerShadowBlurInput}
                                      />
                                    </label>
                                    <label class="editor-field">
                                      <span class="editor-field-label">Spread</span>
                                      <input
                                        class="editor-input"
                                        type="number"
                                        min="-40"
                                        max="80"
                                        step="1"
                                        .value=${String(this.selectedContainerItem.shadowSpread)}
                                        @input=${this.handleSelectedContainerShadowSpreadInput}
                                      />
                                    </label>
                                    <label class="editor-field">
                                      <span class="editor-field-label">Opacity</span>
                                      <input
                                        class="editor-input"
                                        type="number"
                                        min="0"
                                        max="100"
                                        step="1"
                                        .value=${String(Math.round(this.selectedContainerItem.shadowOpacity*100))}
                                        @input=${this.handleSelectedContainerShadowOpacityInput}
                                      />
                                    </label>
                                  </div>
                                </div>
                              </div>
                            `:t}
                    </div>
                  </div>
                `:this.isCanvasEditing?n`
                    <div class="tool-group">
                      <h3 class="section-title">Lienzo</h3>
                      <div class="editor-stack">
                        <div class="editor-row">
                          <p class="editor-label">Nombre</p>
                          <input
                            class="editor-input"
                            type="text"
                            .value=${this.activeCanvas?.name??``}
                            placeholder=${this.getCanvasFallbackName(this.activeCanvasId)}
                            @input=${this.handleActiveCanvasNameInput}
                          />
                        </div>
                        <div class="editor-row">
                          <p class="editor-label">Fondo</p>
                          ${this.renderColorDropdown(`canvas`,_,this.canvasBackground,e=>{this.canvasBackground=e})}
                        </div>
                      </div>
                    </div>
                  `:n`
                <div class="tool-group components-group">
                  <h3 class="section-title">Componentes</h3>
                  <div class="component-tabs" role="tablist" aria-label="Tipos de componentes">
                    <button
                      class="component-tab"
                      type="button"
                      role="tab"
                      data-active=${String(this.componentTab===`atomos`)}
                      aria-selected=${String(this.componentTab===`atomos`)}
                      @click=${()=>this.setComponentTab(`atomos`)}
                    >
                      Atomos
                    </button>
                    <button
                      class="component-tab"
                      type="button"
                      role="tab"
                      data-active=${String(this.componentTab===`moleculas`)}
                      aria-selected=${String(this.componentTab===`moleculas`)}
                      @click=${()=>this.setComponentTab(`moleculas`)}
                    >
                      Moleculas
                    </button>
                  </div>
                  ${this.componentTab===`atomos`?n`
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover(`contenedor`)}
                          <tool-contenedor
                            .selected=${this.selectedToolPreview===`contenedor`}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-contenedor>
                        </div>
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover(`tipografia`)}
                          <tool-tipografia
                            .preset=${this.toolTypographyPreset}
                            .selected=${this.selectedToolPreview===`tipografia`}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                            @tool-preset-change=${this.handleToolPresetChange}
                          ></tool-tipografia>
                        </div>
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover(`input-text`)}
                          <tool-input-text
                            .selected=${this.selectedToolPreview===`input-text`}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-input-text>
                        </div>
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover(`image`)}
                          <tool-image
                            .selected=${this.selectedToolPreview===`image`}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-image>
                        </div>
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover(`main-button`)}
                          <tool-main-button
                            .selected=${this.selectedToolPreview===`main-button`}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-main-button>
                        </div>
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover(`secondary-button`)}
                          <tool-secondary-button
                            .selected=${this.selectedToolPreview===`secondary-button`}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-secondary-button>
                        </div>
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover(`opportunity-button`)}
                          <tool-opportunity-button
                            .selected=${this.selectedToolPreview===`opportunity-button`}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-opportunity-button>
                        </div>
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover(`icon-button`)}
                          <tool-icon-button
                            .selected=${this.selectedToolPreview===`icon-button`}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-icon-button>
                        </div>
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover(`icon`)}
                          <tool-icon
                            .selected=${this.selectedToolPreview===`icon`}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-icon>
                        </div>
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover(`logo`)}
                          <tool-logo
                            .selected=${this.selectedToolPreview===`logo`}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-logo>
                        </div>
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover(`micro-illustration`)}
                          <tool-micro-illustration
                            .selected=${this.selectedToolPreview===`micro-illustration`}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-micro-illustration>
                        </div>
                      `:n`
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover(`desktop-menu`)}
                          <tool-desktop-menu
                            .selected=${this.selectedToolPreview===`desktop-menu`}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-desktop-menu>
                        </div>
                        ${this.customMolecules.map(e=>this.renderCustomMoleculeTool(e))}
                      `}
                </div>
              `}
        </aside>

        <input
          class="image-upload-input"
          type="file"
          accept="image/*"
          hidden
          @change=${this.handleImageUploadChange}
        />

        ${this.isCreateComponentModalOpen?n`
              <div
                class="component-modal-backdrop"
                @click=${e=>{e.target===e.currentTarget&&this.closeCreateComponentModal()}}
              >
                <div class="component-modal">
                  <h3 class="component-modal-title">Crear componente</h3>
                  <div class="editor-row">
                    <p class="editor-label">Nombre del componente</p>
                    <input
                      class="editor-input"
                      type="text"
                      .value=${this.draftComponentName}
                      placeholder="ej. Hero principal"
                      @input=${this.handleDraftComponentNameInput}
                      @keydown=${this.handleDraftComponentNameKeyDown}
                    />
                    <p class="editor-help">
                      Guardaremos este contenedor con todo su contenido como una nueva molecula.
                    </p>
                  </div>
                  <div class="component-modal-actions">
                    <button
                      class="component-modal-button"
                      type="button"
                      @click=${this.closeCreateComponentModal}
                    >
                      Cancelar
                    </button>
                    <button
                      class="component-modal-button"
                      type="button"
                      data-primary="true"
                      ?disabled=${this.draftComponentName.trim().length===0}
                      @click=${this.handleCreateComponentFromSelection}
                    >
                      Guardar componente
                    </button>
                  </div>
                </div>
              </div>
            `:null}
      </div>
    `}};o([a()],y.prototype,`viewport`,void 0),o([a()],y.prototype,`isViewportTransitioning`,void 0),o([a()],y.prototype,`isCanvasDragActive`,void 0),o([a()],y.prototype,`activeDraggedTool`,void 0),o([a()],y.prototype,`toolTypographyPreset`,void 0),o([a()],y.prototype,`selectedToolPreview`,void 0),o([a()],y.prototype,`componentTab`,void 0),o([a()],y.prototype,`customMolecules`,void 0),o([a()],y.prototype,`isCreateComponentModalOpen`,void 0),o([a()],y.prototype,`draftComponentName`,void 0),o([a()],y.prototype,`typographyItems`,void 0),o([a()],y.prototype,`buttonItems`,void 0),o([a()],y.prototype,`inputTextItems`,void 0),o([a()],y.prototype,`iconItems`,void 0),o([a()],y.prototype,`desktopMenuItems`,void 0),o([a()],y.prototype,`logoItems`,void 0),o([a()],y.prototype,`microIllustrationItems`,void 0),o([a()],y.prototype,`imageItems`,void 0),o([a()],y.prototype,`containerItems`,void 0),o([a()],y.prototype,`selectedTypographyId`,void 0),o([a()],y.prototype,`editingTypographyId`,void 0),o([a()],y.prototype,`editingButtonId`,void 0),o([a()],y.prototype,`editingIconId`,void 0),o([a()],y.prototype,`editingLogoId`,void 0),o([a()],y.prototype,`editingMicroIllustrationId`,void 0),o([a()],y.prototype,`editingImageId`,void 0),o([a()],y.prototype,`editingContainerId`,void 0),o([a()],y.prototype,`isEditingSelectedContainerName`,void 0),o([a()],y.prototype,`isCanvasEditing`,void 0),o([a()],y.prototype,`canvasBackground`,void 0),o([a()],y.prototype,`isCodeView`,void 0),o([a()],y.prototype,`isPrototypeMode`,void 0),o([a()],y.prototype,`openColorDropdown`,void 0),o([a()],y.prototype,`canvases`,void 0),o([a()],y.prototype,`activeCanvasId`,void 0),o([a()],y.prototype,`isCanvasMenuOpen`,void 0),o([a()],y.prototype,`isToolsDrawerMode`,void 0),o([a()],y.prototype,`isToolsDrawerOpen`,void 0),y=o([i(`home-screen`)],y);