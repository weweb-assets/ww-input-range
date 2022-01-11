<template>
    <div class="ww-form-input-range" :style="tooltipStyle">
        <div v-if="content.isTooltip" id="tooltiptext" class="ww-form-input-range__tooltip">
            {{ value }}
        </div>
        <input
            ref="input"
            :value="value"
            :class="{ editing: isEditing }"
            type="range"
            :name="wwElementState.name"
            :required="content.required"
            :style="style"
            :min="content.min"
            :max="content.max"
            :step="content.step"
            @input="handleManualInput($event.target.value)"
        />
    </div>
</template>

<script>
export default {
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        uid: { type: String, required: true },
        wwElementState: { type: Object, required: true },
    },
    emits: ['trigger-event'],
    setup(props) {
        const { value: variableValue, setValue } = wwLib.wwVariable.useComponentVariable(
            props.uid,
            'value',
            props.content.value === undefined ? 0 : isNaN(props.content.value) ? 0 : parseFloat(props.content.value)
        );
        return { variableValue, setValue };
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        value() {
            return this.variableValue;
        },
        style() {
            if (!this.content || !this.content.globalStyle) return {};
            return {
                '--range-border': this.content.globalStyle.rangeBorderColor,
                '--range-background': this.content.globalStyle.rangeBackgroundColor,
                '--selector-border': this.content.globalStyle.selectorBorderColor,
                '--selector-background': this.content.globalStyle.selectorBackgroundColor,
            };
        },
        tooltipStyle() {
            return {
                fontSize: this.content.globalStyle.fontSize,
                fontFamily: this.content.globalStyle.fontFamily,
                '--tooltip-position': 'calc(' + (this.value * 100) / this.content.max + '% - 20px)',
                '--tooltip-background': this.content.globalStyle.tooltipBackground,
                '--tooltip-text-color': this.content.globalStyle.tooltipTextColor,
            };
        },
    },
    watch: {
        'content.value'(newValue, OldValue) {
            newValue = parseFloat(newValue);
            if (newValue === OldValue) return;
            if (isNaN(newValue)) newValue = 0;
            this.setValue(newValue);
            this.$emit('trigger-event', { name: 'initValueChange', event: { value: newValue } });
        },
    },
    methods: {
        handleManualInput(value) {
            if (value === this.value) return;
            this.setValue(value);
            this.$emit('trigger-event', { name: 'change', event: { value } });
        },
    },
};
</script>

<style lang="scss" scoped>
.ww-form-input-range {
    position: relative;
    width: 100%;
    outline: none;
    font-family: inherit;
    border: inherit;
    &::placeholder {
        color: inherit;
        opacity: 0.7;
    }
    /* wwEditor:start */
    .editing {
        pointer-events: none;
    }
    /* wwEditor:end */
    input[type='range'] {
        -webkit-appearance: none;
        margin: 10px 0;
        width: 100%;
    }
    input[type='range']:focus {
        outline: none;
    }
    input[type='range']::-webkit-slider-runnable-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        box-shadow: 0px 0px 0px #000000;
        background: var(--range-background);
        border-radius: 1px;
        border: 0px solid #000000;
    }
    input[type='range']::-webkit-slider-thumb {
        box-shadow: 0px 0px 0px #000000;
        border: 1px solid var(--selector-border);
        height: 18px;
        width: 18px;
        border-radius: 25px;
        background: var(--selector-background);
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -7px;
    }
    input[type='range']::-moz-range-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        box-shadow: 0px 0px 0px #000000;
        background: var(--range-background);
        border-radius: 1px;
        border: 0px solid #000000;
    }
    input[type='range']::-moz-range-thumb {
        box-shadow: 0px 0px 0px #000000;
        border: 1px solid var(--range-background);
        height: 18px;
        width: 18px;
        border-radius: 25px;
        background: var(--range-background);
        cursor: pointer;
    }
    input[type='range']::-ms-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        color: transparent;
    }
    input[type='range']::-ms-fill-lower {
        background: var(--range-background);
        border: 0px solid #000000;
        border-radius: 2px;
        box-shadow: 0px 0px 0px #000000;
    }
    input[type='range']::-ms-fill-upper {
        background: var(--range-background);
        border: 0px solid #000000;
        border-radius: 2px;
        box-shadow: 0px 0px 0px #000000;
    }
    input[type='range']::-ms-thumb {
        margin-top: 1px;
        box-shadow: 0px 0px 0px #000000;
        border: 1px solid var(--range-border);
        height: 18px;
        width: 18px;
        border-radius: 25px;
        background: var(--range-background);
        cursor: pointer;
    }
    input[type='range']:focus::-ms-fill-lower {
        background: var(--range-background);
    }
    input[type='range']:focus::-ms-fill-upper {
        background: var(--range-background);
    }
    &__tooltip {
        visibility: visible;
        background-color: var(--tooltip-background);
        color: var(--tooltip-text-color);
        text-align: center;
        padding: 5px 15px;
        border-radius: 6px;
        position: absolute;
        z-index: 20;
        top: 0px;
        left: var(--tooltip-position);
        transform: translateY(-120%) translateX(-5%);
    }
    &:hover &__tooltiptext {
        visibility: visible;
    }
}
</style>
