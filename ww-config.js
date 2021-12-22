export default {
    editor: {
        label: { fr: 'Range Input', en: 'Range Input' },
    },
    triggerEvents: [{ name: 'change', label: { en: 'On change' }, event: { value: '' } }],
    properties: {
        globalSettings: {
            type: 'Object',
            section: 'settings',
            options: {
                item: {
                    variableId: {
                        label: {
                            en: 'Associated variable',
                        },
                        type: 'Variable',
                        options: {
                            types: ['Number'],
                        },
                        section: 'settings',
                        hidden: content => !content.globalSettings.variableId,
                        defaultValue: null,
                    },
                    initialValue: {
                        label: {
                            en: 'Initial value',
                        },
                        type: 'Text',
                        section: 'settings',
                        bindable: true,
                        hidden: content => content.globalSettings.variableId,
                        defaultValue: '',
                    },
                    name: {
                        label: { en: 'Name', fr: 'Nom' },
                        type: 'Text',
                        options: { placeholder: 'Name' },
                    },
                    required: {
                        label: { en: 'Required', fr: 'Requis' },
                        type: 'OnOff',
                    },
                    min: {
                        label: { en: 'Min range', fr: 'Min range' },
                        type: 'Number',
                        options: { min: 0, max: 10000 },
                    },
                    max: {
                        label: { en: 'Max range', fr: 'Max range' },
                        type: 'Number',
                        options: { min: 1, max: 10000 },
                    },
                    step: {
                        label: { en: 'Step', fr: 'Step' },
                        type: 'Number',
                        options: { min: 1, max: 100 },
                    },
                },
            },
            defaultValue: {
                name: '',
                required: true,
                min: 0,
                max: 10000,
                step: 1,
            },
        },
        globalStyle: {
            type: 'Object',
            options: {
                item: {
                    fontSize: {
                        type: 'Length',
                        label: { en: 'Font size', fr: 'Taille du texte' },
                        options: {
                            unitChoices: [
                                { value: 'px', label: 'px', min: 10, max: 50 },
                                { value: 'em', label: 'em', min: 1, max: 50 },
                                { value: 'rem', label: 'rem', min: 1, max: 50 },
                            ],
                        },
                        hidden: ({ isTooltip }) => !isTooltip,
                    },
                    fontFamily: {
                        type: 'FontFamily',
                        label: { en: 'Font family', fr: 'Font' },
                        hidden: ({ isTooltip }) => !isTooltip,
                    },
                    rangeBackgroundColor: {
                        label: { en: 'Range background', fr: 'Range background' },
                        type: 'Color',
                    },
                    selectorBorderColor: {
                        label: { en: 'Selector border', fr: 'Selector border' },
                        type: 'Color',
                    },
                    selectorBackgroundColor: {
                        label: { en: 'Selector background', fr: 'Selector background' },
                        type: 'Color',
                    },
                    tooltipBackground: {
                        label: { en: 'Tooltip background', fr: 'Tooltip background' },
                        type: 'Color',
                        hidden: ({ isTooltip }) => !isTooltip,
                    },
                    tooltipTextColor: {
                        label: { en: 'Tooltip background', fr: 'Tooltip background' },
                        type: 'Color',
                        hidden: ({ isTooltip }) => !isTooltip,
                    },
                },
            },
            defaultValue: {
                fontSize: '15px',
                fontFamily: '',
                rangeBackgroundColor: 'rgb(9, 154, 242)',
                selectorBorderColor: '#1565C0',
                selectorBackgroundColor: 'rgb(9, 154, 242)',
                tooltipBackground: 'rgb(9, 154, 242)',
                tooltipTextColor: '#FFFFFF',
            },
        },
        isTooltip: {
            label: { en: 'Tooltip', fr: 'Tooltip' },
            type: 'OnOff',
            defaultValue: true,
        },
    },
};
