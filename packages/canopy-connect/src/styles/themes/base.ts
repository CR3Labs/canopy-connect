export default {
  light: {
    /** Connect Wallet Button */
    '--ck-connectbutton-font-size': '14px',
    '--ck-connectbutton-color': '#373737',
    '--ck-connectbutton-background': '#F6F7F9',
    '--ck-connectbutton-background-secondary': '#FFFFFF',

    '--ck-connectbutton-hover-color': '#373737',
    '--ck-connectbutton-hover-background': '#F0F2F5',

    '--ck-connectbutton-active-color': '#373737',
    '--ck-connectbutton-active-background': '#EAECF1',

    '--ck-connectbutton-balance-color': '#373737',
    '--ck-connectbutton-balance-background': '#fff',
    '--ck-connectbutton-balance-box-shadow':
      'inset 0 0 0 1px var(--ck-connectbutton-background)',

    '--ck-connectbutton-balance-hover-background': '#F6F7F9',
    '--ck-connectbutton-balance-hover-box-shadow':
      'inset 0 0 0 1px var(--ck-connectbutton-hover-background)',

    '--ck-connectbutton-balance-active-background': '#F0F2F5',
    '--ck-connectbutton-balance-active-box-shadow':
      'inset 0 0 0 1px var(--ck-connectbutton-active-background)',

    /** Primary Button */
    '--ck-primary-button-border-radius': '4px',
    // '--ck-primary-button-color': '#000000', //this is now set in ResetContainer from the primaryColor prop for contrast reasons
    '--ck-primary-button-border-width': '0px',
    // '--ck-primary-button-background': '#DBFF00', //this is now set in ResetContainer from the primaryColor prop
    '--ck-body-background-primary': '#DBFF00',
    //'--ck-primary-button-box-shadow': 'inset 0 0 0 1px #F0F0F0',
    '--ck-primary-button-font-weight': '400',
    '--ck-primary-button-font-size': '14px',
    '--ck-primary-button-line-height': '19.12px',

    // '--ck-primary-button-hover-color': '#373737',  //this is now set in ResetContainer from the primaryColor prop for contrast reasons
    // '--ck-primary-button-hover-background': '#d66413', //this is now set in ResetContainer from the primaryColor prop
    //'--ck-primary-button-hover-box-shadow': 'inset 0 0 0 2px var(--ck-focus-color)',

    //'--ck-primary-button-active-background': '#EAECF1',

    /** Secondary Button */
    '--ck-secondary-button-border-radius': '4px',
    '--ck-secondary-button-border-width': '1.5px',
    '--ck-secondary-button-border-color': '#373737',
    '--ck-secondary-button-font-size': '16px',
    '--ck-secondary-button-line-height': '21.86px',

    /** Tertiary Button */
    '--ck-tertiary-button-background': '#FFFFFF',

    '--ck-secondary-button-hover-background': '#e0e4eb',

    /** ConnectorButton Button */
    '--ck-connector-button-color': '#000000',
    // '--ck-connector-button-hover-color': '#373737',

    /** Modal */
    '--ck-modal-box-shadow': '0px 2px 4px rgba(0, 0, 0, 0.02)',
    '--ck-overlay-background': 'rgba(71, 88, 107, 0.24)',
    '--ck-body-color': '#060606',
    '--ck-body-color-muted': '#999999',
    '--ck-body-color-muted-hover': '#111111',
    '--ck-body-background': '#ffffff',
    '--ck-body-background-transparent': 'rgba(255,255,255,0)',
    '--ck-body-background-secondary-hover-background': '#e0e4eb',
    '--ck-body-background-secondary-hover-outline': '#4282FF',
    '--ck-body-background-tertiary': '#F3F4F7',
    '--ck-body-action-color': '#999999',
    '--ck-body-divider': '#f7f6f8',
    '--ck-body-divider-secondary': 'rgba(0, 0, 0, 0.06)',
    '--ck-body-color-danger': '#FF4E4E',
    '--ck-body-color-valid': '#32D74B',
    '--ck-siwe-border': '#F0F0F0',

    '--ck-custom-qr-code-background': '#eee',

    /** Disclaimer */
    //'--ck-body-disclaimer-background': '#E3D6C9',
    //'--ck-body-disclaimer-box-shadow': 'none',
    '--ck-body-disclaimer-color': '#AAAAAB',
    '--ck-body-disclaimer-link-color': '#838485',
    '--ck-body-disclaimer-link-hover-color': '#000000',

    /** Tooltips */
    '--ck-tooltip-background': '#ffffff',
    '--ck-tooltip-background-secondary': '#ffffff',
    '--ck-tooltip-color': '#999999',
    '--ck-tooltip-shadow': '0px 2px 10px rgba(0, 0, 0, 0.08)',

    /** Network dropdown */
    '--ck-dropdown-button-color': '#999999',
    '--ck-dropdown-button-box-shadow':
      '0 0 0 1px rgba(0,0,0,0.01), 0px 0px 7px rgba(0, 0, 0, 0.05)',
    '--ck-dropdown-button-background': '#fff',

    '--ck-dropdown-button-hover-color': '#8B8B8B',
    '--ck-dropdown-button-hover-background': '#F5F7F9',

    /** QR Code */
    '--ck-qr-dot-color': '#000000',
    '--ck-qr-border-color': '#f7f6f8',

    /** Misc. */
    '--ck-focus-color': '#1A88F8',
    '--ck-spinner-color': 'var(--ck-focus-color)',
    '--ck-copytoclipboard-stroke': 'var(--ck-body-color)',
    '--ck-connected-indicator-connected-color': '#dbff00',
    '--ck-modal-background-image-filter': 'invert(100%)',
  },
  dark: {
    '--ck-connectbutton-font-size': '14px',
    '--ck-connectbutton-color': '#ffffff',
    '--ck-connectbutton-background': '#101213',
    '--ck-connectbutton-background-secondary': '#282828',

    '--ck-connectbutton-hover-background': '#404040',

    '--ck-connectbutton-active-background': '#4D4D4D',

    '--ck-connectbutton-balance-color': '#fff',
    '--ck-connectbutton-balance-background': '#282828',
    '--ck-connectbutton-balance-box-shadow':
      'inset 0 0 0 1px var(--ck-connectbutton-background)',

    '--ck-connectbutton-balance-hover-background': '#383838',
    '--ck-connectbutton-balance-hover-box-shadow':
      'inset 0 0 0 1px var(--ck-connectbutton-hover-background)',

    '--ck-connectbutton-balance-active-background': '#404040',
    '--ck-connectbutton-balance-active-box-shadow':
      'inset 0 0 0 1px var(--ck-connectbutton-active-background)',

    // '--ck-primary-button-color': '#000000', //this is now set in ResetContainer from the primaryColor prop for contrast reasons
    // '--ck-primary-button-background': '#DBFF00',//this is now set in ResetContainer from the primaryColor prop
    '--ck-body-background-primary': '#DBFF00',
    //'--ck-primary-button-box-shadow': 'inset 0 0 0 1px #3D3D3D',
    '--ck-primary-button-border-radius': '4px',
    '--ck-primary-button-border-width': '0px',
    '--ck-secondary-button-border-radius': '4px',
    '--ck-secondary-button-border-width': '1.5px',
    '--ck-secondary-button-border-color': '#6D777C',
    '--ck-secondary-button-font-size': '16px',
    '--ck-secondary-button-line-height': '21.86px',
    '--ck-primary-button-font-weight': '400',
    '--ck-primary-button-font-size': '14px',
    '--ck-primary-button-line-height': '19.12px',

    // '--ck-primary-button-hover-background': '#d66413',//this is now set in ResetContainer from the primaryColor prop
    // '--ck-primary-button-hover-color': '#000000',  //this is now set in ResetContainer from the primaryColor prop for contrast reasons
    //'--ck-primary-button-hover-box-shadow': 'inset 0 0 0 2px rgba(255, 255, 255, 0.4)',

    //'--ck-primary-button-active-background': '#4D4D4D',

    // '--ck-primary-button-active-border-radius': '16px',

    '--ck-secondary-button-color': '#ffffff',
    '--ck-secondary-button-background': '#060606',

    '--ck-secondary-button-hover-background': '#4D4D4D',

    /** Tertiary Button */
    '--ck-tertiary-button-background': '#424242',

    '--ck-focus-color': '#1A88F8',

    '--ck-overlay-background': 'rgba(0,0,0,0.4)',
    '--ck-body-color': '#ffffff',
    '--ck-body-color-muted': 'rgba(255, 255, 255, 0.4)',
    '--ck-body-color-muted-hover': 'rgba(255, 255, 255, 0.8)',
    '--ck-body-background': '#060606',
    '--ck-body-background-transparent': 'rgba(0,0,0,0)',
    '--ck-body-background-secondary': '#333333',
    '--ck-body-background-secondary-hover-background': '#4D4D4D',
    '--ck-body-background-secondary-hover-outline': '#ffffff',
    '--ck-body-background-tertiary': '#333333',
    '--ck-body-action-color': '#C8C8C8',
    '--ck-body-divider': '#383838',
    '--ck-body-color-danger': '#FF4E4E',

    '--ck-body-disclaimer-color': '#858585',
    '--ck-body-disclaimer-link-color': '#ADADAD',
    '--ck-body-disclaimer-link-hover-color': '#FFFFFF',

    '--ck-modal-box-shadow': '0px 2px 4px rgba(0, 0, 0, 0.02)',

    '--ck-copytoclipboard-stroke': 'var(--ck-body-color)',

    '--ck-tooltip-background': '#2B2B2B',
    '--ck-tooltip-background-secondary': '#333333',
    '--ck-tooltip-color': '#999999',
    '--ck-tooltip-shadow': '0px 2px 10px rgba(0, 0, 0, 0.08)',

    '--ck-connector-button-color': '#D7DCDE',
    // '--ck-connector-button-hover-color': '#000000',

    '--ck-custom-qr-code-background': '#000000',

    /** Network dropdown */
    '--ck-dropdown-button-color': '#C8C8C8',

    '--ck-spinner-color': 'var(--ck-focus-color)',

    '--ck-qr-dot-color': '#ffffff',
    '--ck-qr-border-color': '#3d3d3d',

    /** Misc */
    '--ck-connected-indicator-connected-color': '#dbff00',
    '--ck-modal-background-image-filter': 'invert(0%)',
  },
};
