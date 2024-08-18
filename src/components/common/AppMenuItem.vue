<template>
  <!-- Item -->
  <q-item
    dense
    class="menu-item-label"
    :clickable="clickable"
    v-close-popup="closeable ? closeable : false"
    @click="emit('click')"
  >
    <!-- Menu Item Icon Section -->
    <q-item-section avatar v-if="showIcon">
      <!-- Menu Item Icon -->
      <q-icon :name="icon" v-if="icon" size="xs" />
    </q-item-section>
    <!-- Menu Item Label Section -->
    <q-item-section>
      <!-- Menu Item Label -->
      <q-item-label>{{ label }}</q-item-label>
    </q-item-section>
    <!-- Default Slot -->
    <slot />
  </q-item>
</template>

<style lang="scss" scoped>
@import 'src/css/quasar.variables';

// Menu Item Label
.menu-item-label {
  color: $light-text-normal;
}

// Menu Item Label (Dark Mode)
.body--dark .menu-item-label {
  color: $dark-text-normal;
}
</style>

<script setup lang="ts">
/** Defines the properties of this component */
defineProps<{
  /** Flag for the item to be clickable */
  clickable?: boolean;
  /** Flag for the item to be closing the entire menu */
  closeable?: boolean;
  /** Flag for showing menu icons */
  showIcon?: boolean;
  /** An optional menu icon */
  icon?: string;
  /** The label of the menu item */
  label: string;
}>();

/** Defines the events that can be emitted by this component */
const emit = defineEmits<{
  // Click event
  (event: 'click'): void;
}>();
</script>
