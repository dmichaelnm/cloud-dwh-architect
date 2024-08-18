<template>
  <!-- Button -->
  <q-btn
    :label="appearance !== 'icon' ? label : ''"
    :color="color !== undefined ? color : 'button'"
    :icon="icon"
    :size="size !== undefined ? size : 'md'"
    :flat="appearance !== undefined && appearance !== 'button'"
    :round="appearance === 'icon'"
    :target="target"
    :href="href"
    :type="type"
    :class="`appearance-${appearance}`"
    :to="to"
    no-caps
    @click="emit('click')"
  >
    <!-- Tooltip -->
    <q-tooltip v-if="tooltip">{{ tooltip }}</q-tooltip>
    <!-- Default Slot -->
    <slot />
  </q-btn>
</template>

<style lang="scss" scoped>
.appearance-link {
  text-decoration: underline;
  font-weight: normal;
}
</style>

<script setup lang="ts">
/** Defines the properties of this component */
defineProps<{
  /** The appearance of the button */
  appearance?: 'button' | 'link' | 'icon';
  /** The label of the button (only for 'button' or 'link' appearance */
  label?: string;
  /** The color of the button */
  color?: string;
  /** The icon of the button */
  icon?: string;
  /** The size of the button */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** The target of a hyperlink reference */
  target?: '_blank' | '_self' | '_top';
  /** A hyperlink reference (URL) */
  href?: string;
  /** A toolip for the button */
  tooltip?: string;
  /** The type of the button */
  type?: 'button' | 'submit' | 'reset';
  /** Target of a routing */
  to?: string;
}>();

/** Defines the events that can be emitted by this component */
const emit = defineEmits<{
  /** The click event */
  (event: 'click'): void;
}>();
</script>
