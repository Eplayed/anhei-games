// 粒子顶点着色器
attribute float aSize;
attribute float aLifetime;
attribute float aType; // 0=ember, 1=ash, 2=gold
attribute float aRandom;

uniform float uTime;
uniform float uPixelRatio;
uniform vec3 uEmberColor;
uniform vec3 uAshColor;
uniform vec3 uGoldColor;

varying float vAlpha;
varying vec3 vColor;

void main() {
  float life = mod(aLifetime - uTime * 0.5, 1.0);
  float lifeProgress = life;

  // 根据类型选颜色
  vec3 color = uEmberColor;
  if (aType > 0.5 && aType < 1.5) color = uAshColor;
  else if (aType > 1.5) color = uGoldColor;

  vColor = color;

  // 余烬闪烁
  float flicker = 1.0;
  if (aType < 0.5) {
    flicker = 0.5 + 0.5 * sin(uTime * 3.0 + aRandom * 6.28);
  }

  // 金尘快速消退
  float alphaMultiplier = 1.0;
  if (aType > 1.5) {
    alphaMultiplier = 1.0 - lifeProgress;
  }

  vAlpha = (1.0 - lifeProgress) * flicker * alphaMultiplier;

  // 运动
  vec3 pos = position;
  // 余烬上升
  if (aType < 0.5) {
    pos.y += uTime * (0.1 + aRandom * 0.2);
    pos.x += sin(uTime * 0.5 + aRandom * 3.14) * 0.02;
  }
  // 灰烬飘散
  else if (aType < 1.5) {
    pos.y += uTime * 0.05;
    pos.x += sin(uTime * 0.3 + aRandom * 6.28) * 0.03;
    pos.z += cos(uTime * 0.2 + aRandom * 4.71) * 0.02;
  }
  // 金尘 — 不做额外运动（跟随光标位置更新）
  else {
    pos.y += sin(uTime + aRandom * 3.14) * 0.01;
  }

  // 循环回底部
  pos.y = mod(pos.y + 5.0, 10.0) - 5.0;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = aSize * uPixelRatio * (200.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
