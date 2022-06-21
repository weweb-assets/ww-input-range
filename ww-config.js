import { overridableStyle, overridablePropertiesOrder } from './src/overridableStyle';

export default {
    editor: {
        label: { fr: 'Range Input', en: 'Range Input' },
        customStylePropertiesOrder: [...overridablePropertiesOrder],
        customSettingsPropertiesOrder: [
            'initValueFrom',
            'initValueTo',
            ['min', 'max', 'step'],
            ['required', 'disabled'],
            ['isTooltip', 'showTooltipOn', 'tooltipPosition', 'formating', 'prefix', 'suffix'],
        ],
    },
    triggerEvents: [{ name: 'change', label: { en: 'On change' }, event: { value: '' } }],
    properties: {
        value: {
            label: {
                en: 'Init value',
            },
            type: 'Number',
            options: content => ({ min: 0, max: content.max }),
            bindable: true,
            section: 'settings',
            defaultValue: 15,
        },
        required: {
            label: { en: 'Required', fr: 'Requis' },
            type: 'OnOff',
            defaultValue: true,
            bindable: true,
            section: 'settings',
        },
        disabled: {
            label: { en: 'Disabled', fr: 'Désactivé' },
            type: 'OnOff',
            defaultValue: false,
            bindable: true,
            section: 'settings',
        },
        min: {
            label: { en: 'Min range', fr: 'Min range' },
            type: 'Number',
            options: { min: 0, max: 1000 },
            defaultValue: 0,
            bindable: true,
            section: 'settings',
        },
        max: {
            label: { en: 'Max range', fr: 'Max range' },
            type: 'Number',
            options: { min: 1, max: 1000 },
            defaultValue: 100,
            bindable: true,
            section: 'settings',
        },
        step: {
            label: { en: 'Step', fr: 'Step' },
            type: 'Number',
            options: { min: 1, max: 100 },
            defaultValue: 1,
            bindable: true,
            section: 'settings',
        },
        isTooltip: {
            label: { en: 'Show tooltip', fr: 'Show tooltip' },
            type: 'OnOff',
            defaultValue: true,
            section: 'settings',
        },
        showTooltipOn: {
            hidden: content => !content.isTooltip,
            label: {
                en: 'On',
            },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'always', label: { en: 'Always' } },
                    { value: 'focus', label: { en: 'Focus' } },
                    { value: 'drag', label: { en: 'Drag' } },
                ],
            },
            defaultValue: 'always',
            section: 'settings',
        },
        tooltipPosition: {
            hidden: content => !content.isTooltip,
            label: {
                en: 'Position',
            },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'top', label: { en: 'Top' } },
                    { value: 'bottom', label: { en: 'Bottom' } },
                ],
            },
            defaultValue: 'top',
            section: 'settings',
        },
        formating: {
            label: { en: 'Tooltip formating', fr: 'Formatage' },
            type: 'OnOff',
            defaultValue: false,
            section: 'settings',
        },
        prefix: {
            hidden: content => !content.formating,
            label: { en: 'Prefix', fr: 'Prefixe' },
            type: 'Text',
            options: {
                placeholder: '$',
            },
            defaultValue: '',
            section: 'settings',
        },
        suffix: {
            hidden: content => !content.formating,
            label: { en: 'Suffix', fr: 'Suffixe' },
            type: 'Text',
            options: {
                placeholder: 'Degrees celsius',
            },
            defaultValue: '',
            section: 'settings',
        },
        ...overridableStyle,
    },
};
