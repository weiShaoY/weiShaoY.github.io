import { ElLoading } from 'element-plus'

const loadingSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
    <style>
      .spinner {
        transform-origin: center;
        animation: rotate 1.6s linear infinite;
      }
      .dot {
        fill: var(--main-color);
        animation: fade 1.6s infinite;
      }
      .dot:nth-child(1) { animation-delay: 0s; }
      .dot:nth-child(2) { animation-delay: 0.5s; }
      .dot:nth-child(3) { animation-delay: 1s; }
      .dot:nth-child(4) { animation-delay: 1.5s; }
      @keyframes rotate {
        100% { transform: rotate(360deg); }
      }
      @keyframes fade {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    </style>
    <g class="spinner">
      <circle class="dot" cx="20" cy="8" r="4"/>
      <circle class="dot" cx="32" cy="20" r="4"/>
      <circle class="dot" cx="20" cy="32" r="4"/>
      <circle class="dot" cx="8" cy="20" r="4"/>
    </g>
  </svg>
`

export function setupLoading() {
  const loading = ElLoading.service({
    lock: true,
    text: import.meta.env.VITE_APP_DESC,
    background: 'rgba(0, 0, 0, 0)',
    svg: loadingSvg,

    customClass: 'my-custom-loading-js', // 自定义类名（仅用于 JS 定位）
  })

  const app = document.getElementById('app')

  if (app) {
    // app.innerHTML = loading
    setTimeout(() => {
      loading.close()
    }, 1000)
  }
}
