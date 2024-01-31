import Vue from 'vue'

export declare class ElementUIComponent extends Vue {
  static install (vue: typeof Vue): void
}


export interface InstallationOptions {
  locale: any,
  i18n: any,
  size: string
}


export function install (vue: typeof Vue, options: InstallationOptions): void


export class ScForm extends ElementUIComponent {}
export class ScTable extends ElementUIComponent {}