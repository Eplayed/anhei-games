// 粒子片元着色器
varying float vAlpha;
varying vec3 vColor;

void main() {
  // 圆形粒子（距离中心的距离）
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;

  // 柔和边缘
  float alpha = vAlpha * smoothstep(0.5, 0.2, dist);

  gl_FragColor = vec4(vColor, alpha);
}
