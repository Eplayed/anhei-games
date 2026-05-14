<template>
  <div
    ref="tiltRef"
    class="tilt-card"
    :style="getTiltStyle()"
    @mouseenter="onMouseEnter"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <slot></slot>
    <!-- 光泽层 -->
    <div v-if="glare && isHovering" class="tilt-glare" :style="glareStyle"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMouseTilt } from '../composables/useMouseTilt.js'

var props = defineProps({
  maxTilt: { type: Number, default: 8 },
  perspective: { type: Number, default: 800 },
  scale: { type: Number, default: 1.02 },
  speed: { type: Number, default: 200 },
  glare: { type: Boolean, default: true },
  enabled: { type: Boolean, default: true }
})

var tilt = useMouseTilt({
  maxTilt: props.maxTilt,
  perspective: props.perspective,
  scale: props.scale,
  speed: props.speed,
  enabled: props.enabled
})

var tiltRef = tilt.elementRef
var getTiltStyle = tilt.getTiltStyle
var onMouseEnter = tilt.onMouseEnter
var onMouseLeave = tilt.onMouseLeave
var onMouseMove = tilt.onMouseMove
var isHovering = tilt.isHovering

// 光泽效果
var glareStyle = computed(function() {
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 60%)',
    borderRadius: 'inherit',
    zIndex: 1
  }
})
</script>

<style scoped>
.tilt-card {
  position: relative;
  transform-style: preserve-3d;
}

.tilt-glare {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  border-radius: inherit;
  z-index: 1;
}
</style>
