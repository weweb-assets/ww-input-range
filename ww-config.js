export default {
    editor: {
        label: { fr: 'Range Input', en: 'Range Input' },
    },
    properties: {
        rangeBackgroundColor: {
            label: { en: 'Range background', fr: 'Range background' },
            type: 'Color',
            defaultValue: 'rgb(9, 154, 242)',
        },
        selectorBorderColor: {
            label: { en: 'Selector border', fr: 'Selector border' },
            type: 'Color',
            defaultValue: '#1565C0',
        },
        selectorBackgroundColor: {
            label: { en: 'Selector background', fr: 'Selector background' },
            type: 'Color',
            defaultValue: 'rgb(9, 154, 242)',
        },
        isTooltip: {
            label: { en: 'Tooltip', fr: 'Tooltip' },
            type: 'OnOff',
            defaultValue: true,
        },
        tooltipBackground: {
            label: { en: 'Tooltip background', fr: 'Tooltip background' },
            type: 'Color',
            defaultValue: 'rgb(9, 154, 242)',
            hidden: ({ isTooltip }) => !isTooltip,
        },
        tooltipTextColor: {
            label: { en: 'Tooltip background', fr: 'Tooltip background' },
            type: 'Color',
            defaultValue: '#FFFFFF',
            hidden: ({ isTooltip }) => !isTooltip,
        },
        fontFamily: {
            type: 'FontFamily',
            label: { en: 'Font family', fr: 'Font' },
            defaultValue: '',
            hidden: ({ isTooltip }) => !isTooltip,
        },
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
            defaultValue: '15px',
            hidden: ({ isTooltip }) => !isTooltip,
        },
        min: {
            label: { en: 'Min range', fr: 'Min range' },
            type: 'Number',
            setion: 'settings',
            options: { min: 0, max: 10000 },
            defaultValue: 0,
        },
        max: {
            label: { en: 'Max range', fr: 'Max range' },
            type: 'Number',
            setion: 'settings',
            options: { min: 1, max: 10000 },
            defaultValue: 1000,
        },
        step: {
            label: { en: 'Step', fr: 'Step' },
            type: 'Number',
            setion: 'settings',
            options: { min: 1, max: 100 },
            defaultValue: 1,
        },
    },
};
