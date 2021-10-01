<template v-if="content.globalSettings">
    <div class="ww-form-input-range" :style="tooltipStyle">
        <div v-if="content.isTooltip" id="tooltiptext" class="ww-form-input-range__tooltip">
            {{ selectedValue }}
        </div>
        <input
            ref="input"
            :class="{ editing: isEditing }"
            type="range"
            :name="isEditing ? `${content.globalSettings.name}-editing` : content.globalSettings.name"
            :required="content.globalSettings.required"
            :style="style"
            :min="content.globalSettings.min"
            :max="content.globalSettings.max"
            :step="content.globalSettings.step"
            @input="rangeVal"
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
    },
    data() {
        return {
            selectedValue: 0,
        };
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
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
                '--tooltip-position':
                    'calc(' + (this.selectedValue * 100) / this.content.globalSettings.max + '% - 20px)',
                '--tooltip-background': this.content.globalStyle.tooltipBackground,
                '--tooltip-text-color': this.content.globalStyle.tooltipTextColor,
            };
        },
    },
    watch: {
        'content.globalSettings'() {
            if (!this.$refs.input && !this.$refs.input.value) return;
            this.selectedValue = this.$refs.input.value;
        },
    },
    mounted() {
        if (!this.$refs.input && !this.$refs.input.value) return;
        this.selectedValue = this.$refs.input.value;
    },
    methods: {
        rangeVal(event) {
            this.selectedValue = event.target.value;
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
    &.editing {
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
