<template>
  <button
    class="diablo-3d-toggle"
    :class="{ active: is3DMode }"
    @click="toggle3DMode"
    :title="is3DMode ? '切换到2D模式' : '切换到3D模式'"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="toggle-icon">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
    <span class="toggle-label">{{ is3DMode ? '3D' : '2D' }}</span>
  </button>
</template>

<script setup>
import { use3DMode } from '../composables/use3DMode.js'

var { is3DMode, toggle3DMode } = use3DMode()
</script>

<style scoped>
.diablo-3d-toggle {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border: 1px solid var(--hairline);
  border-radius: 4px;
  background: transparent;
  color: var(--ink-mute);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.5px;
}

.diablo-3d-toggle:hover {
  border-color: var(--brand-gold);
  color: var(--brand-gold);
}

.diablo-3d-toggle.active {
  border-color: var(--brand-gold);
  color: var(--brand-gold);
  background: rgba(200, 134, 10, 0.1);
}

.toggle-icon {
  width: 14px;
  height: 14px;
}

.toggle-label {
  font-family: var(--font-mono);
}
</style>
