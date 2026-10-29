import type en from './en.json';

// Typed message ids: a typo in <FormattedMessage id="..."> fails the build.
declare global {
  namespace FormatjsIntl {
    interface Message {
      ids: keyof typeof en;
    }
  }
}
