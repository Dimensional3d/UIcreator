import { LitElement, css, html, nothing, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import {
  TYPOGRAPHY_PRESET_OPTIONS,
  type TypographyAlign,
  type TypographyPreset,
} from '../components/canvas-tipografia';
import '../components/canvas-contenedor';
import '../components/canvas-desktop-menu';
import '../components/canvas-icon';
import '../components/canvas-icon-button';
import '../components/canvas-input-text';
import '../components/canvas-logo';
import '../components/canvas-main-button';
import '../components/canvas-micro-illustration';
import '../components/canvas-opportunity-button';
import '../components/canvas-secondary-button';
import '../components/canvas-tipografia';
import '../components/tool-contenedor';
import '../components/tool-desktop-menu';
import '../components/tool-icon';
import '../components/tool-icon-button';
import '../components/tool-input-text';
import '../components/tool-logo';
import '../components/tool-main-button';
import '../components/tool-micro-illustration';
import '../components/tool-opportunity-button';
import '../components/tool-secondary-button';
import '../components/tool-tipografia';
import { ICON_OPTIONS, type IconName } from '../components/icon-library';
import {
  MICRO_ILLUSTRATION_OPTIONS,
  type MicroIllustrationName,
} from '../components/micro-illustration-library';

type CanvasTypographyItem = {
  id: string;
  parentId: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  order: number;
  preset: TypographyPreset;
  align: TypographyAlign;
  bold: boolean;
  italic: boolean;
  color: string;
  fontSize: number;
  text: string;
};

type CanvasButtonItem = {
  id: string;
  parentId: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  order: number;
  variant: 'main' | 'secondary' | 'opportunity' | 'icon-button';
  label: string;
  action: string;
  fontSize: number;
  icon?: IconName;
  backgroundVisible?: boolean;
};

type CanvasInputTextItem = {
  id: string;
  parentId: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  order: number;
  label: string;
  value: string;
  icon: IconName;
  status: 'active' | 'inactive';
};

type CanvasIconItem = {
  id: string;
  parentId: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  order: number;
  icon: IconName;
  color: string;
};

type CanvasDesktopMenuItem = {
  id: string;
  parentId: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  order: number;
};

type CanvasLogoItem = {
  id: string;
  parentId: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  order: number;
};

type CanvasMicroIllustrationItem = {
  id: string;
  parentId: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  order: number;
  illustration: MicroIllustrationName;
};

type CanvasContainerItem = {
  id: string;
  parentId: string | null;
  name: string;
  y: number;
  height: number;
  autoWidth: number;
  autoHeight: number;
  widthMode: 'manual' | 'auto';
  heightMode: 'manual' | 'auto';
  order: number;
  background: string;
  borderRadius: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  scrollEnabled: boolean;
  shadowEnabled: boolean;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  shadowSpread: number;
  shadowOpacity: number;
  shadowColor: string;
  desktopStart: number;
  desktopSpan: number;
  mobileStart: number;
  mobileSpan: number;
};

type CanvasLeafEntry =
  | { kind: 'typography'; item: CanvasTypographyItem }
  | { kind: 'button'; item: CanvasButtonItem }
  | { kind: 'input-text'; item: CanvasInputTextItem }
  | { kind: 'icon'; item: CanvasIconItem }
  | { kind: 'desktop-menu'; item: CanvasDesktopMenuItem }
  | { kind: 'logo'; item: CanvasLogoItem }
  | { kind: 'micro-illustration'; item: CanvasMicroIllustrationItem };

type CanvasEntry = CanvasLeafEntry | { kind: 'container'; item: CanvasContainerItem };
type ColorOption = { value: string; label: string };
type ToolPreview =
  | 'tipografia'
  | 'main-button'
  | 'input-text'
  | 'secondary-button'
  | 'opportunity-button'
  | 'icon-button'
  | 'icon'
  | 'desktop-menu'
  | 'logo'
  | 'micro-illustration'
  | 'contenedor'
  | `custom-molecule:${string}`
  | null;
type ComponentTab = 'atomos' | 'moleculas';
type ColorDropdownKey =
  | 'text'
  | 'container'
  | 'container-shadow'
  | 'canvas'
  | 'icon'
  | 'icon-color'
  | 'micro-illustration'
  | null;
type CanvasTab = { id: string; name: string };
type ContainerResizeHandle = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
type ButtonActionType = 'none' | 'link';
type InlineTypographyFormat = 'bold' | 'italic';

const BUTTON_HEIGHT_OPTIONS = [55, 32] as const;
const CONTAINER_STACK_GAP = 16;
const WHITE_COLOR_VALUE = 'var(--color-surface)';
const LEGACY_WHITE_ALIAS = 'var(--color-text-inverse)';
const CONTAINER_DEFAULT_SHADOW = {
  shadowEnabled: false,
  shadowX: 0,
  shadowY: 12,
  shadowBlur: 32,
  shadowSpread: 0,
  shadowOpacity: 0.18,
  shadowColor: 'var(--color-bg)',
} as const;

const COLOR_TOKEN_OPTIONS: ColorOption[] = [
  { value: WHITE_COLOR_VALUE, label: 'White' },
  { value: 'var(--color-surface-soft)', label: 'Surface Soft' },
  { value: 'var(--color-primary-soft)', label: 'Primary Soft' },
  { value: 'var(--color-surface-warm)', label: 'Surface Warm' },
  { value: 'var(--color-surface-accent)', label: 'Surface Accent' },
  { value: 'var(--color-highlight)', label: 'Highlight' },
  { value: 'var(--color-text-muted)', label: 'Text Muted' },
  { value: 'var(--color-primary)', label: 'Primary' },
  { value: 'var(--color-text-soft)', label: 'Text Soft' },
  { value: 'var(--color-link)', label: 'Link' },
  { value: 'var(--color-primary-strong)', label: 'Primary Strong' },
  { value: 'var(--color-text)', label: 'Text' },
  { value: 'var(--color-bg)', label: 'Background' },
  { value: 'var(--color-bg-strong)', label: 'Background Strong' },
  { value: 'var(--color-text-strong)', label: 'Text Strong' },
] as const;

const CONTAINER_BACKGROUND_OPTIONS: ColorOption[] = [
  { value: 'transparent', label: 'Transparente' },
  ...COLOR_TOKEN_OPTIONS,
] as const;

const CANVAS_BACKGROUND_OPTIONS = COLOR_TOKEN_OPTIONS;
const TEXT_COLOR_OPTIONS = COLOR_TOKEN_OPTIONS;

type CanvasItemDragState = {
  id: string;
  parentId: string | null;
  mode: 'move' | 'resize';
  offsetX: number;
  offsetY: number;
  canvasWidth: number;
  canvasHeight: number;
  itemWidth: number;
  itemHeight: number;
  resizeHandle?: ContainerResizeHandle;
  originClientX?: number;
  originClientY?: number;
  originY?: number;
  originHeight?: number;
  originDesktopStart?: number;
  originDesktopSpan?: number;
  originMobileStart?: number;
  originMobileSpan?: number;
};

type CanvasScene = {
  canvasBackground: string;
  typographyItems: CanvasTypographyItem[];
  buttonItems: CanvasButtonItem[];
  inputTextItems: CanvasInputTextItem[];
  iconItems: CanvasIconItem[];
  desktopMenuItems: CanvasDesktopMenuItem[];
  logoItems: CanvasLogoItem[];
  microIllustrationItems: CanvasMicroIllustrationItem[];
  containerItems: CanvasContainerItem[];
  nextTypographyId: number;
  nextButtonId: number;
  nextInputTextId: number;
  nextIconId: number;
  nextDesktopMenuId: number;
  nextLogoId: number;
  nextMicroIllustrationId: number;
  nextContainerId: number;
  nextCanvasOrder: number;
};

type CustomMolecule = {
  id: string;
  name: string;
  scene: CanvasScene;
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
  private selectedToolPreview: ToolPreview = null;

  @state()
  private componentTab: ComponentTab = 'atomos';

  @state()
  private customMolecules: CustomMolecule[] = [];

  @state()
  private isCreateComponentModalOpen = false;

  @state()
  private draftComponentName = '';

  @state()
  private typographyItems: CanvasTypographyItem[] = [];

  @state()
  private buttonItems: CanvasButtonItem[] = [];

  @state()
  private inputTextItems: CanvasInputTextItem[] = [];

  @state()
  private iconItems: CanvasIconItem[] = [];

  @state()
  private desktopMenuItems: CanvasDesktopMenuItem[] = [];

  @state()
  private logoItems: CanvasLogoItem[] = [];

  @state()
  private microIllustrationItems: CanvasMicroIllustrationItem[] = [];

  @state()
  private containerItems: CanvasContainerItem[] = [];

  @state()
  private selectedTypographyId: string | null = null;

  @state()
  private editingTypographyId: string | null = null;

  @state()
  private editingButtonId: string | null = null;

  @state()
  private editingIconId: string | null = null;

  @state()
  private editingLogoId: string | null = null;

  @state()
  private editingMicroIllustrationId: string | null = null;

  @state()
  private editingContainerId: string | null = null;

  @state()
  private isEditingSelectedContainerName = false;

  @state()
  private isCanvasEditing = false;

  @state()
  private canvasBackground = 'var(--color-surface)';

  @state()
  private isCodeView = false;

  @state()
  private isPrototypeMode = false;

  @state()
  private openColorDropdown: ColorDropdownKey = null;

  @state()
  private canvases: CanvasTab[] = [{ id: 'canvas-1', name: 'Lienzo 1' }];

  @state()
  private activeCanvasId = 'canvas-1';

  @state()
  private isCanvasMenuOpen = false;

  @state()
  private isToolsDrawerMode = false;

  @state()
  private isToolsDrawerOpen = false;

  private viewportAnimationTimeout?: number;
  private toolPreviewTimeout?: number;
  private autoContainerSizeFrame?: number;
  private canvasViewportSyncFrame?: number;
  private nextCustomMoleculeId = 1;
  private nextTypographyId = 1;
  private nextButtonId = 1;
  private nextInputTextId = 1;
  private nextIconId = 1;
  private nextDesktopMenuId = 1;
  private nextLogoId = 1;
  private nextMicroIllustrationId = 1;
  private nextContainerId = 1;
  private nextCanvasOrder = 1;
  private dragState: CanvasItemDragState | null = null;
  private resizeObserver?: ResizeObserver;
  private readonly colorValueCache = new Map<string, string>();
  private readonly canvasScenes = new Map<string, CanvasScene>();
  private readonly toolsDrawerBreakpoint = 1360;

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
      min-width: 240px;
      min-height: 32px;
      cursor: grab;
    }

    .canvas-item[data-kind='button'][data-button-variant='icon-button'] {
      min-width: 34px;
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
    }

    .container-hover-tint {
      position: absolute;
      inset: 0;
      background: rgba(19, 30, 68, 0.1);
      opacity: 0;
      pointer-events: none;
      transition: opacity 140ms ease;
    }

    .canvas-item[data-kind='container']:hover .container-hover-tint {
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
      pointer-events: auto;
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
  `;

  disconnectedCallback() {
    window.clearTimeout(this.viewportAnimationTimeout);
    window.clearTimeout(this.toolPreviewTimeout);
    window.cancelAnimationFrame(this.autoContainerSizeFrame ?? 0);
    window.cancelAnimationFrame(this.canvasViewportSyncFrame ?? 0);
    window.removeEventListener('keydown', this.handleWindowKeyDown);
    window.removeEventListener('resize', this.syncToolsDrawerMode);
    window.removeEventListener('scroll', this.handleWindowScroll, { capture: false });
    window.removeEventListener('pointermove', this.handleWindowPointerMove);
    window.removeEventListener('pointerup', this.handleWindowPointerUp);
    window.removeEventListener('pointerdown', this.handleWindowPointerDown);
    this.resizeObserver?.disconnect();
    super.disconnectedCallback();
  }

  protected firstUpdated() {
    window.addEventListener('keydown', this.handleWindowKeyDown);
    window.addEventListener('pointerdown', this.handleWindowPointerDown);
    window.addEventListener('resize', this.syncToolsDrawerMode);
    window.addEventListener('scroll', this.handleWindowScroll, { passive: true });
    this.syncToolsDrawerMode();
    this.queueCanvasViewportSync();
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

      let didTypographyChange = false;
      const nextTypographyItems = this.typographyItems.map((item) => {
        const nextSize = updates.get(item.id);
        if (!nextSize) {
          return item;
        }

        if (item.width === nextSize.width && item.height === nextSize.height) {
          return item;
        }

        didTypographyChange = true;
        return { ...item, width: nextSize.width, height: nextSize.height };
      });

      let didButtonChange = false;
      const nextButtonItems = this.buttonItems.map((item) => {
        const nextSize = updates.get(item.id);
        if (!nextSize) {
          return item;
        }

        if (item.width === nextSize.width && item.height === nextSize.height) {
          return item;
        }

        didButtonChange = true;
        return { ...item, width: nextSize.width, height: nextSize.height };
      });

      let didInputTextChange = false;
      const nextInputTextItems = this.inputTextItems.map((item) => {
        const nextSize = updates.get(item.id);
        if (!nextSize) {
          return item;
        }

        if (item.width === nextSize.width && item.height === nextSize.height) {
          return item;
        }

        didInputTextChange = true;
        return { ...item, width: nextSize.width, height: item.height };
      });

      let didIconChange = false;
      const nextIconItems = this.iconItems.map((item) => {
        const nextSize = updates.get(item.id);
        if (!nextSize) {
          return item;
        }

        if (item.width === nextSize.width && item.height === nextSize.height) {
          return item;
        }

        didIconChange = true;
        return { ...item, width: nextSize.width, height: nextSize.height };
      });

      let didDesktopMenuChange = false;
      const nextDesktopMenuItems = this.desktopMenuItems.map((item) => {
        const nextSize = updates.get(item.id);
        if (!nextSize) {
          return item;
        }

        if (item.width === nextSize.width && item.height === nextSize.height) {
          return item;
        }

        didDesktopMenuChange = true;
        return { ...item, width: nextSize.width, height: nextSize.height };
      });

      let didLogoChange = false;
      const nextLogoItems = this.logoItems.map((item) => {
        const nextSize = updates.get(item.id);
        if (!nextSize) {
          return item;
        }

        if (item.width === nextSize.width && item.height === nextSize.height) {
          return item;
        }

        didLogoChange = true;
        return { ...item, width: nextSize.width, height: nextSize.height };
      });

      let didMicroIllustrationChange = false;
      const nextMicroIllustrationItems = this.microIllustrationItems.map((item) => {
        const nextSize = updates.get(item.id);
        if (!nextSize) {
          return item;
        }

        if (item.width === nextSize.width && item.height === nextSize.height) {
          return item;
        }

        didMicroIllustrationChange = true;
        return { ...item, width: nextSize.width, height: nextSize.height };
      });

      if (didTypographyChange) {
        this.typographyItems = nextTypographyItems;
      }

      if (didButtonChange) {
        this.buttonItems = nextButtonItems;
      }

      if (didInputTextChange) {
        this.inputTextItems = nextInputTextItems;
      }

      if (didIconChange) {
        this.iconItems = nextIconItems;
      }

      if (didDesktopMenuChange) {
        this.desktopMenuItems = nextDesktopMenuItems;
      }

      if (didLogoChange) {
        this.logoItems = nextLogoItems;
      }

      if (didMicroIllustrationChange) {
        this.microIllustrationItems = nextMicroIllustrationItems;
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

    window.cancelAnimationFrame(this.autoContainerSizeFrame ?? 0);
    this.autoContainerSizeFrame = window.requestAnimationFrame(() => {
      this.syncAutoContainerSizes();
    });
  }

  private cloneCanvasScene(scene: CanvasScene): CanvasScene {
    return {
      canvasBackground: scene.canvasBackground,
      typographyItems: scene.typographyItems.map((item) => ({ ...item })),
      buttonItems: scene.buttonItems.map((item) => ({ ...item })),
      inputTextItems: scene.inputTextItems.map((item) => ({ ...item })),
      iconItems: scene.iconItems.map((item) => ({ ...item })),
      desktopMenuItems: scene.desktopMenuItems.map((item) => ({ ...item })),
      logoItems: scene.logoItems.map((item) => ({ ...item })),
      microIllustrationItems: scene.microIllustrationItems.map((item) => ({ ...item })),
      containerItems: scene.containerItems.map((item) => ({ ...item })),
      nextTypographyId: scene.nextTypographyId,
      nextButtonId: scene.nextButtonId,
      nextInputTextId: scene.nextInputTextId,
      nextIconId: scene.nextIconId,
      nextDesktopMenuId: scene.nextDesktopMenuId,
      nextLogoId: scene.nextLogoId,
      nextMicroIllustrationId: scene.nextMicroIllustrationId,
      nextContainerId: scene.nextContainerId,
      nextCanvasOrder: scene.nextCanvasOrder,
    };
  }

  private createEmptyCanvasScene(): CanvasScene {
    return {
      canvasBackground: 'var(--color-surface)',
      typographyItems: [],
      buttonItems: [],
      inputTextItems: [],
      iconItems: [],
      desktopMenuItems: [],
      logoItems: [],
      microIllustrationItems: [],
      containerItems: [],
      nextTypographyId: 1,
      nextButtonId: 1,
      nextInputTextId: 1,
      nextIconId: 1,
      nextDesktopMenuId: 1,
      nextLogoId: 1,
      nextMicroIllustrationId: 1,
      nextContainerId: 1,
      nextCanvasOrder: 1,
    };
  }

  private getActiveCanvasScene(): CanvasScene {
    return {
      canvasBackground: this.canvasBackground,
      typographyItems: this.typographyItems,
      buttonItems: this.buttonItems,
      inputTextItems: this.inputTextItems,
      iconItems: this.iconItems,
      desktopMenuItems: this.desktopMenuItems,
      logoItems: this.logoItems,
      microIllustrationItems: this.microIllustrationItems,
      containerItems: this.containerItems,
      nextTypographyId: this.nextTypographyId,
      nextButtonId: this.nextButtonId,
      nextInputTextId: this.nextInputTextId,
      nextIconId: this.nextIconId,
      nextDesktopMenuId: this.nextDesktopMenuId,
      nextLogoId: this.nextLogoId,
      nextMicroIllustrationId: this.nextMicroIllustrationId,
      nextContainerId: this.nextContainerId,
      nextCanvasOrder: this.nextCanvasOrder,
    };
  }

  private getCanvasScene(canvasId: string) {
    return canvasId === this.activeCanvasId
      ? this.getActiveCanvasScene()
      : (this.canvasScenes.get(canvasId) ?? this.createEmptyCanvasScene());
  }

  private saveActiveCanvasScene() {
    this.canvasScenes.set(this.activeCanvasId, this.cloneCanvasScene(this.getActiveCanvasScene()));
  }

  private setActiveCanvasState(canvasId: string, editing: boolean) {
    const nextScene = this.canvasScenes.get(canvasId) ?? this.createEmptyCanvasScene();
    this.activeCanvasId = canvasId;
    this.loadCanvasScene(nextScene);
    this.isCanvasEditing = editing;

    if (editing) {
      this.openToolsDrawerIfNeeded();
    }
  }

  private activateCanvas(canvasId: string, editing: boolean) {
    this.isCanvasMenuOpen = false;

    if (canvasId === this.activeCanvasId) {
      if (editing) {
        this.enterCanvasEditing();
      } else {
        this.handleWindowPointerUp();
        this.clearActiveEditingState();
      }
      this.scrollCanvasIntoView(canvasId);
      return;
    }

    this.saveActiveCanvasScene();
    this.setActiveCanvasState(canvasId, editing);
    this.scrollCanvasIntoView(canvasId);
  }

  private syncActiveCanvasToViewport() {
    const canvasElements = Array.from(
      this.renderRoot.querySelectorAll<HTMLElement>('[data-canvas-surface-id]'),
    );

    if (canvasElements.length === 0) {
      return;
    }

    const viewportTop = 96;
    const viewportBottom = window.innerHeight - 32;
    let nextCanvasId: string | null = null;
    let highestVisibleArea = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    for (const element of canvasElements) {
      const rect = element.getBoundingClientRect();
      const visibleTop = Math.max(rect.top, viewportTop);
      const visibleBottom = Math.min(rect.bottom, viewportBottom);
      const visibleArea = Math.max(0, visibleBottom - visibleTop);
      const canvasId = element.dataset.canvasSurfaceId;

      if (!canvasId) {
        continue;
      }

      const distanceToViewportTop = Math.abs(rect.top - viewportTop);

      if (
        visibleArea > highestVisibleArea ||
        (visibleArea === highestVisibleArea && distanceToViewportTop < closestDistance)
      ) {
        highestVisibleArea = visibleArea;
        closestDistance = distanceToViewportTop;
        nextCanvasId = canvasId;
      }
    }

    if (!nextCanvasId || nextCanvasId === this.activeCanvasId) {
      return;
    }

    this.saveActiveCanvasScene();
    this.setActiveCanvasState(nextCanvasId, !this.isPrototypeMode);
  }

  private queueCanvasViewportSync() {
    window.cancelAnimationFrame(this.canvasViewportSyncFrame ?? 0);
    this.canvasViewportSyncFrame = window.requestAnimationFrame(() => {
      this.syncActiveCanvasToViewport();
    });
  }

  private get activeCanvas() {
    return this.canvases.find((canvas) => canvas.id === this.activeCanvasId) ?? this.canvases[0] ?? null;
  }

  private getCanvasFallbackName(canvasId: string) {
    const index = this.canvases.findIndex((canvas) => canvas.id === canvasId);
    return index >= 0 ? `Lienzo ${index + 1}` : 'Lienzo';
  }

  private scrollCanvasIntoView(canvasId: string) {
    window.requestAnimationFrame(() => {
      const element = this.renderRoot.querySelector<HTMLElement>(
        `[data-canvas-surface-id="${canvasId}"]`,
      );
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  private enterCanvasEditing() {
    this.handleWindowPointerUp();
    this.clearActiveEditingState();
    this.isCanvasEditing = true;
    this.openToolsDrawerIfNeeded();
  }

  private loadCanvasScene(scene: CanvasScene) {
    const nextScene = this.cloneCanvasScene(scene);

    this.handleWindowPointerUp();
    this.activeDraggedTool = null;
    this.isCanvasDragActive = false;
    this.selectedToolPreview = null;
    this.clearActiveEditingState();

    this.canvasBackground = nextScene.canvasBackground;
    this.typographyItems = nextScene.typographyItems;
    this.buttonItems = nextScene.buttonItems;
    this.inputTextItems = nextScene.inputTextItems;
    this.iconItems = nextScene.iconItems;
    this.desktopMenuItems = nextScene.desktopMenuItems;
    this.logoItems = nextScene.logoItems;
    this.microIllustrationItems = nextScene.microIllustrationItems;
    this.containerItems = nextScene.containerItems;
    this.nextTypographyId = nextScene.nextTypographyId;
    this.nextButtonId = nextScene.nextButtonId;
    this.nextInputTextId = nextScene.nextInputTextId;
    this.nextIconId = nextScene.nextIconId;
    this.nextDesktopMenuId = nextScene.nextDesktopMenuId;
    this.nextLogoId = nextScene.nextLogoId;
    this.nextMicroIllustrationId = nextScene.nextMicroIllustrationId;
    this.nextContainerId = nextScene.nextContainerId;
    this.nextCanvasOrder = nextScene.nextCanvasOrder;
  }

  private handleCreateCanvas() {
    this.saveActiveCanvasScene();
    const nextIndex = this.canvases.length + 1;
    const nextCanvas: CanvasTab = {
      id: `canvas-${nextIndex}`,
      name: `Lienzo ${nextIndex}`,
    };
    const nextScene = this.createEmptyCanvasScene();

    this.canvasScenes.set(nextCanvas.id, this.cloneCanvasScene(nextScene));
    this.canvases = [...this.canvases, nextCanvas];
    this.activeCanvasId = nextCanvas.id;
    this.loadCanvasScene(nextScene);
    this.isCanvasMenuOpen = false;
    this.isCanvasEditing = !this.isPrototypeMode;
    if (!this.isPrototypeMode) {
      this.openToolsDrawerIfNeeded();
    }
    this.scrollCanvasIntoView(nextCanvas.id);
  }

  private handleSelectCanvas(canvasId: string) {
    this.activateCanvas(canvasId, !this.isPrototypeMode);
  }

  private getDefaultFontSize(preset: TypographyPreset) {
    return preset === 'tiempos-headline' ? 42 : 32;
  }

  private getDefaultTypographyHeight(preset: TypographyPreset) {
    return Math.max(1, Math.ceil(this.getDefaultFontSize(preset) * 1.1));
  }

  private getGridColumns(viewport = this.viewport) {
    return viewport === 'mobile' ? 4 : 12;
  }

  private clampContainerStart(start: number, span: number, columns: number) {
    return Math.max(1, Math.min(columns - span + 1, start));
  }

  private getContainerPercentage(span: number, columns: number) {
    return Math.round((span / columns) * 100);
  }

  private getCanvasReferenceWidth(viewport = this.viewport) {
    const host = this.getCanvasHostElement();
    if (host) {
      return host.getBoundingClientRect().width;
    }

    return viewport === 'mobile' ? 430 : 1120;
  }

  private getContainerLeftPercent(start: number, columns: number) {
    return ((start - 1) / columns) * 100;
  }

  private getContainerWidthPercent(span: number, columns: number) {
    return (span / columns) * 100;
  }

  private getContainerRenderedWidth(item: CanvasContainerItem, viewport = this.viewport) {
    if (item.widthMode === 'auto' && item.autoWidth > 0) {
      return item.autoWidth;
    }

    const columns = this.getGridColumns(viewport);
    const span = viewport === 'mobile' ? item.mobileSpan : item.desktopSpan;
    return (this.getCanvasReferenceWidth(viewport) * this.getContainerWidthPercent(span, columns)) / 100;
  }

  private getContainerRenderedHeight(item: CanvasContainerItem) {
    if (item.heightMode === 'auto' && item.autoHeight > 0) {
      return item.autoHeight;
    }

    return item.height;
  }

  private getContainerWidthInputValue(item: CanvasContainerItem) {
    return Math.round(this.getContainerRenderedWidth(item));
  }

  private getContainerHeightInputValue(item: CanvasContainerItem) {
    return Math.round(this.getContainerRenderedHeight(item));
  }

  private syncAutoContainerSizes() {
    let didChange = false;
    const nextContainerItems = this.containerItems.map((item) => {
      if (item.widthMode !== 'auto' && item.heightMode !== 'auto') {
        return item;
      }

      const content = this.getContainerContentElement(item.id);
      if (!content) {
        return item;
      }

      const nextAutoWidth =
        item.widthMode === 'auto'
          ? Math.max(32, Math.ceil(content.scrollWidth + item.paddingLeft + item.paddingRight))
          : item.autoWidth;
      const nextAutoHeight =
        item.heightMode === 'auto'
          ? Math.max(1, Math.ceil(content.scrollHeight + item.paddingTop + item.paddingBottom))
          : item.autoHeight;

      if (nextAutoWidth === item.autoWidth && nextAutoHeight === item.autoHeight) {
        return item;
      }

      didChange = true;
      return {
        ...item,
        autoWidth: nextAutoWidth,
        autoHeight: nextAutoHeight,
      };
    });

    if (didChange) {
      this.containerItems = nextContainerItems;
    }
  }

  private getContainerStartFromX(left: number, canvasWidth: number, columns: number, span: number) {
    const columnWidth = canvasWidth / columns;
    const rawStart = Math.round(left / columnWidth) + 1;
    return this.clampContainerStart(rawStart, span, columns);
  }

  private getContainerViewportPlacement(
    item: CanvasContainerItem,
    viewport = this.viewport,
  ) {
    const start = viewport === 'mobile' ? item.mobileStart : item.desktopStart;
    const span = viewport === 'mobile' ? item.mobileSpan : item.desktopSpan;

    return {
      start,
      end: start + span - 1,
      top: item.y,
      bottom: item.y + this.getContainerRenderedHeight(item),
    };
  }

  private containersOverlap(
    first: CanvasContainerItem,
    second: CanvasContainerItem,
    viewport = this.viewport,
  ) {
    const firstPlacement = this.getContainerViewportPlacement(first, viewport);
    const secondPlacement = this.getContainerViewportPlacement(second, viewport);
    const overlapsHorizontally =
      firstPlacement.start <= secondPlacement.end && firstPlacement.end >= secondPlacement.start;
    const overlapsVertically =
      firstPlacement.top < secondPlacement.bottom && firstPlacement.bottom > secondPlacement.top;

    return overlapsHorizontally && overlapsVertically;
  }

  private resolveContainerCollision(
    item: CanvasContainerItem,
    items = this.containerItems,
    viewport = this.viewport,
  ) {
    const others = items
      .filter((candidate) => candidate.id !== item.id && candidate.parentId === item.parentId)
      .sort((left, right) => left.y - right.y);

    let nextItem = { ...item, y: Math.max(0, item.y) };
    let didMove = true;
    let safetyCounter = 0;

    while (didMove && safetyCounter <= others.length) {
      didMove = false;
      safetyCounter += 1;

      for (const other of others) {
        if (!this.containersOverlap(nextItem, other, viewport)) {
          continue;
        }

        nextItem = {
          ...nextItem,
          y: other.y + other.height + CONTAINER_STACK_GAP,
        };
        didMove = true;
      }
    }

    return nextItem;
  }

  private createTypographyItem(x: number, y: number, parentId: string | null = null) {
    const width = this.viewport === 'mobile' ? 208 : 240;
    const height = this.getDefaultTypographyHeight(this.toolTypographyPreset);
    this.typographyItems = [
      ...this.typographyItems,
      {
        id: `typo-${this.nextTypographyId++}`,
        parentId,
        x,
        y,
        width,
        height,
        order: this.nextCanvasOrder++,
        preset: this.toolTypographyPreset,
        align: 'left',
        bold: false,
        italic: false,
        color: 'var(--color-text)',
        fontSize: this.getDefaultFontSize(this.toolTypographyPreset),
        text: 'Texto de ejemplo',
      },
    ];
  }

  private createButtonItem(
    variant: 'main' | 'secondary' | 'opportunity' | 'icon-button',
    x: number,
    y: number,
    parentId: string | null = null,
  ) {
    const width = variant === 'icon-button' ? 34 : this.viewport === 'mobile' ? 248 : 304;
    const height = variant === 'icon-button' ? 34 : 55;
    this.buttonItems = [
      ...this.buttonItems,
      {
        id: `button-${this.nextButtonId++}`,
        parentId,
        x,
        y,
        width,
        height,
        order: this.nextCanvasOrder++,
        variant,
        label: variant === 'icon-button' ? '' : 'Conoce más',
        action: '',
        fontSize: 22,
        icon: variant === 'icon-button' ? 'search' : undefined,
        backgroundVisible: variant === 'icon-button' ? true : undefined,
      },
    ];
  }

  private createInputTextItem(x: number, y: number, parentId: string | null = null) {
    this.inputTextItems = [
      ...this.inputTextItems,
      {
        id: `input-${this.nextInputTextId++}`,
        parentId,
        x,
        y,
        width: 320,
        height: 56,
        order: this.nextCanvasOrder++,
        label: 'Número de Tarjeta',
        value: '',
        icon: 'eye-off',
        status: 'inactive',
      },
    ];
  }

  private createIconItem(x: number, y: number, parentId: string | null = null) {
    const size = 40;
    this.iconItems = [
      ...this.iconItems,
      {
        id: `icon-${this.nextIconId++}`,
        parentId,
        x,
        y,
        width: size,
        height: size,
        order: this.nextCanvasOrder++,
        icon: ICON_OPTIONS[0].value,
        color: 'var(--color-primary-strong)',
      },
    ];
  }

  private createDesktopMenuItem(
    y: number,
    parentId: string | null = null,
    availableWidth = this.viewport === 'mobile' ? 430 : 1120,
    desktopStart = 1,
    mobileStart = 1,
  ) {
    const scale = Math.max(0.72, Math.min(1, availableWidth / 1040));
    const size = (value: number, min = 1) => Math.max(min, Math.round(value * scale));
    const containerItem = this.resolveContainerCollision({
      id: `container-${this.nextContainerId++}`,
      parentId,
      name: 'Desktop Menu',
      y,
      height: size(118, 96),
      autoWidth: 0,
      autoHeight: 0,
      widthMode: 'manual',
      heightMode: 'manual',
      order: this.nextCanvasOrder++,
      background: 'var(--color-surface)',
      borderRadius: size(28),
      paddingTop: size(16),
      paddingRight: size(18),
      paddingBottom: size(16),
      paddingLeft: size(18),
      scrollEnabled: false,
      shadowEnabled: true,
      shadowX: 0,
      shadowY: size(16, 10),
      shadowBlur: size(36, 20),
      shadowSpread: 0,
      shadowOpacity: 0.12,
      shadowColor: 'var(--color-bg)',
      desktopStart: this.clampContainerStart(desktopStart, 12, 12),
      desktopSpan: 12,
      mobileStart: this.clampContainerStart(mobileStart, 4, 4),
      mobileSpan: 4,
    });

    this.containerItems = [...this.containerItems, containerItem];

    const nextParentId = containerItem.id;
    this.logoItems = [
      ...this.logoItems,
      {
        id: `logo-${this.nextLogoId++}`,
        parentId: nextParentId,
        x: size(12),
        y: size(14),
        width: size(118),
        height: size(36, 24),
        order: this.nextCanvasOrder++,
      },
    ];

    this.typographyItems = [
      ...this.typographyItems,
      {
        id: `typo-${this.nextTypographyId++}`,
        parentId: nextParentId,
        x: size(170),
        y: size(28),
        width: size(92),
        height: size(24, 18),
        order: this.nextCanvasOrder++,
        preset: 'benton-medium',
        align: 'left',
        bold: true,
        italic: false,
        color: 'var(--color-primary-strong)',
        fontSize: size(16, 12),
        text: 'Personas',
      },
      {
        id: `typo-${this.nextTypographyId++}`,
        parentId: nextParentId,
        x: size(286),
        y: size(28),
        width: size(184),
        height: size(24, 18),
        order: this.nextCanvasOrder++,
        preset: 'benton-medium',
        align: 'left',
        bold: false,
        italic: false,
        color: 'var(--color-primary-strong)',
        fontSize: size(16, 12),
        text: 'Empresas y Gobierno',
      },
      {
        id: `typo-${this.nextTypographyId++}`,
        parentId: nextParentId,
        x: size(494),
        y: size(28),
        width: size(54),
        height: size(24, 18),
        order: this.nextCanvasOrder++,
        preset: 'benton-medium',
        align: 'left',
        bold: false,
        italic: false,
        color: 'var(--color-primary-strong)',
        fontSize: size(16, 12),
        text: 'Pyme',
      },
      {
        id: `typo-${this.nextTypographyId++}`,
        parentId: nextParentId,
        x: size(978),
        y: size(28),
        width: size(48),
        height: size(24, 18),
        order: this.nextCanvasOrder++,
        preset: 'benton-medium',
        align: 'left',
        bold: false,
        italic: false,
        color: 'var(--color-primary-strong)',
        fontSize: size(16, 12),
        text: 'Menú',
      },
    ];

    this.buttonItems = [
      ...this.buttonItems,
      {
        id: `button-${this.nextButtonId++}`,
        parentId: nextParentId,
        x: size(604),
        y: size(10),
        width: size(124, 92),
        height: size(55, 42),
        order: this.nextCanvasOrder++,
        variant: 'secondary',
        label: 'Acceso',
        action: '',
        fontSize: size(16, 12),
      },
      {
        id: `button-${this.nextButtonId++}`,
        parentId: nextParentId,
        x: size(750),
        y: size(10),
        width: size(172, 120),
        height: size(55, 42),
        order: this.nextCanvasOrder++,
        variant: 'opportunity',
        label: 'Hazte cliente',
        action: '',
        fontSize: size(16, 12),
      },
    ];

    this.iconItems = [
      ...this.iconItems,
      {
        id: `icon-${this.nextIconId++}`,
        parentId: nextParentId,
        x: size(942),
        y: size(25),
        width: size(24, 18),
        height: size(24, 18),
        order: this.nextCanvasOrder++,
        icon: 'search',
        color: 'var(--color-primary-strong)',
      },
      {
        id: `icon-${this.nextIconId++}`,
        parentId: nextParentId,
        x: size(1032),
        y: size(25),
        width: size(24, 18),
        height: size(24, 18),
        order: this.nextCanvasOrder++,
        icon: 'menu',
        color: 'var(--color-primary-strong)',
      },
    ];

    this.selectedTypographyId = nextParentId;
    this.editingTypographyId = null;
    this.editingButtonId = null;
    this.editingIconId = null;
    this.editingLogoId = null;
    this.editingMicroIllustrationId = null;
    this.editingContainerId = nextParentId;
    this.isCanvasEditing = false;
  }

  private createLogoItem(x: number, y: number, parentId: string | null = null) {
    this.logoItems = [
      ...this.logoItems,
      {
        id: `logo-${this.nextLogoId++}`,
        parentId,
        x,
        y,
        width: 120,
        height: 32,
        order: this.nextCanvasOrder++,
      },
    ];
  }

  private createMicroIllustrationItem(x: number, y: number, parentId: string | null = null) {
    this.microIllustrationItems = [
      ...this.microIllustrationItems,
      {
        id: `micro-${this.nextMicroIllustrationId++}`,
        parentId,
        x,
        y,
        width: 96,
        height: 96,
        order: this.nextCanvasOrder++,
        illustration: MICRO_ILLUSTRATION_OPTIONS[0].value,
      },
    ];
  }

  private createContainerItem(
    y: number,
    desktopStart = 1,
    mobileStart = 1,
    parentId: string | null = null,
  ) {
    const nextItem = this.resolveContainerCollision({
      id: `container-${this.nextContainerId++}`,
      parentId,
      name: 'Contenedor',
      y,
      height: 168,
      autoWidth: 0,
      autoHeight: 0,
      widthMode: 'manual',
      heightMode: 'manual',
      order: this.nextCanvasOrder++,
      background: 'transparent',
      borderRadius: 0,
      paddingTop: 8,
      paddingRight: 8,
      paddingBottom: 8,
      paddingLeft: 8,
      scrollEnabled: false,
      ...CONTAINER_DEFAULT_SHADOW,
      desktopStart: this.clampContainerStart(desktopStart, 6, 12),
      desktopSpan: 6,
      mobileStart: this.clampContainerStart(mobileStart, 4, 4),
      mobileSpan: 4,
    });

    this.containerItems = [
      ...this.containerItems,
      nextItem,
    ];
    this.selectedTypographyId = nextItem.id;
    this.editingTypographyId = null;
    this.editingButtonId = null;
    this.editingIconId = null;
    this.editingLogoId = null;
    this.editingMicroIllustrationId = null;
    this.editingContainerId = nextItem.id;
    this.isCanvasEditing = false;
  }

  private getCanvasHostElement() {
    return this.renderRoot.querySelector('.page-preview') as HTMLElement | null;
  }

  private getContainerContentElement(containerId: string) {
    return this.renderRoot.querySelector(
      `[data-container-content-id="${containerId}"]`,
    ) as HTMLElement | null;
  }

  private getDropContainerAtPoint(
    clientX: number,
    clientY: number,
    excludeContainerId?: string,
  ) {
    const containers = [...this.containerItems]
      .sort((a, b) => a.order - b.order)
      .reverse();

    for (const container of containers) {
      if (
        excludeContainerId &&
        (container.id === excludeContainerId || this.isContainerDescendant(container.id, excludeContainerId))
      ) {
        continue;
      }

      const element = this.getContainerContentElement(container.id);
      if (!element) {
        continue;
      }

      const rect = element.getBoundingClientRect();
      const isInside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      if (isInside) {
        return { container, element, rect };
      }
    }

    return null;
  }

  private isContainerDescendant(containerId: string, ancestorId: string) {
    let currentParentId =
      this.containerItems.find((item) => item.id === containerId)?.parentId ?? null;

    while (currentParentId) {
      if (currentParentId === ancestorId) {
        return true;
      }

      currentParentId =
        this.containerItems.find((item) => item.id === currentParentId)?.parentId ?? null;
    }

    return false;
  }

  private canAbsorbDraggedContainer(
    targetContainer: CanvasContainerItem,
    targetRect: DOMRect,
    draggedContainerId: string,
  ) {
    if (targetContainer.id === draggedContainerId) {
      return false;
    }

    if (this.isContainerDescendant(targetContainer.id, draggedContainerId)) {
      return false;
    }

    return (
      targetRect.width > this.dragState!.itemWidth && targetRect.height > this.dragState!.itemHeight
    );
  }

  private getSelectedContainerHostId() {
    return this.selectedContainerItem?.id ?? null;
  }

  private get selectedTypographyItem() {
    return this.typographyItems.find((item) => item.id === this.selectedTypographyId) ?? null;
  }

  private get selectedButtonItem() {
    return this.buttonItems.find((item) => item.id === this.selectedTypographyId) ?? null;
  }

  private get selectableButtonLinkCanvases() {
    return this.canvases.filter((canvas) => canvas.id !== this.activeCanvasId);
  }

  private get selectedButtonActionType(): ButtonActionType {
    const action = this.selectedButtonItem?.action.trim() ?? '';
    return action ? 'link' : 'none';
  }

  private get selectedButtonLinkTargetId() {
    if (!this.selectedButtonItem?.action) {
      return '';
    }

    return this.resolveCanvasTargetFromAction(this.selectedButtonItem.action)?.id ?? '';
  }

  private get selectedInputTextItem() {
    return this.inputTextItems.find((item) => item.id === this.selectedTypographyId) ?? null;
  }

  private get selectedContainerItem() {
    return this.containerItems.find((item) => item.id === this.selectedTypographyId) ?? null;
  }

  private get selectedIconItem() {
    return this.iconItems.find((item) => item.id === this.selectedTypographyId) ?? null;
  }

  private get selectedLogoItem() {
    return this.logoItems.find((item) => item.id === this.selectedTypographyId) ?? null;
  }

  private get selectedMicroIllustrationItem() {
    return (
      this.microIllustrationItems.find((item) => item.id === this.selectedTypographyId) ?? null
    );
  }

  private get isPanelEditingMode() {
    return Boolean(
      this.selectedTypographyItem ||
        this.selectedInputTextItem ||
        (this.editingMicroIllustrationId && this.selectedMicroIllustrationItem) ||
        (this.editingLogoId && this.selectedLogoItem) ||
        (this.editingIconId && this.selectedIconItem) ||
        (this.editingButtonId && this.selectedButtonItem) ||
        (this.editingContainerId && this.selectedContainerItem) ||
        this.isCanvasEditing,
    );
  }

  private get panelTitleText() {
    if (this.isPrototypeMode) {
      return 'Modo prototipo';
    }

    if (this.isPanelEditingMode) {
      return 'Edicion';
    }

    return 'Herramientas';
  }

  private getCustomMoleculePreviewKey(moleculeId: string): `custom-molecule:${string}` {
    return `custom-molecule:${moleculeId}`;
  }

  private getCustomMoleculeIdFromTool(tool: string) {
    return tool.startsWith('custom-molecule:') ? tool.slice('custom-molecule:'.length) : null;
  }

  private getCustomMoleculeById(moleculeId: string) {
    return this.customMolecules.find((molecule) => molecule.id === moleculeId) ?? null;
  }

  private getCustomMoleculeRootContainer(molecule: CustomMolecule) {
    return molecule.scene.containerItems.find((item) => item.parentId === null) ?? null;
  }

  private buildCustomMoleculeScene(containerId: string) {
    const rootContainer = this.containerItems.find((item) => item.id === containerId);
    if (!rootContainer) {
      return null;
    }

    const containerIds = new Set([containerId, ...this.getNestedContainerIds(containerId)]);
    const scene = this.createEmptyCanvasScene();

    scene.containerItems = this.containerItems
      .filter((item) => containerIds.has(item.id))
      .map((item) =>
        item.id === containerId
          ? {
              ...item,
              parentId: null,
              y: 0,
              desktopStart: 1,
              mobileStart: 1,
            }
          : { ...item },
      );
    scene.typographyItems = this.typographyItems
      .filter((item) => item.parentId && containerIds.has(item.parentId))
      .map((item) => ({ ...item }));
    scene.buttonItems = this.buttonItems
      .filter((item) => item.parentId && containerIds.has(item.parentId))
      .map((item) => ({ ...item }));
    scene.inputTextItems = this.inputTextItems
      .filter((item) => item.parentId && containerIds.has(item.parentId))
      .map((item) => ({ ...item }));
    scene.iconItems = this.iconItems
      .filter((item) => item.parentId && containerIds.has(item.parentId))
      .map((item) => ({ ...item }));
    scene.desktopMenuItems = this.desktopMenuItems
      .filter((item) => item.parentId && containerIds.has(item.parentId))
      .map((item) => ({ ...item }));
    scene.logoItems = this.logoItems
      .filter((item) => item.parentId && containerIds.has(item.parentId))
      .map((item) => ({ ...item }));
    scene.microIllustrationItems = this.microIllustrationItems
      .filter((item) => item.parentId && containerIds.has(item.parentId))
      .map((item) => ({ ...item }));

    return scene;
  }

  private instantiateCustomMolecule(
    molecule: CustomMolecule,
    y: number,
    parentId: string | null,
    left: number,
    hostWidth: number,
  ) {
    const rootContainer = this.getCustomMoleculeRootContainer(molecule);
    if (!rootContainer) {
      return;
    }

    const columns = this.getGridColumns();
    const rootSpan = this.viewport === 'mobile' ? rootContainer.mobileSpan : rootContainer.desktopSpan;
    const rootStart = this.getContainerStartFromX(left, hostWidth, columns, rootSpan);
    const entries = this.getOrderedCanvasItems(molecule.scene);
    const idMap = new Map<string, string>();
    const orderMap = new Map<string, number>();

    const createItemId = (kind: CanvasEntry['kind']) => {
      if (kind === 'typography') {
        return `typo-${this.nextTypographyId++}`;
      }

      if (kind === 'button') {
        return `button-${this.nextButtonId++}`;
      }

      if (kind === 'input-text') {
        return `input-${this.nextInputTextId++}`;
      }

      if (kind === 'icon') {
        return `icon-${this.nextIconId++}`;
      }

      if (kind === 'desktop-menu') {
        return `desktop-menu-${this.nextDesktopMenuId++}`;
      }

      if (kind === 'logo') {
        return `logo-${this.nextLogoId++}`;
      }

      if (kind === 'micro-illustration') {
        return `micro-${this.nextMicroIllustrationId++}`;
      }

      return `container-${this.nextContainerId++}`;
    };

    entries.forEach((entry) => {
      idMap.set(entry.item.id, createItemId(entry.kind));
      orderMap.set(entry.item.id, this.nextCanvasOrder++);
    });

    const nextContainerItems = molecule.scene.containerItems.map((item) => {
      const nextId = idMap.get(item.id)!;

      if (item.id === rootContainer.id) {
        return this.resolveContainerCollision({
          ...item,
          id: nextId,
          parentId,
          y,
          order: orderMap.get(item.id)!,
          desktopStart: this.viewport === 'desktop' ? rootStart : 1,
          mobileStart: this.viewport === 'mobile' ? rootStart : 1,
        });
      }

      return {
        ...item,
        id: nextId,
        parentId: item.parentId ? idMap.get(item.parentId)! : parentId,
        order: orderMap.get(item.id)!,
      };
    });

    const remapLeafParentId = (item: { parentId: string | null }) =>
      item.parentId ? (idMap.get(item.parentId) ?? parentId) : parentId;

    this.containerItems = [...this.containerItems, ...nextContainerItems];
    this.typographyItems = [
      ...this.typographyItems,
      ...molecule.scene.typographyItems.map((item) => ({
        ...item,
        id: idMap.get(item.id)!,
        parentId: remapLeafParentId(item),
        order: orderMap.get(item.id)!,
      })),
    ];
    this.buttonItems = [
      ...this.buttonItems,
      ...molecule.scene.buttonItems.map((item) => ({
        ...item,
        id: idMap.get(item.id)!,
        parentId: remapLeafParentId(item),
        order: orderMap.get(item.id)!,
      })),
    ];
    this.inputTextItems = [
      ...this.inputTextItems,
      ...molecule.scene.inputTextItems.map((item) => ({
        ...item,
        id: idMap.get(item.id)!,
        parentId: remapLeafParentId(item),
        order: orderMap.get(item.id)!,
      })),
    ];
    this.iconItems = [
      ...this.iconItems,
      ...molecule.scene.iconItems.map((item) => ({
        ...item,
        id: idMap.get(item.id)!,
        parentId: remapLeafParentId(item),
        order: orderMap.get(item.id)!,
      })),
    ];
    this.desktopMenuItems = [
      ...this.desktopMenuItems,
      ...molecule.scene.desktopMenuItems.map((item) => ({
        ...item,
        id: idMap.get(item.id)!,
        parentId: remapLeafParentId(item),
        order: orderMap.get(item.id)!,
      })),
    ];
    this.logoItems = [
      ...this.logoItems,
      ...molecule.scene.logoItems.map((item) => ({
        ...item,
        id: idMap.get(item.id)!,
        parentId: remapLeafParentId(item),
        order: orderMap.get(item.id)!,
      })),
    ];
    this.microIllustrationItems = [
      ...this.microIllustrationItems,
      ...molecule.scene.microIllustrationItems.map((item) => ({
        ...item,
        id: idMap.get(item.id)!,
        parentId: remapLeafParentId(item),
        order: orderMap.get(item.id)!,
      })),
    ];
  }

  private openCreateComponentModal() {
    if (!this.selectedContainerItem) {
      return;
    }

    this.draftComponentName = '';
    this.isCreateComponentModalOpen = true;
    this.openToolsDrawerIfNeeded();
  }

  private closeCreateComponentModal() {
    this.isCreateComponentModalOpen = false;
    this.draftComponentName = '';
  }

  private handleDraftComponentNameInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.draftComponentName = input.value;
  }

  private handleDraftComponentNameKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();
    this.handleCreateComponentFromSelection();
  }

  private handleCreateComponentFromSelection() {
    const sourceContainer = this.selectedContainerItem;
    const componentName = this.draftComponentName.trim();
    if (!sourceContainer || !componentName) {
      return;
    }

    const scene = this.buildCustomMoleculeScene(sourceContainer.id);
    if (!scene) {
      return;
    }

    const moleculeId = `custom-${this.nextCustomMoleculeId++}`;
    this.customMolecules = [
      ...this.customMolecules,
      {
        id: moleculeId,
        name: componentName,
        scene,
      },
    ];
    this.componentTab = 'moleculas';
    this.selectedToolPreview = this.getCustomMoleculePreviewKey(moleculeId);
    window.clearTimeout(this.toolPreviewTimeout);
    this.toolPreviewTimeout = window.setTimeout(() => {
      this.selectedToolPreview = null;
    }, 5000);
    this.closeCreateComponentModal();
  }

  private handleCustomMoleculePreview(moleculeId: string) {
    window.clearTimeout(this.toolPreviewTimeout);
    this.selectedToolPreview = this.getCustomMoleculePreviewKey(moleculeId);
    this.toolPreviewTimeout = window.setTimeout(() => {
      this.selectedToolPreview = null;
    }, 5000);
  }

  private handleCustomMoleculeDragStart(event: DragEvent, moleculeId: string) {
    const tool = this.getCustomMoleculePreviewKey(moleculeId);
    event.dataTransfer?.setData('application/x-ui-tool', tool);
    event.dataTransfer?.setData('text/plain', tool);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'copy';
    }
    this.activeDraggedTool = tool;
  }

  private handleCustomMoleculeDragEnd() {
    this.activeDraggedTool = null;
    this.isCanvasDragActive = false;
  }

  private sceneHasCanvasItems(scene: CanvasScene) {
    return (
      scene.typographyItems.length > 0 ||
      scene.buttonItems.length > 0 ||
      scene.inputTextItems.length > 0 ||
      scene.iconItems.length > 0 ||
      scene.desktopMenuItems.length > 0 ||
      scene.logoItems.length > 0 ||
      scene.microIllustrationItems.length > 0 ||
      scene.containerItems.length > 0
    );
  }

  private get hasCanvasItems() {
    return this.sceneHasCanvasItems(this.getActiveCanvasScene());
  }

  private getOrderedCanvasItems(scene: CanvasScene) {
    return [
      ...scene.typographyItems.map((item) => ({ kind: 'typography' as const, item })),
      ...scene.buttonItems.map((item) => ({ kind: 'button' as const, item })),
      ...scene.inputTextItems.map((item) => ({ kind: 'input-text' as const, item })),
      ...scene.iconItems.map((item) => ({ kind: 'icon' as const, item })),
      ...scene.desktopMenuItems.map((item) => ({ kind: 'desktop-menu' as const, item })),
      ...scene.logoItems.map((item) => ({ kind: 'logo' as const, item })),
      ...scene.microIllustrationItems.map((item) => ({
        kind: 'micro-illustration' as const,
        item,
      })),
      ...scene.containerItems.map((item) => ({ kind: 'container' as const, item })),
    ].sort((a, b) => a.item.order - b.item.order) as CanvasEntry[];
  }

  private get orderedCanvasItems() {
    return this.getOrderedCanvasItems(this.getActiveCanvasScene());
  }

  private getRootCanvasItems(scene: CanvasScene) {
    return this.getOrderedCanvasItems(scene).filter(({ item }) => item.parentId === null);
  }

  private get rootCanvasItems() {
    return this.getRootCanvasItems(this.getActiveCanvasScene());
  }

  private getContainerChildren(containerId: string) {
    return this.getContainerChildrenForScene(this.getActiveCanvasScene(), containerId);
  }

  private getContainerChildrenForScene(scene: CanvasScene, containerId: string) {
    return this.getOrderedCanvasItems(scene).filter((entry) => entry.item.parentId === containerId);
  }

  private updateSelectedTypographyItem(updates: Partial<CanvasTypographyItem>) {
    if (!this.selectedTypographyId) {
      return;
    }

    this.typographyItems = this.typographyItems.map((item) =>
      item.id === this.selectedTypographyId ? { ...item, ...updates } : item,
    );
  }

  private updateSelectedButtonItem(updates: Partial<CanvasButtonItem>) {
    if (!this.selectedTypographyId) {
      return;
    }

    this.buttonItems = this.buttonItems.map((item) =>
      item.id === this.selectedTypographyId ? { ...item, ...updates } : item,
    );
  }

  private updateSelectedInputTextItem(updates: Partial<CanvasInputTextItem>) {
    if (!this.selectedTypographyId) {
      return;
    }

    this.inputTextItems = this.inputTextItems.map((item) =>
      item.id === this.selectedTypographyId
        ? {
            ...item,
            ...updates,
            label: (updates.label ?? item.label).trim() || 'Número de Tarjeta',
            icon: updates.icon ?? item.icon ?? 'eye-off',
            status: updates.status ?? item.status ?? 'inactive',
          }
        : item,
    );
  }

  private updateSelectedIconItem(updates: Partial<CanvasIconItem>) {
    if (!this.selectedTypographyId) {
      return;
    }

    this.iconItems = this.iconItems.map((item) =>
      item.id === this.selectedTypographyId
        ? {
            ...item,
            ...updates,
            color: this.normalizeColorValue(updates.color ?? item.color ?? 'var(--color-primary-strong)'),
          }
        : item,
    );
  }

  private updateSelectedLogoItem(updates: Partial<CanvasLogoItem>) {
    if (!this.selectedTypographyId) {
      return;
    }

    this.logoItems = this.logoItems.map((item) =>
      item.id === this.selectedTypographyId ? { ...item, ...updates } : item,
    );
  }

  private updateSelectedMicroIllustrationItem(updates: Partial<CanvasMicroIllustrationItem>) {
    if (!this.selectedTypographyId) {
      return;
    }

    this.microIllustrationItems = this.microIllustrationItems.map((item) =>
      item.id === this.selectedTypographyId ? { ...item, ...updates } : item,
    );
  }

  private updateSelectedContainerItem(updates: Partial<CanvasContainerItem>) {
    if (!this.selectedTypographyId) {
      return;
    }

    this.containerItems = this.containerItems.map((item) => {
      if (item.id !== this.selectedTypographyId) {
        return item;
      }

      const desktopSpan = Math.max(1, Math.min(12, updates.desktopSpan ?? item.desktopSpan));
      const mobileSpan = Math.max(1, Math.min(4, updates.mobileSpan ?? item.mobileSpan));
      const nextDesktopStart = this.clampContainerStart(
        updates.desktopStart ?? item.desktopStart,
        desktopSpan,
        12,
      );
      const nextMobileStart = this.clampContainerStart(
        updates.mobileStart ?? item.mobileStart,
        mobileSpan,
        4,
      );

      const nextItem = {
        ...item,
        ...updates,
        height: Math.max(1, updates.height ?? item.height),
        borderRadius: Math.max(0, Math.min(40, updates.borderRadius ?? item.borderRadius)),
        paddingTop: Math.max(0, Math.min(120, updates.paddingTop ?? item.paddingTop)),
        paddingRight: Math.max(0, Math.min(120, updates.paddingRight ?? item.paddingRight)),
        paddingBottom: Math.max(0, Math.min(120, updates.paddingBottom ?? item.paddingBottom)),
        paddingLeft: Math.max(0, Math.min(120, updates.paddingLeft ?? item.paddingLeft)),
        autoWidth: Math.max(0, updates.autoWidth ?? item.autoWidth),
        autoHeight: Math.max(0, updates.autoHeight ?? item.autoHeight),
        widthMode: updates.widthMode ?? item.widthMode,
        heightMode: updates.heightMode ?? item.heightMode,
        name: (updates.name ?? item.name).trim() || 'Contenedor',
        scrollEnabled: updates.scrollEnabled ?? item.scrollEnabled,
        shadowEnabled: updates.shadowEnabled ?? item.shadowEnabled,
        shadowX: Math.max(-80, Math.min(80, updates.shadowX ?? item.shadowX)),
        shadowY: Math.max(-80, Math.min(80, updates.shadowY ?? item.shadowY)),
        shadowBlur: Math.max(0, Math.min(120, updates.shadowBlur ?? item.shadowBlur)),
        shadowSpread: Math.max(-40, Math.min(80, updates.shadowSpread ?? item.shadowSpread)),
        shadowOpacity: Math.max(0, Math.min(1, updates.shadowOpacity ?? item.shadowOpacity)),
        shadowColor: this.normalizeColorValue(
          updates.shadowColor ?? item.shadowColor ?? CONTAINER_DEFAULT_SHADOW.shadowColor,
        ),
        desktopSpan,
        mobileSpan,
        desktopStart: nextDesktopStart,
        mobileStart: nextMobileStart,
      };

      return this.resolveContainerCollision(nextItem);
    });
  }

  private getContainerBoxShadow(item: CanvasContainerItem) {
    if (!item.shadowEnabled) {
      return 'none';
    }

    const shadowColor = this.normalizeColorValue(
      item.shadowColor ?? CONTAINER_DEFAULT_SHADOW.shadowColor,
    );

    return `${item.shadowX}px ${item.shadowY}px ${item.shadowBlur}px ${item.shadowSpread}px color-mix(in srgb, ${shadowColor} ${Math.round(item.shadowOpacity * 100)}%, transparent)`;
  }

  private getItemParentId(itemId: string) {
    if (itemId.startsWith('typo-')) {
      return this.typographyItems.find((item) => item.id === itemId)?.parentId ?? null;
    }

    if (itemId.startsWith('button-')) {
      return this.buttonItems.find((item) => item.id === itemId)?.parentId ?? null;
    }

    if (itemId.startsWith('input-')) {
      return this.inputTextItems.find((item) => item.id === itemId)?.parentId ?? null;
    }

    if (itemId.startsWith('icon-')) {
      return this.iconItems.find((item) => item.id === itemId)?.parentId ?? null;
    }

    if (itemId.startsWith('desktop-menu-')) {
      return this.desktopMenuItems.find((item) => item.id === itemId)?.parentId ?? null;
    }

    if (itemId.startsWith('logo-')) {
      return this.logoItems.find((item) => item.id === itemId)?.parentId ?? null;
    }

    if (itemId.startsWith('micro-')) {
      return this.microIllustrationItems.find((item) => item.id === itemId)?.parentId ?? null;
    }

    if (itemId.startsWith('container-')) {
      return this.containerItems.find((item) => item.id === itemId)?.parentId ?? null;
    }

    return null;
  }

  private clearActiveEditingState() {
    this.selectedTypographyId = null;
    this.editingTypographyId = null;
    this.editingButtonId = null;
    this.editingIconId = null;
    this.editingLogoId = null;
    this.editingMicroIllustrationId = null;
    this.editingContainerId = null;
    this.isEditingSelectedContainerName = false;
    this.isCanvasEditing = false;
    this.openColorDropdown = null;
  }

  private getNestedContainerIds(containerId: string) {
    const nestedIds: string[] = [];
    const pendingIds = [containerId];

    while (pendingIds.length > 0) {
      const currentId = pendingIds.pop()!;
      const childIds = this.containerItems
        .filter((item) => item.parentId === currentId)
        .map((item) => item.id);

      nestedIds.push(...childIds);
      pendingIds.push(...childIds);
    }

    return nestedIds;
  }

  private isEditableFieldTarget(target: EventTarget | null) {
    return (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement ||
      (target instanceof HTMLElement && target.isContentEditable)
    );
  }

  private handleWindowKeyDown = (event: KeyboardEvent) => {
    if ((event.key !== 'Delete' && event.key !== 'Backspace') || !this.selectedTypographyId) {
      return;
    }

    if (this.editingTypographyId === this.selectedTypographyId) {
      return;
    }

    const composedPath = event.composedPath();
    const isEditingField =
      composedPath.some((target) => this.isEditableFieldTarget(target)) ||
      this.isEditableFieldTarget(this.shadowRoot?.activeElement ?? null) ||
      this.isEditableFieldTarget(document.activeElement);

    if (isEditingField) {
      return;
    }

    if (this.selectedTypographyId.startsWith('typo-')) {
      this.typographyItems = this.typographyItems.filter(
        (item) => item.id !== this.selectedTypographyId,
      );
      this.clearActiveEditingState();
      event.preventDefault();
      return;
    }

    if (this.selectedTypographyId.startsWith('button-')) {
      this.buttonItems = this.buttonItems.filter((item) => item.id !== this.selectedTypographyId);
      this.clearActiveEditingState();
      event.preventDefault();
      return;
    }

    if (this.selectedTypographyId.startsWith('input-')) {
      this.inputTextItems = this.inputTextItems.filter(
        (item) => item.id !== this.selectedTypographyId,
      );
      this.clearActiveEditingState();
      event.preventDefault();
      return;
    }

    if (this.selectedTypographyId.startsWith('icon-')) {
      this.iconItems = this.iconItems.filter((item) => item.id !== this.selectedTypographyId);
      this.clearActiveEditingState();
      event.preventDefault();
      return;
    }

    if (this.selectedTypographyId.startsWith('desktop-menu-')) {
      this.desktopMenuItems = this.desktopMenuItems.filter(
        (item) => item.id !== this.selectedTypographyId,
      );
      this.clearActiveEditingState();
      event.preventDefault();
      return;
    }

    if (this.selectedTypographyId.startsWith('logo-')) {
      this.logoItems = this.logoItems.filter((item) => item.id !== this.selectedTypographyId);
      this.clearActiveEditingState();
      event.preventDefault();
      return;
    }

    if (this.selectedTypographyId.startsWith('micro-')) {
      this.microIllustrationItems = this.microIllustrationItems.filter(
        (item) => item.id !== this.selectedTypographyId,
      );
      this.clearActiveEditingState();
      event.preventDefault();
      return;
    }

    if (this.selectedTypographyId.startsWith('container-')) {
      const containerIdsToDelete = new Set([
        this.selectedTypographyId,
        ...this.getNestedContainerIds(this.selectedTypographyId),
      ]);

      this.typographyItems = this.typographyItems.filter(
        (item) => !item.parentId || !containerIdsToDelete.has(item.parentId),
      );
      this.buttonItems = this.buttonItems.filter(
        (item) => !item.parentId || !containerIdsToDelete.has(item.parentId),
      );
      this.inputTextItems = this.inputTextItems.filter(
        (item) => !item.parentId || !containerIdsToDelete.has(item.parentId),
      );
      this.iconItems = this.iconItems.filter(
        (item) => !item.parentId || !containerIdsToDelete.has(item.parentId),
      );
      this.desktopMenuItems = this.desktopMenuItems.filter(
        (item) => !item.parentId || !containerIdsToDelete.has(item.parentId),
      );
      this.logoItems = this.logoItems.filter(
        (item) => !item.parentId || !containerIdsToDelete.has(item.parentId),
      );
      this.microIllustrationItems = this.microIllustrationItems.filter(
        (item) => !item.parentId || !containerIdsToDelete.has(item.parentId),
      );
      this.containerItems = this.containerItems.filter(
        (item) => !containerIdsToDelete.has(item.id),
      );
      this.clearActiveEditingState();
      event.preventDefault();
    }
  };

  private handleToolDragState(
    event: CustomEvent<{ tool: string; active: boolean; preset?: TypographyPreset }>,
  ) {
    this.activeDraggedTool = event.detail.active ? event.detail.tool : null;
    if (event.detail.preset) {
      this.toolTypographyPreset = event.detail.preset;
    }
    if (!event.detail.active) {
      this.isCanvasDragActive = false;
    }
  }

  private handleToolPreview(event: CustomEvent<{ tool: ToolPreview; preset?: TypographyPreset }>) {
    window.clearTimeout(this.toolPreviewTimeout);
    this.selectedToolPreview = event.detail.tool;
    if (event.detail.preset) {
      this.toolTypographyPreset = event.detail.preset;
    }

    if (event.detail.tool) {
      this.toolPreviewTimeout = window.setTimeout(() => {
        this.selectedToolPreview = null;
      }, 5000);
    }
  }

  private handleInsertTool(event: CustomEvent<{ tool: string; preset?: TypographyPreset }>) {
    const parentId = this.getSelectedContainerHostId();

    if (event.detail.tool === 'tipografia') {
      if (event.detail.preset) {
        this.toolTypographyPreset = event.detail.preset;
      }

      const itemWidth = this.viewport === 'mobile' ? 208 : 240;
      this.createTypographyItem(parentId ? 16 : 24, parentId ? 16 : 24, parentId);

      const lastItem = this.typographyItems[this.typographyItems.length - 1];
      if (lastItem && !parentId && this.viewport === 'mobile' && lastItem.x + itemWidth > 338) {
        this.typographyItems = this.typographyItems.map((item, index, items) =>
          index === items.length - 1 ? { ...item, x: 16 } : item,
        );
      }
      return;
    }

    if (event.detail.tool === 'main-button') {
      this.createButtonItem('main', parentId ? 16 : 24, parentId ? 16 : 24, parentId);
      return;
    }

    if (event.detail.tool === 'input-text') {
      this.createInputTextItem(parentId ? 16 : 24, parentId ? 16 : 24, parentId);
      return;
    }

    if (event.detail.tool === 'secondary-button') {
      this.createButtonItem('secondary', parentId ? 16 : 24, parentId ? 16 : 24, parentId);
      return;
    }

    if (event.detail.tool === 'icon-button') {
      this.createButtonItem('icon-button', parentId ? 16 : 24, parentId ? 16 : 24, parentId);
      return;
    }

    if (event.detail.tool === 'opportunity-button') {
      this.createButtonItem('opportunity', parentId ? 16 : 24, parentId ? 16 : 24, parentId);
      return;
    }

    if (event.detail.tool === 'icon') {
      this.createIconItem(parentId ? 16 : 24, parentId ? 16 : 24, parentId);
      return;
    }

    if (event.detail.tool === 'desktop-menu') {
      this.createDesktopMenuItem(parentId ? 16 : 24, parentId, parentId ? 320 : 1040);
      return;
    }

    if (event.detail.tool === 'logo') {
      this.createLogoItem(parentId ? 16 : 24, parentId ? 16 : 24, parentId);
      return;
    }

    if (event.detail.tool === 'micro-illustration') {
      this.createMicroIllustrationItem(parentId ? 16 : 24, parentId ? 16 : 24, parentId);
      return;
    }

    if (event.detail.tool === 'contenedor') {
      this.createContainerItem(24);
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
      this.editingButtonId = null;
      this.editingIconId = null;
      this.editingLogoId = null;
      this.editingMicroIllustrationId = null;
      this.editingContainerId = null;
      this.isCanvasEditing = false;
    }
  }

  private handleActiveCanvasNameInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.canvases = this.canvases.map((canvas) =>
      canvas.id === this.activeCanvasId ? { ...canvas, name: input.value } : canvas,
    );
  }

  private activateComponentEditing(itemId: string, inlineTextEditing = false) {
    this.isCanvasEditing = false;
    this.selectedTypographyId = itemId;
    this.isEditingSelectedContainerName = false;

    this.editingTypographyId =
      itemId.startsWith('typo-') && inlineTextEditing ? itemId : null;
    this.editingButtonId = itemId.startsWith('button-') ? itemId : null;
    this.editingIconId = itemId.startsWith('icon-') ? itemId : null;
    this.editingLogoId = itemId.startsWith('logo-') ? itemId : null;
    this.editingMicroIllustrationId = itemId.startsWith('micro-') ? itemId : null;
    this.editingContainerId = itemId.startsWith('container-') ? itemId : null;
  }

  private handleCanvasItemDoubleClick(itemId: string) {
    this.handleWindowPointerUp();
    this.openToolsDrawerIfNeeded();
    this.activateComponentEditing(itemId, itemId.startsWith('typo-'));
  }

  private handleContainerResizePointerDown(
    event: PointerEvent,
    item: CanvasContainerItem,
    handle: ContainerResizeHandle,
  ) {
    if (event.button !== 0) {
      return;
    }

    event.stopPropagation();
    const parentId = item.parentId;
    const host = parentId ? this.getContainerContentElement(parentId) : this.getCanvasHostElement();
    const element = (event.currentTarget as HTMLElement).closest('.canvas-item') as HTMLElement | null;

    if (!host || !element) {
      return;
    }

    const hostRect = host.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    this.openToolsDrawerIfNeeded();
    this.activateComponentEditing(item.id);

    this.dragState = {
      id: item.id,
      parentId,
      mode: 'resize',
      offsetX: event.clientX - elementRect.left,
      offsetY: event.clientY - elementRect.top,
      canvasWidth: hostRect.width,
      canvasHeight: hostRect.height,
      itemWidth: elementRect.width,
      itemHeight: elementRect.height,
      resizeHandle: handle,
      originClientX: event.clientX,
      originClientY: event.clientY,
      originY: item.y,
      originHeight: item.height,
      originDesktopStart: item.desktopStart,
      originDesktopSpan: item.desktopSpan,
      originMobileStart: item.mobileStart,
      originMobileSpan: item.mobileSpan,
    };

    window.addEventListener('pointermove', this.handleWindowPointerMove);
    window.addEventListener('pointerup', this.handleWindowPointerUp);
    event.preventDefault();
  }

  private handleCanvasItemPointerDown(event: PointerEvent, itemId: string) {
    if (event.button !== 0) {
      return;
    }

    if (this.editingTypographyId === itemId || event.detail >= 2) {
      return;
    }

    const element = event.currentTarget as HTMLElement;
    const parentId = this.getItemParentId(itemId);
    const host = parentId ? this.getContainerContentElement(parentId) : this.getCanvasHostElement();
    if (!host) {
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

    const canvasRect = host.getBoundingClientRect();
    this.openToolsDrawerIfNeeded();
    this.activateComponentEditing(itemId);
    this.dragState = {
      id: itemId,
      parentId,
      mode: 'move',
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

    const host = this.dragState.parentId
      ? this.getContainerContentElement(this.dragState.parentId)
      : this.getCanvasHostElement();
    if (!host) {
      return;
    }

    const rect = host.getBoundingClientRect();

    if (this.dragState.mode === 'resize' && this.dragState.id.startsWith('container-')) {
      const columns = this.getGridColumns();
      const columnWidth = rect.width / columns;
      const minHeight = 1;
      const resizeHandle = this.dragState.resizeHandle;
      const draggedContainer = this.containerItems.find((item) => item.id === this.dragState?.id);

      if (!resizeHandle || !draggedContainer) {
        return;
      }

      const originStart =
        this.viewport === 'mobile'
          ? this.dragState.originMobileStart ?? draggedContainer.mobileStart
          : this.dragState.originDesktopStart ?? draggedContainer.desktopStart;
      const originSpan =
        this.viewport === 'mobile'
          ? this.dragState.originMobileSpan ?? draggedContainer.mobileSpan
          : this.dragState.originDesktopSpan ?? draggedContainer.desktopSpan;
      const originEnd = originStart + originSpan - 1;
      const relativeX = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
      let nextStart = originStart;
      let nextSpan = originSpan;

      if (resizeHandle === 'top-left' || resizeHandle === 'bottom-left') {
        const nextBoundary = Math.max(
          0,
          Math.min(originEnd - 1, Math.round(relativeX / columnWidth)),
        );
        nextStart = nextBoundary + 1;
        nextSpan = originEnd - nextStart + 1;
      } else {
        const nextEnd = Math.max(
          originStart,
          Math.min(columns, Math.round(relativeX / columnWidth)),
        );
        nextSpan = nextEnd - originStart + 1;
      }

      const originY = this.dragState.originY ?? draggedContainer.y;
      const originHeight = this.dragState.originHeight ?? draggedContainer.height;
      let nextY = originY;
      let nextHeight = originHeight;

      if (resizeHandle === 'top-left' || resizeHandle === 'top-right') {
        const unclampedTop = originY + (event.clientY - (this.dragState.originClientY ?? event.clientY));
        nextY = Math.max(0, Math.min(originY + originHeight - minHeight, unclampedTop));
        nextHeight = originHeight - (nextY - originY);
      } else {
        nextHeight = Math.max(
          minHeight,
          Math.min(rect.height - originY, originHeight + (event.clientY - (this.dragState.originClientY ?? event.clientY))),
        );
      }

      this.containerItems = this.containerItems.map((item) => {
        if (item.id !== this.dragState?.id) {
          return item;
        }

        const nextItem =
          this.viewport === 'mobile'
            ? {
                ...item,
                y: nextY,
                height: nextHeight,
                widthMode: 'manual' as const,
                heightMode: 'manual' as const,
                mobileStart: nextStart,
                mobileSpan: nextSpan,
              }
            : {
                ...item,
                y: nextY,
                height: nextHeight,
                widthMode: 'manual' as const,
                heightMode: 'manual' as const,
                desktopStart: nextStart,
                desktopSpan: nextSpan,
              };

        return this.resolveContainerCollision(nextItem);
      });
      return;
    }

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
    this.buttonItems = this.buttonItems.map((item) =>
      item.id === this.dragState?.id ? { ...item, x: nextX, y: nextY } : item,
    );
    this.inputTextItems = this.inputTextItems.map((item) =>
      item.id === this.dragState?.id ? { ...item, x: nextX, y: nextY } : item,
    );
    this.iconItems = this.iconItems.map((item) =>
      item.id === this.dragState?.id ? { ...item, x: nextX, y: nextY } : item,
    );
    this.desktopMenuItems = this.desktopMenuItems.map((item) =>
      item.id === this.dragState?.id ? { ...item, x: nextX, y: nextY } : item,
    );
    this.logoItems = this.logoItems.map((item) =>
      item.id === this.dragState?.id ? { ...item, x: nextX, y: nextY } : item,
    );
    this.microIllustrationItems = this.microIllustrationItems.map((item) =>
      item.id === this.dragState?.id ? { ...item, x: nextX, y: nextY } : item,
    );
    this.containerItems = this.containerItems.map((item) => {
      if (item.id !== this.dragState?.id) {
        return item;
      }

      const columns = this.getGridColumns();
      const span = this.viewport === 'mobile' ? item.mobileSpan : item.desktopSpan;
      const start = this.getContainerStartFromX(nextX, rect.width, columns, span);
      const nextItem =
        this.viewport === 'mobile'
          ? { ...item, y: nextY, mobileStart: start }
          : { ...item, y: nextY, desktopStart: start };

      return this.resolveContainerCollision(nextItem);
    });
  };

  private moveDraggedLeafItemIntoContainer(event: PointerEvent) {
    if (!this.dragState || this.dragState.mode !== 'move' || this.dragState.id.startsWith('container-')) {
      return;
    }

    const dropContainer = this.getDropContainerAtPoint(event.clientX, event.clientY);
    if (!dropContainer || dropContainer.container.id === this.dragState.parentId) {
      return;
    }

    const nextX = Math.max(
      0,
      Math.min(
        dropContainer.rect.width - this.dragState.itemWidth,
        event.clientX - dropContainer.rect.left - this.dragState.offsetX,
      ),
    );
    const nextY = Math.max(
      0,
      Math.min(
        dropContainer.rect.height - this.dragState.itemHeight,
        event.clientY - dropContainer.rect.top - this.dragState.offsetY,
      ),
    );

    this.typographyItems = this.typographyItems.map((item) =>
      item.id === this.dragState?.id
        ? { ...item, parentId: dropContainer.container.id, x: nextX, y: nextY }
        : item,
    );
    this.buttonItems = this.buttonItems.map((item) =>
      item.id === this.dragState?.id
        ? { ...item, parentId: dropContainer.container.id, x: nextX, y: nextY }
        : item,
    );
    this.inputTextItems = this.inputTextItems.map((item) =>
      item.id === this.dragState?.id
        ? { ...item, parentId: dropContainer.container.id, x: nextX, y: nextY }
        : item,
    );
    this.iconItems = this.iconItems.map((item) =>
      item.id === this.dragState?.id
        ? { ...item, parentId: dropContainer.container.id, x: nextX, y: nextY }
        : item,
    );
    this.desktopMenuItems = this.desktopMenuItems.map((item) =>
      item.id === this.dragState?.id
        ? { ...item, parentId: dropContainer.container.id, x: nextX, y: nextY }
        : item,
    );
    this.logoItems = this.logoItems.map((item) =>
      item.id === this.dragState?.id
        ? { ...item, parentId: dropContainer.container.id, x: nextX, y: nextY }
        : item,
    );
    this.microIllustrationItems = this.microIllustrationItems.map((item) =>
      item.id === this.dragState?.id
        ? { ...item, parentId: dropContainer.container.id, x: nextX, y: nextY }
        : item,
    );
  }

  private moveDraggedContainerIntoContainer(event: PointerEvent) {
    if (!this.dragState || this.dragState.mode !== 'move' || !this.dragState.id.startsWith('container-')) {
      return;
    }

    const draggedContainer = this.containerItems.find((item) => item.id === this.dragState?.id);
    if (!draggedContainer) {
      return;
    }

    const dropContainer = this.getDropContainerAtPoint(event.clientX, event.clientY);
    if (
      !dropContainer ||
      !this.canAbsorbDraggedContainer(
        dropContainer.container,
        dropContainer.rect,
        draggedContainer.id,
      )
    ) {
      return;
    }

    const columns = this.getGridColumns();
    const span = this.viewport === 'mobile' ? draggedContainer.mobileSpan : draggedContainer.desktopSpan;
    const nextX = Math.max(
      0,
      Math.min(
        dropContainer.rect.width - this.dragState.itemWidth,
        event.clientX - dropContainer.rect.left - this.dragState.offsetX,
      ),
    );
    const nextY = Math.max(
      0,
      Math.min(
        dropContainer.rect.height - this.dragState.itemHeight,
        event.clientY - dropContainer.rect.top - this.dragState.offsetY,
      ),
    );
    const nextStart = this.getContainerStartFromX(nextX, dropContainer.rect.width, columns, span);

    this.containerItems = this.containerItems.map((item) => {
      if (item.id !== draggedContainer.id) {
        return item;
      }

      const nextItem =
        this.viewport === 'mobile'
          ? {
              ...item,
              parentId: dropContainer.container.id,
              y: nextY,
              mobileStart: nextStart,
            }
          : {
              ...item,
              parentId: dropContainer.container.id,
              y: nextY,
              desktopStart: nextStart,
            };

      return this.resolveContainerCollision(nextItem);
    });
  }

  private handleWindowPointerUp = (event?: PointerEvent) => {
    if (event && this.dragState?.mode === 'move') {
      this.moveDraggedLeafItemIntoContainer(event);
      this.moveDraggedContainerIntoContainer(event);
    }
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

  private handleInputTextChange(event: CustomEvent<{ id: string; value: string }>) {
    const { id, value } = event.detail;
    this.inputTextItems = this.inputTextItems.map((item) =>
      item.id === id ? { ...item, value } : item,
    );
  }

  private handleInputTextFocus(event: CustomEvent<{ id: string }>) {
    this.selectedTypographyId = event.detail.id;
    this.editingTypographyId = null;
    this.editingButtonId = null;
    this.editingIconId = null;
    this.editingLogoId = null;
    this.editingMicroIllustrationId = null;
    this.editingContainerId = null;
    this.isCanvasEditing = false;
  }

  private setSelectedAlignment(align: TypographyAlign) {
    this.updateSelectedTypographyItem({ align });
  }

  private preserveInlineTypographySelection(event: MouseEvent) {
    if (this.editingTypographyId === this.selectedTypographyId) {
      event.preventDefault();
    }
  }

  private getEditingTypographyElement() {
    if (!this.editingTypographyId) {
      return null;
    }

    return this.renderRoot.querySelector(
      `[data-item-id="${this.editingTypographyId}"] canvas-tipografia`,
    ) as (HTMLElement & {
      applyInlineFormat?: (command: InlineTypographyFormat) => string | null;
    }) | null;
  }

  private applyInlineTypographyFormat(command: InlineTypographyFormat) {
    const editor = this.getEditingTypographyElement();
    const nextMarkup = editor?.applyInlineFormat?.(command);

    if (nextMarkup === undefined || nextMarkup === null) {
      return false;
    }

    this.updateSelectedTypographyItem({ text: nextMarkup });
    return true;
  }

  private toggleSelectedBold() {
    if (!this.selectedTypographyItem) {
      return;
    }

    if (this.editingTypographyId === this.selectedTypographyId) {
      if (this.applyInlineTypographyFormat('bold')) {
        return;
      }
    }

    this.updateSelectedTypographyItem({ bold: !this.selectedTypographyItem.bold });
  }

  private toggleSelectedItalic() {
    if (!this.selectedTypographyItem) {
      return;
    }

    if (this.editingTypographyId === this.selectedTypographyId) {
      if (this.applyInlineTypographyFormat('italic')) {
        return;
      }
    }

    this.updateSelectedTypographyItem({ italic: !this.selectedTypographyItem.italic });
  }

  private handleSelectedFontSizeInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedTypographyItem({ fontSize: input.valueAsNumber });
  }

  private handleSelectedButtonActionTypeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const nextType = select.value as ButtonActionType;

    if (nextType === 'none') {
      this.updateSelectedButtonItem({ action: '' });
      return;
    }

    const fallbackTargetId =
      this.selectedButtonLinkTargetId || this.selectableButtonLinkCanvases[0]?.id || '';
    this.updateSelectedButtonItem({
      action: fallbackTargetId ? `canvas:${fallbackTargetId}` : 'canvas:',
    });
  }

  private handleSelectedButtonLinkTargetChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const targetId = select.value.trim();
    this.updateSelectedButtonItem({ action: targetId ? `canvas:${targetId}` : 'canvas:' });
  }

  private handleSelectedButtonLabelInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedButtonItem({ label: input.value });
  }

  private handleSelectedButtonHeightChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.updateSelectedButtonItem({ height: Number(select.value) });
  }

  private handleSelectedIconButtonBackgroundChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.updateSelectedButtonItem({ backgroundVisible: select.value === 'visible' });
  }

  private handleSelectedInputLabelInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedInputTextItem({ label: input.value });
  }

  private handleSelectedInputStatusChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.updateSelectedInputTextItem({ status: select.value as 'active' | 'inactive' });
  }

  private handleSelectedContainerDesktopSpanChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.updateSelectedContainerItem({ desktopSpan: Number(select.value) });
  }

  private handleSelectedContainerMobileSpanChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.updateSelectedContainerItem({ mobileSpan: Number(select.value) });
  }

  private handleSelectedContainerHeightInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedContainerItem({ height: input.valueAsNumber, heightMode: 'manual' });
  }

  private handleSelectedContainerWidthModeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.updateSelectedContainerItem({ widthMode: select.value as 'manual' | 'auto' });
  }

  private handleSelectedContainerHeightModeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.updateSelectedContainerItem({ heightMode: select.value as 'manual' | 'auto' });
  }

  private handleSelectedContainerWidthInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const selected = this.selectedContainerItem;
    const nextWidth = input.valueAsNumber;

    if (!selected || Number.isNaN(nextWidth)) {
      return;
    }

    const viewport = this.viewport;
    const columns = this.getGridColumns(viewport);
    const hostWidth = this.getCanvasReferenceWidth(viewport);
    const columnWidth = hostWidth / columns;
    const nextSpan = Math.max(1, Math.min(columns, Math.round(nextWidth / columnWidth)));

    this.updateSelectedContainerItem(
      viewport === 'mobile'
        ? { mobileSpan: nextSpan, widthMode: 'manual' }
        : { desktopSpan: nextSpan, widthMode: 'manual' },
    );
  }

  private handleSelectedContainerRadiusInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedContainerItem({ borderRadius: input.valueAsNumber });
  }

  private handleSelectedContainerPaddingTopInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedContainerItem({ paddingTop: input.valueAsNumber });
  }

  private handleSelectedContainerPaddingRightInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedContainerItem({ paddingRight: input.valueAsNumber });
  }

  private handleSelectedContainerPaddingBottomInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedContainerItem({ paddingBottom: input.valueAsNumber });
  }

  private handleSelectedContainerPaddingLeftInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedContainerItem({ paddingLeft: input.valueAsNumber });
  }

  private startSelectedContainerNameEditing() {
    if (!this.selectedContainerItem) {
      return;
    }

    this.isEditingSelectedContainerName = true;
  }

  private stopSelectedContainerNameEditing() {
    this.isEditingSelectedContainerName = false;
  }

  private handleSelectedContainerNameInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedContainerItem({ name: input.value });
  }

  private handleSelectedContainerNameKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();
    this.stopSelectedContainerNameEditing();
  }

  private handleSelectedContainerScrollToggle(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedContainerItem({ scrollEnabled: input.checked });
  }

  private handleSelectedContainerShadowToggle(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedContainerItem({ shadowEnabled: input.checked });
  }

  private handleSelectedContainerShadowXInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedContainerItem({ shadowX: input.valueAsNumber });
  }

  private handleSelectedContainerShadowYInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedContainerItem({ shadowY: input.valueAsNumber });
  }

  private handleSelectedContainerShadowBlurInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedContainerItem({ shadowBlur: input.valueAsNumber });
  }

  private handleSelectedContainerShadowSpreadInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedContainerItem({ shadowSpread: input.valueAsNumber });
  }

  private handleSelectedContainerShadowOpacityInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.updateSelectedContainerItem({ shadowOpacity: input.valueAsNumber / 100 });
  }

  private setComponentTab(tab: ComponentTab) {
    this.componentTab = tab;
    this.selectedToolPreview = null;
  }

  private syncToolsDrawerMode = () => {
    const nextMode = window.innerWidth <= this.toolsDrawerBreakpoint;
    this.isToolsDrawerMode = nextMode;

    if (!nextMode) {
      this.isToolsDrawerOpen = false;
    }
  };

  private openToolsDrawerIfNeeded() {
    if (this.isToolsDrawerMode) {
      this.isToolsDrawerOpen = true;
    }
  }

  private toggleToolsDrawer() {
    this.isToolsDrawerOpen = !this.isToolsDrawerOpen;
  }

  private closeToolsDrawer() {
    this.isToolsDrawerOpen = false;
  }

  private handleWindowPointerDown = (event: PointerEvent) => {
    const path = event.composedPath();
    const clickedInsideDropdown = path.some(
      (target) => target instanceof HTMLElement && target.dataset.colorDropdown === 'true',
    );
    const clickedInsideCanvasMenu = path.some(
      (target) => target instanceof HTMLElement && target.dataset.canvasMenu === 'true',
    );

    if (!clickedInsideDropdown) {
      this.openColorDropdown = null;
    }

    if (!clickedInsideCanvasMenu) {
      this.isCanvasMenuOpen = false;
    }
  };

  private handleWindowScroll = () => {
    this.queueCanvasViewportSync();
  };

  private toggleCanvasMenu() {
    this.isCanvasMenuOpen = !this.isCanvasMenuOpen;
  }

  private toggleColorDropdown(key: Exclude<ColorDropdownKey, null>) {
    this.openColorDropdown = this.openColorDropdown === key ? null : key;
  }

  private rgbStringToHex(value: string) {
    const normalized = value.trim();
    if (normalized.startsWith('#')) {
      return normalized.toUpperCase();
    }

    const channels = normalized.match(/[\d.]+/g);
    if (!channels || channels.length < 3) {
      return normalized.toUpperCase();
    }

    const [red, green, blue, alpha] = channels.map(Number);
    const toHex = (channel: number) =>
      Math.max(0, Math.min(255, Math.round(channel))).toString(16).padStart(2, '0').toUpperCase();

    const rgbHex = `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
    if (typeof alpha !== 'number' || Number.isNaN(alpha) || alpha >= 1) {
      return rgbHex;
    }

    return `${rgbHex}${toHex(alpha * 255)}`;
  }

  private getSelectedColorHex(value: string) {
    if (value === 'transparent') {
      return 'TRANSPARENT';
    }

    const cached = this.colorValueCache.get(value);
    if (cached) {
      return cached;
    }

    const probe = document.createElement('span');
    probe.style.position = 'fixed';
    probe.style.opacity = '0';
    probe.style.pointerEvents = 'none';
    probe.style.color = value;
    document.body.appendChild(probe);
    const resolvedColor = getComputedStyle(probe).color;
    document.body.removeChild(probe);

    const hexValue = this.rgbStringToHex(resolvedColor);
    this.colorValueCache.set(value, hexValue);
    return hexValue;
  }

  private normalizeColorValue(value: string) {
    return value === LEGACY_WHITE_ALIAS ? WHITE_COLOR_VALUE : value;
  }

  private renderColorDropdown(
    key: Exclude<ColorDropdownKey, null>,
    options: ColorOption[],
    selectedValue: string,
    onSelect: (value: string) => void,
  ) {
    const normalizedValue = this.normalizeColorValue(selectedValue);
    const selectedOption = options.find((option) => option.value === normalizedValue) ?? options[0];
    const isOpen = this.openColorDropdown === key;
    const selectedHex = this.getSelectedColorHex(selectedOption.value);

    return html`
      <div class="color-dropdown" data-color-dropdown="true">
        <button
          class="color-dropdown-trigger"
          type="button"
          data-open=${String(isOpen)}
          @click=${() => this.toggleColorDropdown(key)}
        >
          <span class="color-dropdown-trigger-main">
            <span
              class="color-swatch-chip"
              data-transparent=${String(selectedOption.value === 'transparent')}
              style=${selectedOption.value === 'transparent'
                ? ''
                : `background:${selectedOption.value}; width: 18px; min-height: 18px; border-radius: 6px;`}
            ></span>
            <span class="color-dropdown-value">
              <span class="color-dropdown-label">${selectedOption.label}</span>
              <span class="color-dropdown-meta">${selectedHex}</span>
            </span>
          </span>
          <svg class="color-dropdown-chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        ${isOpen
          ? html`
              <div class="color-dropdown-panel">
                <p class="color-dropdown-title">Selecciona un color</p>
                <div class="color-swatch-grid">
                  ${options.map(
                    (option) => html`
                      <button
                        class="color-swatch"
                        type="button"
                        data-active=${String(option.value === selectedValue)}
                        @click=${() => {
                          onSelect(option.value);
                          this.openColorDropdown = null;
                        }}
                        aria-label=${option.label}
                        title=${option.label}
                      >
                        <span
                          class="color-swatch-chip"
                          data-transparent=${String(option.value === 'transparent')}
                          style=${option.value === 'transparent' ? '' : `background:${option.value};`}
                        ></span>
                      </button>
                    `,
                  )}
                </div>
              </div>
            `
          : null}
      </div>
    `;
  }

  private renderIconDropdown(selectedValue: IconName, onSelect: (value: IconName) => void) {
    const selectedOption =
      ICON_OPTIONS.find((option) => option.value === selectedValue) ?? ICON_OPTIONS[0];
    const isOpen = this.openColorDropdown === 'icon';

    return html`
      <div class="color-dropdown" data-color-dropdown="true">
        <button
          class="color-dropdown-trigger"
          type="button"
          data-open=${String(isOpen)}
          @click=${() => this.toggleColorDropdown('icon')}
        >
          <span class="color-dropdown-trigger-main">
            <canvas-icon class="icon-swatch-preview" .icon=${selectedOption.value}></canvas-icon>
            <span class="color-dropdown-value">
              <span class="color-dropdown-label">${selectedOption.label}</span>
              <span class="color-dropdown-meta">SVG</span>
            </span>
          </span>
          <svg class="color-dropdown-chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        ${isOpen
          ? html`
              <div class="color-dropdown-panel icon-dropdown-panel icon-picker-panel">
                <p class="color-dropdown-title">Selecciona un icono</p>
                <div class="icon-swatch-grid">
                  ${ICON_OPTIONS.map(
                    (option) => html`
                      <button
                        class="icon-swatch"
                        type="button"
                        data-active=${String(option.value === selectedValue)}
                        @click=${() => {
                          onSelect(option.value);
                          this.openColorDropdown = null;
                        }}
                        aria-label=${option.label}
                        title=${option.label}
                      >
                        <canvas-icon class="icon-swatch-preview" .icon=${option.value}></canvas-icon>
                      </button>
                    `,
                  )}
                </div>
              </div>
            `
          : null}
      </div>
    `;
  }

  private renderMicroIllustrationDropdown(
    selectedValue: MicroIllustrationName,
    onSelect: (value: MicroIllustrationName) => void,
  ) {
    const selectedOption =
      MICRO_ILLUSTRATION_OPTIONS.find((option) => option.value === selectedValue) ??
      MICRO_ILLUSTRATION_OPTIONS[0];
    const isOpen = this.openColorDropdown === 'micro-illustration';

    return html`
      <div class="color-dropdown" data-color-dropdown="true">
        <button
          class="color-dropdown-trigger"
          type="button"
          data-open=${String(isOpen)}
          @click=${() => this.toggleColorDropdown('micro-illustration')}
        >
          <span class="color-dropdown-trigger-main">
            <div class="micro-swatch-preview" style="width:32px;height:32px;">
              <canvas-micro-illustration
                .illustration=${selectedOption.value}
              ></canvas-micro-illustration>
            </div>
            <span class="color-dropdown-value">
              <span class="color-dropdown-label">${selectedOption.label}</span>
              <span class="color-dropdown-meta">PNG</span>
            </span>
          </span>
          <svg class="color-dropdown-chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        ${isOpen
          ? html`
              <div class="color-dropdown-panel icon-dropdown-panel">
                <p class="color-dropdown-title">Selecciona una micro ilustracion</p>
                <div class="icon-swatch-grid">
                  ${MICRO_ILLUSTRATION_OPTIONS.map(
                    (option) => html`
                      <button
                        class="icon-swatch"
                        type="button"
                        data-active=${String(option.value === selectedValue)}
                        @click=${() => {
                          onSelect(option.value);
                          this.openColorDropdown = null;
                        }}
                        aria-label=${option.label}
                        title=${option.label}
                      >
                        <div class="micro-swatch-preview">
                          <canvas-micro-illustration
                            .illustration=${option.value}
                          ></canvas-micro-illustration>
                        </div>
                      </button>
                    `,
                  )}
                </div>
              </div>
            `
          : null}
      </div>
    `;
  }

  private renderToolPreview() {
    if (!this.selectedToolPreview) {
      return null;
    }

    const customMoleculeId = this.getCustomMoleculeIdFromTool(this.selectedToolPreview);
    const customMolecule = customMoleculeId ? this.getCustomMoleculeById(customMoleculeId) : null;
    if (customMolecule) {
      return html`
        <div class="preview-canvas">
          <div class="preview-custom-molecule">
            ${this.getRootCanvasItems(customMolecule.scene).map((entry) =>
              this.renderCanvasEntry(entry, customMolecule.scene, false, false),
            )}
          </div>
        </div>
      `;
    }

    if (this.selectedToolPreview === 'tipografia') {
      return html`
        <div class="preview-canvas">
          <div class="preview-text">
            <canvas-tipografia
              .itemId=${'preview-tipografia'}
              .preset=${this.toolTypographyPreset}
              .text=${'Texto de ejemplo'}
              .align=${'left'}
              .bold=${false}
              .italic=${false}
              .color=${'var(--color-text)'}
              .fontSize=${32}
              .editing=${false}
            ></canvas-tipografia>
          </div>
        </div>
      `;
    }

    if (this.selectedToolPreview === 'main-button') {
      return html`
        <div class="preview-canvas">
          <div class="preview-button">
            <canvas-main-button .label=${'Conoce más'}></canvas-main-button>
          </div>
        </div>
      `;
    }

    if (this.selectedToolPreview === 'input-text') {
      return html`
        <div class="preview-canvas">
          <div style="width:280px; height:56px;">
            <canvas-input-text
              .itemId=${'preview-input-text'}
              .label=${'Número de Tarjeta'}
              .value=${''}
              .icon=${'eye-off'}
              .status=${'inactive'}
              .enabled=${false}
            ></canvas-input-text>
          </div>
        </div>
      `;
    }

    if (this.selectedToolPreview === 'icon-button') {
      return html`
        <div class="preview-canvas">
          <div style="width:34px; height:34px;">
            <canvas-icon-button .icon=${'search'}></canvas-icon-button>
          </div>
        </div>
      `;
    }

    if (this.selectedToolPreview === 'secondary-button') {
      return html`
        <div class="preview-canvas">
          <div class="preview-button">
            <canvas-secondary-button .label=${'Conoce más'}></canvas-secondary-button>
          </div>
        </div>
      `;
    }

    if (this.selectedToolPreview === 'opportunity-button') {
      return html`
        <div class="preview-canvas">
          <div class="preview-button">
            <canvas-opportunity-button .label=${'Conoce más'}></canvas-opportunity-button>
          </div>
        </div>
      `;
    }

    if (this.selectedToolPreview === 'icon') {
      return html`
        <div class="preview-canvas">
          <div style="width:40px; height:40px;">
            <canvas-icon .icon=${ICON_OPTIONS[0].value}></canvas-icon>
          </div>
        </div>
      `;
    }

    if (this.selectedToolPreview === 'desktop-menu') {
      return html`
        <div class="preview-canvas">
          <div class="preview-desktop-menu">
            <canvas-desktop-menu></canvas-desktop-menu>
          </div>
        </div>
      `;
    }

    if (this.selectedToolPreview === 'logo') {
      return html`
        <div class="preview-canvas">
          <div style="width:120px; height:32px;">
            <canvas-logo></canvas-logo>
          </div>
        </div>
      `;
    }

    if (this.selectedToolPreview === 'micro-illustration') {
      return html`
        <div class="preview-canvas">
          <div style="width:96px; height:96px;">
            <canvas-micro-illustration
              .illustration=${MICRO_ILLUSTRATION_OPTIONS[0].value}
            ></canvas-micro-illustration>
          </div>
        </div>
      `;
    }

    return html`
      <div class="preview-canvas">
        <div class="preview-container">
          <canvas-contenedor
            .background=${'transparent'}
            .borderRadius=${0}
            .outlined=${true}
            .shadowEnabled=${false}
          ></canvas-contenedor>
        </div>
      </div>
    `;
  }

  private renderToolPreviewPopover(tool: ToolPreview) {
    if (this.selectedToolPreview !== tool) {
      return null;
    }

    return html`<div class="tool-preview-popover" data-tool=${tool ?? ''}>${this.renderToolPreview()}</div>`;
  }

  private renderCustomMoleculeTool(molecule: CustomMolecule) {
    const toolKey = this.getCustomMoleculePreviewKey(molecule.id);

    return html`
      <div class="tool-preview-anchor">
        ${this.renderToolPreviewPopover(toolKey)}
        <article
          class="custom-molecule-card"
          data-selected=${String(this.selectedToolPreview === toolKey)}
          draggable="true"
          role="button"
          tabindex="0"
          @click=${() => this.handleCustomMoleculePreview(molecule.id)}
          @dragstart=${(event: DragEvent) => this.handleCustomMoleculeDragStart(event, molecule.id)}
          @dragend=${this.handleCustomMoleculeDragEnd}
        >
          <div class="custom-molecule-badge" aria-hidden="true"></div>
          <p class="custom-molecule-title">${molecule.name}</p>
        </article>
      </div>
    `;
  }

  private toggleCodeView() {
    this.handleWindowPointerUp();
    this.isCanvasDragActive = false;
    this.openColorDropdown = null;
    this.isPrototypeMode = false;
    this.isCodeView = !this.isCodeView;
  }

  private togglePrototypeMode() {
    this.handleWindowPointerUp();
    this.isCanvasDragActive = false;
    this.openColorDropdown = null;
    this.selectedToolPreview = null;
    this.isCodeView = false;

    if (this.isPrototypeMode) {
      this.isPrototypeMode = false;
      this.enterCanvasEditing();
      return;
    }

    this.clearActiveEditingState();
    this.isPrototypeMode = true;
  }

  private resolveCanvasTargetFromAction(action: string) {
    const normalizedAction = action.replace(/^(goto|canvas|screen)\s*:/i, '').trim().toLowerCase();
    if (!normalizedAction) {
      return null;
    }

    return (
      this.canvases.find((canvas) => canvas.id.toLowerCase() === normalizedAction) ??
      this.canvases.find((canvas) => canvas.name.trim().toLowerCase() === normalizedAction) ??
      null
    );
  }

  private handlePrototypeButtonClick(event: MouseEvent, item: CanvasButtonItem) {
    if (!this.isPrototypeMode) {
      return;
    }

    event.stopPropagation();
    const action = item.action.trim();
    if (!action) {
      return;
    }

    if (/^https?:\/\//i.test(action)) {
      window.open(action, '_blank', 'noopener,noreferrer');
      return;
    }

    const targetCanvas = this.resolveCanvasTargetFromAction(action);
    if (targetCanvas) {
      this.activateCanvas(targetCanvas.id, false);
    }
  }

  private getFontFamilyForPreset(preset: TypographyPreset) {
    return preset === 'tiempos-headline' ? "'Tiempos Headline', serif" : "'Benton Sans BBVA', sans-serif";
  }

  private getFontWeightForItem(item: CanvasTypographyItem) {
    const baseWeight =
      item.preset === 'benton-book' ? 400 : item.preset === 'tiempos-headline' ? 700 : 500;

    if (!item.bold) {
      return baseWeight;
    }

    return item.preset === 'tiempos-headline' ? 800 : 700;
  }

  private getFontStyleForItem(item: CanvasTypographyItem) {
    if (item.preset === 'benton-medium-italic') {
      return 'italic';
    }

    return item.italic ? 'italic' : 'normal';
  }

  private getTypographyMarkup(item: CanvasTypographyItem) {
    return item.text.includes('<') || item.text.includes('&')
      ? item.text
      : this.escapeCodeText(item.text);
  }

  private escapeCodeText(text: string) {
    return text
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;');
  }

  private buildTypographyCode(item: CanvasTypographyItem) {
    const style = [
      'position: absolute',
      `left: ${Math.round(item.x)}px`,
      `top: ${Math.round(item.y)}px`,
      `width: ${Math.round(item.width)}px`,
      `height: ${Math.round(item.height)}px`,
      `font-family: ${this.getFontFamilyForPreset(item.preset)}`,
      `font-size: ${item.fontSize}px`,
      `color: ${item.color}`,
      `font-weight: ${this.getFontWeightForItem(item)}`,
      `font-style: ${this.getFontStyleForItem(item)}`,
      `text-align: ${item.align}`,
      'line-height: 0.95',
      'white-space: nowrap',
      'overflow: hidden',
      'text-overflow: ellipsis',
      'margin: 0',
    ].join('; ');

    return `  <p style="${style}">${this.getTypographyMarkup(item)}</p>`;
  }

  private buildButtonCode(item: CanvasButtonItem) {
    const fontSize = item.fontSize ?? 22;
    if (item.variant === 'icon-button') {
      const icon =
        ICON_OPTIONS.find((option) => option.value === (item.icon ?? 'search')) ?? ICON_OPTIONS[0];
      const style = [
        'position: absolute',
        `left: ${Math.round(item.x)}px`,
        `top: ${Math.round(item.y)}px`,
        `width: ${Math.round(item.width)}px`,
        `height: ${Math.round(item.height)}px`,
        'box-sizing: border-box',
        'border: none',
        'border-radius: 999px',
        `background: ${item.backgroundVisible === false ? 'transparent' : 'rgba(19, 30, 68, 0.08)'}`,
        'display: grid',
        'place-items: center',
        'padding: 0',
      ].join('; ');

      const actionAttribute = item.action
        ? ` data-action="${this.escapeCodeText(item.action)}"`
        : '';

      return `  <button type="button" style="${style}"${actionAttribute}><svg viewBox="${icon.viewBox}" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="width:18px;height:18px;display:block;color:var(--color-primary-strong);">${icon.body}</svg></button>`;
    }

    const background =
      item.variant === 'secondary'
        ? '#ffffff'
        : item.variant === 'opportunity'
          ? 'var(--color-primary)'
          : 'linear-gradient(180deg, #1829b8 0%, #1220a0 100%)';
    const color = item.variant === 'secondary' ? '#1829b8' : '#ffffff';
    const shadow =
      item.variant === 'secondary'
        ? '0 16px 32px rgba(10, 19, 92, 0.14)'
        : item.variant === 'opportunity'
          ? '0 16px 32px rgba(45, 124, 255, 0.22)'
          : '0 16px 32px rgba(10, 19, 92, 0.18)';

    const style = [
      'position: absolute',
      `left: ${Math.round(item.x)}px`,
      `top: ${Math.round(item.y)}px`,
      `width: ${Math.round(item.width)}px`,
      `height: ${Math.round(item.height)}px`,
      'box-sizing: border-box',
      'border: none',
      'border-radius: 18px',
      `background: ${background}`,
      `color: ${color}`,
      "font-family: 'Benton Sans BBVA', sans-serif",
      `font-size: ${fontSize}px`,
      'font-weight: 500',
      'line-height: 1',
      'letter-spacing: -0.01em',
      'padding: 0 16px',
      `box-shadow: ${shadow}`,
    ].join('; ');

    const actionAttribute = item.action
      ? ` data-action="${this.escapeCodeText(item.action)}"`
      : '';

    return `  <button style="${style}"${actionAttribute}>${this.escapeCodeText(item.label)}</button>`;
  }

  private buildInputTextCode(item: CanvasInputTextItem) {
    const icon =
      ICON_OPTIONS.find((option) => option.value === (item.icon ?? 'eye-off')) ?? ICON_OPTIONS[0];
    const isFloating = item.value.trim().length > 0 || (item.status ?? 'inactive') === 'active';
    const wrapperStyle = [
      'position: absolute',
      `left: ${Math.round(item.x)}px`,
      `top: ${Math.round(item.y)}px`,
      `width: ${Math.round(item.width)}px`,
      `height: ${Math.round(item.height)}px`,
      'box-sizing: border-box',
      `border: 1.5px solid ${(item.status ?? 'inactive') === 'active' ? 'var(--color-primary)' : 'rgba(19, 30, 68, 0.42)'}`,
      'border-radius: 16px',
      'background: var(--color-surface)',
      'padding: 8px 14px 8px 18px',
      'display: grid',
      'grid-template-columns: minmax(0, 1fr) auto',
      'align-items: center',
      'gap: 12px',
    ].join('; ');

    const labelStyle = [
      'display: block',
      "font-family: 'Benton Sans BBVA', sans-serif",
      `font-size: ${isFloating ? 11 : 16}px`,
      'color: var(--color-text-muted)',
      'line-height: 1',
      `margin-bottom: ${isFloating ? 4 : 0}px`,
      'white-space: nowrap',
      'overflow: hidden',
      'text-overflow: ellipsis',
    ].join('; ');

    const contentStyle = [
      'min-width: 0',
      'height: 100%',
      'display: flex',
      'flex-direction: column',
      'justify-content: center',
      'gap: 4px',
      'overflow: hidden',
    ].join('; ');

    const inputStyle = [
      'width: 100%',
      'border: none',
      'outline: none',
      'background: transparent',
      'color: var(--color-text)',
      "font-family: 'Benton Sans BBVA', sans-serif",
      'font-size: 16px',
      'font-weight: 500',
      'line-height: 1',
      'padding: 0',
      `opacity: ${isFloating ? 1 : 0}`,
    ].join('; ');

    const actionsStyle = [
      'display: inline-flex',
      'align-items: center',
      'justify-content: flex-end',
      'gap: 8px',
    ].join('; ');

    const iconStyle = [
      'width: 20px',
      'height: 20px',
      'display: block',
      'color: #001391',
    ].join('; ');

    const clearStyle = [
      'width: 20px',
      'height: 20px',
      'display: block',
      'color: #001391',
    ].join('; ');

    return [
      `  <label style="${wrapperStyle}">`,
      `    <div style="${contentStyle}">`,
      `      <span style="${labelStyle}">${this.escapeCodeText(item.label)}</span>`,
      `      <input type="text" value="${this.escapeCodeText(item.value)}" style="${inputStyle}" />`,
      `    </div>`,
      `    <div style="${actionsStyle}">`,
      item.value.trim().length > 0
        ? `      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="${clearStyle}"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" /></svg>`
        : '',
      `      <svg viewBox="${icon.viewBox}" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="${iconStyle}">${icon.body}</svg>`,
      `    </div>`,
      `  </label>`,
    ]
      .filter(Boolean)
      .join('\n');
  }

  private buildIconCode(item: CanvasIconItem): string {
    const icon = ICON_OPTIONS.find((option) => option.value === item.icon) ?? ICON_OPTIONS[0];
    const style = [
      'position: absolute',
      `left: ${Math.round(item.x)}px`,
      `top: ${Math.round(item.y)}px`,
      `width: ${Math.round(item.width)}px`,
      `height: ${Math.round(item.height)}px`,
      `color: ${this.normalizeColorValue(item.color ?? 'var(--color-primary-strong)')}`,
    ].join('; ');

    return `  <div style="${style}"><svg viewBox="${icon.viewBox}" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">${icon.body}</svg></div>`;
  }

  private buildDesktopMenuCode(item: CanvasDesktopMenuItem): string {
    const style = [
      'position: absolute',
      `left: ${Math.round(item.x)}px`,
      `top: ${Math.round(item.y)}px`,
      `width: ${Math.round(item.width)}px`,
      `height: ${Math.round(item.height)}px`,
      'box-sizing: border-box',
      'display: flex',
      'align-items: center',
      'justify-content: space-between',
      'gap: 24px',
      'padding: 22px 30px',
      'border-radius: 28px',
      'background: #ffffff',
      'box-shadow: 0 14px 34px rgba(24, 37, 76, 0.1)',
      'overflow: hidden',
      "font-family: 'Benton Sans BBVA', sans-serif",
    ].join('; ');

    const navStyle = [
      'display: flex',
      'align-items: center',
      'gap: 26px',
      'white-space: nowrap',
      'color: #0b1f8f',
      'font-size: 15px',
      'font-weight: 500',
      'line-height: 1.1',
      'letter-spacing: -0.01em',
    ].join('; ');

    const actionStyle = [
      'display: flex',
      'align-items: center',
      'gap: 18px',
      'white-space: nowrap',
    ].join('; ');

    return [
      `  <header style="${style}">`,
      `    <img src="https://www.bbva.mx/content/dam/library/logos/logo-bbva.svg" alt="BBVA" style="height:48px;width:auto;display:block;" />`,
      `    <nav style="${navStyle}" aria-label="Navegacion principal">`,
      `      <span style="padding-bottom:6px;border-bottom:2px solid #102694;">Personas</span>`,
      `      <span>Empresas y Gobierno</span>`,
      `      <span>Pyme</span>`,
      `    </nav>`,
      `    <div style="${actionStyle}">`,
      `      <button type="button" style="height:56px;padding:0 16px;border:none;border-radius:14px;background:linear-gradient(180deg, #ffffff 0%, #f3f5fb 100%);box-shadow:inset 0 0 0 1px rgba(217, 225, 238, 0.98), 0 10px 24px rgba(24, 37, 76, 0.08);color:#1030a4;font-family:'Benton Sans BBVA', sans-serif;font-size:15px;font-weight:500;box-sizing:border-box;">Acceso</button>`,
      `      <button type="button" style="height:56px;padding:0 16px;border:none;border-radius:14px;background:linear-gradient(180deg, #2d7cff 0%, #1462ee 100%);box-shadow:0 14px 28px rgba(33, 94, 224, 0.24);color:#ffffff;font-family:'Benton Sans BBVA', sans-serif;font-size:15px;font-weight:500;box-sizing:border-box;">Hazte cliente</button>`,
      `      <span style="display:inline-flex;align-items:center;color:#0f278f;font-size:15px;font-weight:500;">Buscar</span>`,
      `      <span style="display:inline-flex;align-items:center;color:#0f278f;font-size:15px;font-weight:500;">Menú</span>`,
      `    </div>`,
      `  </header>`,
    ].join('\n');
  }

  private buildLogoCode(item: CanvasLogoItem): string {
    const style = [
      'position: absolute',
      `left: ${Math.round(item.x)}px`,
      `top: ${Math.round(item.y)}px`,
      `width: ${Math.round(item.width)}px`,
      `height: ${Math.round(item.height)}px`,
      'display: block',
    ].join('; ');

    return `  <img src="https://www.bbva.mx/content/dam/library/logos/logo-bbva.svg" alt="Logo BBVA" style="${style}" />`;
  }

  private buildMicroIllustrationCode(item: CanvasMicroIllustrationItem): string {
    const illustration =
      MICRO_ILLUSTRATION_OPTIONS.find((option) => option.value === item.illustration) ??
      MICRO_ILLUSTRATION_OPTIONS[0];
    const style = [
      'position: absolute',
      `left: ${Math.round(item.x)}px`,
      `top: ${Math.round(item.y)}px`,
      `width: ${Math.round(item.width)}px`,
      `height: ${Math.round(item.height)}px`,
      'display: block',
      'object-fit: contain',
    ].join('; ');

    return `  <img src="${illustration.src}" alt="${illustration.label}" style="${style}" />`;
  }

  private buildCanvasEntryCode(entry: CanvasEntry): string {
    if (entry.kind === 'typography') {
      return this.buildTypographyCode(entry.item);
    }

    if (entry.kind === 'button') {
      return this.buildButtonCode(entry.item);
    }

    if (entry.kind === 'input-text') {
      return this.buildInputTextCode(entry.item);
    }

    if (entry.kind === 'icon') {
      return this.buildIconCode(entry.item);
    }

    if (entry.kind === 'desktop-menu') {
      return this.buildDesktopMenuCode(entry.item);
    }

    if (entry.kind === 'logo') {
      return this.buildLogoCode(entry.item);
    }

    if (entry.kind === 'micro-illustration') {
      return this.buildMicroIllustrationCode(entry.item);
    }

    return this.buildContainerCode(entry.item);
  }

  private buildContainerCode(item: CanvasContainerItem): string {
    const columns = this.viewport === 'mobile' ? 4 : 12;
    const start = this.viewport === 'mobile' ? item.mobileStart : item.desktopStart;
    const span = this.viewport === 'mobile' ? item.mobileSpan : item.desktopSpan;
    const widthStyle =
      item.widthMode === 'auto'
        ? `width: ${Math.round(this.getContainerRenderedWidth(item))}px`
        : `width: ${this.getContainerWidthPercent(span, columns)}%`;
    const heightStyle =
      item.heightMode === 'auto'
        ? `height: ${Math.round(this.getContainerRenderedHeight(item))}px`
        : `height: ${Math.round(item.height)}px`;
    const style = [
      'position: absolute',
      `left: ${this.getContainerLeftPercent(start, columns)}%`,
      `top: ${Math.round(item.y)}px`,
      widthStyle,
      heightStyle,
      `padding: ${item.paddingTop}px ${item.paddingRight}px ${item.paddingBottom}px ${item.paddingLeft}px`,
      'box-sizing: border-box',
      `border-radius: ${item.borderRadius}px`,
      `background: ${item.background}`,
      `overflow: ${item.scrollEnabled ? 'auto' : 'hidden'}`,
      `box-shadow: ${this.getContainerBoxShadow(item)}`,
    ].join('; ');

    const children: string[] = this.getContainerChildren(item.id).map((child) =>
      this.buildCanvasEntryCode(child),
    );

    if (children.length === 0) {
      return `  <div style="${style}"></div>`;
    }

    return [
      `  <div style="${style}">`,
      ...children.map((line: string) => `    ${line.trimStart()}`),
      `  </div>`,
    ].join('\n');
  }

  private buildCanvasCode() {
    const lines = [
      `<div class="canvas canvas--${this.viewport}" style="position: relative; min-height: 780px; background: ${this.canvasBackground};">`,
      ...(this.rootCanvasItems.length === 0
        ? ['  <!-- Arrastra "Textos", botones o "Contenedor" desde el panel para comenzar -->']
        : this.rootCanvasItems.map((entry) => this.buildCanvasEntryCode(entry))),
      `</div>`,
    ];

    return lines.join('\n');
  }

  private handleCanvasDragOver(event: DragEvent) {
    if (this.isCodeView) {
      return;
    }

    const draggedTool =
      this.activeDraggedTool ??
      event.dataTransfer?.getData('application/x-ui-tool') ??
      event.dataTransfer?.getData('text/plain');

    if (!draggedTool) {
      return;
    }

    if (
      draggedTool !== 'tipografia' &&
      draggedTool !== 'main-button' &&
      draggedTool !== 'input-text' &&
      draggedTool !== 'secondary-button' &&
      draggedTool !== 'opportunity-button' &&
      draggedTool !== 'icon-button' &&
      draggedTool !== 'icon' &&
      draggedTool !== 'desktop-menu' &&
      draggedTool !== 'logo' &&
      draggedTool !== 'micro-illustration' &&
      draggedTool !== 'contenedor' &&
      !draggedTool.startsWith('custom-molecule:')
    ) {
      return;
    }

    event.preventDefault();
    this.isCanvasDragActive = true;
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
  }

  private handleCanvasDragLeave(event: DragEvent) {
    if (this.isCodeView) {
      return;
    }

    const relatedTarget = event.relatedTarget as Node | null;
    const currentTarget = event.currentTarget as HTMLElement;

    if (relatedTarget && currentTarget.contains(relatedTarget)) {
      return;
    }

    this.isCanvasDragActive = false;
  }

  private handleCanvasDrop(event: DragEvent) {
    if (this.isCodeView) {
      return;
    }

    event.preventDefault();
    this.isCanvasDragActive = false;

    const tool =
      this.activeDraggedTool ??
      event.dataTransfer?.getData('application/x-ui-tool') ??
      event.dataTransfer?.getData('text/plain');

    this.activeDraggedTool = null;

    if (!tool) {
      return;
    }

    const canvas = event.currentTarget as HTMLElement;
    const rect = canvas.getBoundingClientRect();
    const dropContainer = this.getDropContainerAtPoint(event.clientX, event.clientY);

    if (tool === 'tipografia') {
      const itemWidth = this.viewport === 'mobile' ? 208 : 240;
      const itemHeight = this.getDefaultTypographyHeight(this.toolTypographyPreset);
      const hostRect = dropContainer?.rect ?? rect;
      const x = Math.max(
        0,
        Math.min(hostRect.width - itemWidth, event.clientX - hostRect.left - itemWidth / 2),
      );
      const y = Math.max(
        0,
        Math.min(hostRect.height - itemHeight, event.clientY - hostRect.top - itemHeight / 2),
      );

      this.createTypographyItem(x, y, dropContainer?.container.id ?? null);
      return;
    }

    if (tool === 'main-button') {
      const itemWidth = this.viewport === 'mobile' ? 248 : 304;
      const itemHeight = 55;
      const hostRect = dropContainer?.rect ?? rect;
      const x = Math.max(
        0,
        Math.min(hostRect.width - itemWidth, event.clientX - hostRect.left - itemWidth / 2),
      );
      const y = Math.max(
        0,
        Math.min(hostRect.height - itemHeight, event.clientY - hostRect.top - itemHeight / 2),
      );

      this.createButtonItem('main', x, y, dropContainer?.container.id ?? null);
      return;
    }

    if (tool === 'input-text') {
      const itemWidth = 200;
      const itemHeight = 56;
      const hostRect = dropContainer?.rect ?? rect;
      const x = Math.max(
        0,
        Math.min(hostRect.width - itemWidth, event.clientX - hostRect.left - itemWidth / 2),
      );
      const y = Math.max(
        0,
        Math.min(hostRect.height - itemHeight, event.clientY - hostRect.top - itemHeight / 2),
      );

      this.createInputTextItem(x, y, dropContainer?.container.id ?? null);
      return;
    }

    if (tool === 'secondary-button') {
      const itemWidth = this.viewport === 'mobile' ? 248 : 304;
      const itemHeight = 55;
      const hostRect = dropContainer?.rect ?? rect;
      const x = Math.max(
        0,
        Math.min(hostRect.width - itemWidth, event.clientX - hostRect.left - itemWidth / 2),
      );
      const y = Math.max(
        0,
        Math.min(hostRect.height - itemHeight, event.clientY - hostRect.top - itemHeight / 2),
      );

      this.createButtonItem('secondary', x, y, dropContainer?.container.id ?? null);
      return;
    }

    if (tool === 'icon-button') {
      const itemWidth = 34;
      const itemHeight = 34;
      const hostRect = dropContainer?.rect ?? rect;
      const x = Math.max(
        0,
        Math.min(hostRect.width - itemWidth, event.clientX - hostRect.left - itemWidth / 2),
      );
      const y = Math.max(
        0,
        Math.min(hostRect.height - itemHeight, event.clientY - hostRect.top - itemHeight / 2),
      );

      this.createButtonItem('icon-button', x, y, dropContainer?.container.id ?? null);
      return;
    }

    if (tool === 'opportunity-button') {
      const itemWidth = this.viewport === 'mobile' ? 248 : 304;
      const itemHeight = 55;
      const hostRect = dropContainer?.rect ?? rect;
      const x = Math.max(
        0,
        Math.min(hostRect.width - itemWidth, event.clientX - hostRect.left - itemWidth / 2),
      );
      const y = Math.max(
        0,
        Math.min(hostRect.height - itemHeight, event.clientY - hostRect.top - itemHeight / 2),
      );

      this.createButtonItem('opportunity', x, y, dropContainer?.container.id ?? null);
      return;
    }

    if (tool === 'icon') {
      const itemWidth = 40;
      const itemHeight = 40;
      const hostRect = dropContainer?.rect ?? rect;
      const x = Math.max(
        0,
        Math.min(hostRect.width - itemWidth, event.clientX - hostRect.left - itemWidth / 2),
      );
      const y = Math.max(
        0,
        Math.min(hostRect.height - itemHeight, event.clientY - hostRect.top - itemHeight / 2),
      );

      this.createIconItem(x, y, dropContainer?.container.id ?? null);
      return;
    }

    if (tool === 'desktop-menu') {
      const hostRect = dropContainer?.rect ?? rect;
      const itemWidth = Math.min(hostRect.width, this.viewport === 'mobile' ? 430 : 1120);
      const itemHeight = 118;
      const y = Math.max(
        0,
        Math.min(hostRect.height - itemHeight, event.clientY - hostRect.top - itemHeight / 2),
      );

      this.createDesktopMenuItem(y, dropContainer?.container.id ?? null, itemWidth);
      return;
    }

    if (tool.startsWith('custom-molecule:')) {
      const moleculeId = this.getCustomMoleculeIdFromTool(tool);
      const molecule = moleculeId ? this.getCustomMoleculeById(moleculeId) : null;
      if (!molecule) {
        return;
      }

      const rootContainer = this.getCustomMoleculeRootContainer(molecule);
      if (!rootContainer) {
        return;
      }

      const hostRect = dropContainer?.rect ?? rect;
      const itemHeight = rootContainer.height;
      const itemWidth =
        hostRect.width *
        this.getContainerWidthPercent(
          this.viewport === 'mobile' ? rootContainer.mobileSpan : rootContainer.desktopSpan,
          this.getGridColumns(),
        );
      const x = Math.max(
        0,
        Math.min(hostRect.width - itemWidth, event.clientX - hostRect.left - itemWidth / 2),
      );
      const y = Math.max(
        0,
        Math.min(hostRect.height - itemHeight, event.clientY - hostRect.top - itemHeight / 2),
      );

      this.instantiateCustomMolecule(
        molecule,
        y,
        dropContainer?.container.id ?? null,
        x,
        hostRect.width,
      );
      return;
    }

    if (tool === 'logo') {
      const itemWidth = 120;
      const itemHeight = 32;
      const hostRect = dropContainer?.rect ?? rect;
      const x = Math.max(
        0,
        Math.min(hostRect.width - itemWidth, event.clientX - hostRect.left - itemWidth / 2),
      );
      const y = Math.max(
        0,
        Math.min(hostRect.height - itemHeight, event.clientY - hostRect.top - itemHeight / 2),
      );

      this.createLogoItem(x, y, dropContainer?.container.id ?? null);
      return;
    }

    if (tool === 'micro-illustration') {
      const itemWidth = 96;
      const itemHeight = 96;
      const hostRect = dropContainer?.rect ?? rect;
      const x = Math.max(
        0,
        Math.min(hostRect.width - itemWidth, event.clientX - hostRect.left - itemWidth / 2),
      );
      const y = Math.max(
        0,
        Math.min(hostRect.height - itemHeight, event.clientY - hostRect.top - itemHeight / 2),
      );

      this.createMicroIllustrationItem(x, y, dropContainer?.container.id ?? null);
      return;
    }

    if (tool === 'contenedor') {
      const columns = this.getGridColumns();
      const span = this.viewport === 'mobile' ? 4 : 6;
      const itemWidth = (rect.width * span) / columns;
      const itemHeight = 168;
      const canAbsorb =
        dropContainer &&
        dropContainer.rect.width > itemWidth &&
        dropContainer.rect.height > itemHeight;
      const hostRect = canAbsorb ? dropContainer.rect : rect;
      const nextLeft = Math.max(
        0,
        Math.min(hostRect.width - itemWidth, event.clientX - hostRect.left - itemWidth / 2),
      );
      const nextY = Math.max(
        0,
        Math.min(hostRect.height - itemHeight, event.clientY - hostRect.top - itemHeight / 2),
      );
      const start = this.getContainerStartFromX(nextLeft, hostRect.width, columns, span);

      this.createContainerItem(
        nextY,
        this.viewport === 'desktop' ? start : 1,
        this.viewport === 'mobile' ? start : 1,
        canAbsorb ? dropContainer.container.id : null,
      );
    }
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

  private renderCanvasButton(item: CanvasButtonItem): TemplateResult {
    const fontSize = item.fontSize ?? 22;
    return item.variant === 'icon-button'
      ? html`<canvas-icon-button
          .icon=${item.icon ?? 'search'}
          .backgroundVisible=${item.backgroundVisible ?? true}
        ></canvas-icon-button>`
      : item.variant === 'secondary'
      ? html`<canvas-secondary-button
          .label=${item.label}
          .fontSize=${fontSize}
        ></canvas-secondary-button>`
      : item.variant === 'opportunity'
        ? html`<canvas-opportunity-button
            .label=${item.label}
            .fontSize=${fontSize}
          ></canvas-opportunity-button>`
        : html`<canvas-main-button
            .label=${item.label}
            .fontSize=${fontSize}
          ></canvas-main-button>`;
  }

  private renderCanvasEntry(
    entry: CanvasEntry,
    scene: CanvasScene = this.getActiveCanvasScene(),
    interactive = true,
    allowNativeInputInteraction = false,
  ): TemplateResult {
    if (entry.kind === 'typography') {
      const item = entry.item;
      const isSelected = interactive && this.selectedTypographyId === item.id;

      return html`
        <div
          class="canvas-item"
          data-kind="typography"
          data-item-id=${interactive ? item.id : nothing}
          data-selected=${String(isSelected)}
          style=${`left:${item.x}px; top:${item.y}px; width:${item.width}px; height:${item.height}px;`}
          @dblclick=${interactive
            ? (event: MouseEvent) => {
                event.stopPropagation();
                this.handleCanvasItemDoubleClick(item.id);
              }
            : nothing}
          @pointerdown=${interactive
            ? (event: PointerEvent) => {
                event.stopPropagation();
                this.handleCanvasItemPointerDown(event, item.id);
              }
            : nothing}
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
            .color=${item.color}
            .fontSize=${item.fontSize}
            .editing=${interactive && this.editingTypographyId === item.id}
          ></canvas-tipografia>
        </div>
      `;
    }

    if (entry.kind === 'button') {
      const item = entry.item;
      const isSelected = interactive && this.selectedTypographyId === item.id;

      return html`
        <div
          class="canvas-item"
          data-kind="button"
          data-button-variant=${item.variant}
          data-item-id=${interactive ? item.id : nothing}
          data-selected=${String(isSelected)}
          style=${`left:${item.x}px; top:${item.y}px; width:${item.width}px; height:${item.height}px;`}
          @dblclick=${interactive
            ? (event: MouseEvent) => {
                event.stopPropagation();
                this.handleCanvasItemDoubleClick(item.id);
              }
            : nothing}
          @pointerdown=${interactive
            ? (event: PointerEvent) => {
                event.stopPropagation();
                this.handleCanvasItemPointerDown(event, item.id);
              }
            : nothing}
          @click=${this.isPrototypeMode
            ? (event: MouseEvent) => this.handlePrototypeButtonClick(event, item)
            : nothing}
        >
          <span class="handle top-left"></span>
          <span class="handle top-right"></span>
          <span class="handle bottom-left"></span>
          <span class="handle bottom-right"></span>
          ${this.renderCanvasButton(item)}
        </div>
      `;
    }

    if (entry.kind === 'input-text') {
      const item = entry.item;
      const isSelected = interactive && this.selectedTypographyId === item.id;

      return html`
        <div
          class="canvas-item"
          data-kind="input-text"
          data-item-id=${interactive ? item.id : nothing}
          data-selected=${String(isSelected)}
          style=${`left:${item.x}px; top:${item.y}px; width:${item.width}px; height:${item.height}px;`}
          @pointerdown=${interactive
            ? (event: PointerEvent) => {
                if (
                  event.composedPath().some(
                    (target) =>
                      target instanceof HTMLInputElement ||
                      target instanceof HTMLButtonElement ||
                      target instanceof SVGElement ||
                      (target instanceof HTMLElement &&
                        (target.classList.contains('field') ||
                          target.classList.contains('content') ||
                          target.classList.contains('input') ||
                          target.classList.contains('label') ||
                          target.classList.contains('actions') ||
                          target.classList.contains('action-button'))),
                  )
                ) {
                  return;
                }
                event.stopPropagation();
                this.handleCanvasItemPointerDown(event, item.id);
              }
            : nothing}
        >
          <span class="handle top-left"></span>
          <span class="handle top-right"></span>
          <span class="handle bottom-left"></span>
          <span class="handle bottom-right"></span>
          <canvas-input-text
            .itemId=${item.id}
            .label=${item.label}
            .value=${item.value}
            .icon=${item.icon ?? 'eye-off'}
            .status=${item.status ?? 'inactive'}
            .enabled=${allowNativeInputInteraction}
          ></canvas-input-text>
        </div>
      `;
    }

    if (entry.kind === 'icon') {
      const item = entry.item;
      const isSelected = interactive && this.selectedTypographyId === item.id;

      return html`
        <div
          class="canvas-item"
          data-kind="icon"
          data-item-id=${interactive ? item.id : nothing}
          data-selected=${String(isSelected)}
          style=${`left:${item.x}px; top:${item.y}px; width:${item.width}px; height:${item.height}px;`}
          @dblclick=${interactive
            ? (event: MouseEvent) => {
                event.stopPropagation();
                this.handleCanvasItemDoubleClick(item.id);
              }
            : nothing}
          @pointerdown=${interactive
            ? (event: PointerEvent) => {
                event.stopPropagation();
                this.handleCanvasItemPointerDown(event, item.id);
              }
            : nothing}
        >
          <span class="handle top-left"></span>
          <span class="handle top-right"></span>
          <span class="handle bottom-left"></span>
          <span class="handle bottom-right"></span>
          <canvas-icon
            .icon=${item.icon}
            .color=${item.color ?? 'var(--color-primary-strong)'}
          ></canvas-icon>
        </div>
      `;
    }

    if (entry.kind === 'desktop-menu') {
      const item = entry.item;
      const isSelected = interactive && this.selectedTypographyId === item.id;

      return html`
        <div
          class="canvas-item"
          data-kind="desktop-menu"
          data-item-id=${interactive ? item.id : nothing}
          data-selected=${String(isSelected)}
          style=${`left:${item.x}px; top:${item.y}px; width:${item.width}px; height:${item.height}px;`}
          @dblclick=${interactive
            ? (event: MouseEvent) => {
                event.stopPropagation();
                this.handleCanvasItemDoubleClick(item.id);
              }
            : nothing}
          @pointerdown=${interactive
            ? (event: PointerEvent) => {
                event.stopPropagation();
                this.handleCanvasItemPointerDown(event, item.id);
              }
            : nothing}
        >
          <span class="handle top-left"></span>
          <span class="handle top-right"></span>
          <span class="handle bottom-left"></span>
          <span class="handle bottom-right"></span>
          <canvas-desktop-menu></canvas-desktop-menu>
        </div>
      `;
    }

    if (entry.kind === 'logo') {
      const item = entry.item;
      const isSelected = interactive && this.selectedTypographyId === item.id;

      return html`
        <div
          class="canvas-item"
          data-kind="logo"
          data-item-id=${interactive ? item.id : nothing}
          data-selected=${String(isSelected)}
          style=${`left:${item.x}px; top:${item.y}px; width:${item.width}px; height:${item.height}px;`}
          @dblclick=${interactive
            ? (event: MouseEvent) => {
                event.stopPropagation();
                this.handleCanvasItemDoubleClick(item.id);
              }
            : nothing}
          @pointerdown=${interactive
            ? (event: PointerEvent) => {
                event.stopPropagation();
                this.handleCanvasItemPointerDown(event, item.id);
              }
            : nothing}
        >
          <span class="handle top-left"></span>
          <span class="handle top-right"></span>
          <span class="handle bottom-left"></span>
          <span class="handle bottom-right"></span>
          <canvas-logo></canvas-logo>
        </div>
      `;
    }

    if (entry.kind === 'micro-illustration') {
      const item = entry.item;
      const isSelected = interactive && this.selectedTypographyId === item.id;

      return html`
        <div
          class="canvas-item"
          data-kind="micro-illustration"
          data-item-id=${interactive ? item.id : nothing}
          data-selected=${String(isSelected)}
          style=${`left:${item.x}px; top:${item.y}px; width:${item.width}px; height:${item.height}px;`}
          @dblclick=${interactive
            ? (event: MouseEvent) => {
                event.stopPropagation();
                this.handleCanvasItemDoubleClick(item.id);
              }
            : nothing}
          @pointerdown=${interactive
            ? (event: PointerEvent) => {
                event.stopPropagation();
                this.handleCanvasItemPointerDown(event, item.id);
              }
            : nothing}
        >
          <span class="handle top-left"></span>
          <span class="handle top-right"></span>
          <span class="handle bottom-left"></span>
          <span class="handle bottom-right"></span>
          <canvas-micro-illustration
            .illustration=${item.illustration}
          ></canvas-micro-illustration>
        </div>
      `;
    }

    const item = entry.item;
    const isSelected = interactive && this.selectedTypographyId === item.id;
    const widthStyle =
      item.widthMode === 'auto'
        ? `${this.getContainerRenderedWidth(item)}px`
        : `${this.getContainerWidthPercent(
            this.viewport === 'mobile' ? item.mobileSpan : item.desktopSpan,
            this.getGridColumns(),
          )}%`;
    const heightStyle = `${this.getContainerRenderedHeight(item)}px`;

    return html`
      <div
        class="canvas-item"
        data-kind="container"
        data-item-id=${interactive ? item.id : nothing}
        data-selected=${String(isSelected)}
        style=${`left:${this.getContainerLeftPercent(
          this.viewport === 'mobile' ? item.mobileStart : item.desktopStart,
          this.getGridColumns(),
        )}%; top:${item.y}px; width:${widthStyle}; height:${heightStyle};`}
        @dblclick=${interactive
          ? (event: MouseEvent) => {
              event.stopPropagation();
              this.handleCanvasItemDoubleClick(item.id);
            }
          : nothing}
        @pointerdown=${interactive
          ? (event: PointerEvent) => {
              event.stopPropagation();
              this.handleCanvasItemPointerDown(event, item.id);
            }
          : nothing}
      >
        <span
          class="handle top-left"
          @pointerdown=${interactive
            ? (event: PointerEvent) =>
                this.handleContainerResizePointerDown(event, item, 'top-left')
            : nothing}
        ></span>
        <span
          class="handle top-right"
          @pointerdown=${interactive
            ? (event: PointerEvent) =>
                this.handleContainerResizePointerDown(event, item, 'top-right')
            : nothing}
        ></span>
        <span
          class="handle bottom-left"
          @pointerdown=${interactive
            ? (event: PointerEvent) =>
                this.handleContainerResizePointerDown(event, item, 'bottom-left')
            : nothing}
        ></span>
        <span
          class="handle bottom-right"
          @pointerdown=${interactive
            ? (event: PointerEvent) =>
                this.handleContainerResizePointerDown(event, item, 'bottom-right')
            : nothing}
        ></span>
        <canvas-contenedor
          .background=${item.background}
          .borderRadius=${item.borderRadius}
          .outlined=${isSelected}
          .shadowEnabled=${item.shadowEnabled}
          .shadowX=${item.shadowX}
          .shadowY=${item.shadowY}
          .shadowBlur=${item.shadowBlur}
          .shadowSpread=${item.shadowSpread}
          .shadowOpacity=${item.shadowOpacity}
          .shadowColor=${item.shadowColor ?? CONTAINER_DEFAULT_SHADOW.shadowColor}
        ></canvas-contenedor>
        <div
          class="container-hover-tint"
          style=${`border-radius:${item.borderRadius}px;`}
        ></div>
        <div
          class="container-content"
          data-container-content-id=${interactive ? item.id : nothing}
          style=${`top:${item.paddingTop}px; right:${item.paddingRight}px; bottom:${item.paddingBottom}px; left:${item.paddingLeft}px; overflow:${item.scrollEnabled ? 'auto' : 'hidden'};`}
        >
          ${this.getContainerChildrenForScene(scene, item.id).map((child) =>
            this.renderCanvasEntry(child, scene, interactive, allowNativeInputInteraction),
          )}
        </div>
      </div>
    `;
  }

  private renderCanvasSurface(canvas: CanvasTab): TemplateResult {
    const scene = this.getCanvasScene(canvas.id);
    const isActive = canvas.id === this.activeCanvasId;
    const isCodeSurface = isActive && this.isCodeView;
    const isEditableSurface = isActive && !this.isPrototypeMode;
    const hasItems = this.sceneHasCanvasItems(scene);

    return html`
      <div
        class="canvas-stack-item"
        data-canvas-surface-id=${canvas.id}
        data-active=${String(isActive)}
      >
        <button
          class="canvas-surface-name"
          type="button"
          data-active=${String(isActive)}
          @click=${() => this.handleSelectCanvas(canvas.id)}
        >
          ${canvas.name.trim() || this.getCanvasFallbackName(canvas.id)}
        </button>
        <div class="canvas-shell" data-active=${String(isActive)}>
          <div class="canvas" data-active=${String(isActive)}>
            <div class="canvas-body">
              <div
                class=${isCodeSurface ? 'page-preview code-view' : 'page-preview'}
                data-mode=${this.viewport}
                data-active-canvas=${String(isActive)}
                data-drag-active=${String(isEditableSurface && !this.isCodeView && this.isCanvasDragActive)}
                style=${`--canvas-background:${scene.canvasBackground};`}
                @click=${this.isPrototypeMode
                  ? (!isActive ? () => this.activateCanvas(canvas.id, false) : nothing)
                  : isActive
                    ? this.handleCanvasClick
                    : () => this.handleSelectCanvas(canvas.id)}
                @dragover=${isEditableSurface ? this.handleCanvasDragOver : nothing}
                @dragleave=${isEditableSurface ? this.handleCanvasDragLeave : nothing}
                @drop=${isEditableSurface ? this.handleCanvasDrop : nothing}
                @text-change=${isEditableSurface ? this.handleTypographyTextChange : nothing}
                @text-edit-finish=${isEditableSurface ? this.handleTypographyEditFinish : nothing}
                @input-text-change=${isActive ? this.handleInputTextChange : nothing}
                @input-text-focus=${!this.isPrototypeMode && isActive ? this.handleInputTextFocus : nothing}
              >
                ${isCodeSurface
                  ? html`<pre class="code-block">${this.buildCanvasCode()}</pre>`
                  : html`
                      ${!hasItems
                        ? html`<div class="page-preview-empty">
                            Arrastra "Textos", botones o "Contenedor" desde el panel para comenzar.
                          </div>`
                        : null}

                      ${this.getRootCanvasItems(scene).map((entry) =>
                        this.renderCanvasEntry(
                          entry,
                          scene,
                          isEditableSurface,
                          this.isPrototypeMode && isActive,
                        ),
                      )}
                    `}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div
        class="workspace"
        data-dragging=${String(this.activeDraggedTool !== null)}
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
                      ${this.activeCanvas?.name.trim() || this.getCanvasFallbackName(this.activeCanvasId)}
                    </span>
                  </button>

                  ${this.isCanvasMenuOpen
                    ? html`
                        <div class="canvas-menu-panel" role="menu" aria-label="Lista de lienzos">
                          <p class="canvas-menu-title">Lienzos</p>
                          <div class="canvas-tabs">
                            ${this.canvases.map(
                              (canvas) => html`
                                <button
                                  class="canvas-tab"
                                  type="button"
                                  role="menuitem"
                                  data-active=${String(canvas.id === this.activeCanvasId)}
                                  @click=${() => this.handleSelectCanvas(canvas.id)}
                                >
                                  ${canvas.name.trim() || this.getCanvasFallbackName(canvas.id)}
                                </button>
                              `,
                            )}
                          </div>
                        </div>
                      `
                    : null}
                </div>
              </div>

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
              ${this.canvases.map((canvas) => this.renderCanvasSurface(canvas))}
            </div>
          </div>
        </section>

        ${this.isToolsDrawerMode
          ? html`
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
              <button
                class="tools-drawer-backdrop"
                type="button"
                @click=${this.closeToolsDrawer}
                aria-label="Cerrar panel de herramientas"
              ></button>
            `
          : null}

        <aside
          class="tools-panel"
          data-collapsed=${String(this.isPrototypeMode)}
          aria-hidden=${String(this.isToolsDrawerMode && !this.isToolsDrawerOpen)}
        >
          <div class="tool-section">
            <div class="panel-head">
              <div class="panel-head-main">
                <h2 class="panel-title" data-compact=${String(this.isPanelEditingMode)}>
                  ${this.panelTitleText}
                </h2>
                ${!this.isPrototypeMode && (this.selectedTypographyId || this.isCanvasEditing)
                  ? html`
                      <button
                        class="panel-action panel-action-dismiss"
                        @click=${() => {
                          this.clearActiveEditingState();
                        }}
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
                    `
                  : null}
              </div>
              <div class="panel-actions-stack">
                <div class="panel-actions">
                  ${this.isToolsDrawerMode
                    ? html`
                        <button
                          class="panel-action tools-drawer-close"
                          @click=${this.closeToolsDrawer}
                          aria-label="Cerrar herramientas"
                          title="Cerrar herramientas"
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
                      `
                    : null}
                  <button
                    class="panel-action panel-action-code"
                    data-active=${String(this.isCodeView)}
                    @click=${this.toggleCodeView}
                    aria-label=${this.isCodeView ? 'Volver al lienzo' : 'Ver codigo'}
                    title=${this.isCodeView ? 'Volver al lienzo' : 'Ver codigo'}
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
                    aria-label=${this.isPrototypeMode ? 'Cerrar prototipo' : 'Activar prototipo'}
                    title=${this.isPrototypeMode ? 'Cerrar prototipo' : 'Activar prototipo'}
                  >
                    ${this.isPrototypeMode
                      ? html`
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path
                              d="M5 5l10 10M15 5L5 15"
                              stroke="currentColor"
                              stroke-width="1.8"
                              stroke-linecap="round"
                            />
                          </svg>
                        `
                      : html`
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path
                              d="M7 5.5v9l7-4.5-7-4.5Z"
                              fill="currentColor"
                            />
                          </svg>
                        `}
                  </button>
                </div>
                ${this.editingContainerId && this.selectedContainerItem
                  ? html`
                      <button
                        class="panel-action panel-action-create"
                        type="button"
                        @click=${this.openCreateComponentModal}
                      >
                        + componente
                      </button>
                    `
                  : null}
              </div>
            </div>
          </div>

          ${this.isPrototypeMode
            ? nothing
              : this.selectedTypographyItem
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
                      <p class="editor-label">Color</p>
                      ${this.renderColorDropdown('text', TEXT_COLOR_OPTIONS, this.selectedTypographyItem.color, (value) =>
                        this.updateSelectedTypographyItem({ color: value }),
                      )}
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
              : this.selectedInputTextItem
                ? html`
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
                          <p class="editor-label">Icono</p>
                          ${this.renderIconDropdown(
                            this.selectedInputTextItem.icon ?? 'eye-off',
                            (value) => this.updateSelectedInputTextItem({ icon: value }),
                          )}
                        </div>

                        <div class="editor-row">
                          <p class="editor-label">Status</p>
                          <select
                            class="editor-select"
                            .value=${this.selectedInputTextItem.status ?? 'inactive'}
                            @change=${this.handleSelectedInputStatusChange}
                          >
                            <option value="inactive">Inactivo</option>
                            <option value="active">Activo</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  `
              : this.editingIconId && this.selectedIconItem
                ? html`
                  <div class="tool-group">
                    <h3 class="section-title">Icono seleccionado</h3>
                    <div class="editor-stack">
                      <div class="editor-row">
                        <p class="editor-label">SVG</p>
                        ${this.renderIconDropdown(this.selectedIconItem.icon, (value) =>
                          this.updateSelectedIconItem({ icon: value }),
                        )}
                      </div>
                      <div class="editor-row">
                        <p class="editor-label">Color</p>
                        ${this.renderColorDropdown(
                          'icon-color',
                          COLOR_TOKEN_OPTIONS,
                          this.selectedIconItem.color ?? 'var(--color-primary-strong)',
                          (value) => this.updateSelectedIconItem({ color: value }),
                        )}
                      </div>
                    </div>
                  </div>
                `
              : this.editingMicroIllustrationId && this.selectedMicroIllustrationItem
                ? html`
                  <div class="tool-group">
                    <h3 class="section-title">Micro ilustracion seleccionada</h3>
                    <div class="editor-stack">
                      <div class="editor-row">
                        <p class="editor-label">Micro ilustracion</p>
                        ${this.renderMicroIllustrationDropdown(
                          this.selectedMicroIllustrationItem.illustration,
                          (value) => this.updateSelectedMicroIllustrationItem({ illustration: value }),
                        )}
                      </div>
                    </div>
                  </div>
                `
              : this.editingLogoId && this.selectedLogoItem
                ? html`
                  <div class="tool-group">
                    <h3 class="section-title">Logo seleccionado</h3>
                    <div class="editor-stack">
                      <p class="editor-help">
                        Este componente usa el logo BBVA desde la libreria oficial y puedes moverlo o redimensionarlo en el lienzo.
                      </p>
                    </div>
                  </div>
                `
              : this.editingButtonId && this.selectedButtonItem
                ? html`
                  <div class="tool-group">
                    <h3 class="section-title">
                      ${this.selectedButtonItem.variant === 'icon-button'
                        ? 'Icon Buton seleccionado'
                        : 'Boton seleccionado'}
                    </h3>
                    <div class="editor-stack">
                      ${this.selectedButtonItem.variant === 'icon-button'
                        ? html`
                            <div class="editor-row">
                              <p class="editor-label">SVG</p>
                              ${this.renderIconDropdown(
                                this.selectedButtonItem.icon ?? 'search',
                                (value) => this.updateSelectedButtonItem({ icon: value }),
                              )}
                            </div>

                            <div class="editor-row">
                              <p class="editor-label">Fondo</p>
                              <select
                                class="editor-select"
                                .value=${this.selectedButtonItem.backgroundVisible === false
                                  ? 'transparent'
                                  : 'visible'}
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

                            ${this.selectedButtonActionType === 'link'
                              ? html`
                                  <div class="editor-row">
                                    <p class="editor-label">Destino</p>
                                    <select
                                      class="editor-select"
                                      .value=${this.selectedButtonLinkTargetId}
                                      ?disabled=${this.selectableButtonLinkCanvases.length === 0}
                                      @change=${this.handleSelectedButtonLinkTargetChange}
                                    >
                                      ${this.selectableButtonLinkCanvases.length === 0
                                        ? html`<option value="">No hay otros lienzos</option>`
                                        : this.selectableButtonLinkCanvases.map(
                                            (canvas) => html`
                                              <option value=${canvas.id}>
                                                ${canvas.name.trim() ||
                                                this.getCanvasFallbackName(canvas.id)}
                                              </option>
                                            `,
                                          )}
                                    </select>
                                    <p class="editor-help">
                                      Selecciona el lienzo al que este boton debe navegar.
                                    </p>
                                  </div>
                                `
                              : html`
                                  <p class="editor-help">
                                    Puedes usar este boton circular como acceso a otro lienzo.
                                  </p>
                                `}
                          `
                        : html`
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
                                ${BUTTON_HEIGHT_OPTIONS.map(
                                  (height) => html`<option value=${String(height)}>${height}px</option>`,
                                )}
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

                            ${this.selectedButtonActionType === 'link'
                              ? html`
                                  <div class="editor-row">
                                    <p class="editor-label">Destino</p>
                                    <select
                                      class="editor-select"
                                      .value=${this.selectedButtonLinkTargetId}
                                      ?disabled=${this.selectableButtonLinkCanvases.length === 0}
                                      @change=${this.handleSelectedButtonLinkTargetChange}
                                    >
                                      ${this.selectableButtonLinkCanvases.length === 0
                                        ? html`<option value="">No hay otros lienzos</option>`
                                        : this.selectableButtonLinkCanvases.map(
                                            (canvas) => html`
                                              <option value=${canvas.id}>
                                                ${canvas.name.trim() ||
                                                this.getCanvasFallbackName(canvas.id)}
                                              </option>
                                            `,
                                          )}
                                    </select>
                                    <p class="editor-help">
                                      Selecciona el lienzo al que este boton debe navegar.
                                    </p>
                                  </div>
                                `
                              : html`
                                  <p class="editor-help">
                                    Elige una accion para definir la interaccion de este boton.
                                  </p>
                                `}
                          `}
                    </div>
                  </div>
                `
              : this.editingContainerId && this.selectedContainerItem
                ? html`
                    <div class="tool-group">
                      ${this.isEditingSelectedContainerName
                        ? html`
                            <input
                              class="section-title-input"
                              type="text"
                              .value=${this.selectedContainerItem.name}
                              @input=${this.handleSelectedContainerNameInput}
                              @keydown=${this.handleSelectedContainerNameKeyDown}
                              @blur=${this.stopSelectedContainerNameEditing}
                            />
                          `
                        : html`
                            <button
                              class="section-title section-title-button"
                              type="button"
                              @click=${this.startSelectedContainerNameEditing}
                            >
                              ${this.selectedContainerItem.name || 'Contenedor'}
                            </button>
                          `}
                      <div class="editor-stack">
                        <div class="editor-row">
                          <p class="editor-label">Fondo</p>
                          ${this.renderColorDropdown(
                            'container',
                            CONTAINER_BACKGROUND_OPTIONS,
                            this.selectedContainerItem.background,
                            (value) => this.updateSelectedContainerItem({ background: value }),
                          )}
                        </div>

                        <div class="editor-row">
                          <p class="editor-label">Desktop</p>
                          <select
                            class="editor-select"
                            .value=${String(this.selectedContainerItem.desktopSpan)}
                            @change=${this.handleSelectedContainerDesktopSpanChange}
                          >
                            ${Array.from({ length: 12 }, (_, index) => {
                              const span = index + 1;
                              return html`
                                <option value=${String(span)}>
                                  ${span} columnas · ${this.getContainerPercentage(span, 12)}%
                                </option>
                              `;
                            })}
                          </select>
                        </div>

                        <div class="editor-row">
                          <p class="editor-label">Mobile</p>
                          <select
                            class="editor-select"
                            .value=${String(this.selectedContainerItem.mobileSpan)}
                            @change=${this.handleSelectedContainerMobileSpanChange}
                          >
                            ${Array.from({ length: 4 }, (_, index) => {
                              const span = index + 1;
                              return html`
                                <option value=${String(span)}>
                                  ${span} columnas · ${this.getContainerPercentage(span, 4)}%
                                </option>
                              `;
                            })}
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
                                  .value=${String(
                                    this.getContainerWidthInputValue(this.selectedContainerItem),
                                  )}
                                  ?disabled=${this.selectedContainerItem.widthMode === 'auto'}
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
                                  .value=${String(
                                    this.getContainerHeightInputValue(this.selectedContainerItem),
                                  )}
                                  ?disabled=${this.selectedContainerItem.heightMode === 'auto'}
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

                        ${this.selectedContainerItem.shadowEnabled
                          ? html`
                              <div class="editor-row">
                                <p class="editor-label">Color de sombra</p>
                                ${this.renderColorDropdown(
                                  'container-shadow',
                                  COLOR_TOKEN_OPTIONS,
                                  this.selectedContainerItem.shadowColor,
                                  (value) =>
                                    this.updateSelectedContainerItem({ shadowColor: value }),
                                )}
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
                                        .value=${String(
                                          Math.round(
                                            this.selectedContainerItem.shadowOpacity * 100,
                                          ),
                                        )}
                                        @input=${this.handleSelectedContainerShadowOpacityInput}
                                      />
                                    </label>
                                  </div>
                                </div>
                              </div>
                            `
                          : nothing}
                    </div>
                  </div>
                `
              : this.isCanvasEditing
                ? html`
                    <div class="tool-group">
                      <h3 class="section-title">Lienzo</h3>
                      <div class="editor-stack">
                        <div class="editor-row">
                          <p class="editor-label">Nombre</p>
                          <input
                            class="editor-input"
                            type="text"
                            .value=${this.activeCanvas?.name ?? ''}
                            placeholder=${this.getCanvasFallbackName(this.activeCanvasId)}
                            @input=${this.handleActiveCanvasNameInput}
                          />
                        </div>
                        <div class="editor-row">
                          <p class="editor-label">Fondo</p>
                          ${this.renderColorDropdown('canvas', CANVAS_BACKGROUND_OPTIONS, this.canvasBackground, (value) => {
                            this.canvasBackground = value;
                          })}
                        </div>
                      </div>
                    </div>
                  `
              : html`
                <div class="tool-group components-group">
                  <h3 class="section-title">Componentes</h3>
                  <div class="component-tabs" role="tablist" aria-label="Tipos de componentes">
                    <button
                      class="component-tab"
                      type="button"
                      role="tab"
                      data-active=${String(this.componentTab === 'atomos')}
                      aria-selected=${String(this.componentTab === 'atomos')}
                      @click=${() => this.setComponentTab('atomos')}
                    >
                      Atomos
                    </button>
                    <button
                      class="component-tab"
                      type="button"
                      role="tab"
                      data-active=${String(this.componentTab === 'moleculas')}
                      aria-selected=${String(this.componentTab === 'moleculas')}
                      @click=${() => this.setComponentTab('moleculas')}
                    >
                      Moleculas
                    </button>
                  </div>
                  ${this.componentTab === 'atomos'
                    ? html`
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover('contenedor')}
                          <tool-contenedor
                            .selected=${this.selectedToolPreview === 'contenedor'}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-contenedor>
                        </div>
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover('tipografia')}
                          <tool-tipografia
                            .preset=${this.toolTypographyPreset}
                            .selected=${this.selectedToolPreview === 'tipografia'}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                            @tool-preset-change=${this.handleToolPresetChange}
                          ></tool-tipografia>
                        </div>
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover('input-text')}
                          <tool-input-text
                            .selected=${this.selectedToolPreview === 'input-text'}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-input-text>
                        </div>
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover('main-button')}
                          <tool-main-button
                            .selected=${this.selectedToolPreview === 'main-button'}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-main-button>
                        </div>
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover('secondary-button')}
                          <tool-secondary-button
                            .selected=${this.selectedToolPreview === 'secondary-button'}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-secondary-button>
                        </div>
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover('opportunity-button')}
                          <tool-opportunity-button
                            .selected=${this.selectedToolPreview === 'opportunity-button'}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-opportunity-button>
                        </div>
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover('icon-button')}
                          <tool-icon-button
                            .selected=${this.selectedToolPreview === 'icon-button'}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-icon-button>
                        </div>
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover('icon')}
                          <tool-icon
                            .selected=${this.selectedToolPreview === 'icon'}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-icon>
                        </div>
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover('logo')}
                          <tool-logo
                            .selected=${this.selectedToolPreview === 'logo'}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-logo>
                        </div>
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover('micro-illustration')}
                          <tool-micro-illustration
                            .selected=${this.selectedToolPreview === 'micro-illustration'}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-micro-illustration>
                        </div>
                      `
                    : html`
                        <div class="tool-preview-anchor">
                          ${this.renderToolPreviewPopover('desktop-menu')}
                          <tool-desktop-menu
                            .selected=${this.selectedToolPreview === 'desktop-menu'}
                            @tool-drag-state=${this.handleToolDragState}
                            @preview-tool=${this.handleToolPreview}
                          ></tool-desktop-menu>
                        </div>
                        ${this.customMolecules.map((molecule) => this.renderCustomMoleculeTool(molecule))}
                      `}
                </div>
              `}
        </aside>

        ${this.isCreateComponentModalOpen
          ? html`
              <div
                class="component-modal-backdrop"
                @click=${(event: MouseEvent) => {
                  if (event.target === event.currentTarget) {
                    this.closeCreateComponentModal();
                  }
                }}
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
                      ?disabled=${this.draftComponentName.trim().length === 0}
                      @click=${this.handleCreateComponentFromSelection}
                    >
                      Guardar componente
                    </button>
                  </div>
                </div>
              </div>
            `
          : null}
      </div>
    `;
  }
}
