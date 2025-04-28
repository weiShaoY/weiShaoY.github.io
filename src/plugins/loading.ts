import { ElLoading } from 'element-plus'

const loadingSvg = `
<svg viewBox="0 0 50 50">
  <circle class="ring" cx="25" cy="25" r="20"></circle>
  <circle class="ball" cx="25" cy="5" r="3.5"></circle>
</svg>
`

export function setupLoading() {
  // 动态插入CSS
  const style = document.createElement('style')

  style.textContent = `
     .myClass svg {
       width: 3.75em;
       animation: 1.5s spin ease infinite;
     }

     .myClass .ring {
       fill: none;
       stroke: hsla(341, 97%, 59%, 0.3);
       stroke-width: 2;
     }

     .myClass .ball {
       fill: #fc2f70;
       stroke: none;
     }

     @keyframes spin {
       to {
         transform: rotate(360deg);
       }
     }
   `
  document.head.appendChild(style)

  const loading = ElLoading.service({
    lock: true,

    // text: '',

    text: import.meta.env.VITE_APP_DESC,
    background: 'rgba(0, 0, 0, 0)',
    svg: loadingSvg,
    customClass: 'myClass', // 自定义类名（仅用于 JS 定位）
  })

  const app = document.getElementById('app')

  if (app) {
    // app.innerHTML = loading
    setTimeout(() => {
      loading.close()
    }, 1000)
  }
}
