<template>
    <div class="ww-form-input-range" :class="{ editing: isEditing }" :style="globalOverridableSliderStyle">
        <div class="spacing">
            <Slider
                class="slider"
                v-model="internalValue"
                :min="content.min"
                :max="content.max"
                :step="content.step"
                :tooltips="content.isTooltip"
                :show-tooltip="content.showTooltipOn"
                :tooltip-position="content.tooltipPosition"
                :disabled="content.disabled"
                :format="{
                    prefix: content.prefix,
                    suffix: content.suffix,
                }"
                :style="overridableSliderStyle"
            >
            </Slider>
        </div>
    </div>
</template>

<script>
import Slider from '@vueform/slider';

export default {
    components: { Slider },
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
        let value = parseFloat(props.content.value);
        value = isNaN(value) ? 0 : value;
        const { value: variableValue, setValue } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'value',
            type: 'number',
            defaultValue: value,
        });
        return { variableValue, setValue };
    },
    data() {
        return {
            internalValue: 15,
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
        value() {
            return this.variableValue;
        },
        handleBorder() {
            return `${this.content.handleBorderWidth} solid ${this.content.handleBorderColor}`;
        },
        globalOverridableSliderStyle() {
            return {
                '--slider-tooltip-font-family': this.content.fontFamily,
            };
        },
        overridableSliderStyle() {
            /* OVERRIDABLE PROPERTIES LIST */
            // https://github.com/vueform/slider#styling-with-css-vars

            return {
                // Slider general
                '--slider-bg': this.content.sliderBg,
                '--slider-connect-bg': this.content.sliderConnectBg,
                '--slider-connect-bg-disabled': this.content.sliderConnectBgDisabled,
                '--slider-height': this.content.sliderHeight,
                '--slider-radius': this.content.sliderRadius,

                // Slider handle
                '--slider-handle-bg': this.content.handleBg,
                '--slider-handle-border': this.handleBorder,
                '--slider-handle-width': this.content.handleWidth,
                '--slider-handle-height': this.content.handleHeight,
                '--slider-handle-radius': this.content.handleRadius,
                '--slider-handle-shadow': this.content.handleShadow,
                '--slider-handle-shadow-active': this.content.handleShadowActive,
                '--slider-handle-ring-width': this.content.handleRingWidth,
                '--slider-handle-ring-color': this.content.handleRingColor,

                // Slider font tooltip
                '--slider-tooltip-font-size': this.content.fontSize,
                '--slider-tooltip-line-height': this.content.lineHeight,
                '--slider-tooltip-font-weight': this.content.fontWeight,

                // Slider tooltip
                '--slider-tooltip-color': this.content.tooltipColor,
                '--slider-tooltip-bg': this.content.tooltipBgColor,
                '--slider-tooltip-bg-disabled': this.content.tooltipBgColorDisabled,
                '--slider-tooltip-radius': this.content.tooltipRadius,
                '--slider-tooltip-py': this.content.tooltipHeight,
                '--slider-tooltip-px': this.content.tooltipWidth,
                '--slider-tooltip-arrow-size': this.content.tooltipArroySize,
                '--slider-tooltip-distance': this.content.tooltipDistance,
            };
        },
    },
    watch: {
        internalValue(newValue) {
            if (newValue === this.value) return;
            this.setValue(newValue);
            this.$emit('trigger-event', {
                name: 'change',
                event: { value: newValue },
            });
        },
        'content.value'(newValue) {
            newValue = parseFloat(newValue);
            if (isNaN(newValue)) newValue = 0;
            if (newValue === this.value) return;
            this.setValue(newValue);
            this.$emit('trigger-event', { name: 'initValueChange', event: { value: newValue } });
        },
    },
};
</script>

<style src="@vueform/slider/themes/default.css"></style>

<style lang="scss" scoped>
.ww-form-input-range {
    .spacing {
        padding: 0.5rem 0;
    }
    &.editing {
        pointer-events: none;
    }
}
</style>

<style lang="scss">
// discuss about global style
.slider-tooltip {
    font-family: var(--slider-tooltip-font-family) !important;
}
</style>
