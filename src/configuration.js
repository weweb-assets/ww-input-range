const settingsOptions = {
    min: {
        path: 'globalSettings.min',
        label: { en: 'Min range', fr: 'Min range' },
        type: 'Number',
        options: {
            min: 0,
            max: 10000,
        },
    },
    max: {
        path: 'globalSettings.max',
        label: { en: 'Max range', fr: 'Max range' },
        type: 'Number',
        options: {
            min: 1,
            max: 10000,
        },
    },
    step: {
        path: 'globalSettings.step',
        label: { en: 'Step', fr: 'Step' },
        type: 'Number',
        options: {
            min: 1,
            max: 100,
        },
    },
};

const styleOptions = content => {
    return {
        rangeBackgroundColor: {
            path: 'globalStyle.rangeBackgroundColor',
            label: { en: 'Range background', fr: 'Range background' },
            type: 'Color',
        },
        selectorBorderColor: {
            path: 'globalStyle.selectorBorderColor',
            label: { en: 'Selector border', fr: 'Selector border' },
            type: 'Color',
        },
        selectorBackgroundColor: {
            path: 'globalStyle.selectorBackgroundColor',
            label: {
                en: 'Selector background',
                fr: 'Selector background',
            },
            type: 'Color',
        },
        isTooltip: {
            type: 'OnOff',
            label: {
                en: 'Tooltip',
                fr: 'Tooltip',
            },
        },
        ...(function () {
            return content.isTooltip
                ? {
                      tooltipBackground: {
                          path: 'globalStyle.tooltipBackground',
                          label: {
                              en: 'Tooltip background',
                              fr: 'Tooltip background',
                          },
                          type: 'Color',
                      },
                      tooltipTextColor: {
                          path: 'globalStyle.tooltipTextColor',
                          label: {
                              en: 'Tooltip background',
                              fr: 'Tooltip background',
                          },
                          type: 'Color',
                      },
                      fontFamily: {
                          type: 'FontFamily',
                          path: 'globalStyle.fontFamily',
                          label: {
                              en: 'Font family',
                              fr: 'Font',
                          },
                      },
                      fontSize: {
                          path: 'globalStyle.fontSize',
                          type: 'Length',
                          label: {
                              en: 'Font size',
                              fr: 'Taille du texte',
                          },
                          options: {
                              unitChoices: [
                                  { value: 'px', label: 'px', min: 10, max: 50 },
                                  { value: 'em', label: 'em', min: 1, max: 50 },
                                  { value: 'rem', label: 'rem', min: 1, max: 50 },
                              ],
                          },
                      },
                  }
                : {};
        })(),
    };
};

export const getSettingsConfigurations = content => {
    return { settingsOptions: { ...settingsOptions }, styleOptions: { ...styleOptions(content) } };
};
