```# 配置名称: Surge 自用配置
# 配置作者: weiShaoY
# 适用版本：iOS/macOS 通用
# 官方手册 - https://manual.nssurge.com/
# 理解原理 - https://manual.nssurge.com/book/understanding-surge/cn/
# 帮助中心 - https://nssurge.zendesk.com/
# 技术社区 - https://community.nssurge.com

[General]

# --- 基本设置 ---

# IPv6 支持（默认关闭）
ipv6 = false

# 除非当地 ISP 有严重的 DNS 污染问题，否则没必要开启 DoH，传统 DNS 的性能最优，网络异常后恢复速度最快
# encrypted-dns-server = https://223.5.5.5

# DNS 设置（119 腾讯，180 字节跳动，223 阿里）
# dns-server = 119.29.29.29, 180.184.1.1, 223.5.5.5, system
dns-server = 114.114.114.114, system

# 从 /etc/hosts 读取 DNS 记录
read-etc-hosts = true

# --- 代理规则 ---

# 跳过某个域名或者 IP 段，这些目标主机将不会由 Surge Proxy 处理 (macOS 版本中，如果启用了 Set as System Proxy, 这些值会被写入到系统网络代理设置.)
skip-proxy = 192.168.0.0/24, 10.0.0.0/8, 172.16.0.0/12, 127.0.0.1, localhost, *.local

# 排除简单主机名 (避免内部网络解析问题)
exclude-simple-hostnames = true

#  参数用于控制当 UDP 流量被匹配到一个不支持 UDP 转发的策略时的行为 (DIRECT：回退到 DIRECT 策略（默认）, REJECT：回退到 REJECT 策略)
# udp-policy-not-supported-behaviour = REJECT

# --- 网络测试 ---

# 国内 测试 url
internet-test-url = http://taobao.com/

# 代理测速 url
proxy-test-url = http://www.apple.com/

# 测试超时（秒）
test-timeout = 2  ; 建议放到一起，方便修改

# --- GeoIP 数据库 ---

# 自定义 GeoIP 数据库
geoip-maxmind-url = https://github.com/Hackl0us/GeoIP2-CN/raw/release/Country.mmdb

# 禁用 GEOIP 自动更新
disable-geoip-db-auto-update = true

# --- 其他设置 ---

# 增强版 Wi-Fi 助理
wifi-assist = true   ; 很少修改，放最后

# UDP 优先级
udp-priority = false  ; 很少修改，放最后

# ------------------------------------------------------------------------------------------------------------------------------

# Proxy = smart, include-all-proxies=0, include-other-group=🐈 iKuuu
# 🐈 iKuuu = smart, policy-path=https://sub.store/download/iKuuu?target=SurgeMac, update-interval=0, include-all-proxies=0

# update-interval 指定更新间隔，单位是秒，默认是 0，表示不自动更新
# include-all-proxies =0 表示不包含所有节点，只包含 include-other-group 指定的节点  如果设置为1则包含所有节点
# external-policy-name-prefix 指定外部策略的名称前缀，方便区分不同的外部策略
# policy-path  指定外部策略的订阅链接，可以是 HTTP 或 HTTPS 链接
# include-other-group 指定其他组的节点，可以是多个，用逗号分隔

# REJECT: 发送 RST 包，客户端立即收到连接被重置的错误；快速、直接、通用；客户端明确知道连接被拒绝，可能暴露策略；适用于阻止恶意连接、广告服务器等，需要明确拒绝连接的情况。
# REJECT-NO-DROP: 丢弃数据包，不发送 RST 包，连接超时；节省服务器资源、更隐蔽；兼容性问题，某些客户端可能无法正确处理；适用于阻止不必要的连接，但希望避免发送 RST 包，例如某些不兼容 RST 包的设备。
# REJECT-DROP: 直接丢弃数据包，不发送任何响应，连接超时；服务器资源占用更少、更隐蔽；更容易出现兼容性问题，客户端更难判断连接是否被拒绝；适用于阻止不必要的连接，对隐蔽性要求更高，且可以容忍一定的兼容性问题。

[Proxy]
🌏 全球直连 = DIRECT

🔴 广告拦截 = REJECT         # 彻底屏蔽广告，干净浏览
🚫 立即拒绝 = REJECT-NO-DROP  # 明确拒绝，快速失败通知
⛔ 静默丢弃 = REJECT-DROP     # 无感阻断，避免连接重试

[Proxy Group]

🎃 Proxy = select,☀️ 主力机场,🌙 备用机场,🇭🇰 香港,🇺🇸 美国,🇯🇵 日本,🇨🇳 台湾

# iKuuu 机场
☀️ 主力机场 = smart, update-interval=0, include-all-proxies=0,policy-path=https://sub.store/download/collection/%E4%B8%BB%E5%8A%9B%E6%9C%BA%E5%9C%BA?target=SurgeMac,

🌙 备用机场 = smart,update-interval=0,include-all-proxies=0,policy-path=https://sub.store/download/collection/%E5%A4%87%E7%94%A8%E6%9C%BA%E5%9C%BA?target=SurgeMac,

# 良心云 机场
# 🌙 备用机场 = smart,update-interval=0, include-all-proxies=0,policy-path=https://sub.store/download/%E8%89%AF%E5%BF%83%E4%BA%91?target=SurgeMac,

# # 小蜜蜂 机场
# 🌙 备用机场2 = smart,update-interval=0, include-all-proxies=0, policy-path=https://sub.store/download/%E5%B0%8F%E8%9C%9C%E8%9C%82%E6%9C%BA%E5%9C%BA?target=Surge,

# 选中机场的节点列表 = smart, include-other-group=☀️ 主力机场, include-all-proxies=0

# 区分不同地区的节点
🇭🇰 香港 = select, include-all-proxies=0, include-other-group=☀️ 主力机场, policy-regex-filter=(🇭🇰)|(港)|(Hong)|(HK)
🇺🇸 美国 = select, include-all-proxies=0, include-other-group=☀️ 主力机场, policy-regex-filter=(🇺🇸)|(美)|(States)|(US)
🇯🇵 日本 = select, include-all-proxies=0, include-other-group=☀️ 主力机场, policy-regex-filter=(🇯🇵)|(日)|(Japan)|(JP)
🇨🇳 台湾 = select, include-all-proxies=0, include-other-group=☀️ 主力机场, policy-regex-filter=(🇨🇳)|(台)|(Tai)|(TW)
🇸🇬 新加坡 = select, include-all-proxies=0, include-other-group=☀️ 主力机场, policy-regex-filter=(🇸🇬)|(新)|(狮城)|(Singapore)|(SG)
🇰🇷 韩国 = select, include-all-proxies=0, include-other-group=☀️ 主力机场, policy-regex-filter=(🇰🇷)|(韩)|(Korea)|(KR),hidden=1
🇨🇦 加拿大 = select, include-all-proxies=0, include-other-group=☀️ 主力机场, policy-regex-filter=(🇨🇦)|(加拿大)|(CA),hidden=1
🇷🇺 俄罗斯 = select, include-all-proxies=0, include-other-group=☀️ 主力机场, policy-regex-filter=(🇷🇺)|(俄)|(Russia)|(RU),hidden=1
🇮🇳 印度 = select, include-all-proxies=0, include-other-group=☀️ 主力机场, policy-regex-filter=(🇮🇳)|(印度)|(IN),hidden=1
🇩🇪 德国 = select, include-all-proxies=0, include-other-group=☀️ 主力机场, policy-regex-filter=(🇩🇪)|(德)|(Germany)|(DE),hidden=1
🇬🇧 英国 = select, include-all-proxies=0, include-other-group=☀️ 主力机场, policy-regex-filter=(🇬🇧)|(英)|(England)|(GB),hidden=1
🇫🇷 法国 = select, include-all-proxies=0, include-other-group=☀️ 主力机场, policy-regex-filter=(🇫🇷)|(法)|(France)|(FR),hidden=1
🇦🇷 阿根廷 = select, include-all-proxies=0, include-other-group=☀️ 主力机场, policy-regex-filter=(🇦🇷)|(阿根廷)|(AR),hidden=1
🇹🇷 土耳其 = select, include-all-proxies=0, include-other-group=☀️ 主力机场, policy-regex-filter=(🇹🇷)|(土耳其)|(TR),hidden=1
🇺🇦 乌克兰 = select, include-all-proxies=0, include-other-group=☀️ 主力机场, policy-regex-filter=(🇺🇦)|(乌克兰)|(UA),hidden=1

# 区分不同软件
✈️ Telegram = select,🇭🇰 香港,🇺🇸 美国,🇯🇵 日本,🇨🇳 台湾,🇸🇬 新加坡,🌙 备用机场,
📺 TikTok = select,🇭🇰 香港,🇺🇸 美国,🇯🇵 日本,🇨🇳 台湾,🇸🇬 新加坡,🌙 备用机场,
🍎 Apple = select,🇭🇰 香港,🇺🇸 美国,🇯🇵 日本,🇨🇳 台湾,🇸🇬 新加坡,🌙 备用机场,
📟 Ai = select,🇭🇰 香港,🇺🇸 美国,🇯🇵 日本,🇨🇳 台湾,🇸🇬 新加坡,🌙 备用机场,

[Rule]

# 个人
DOMAIN,weishao.site,🌏 全球直连 # 家庭域名-直连
DOMAIN,weishao.pro,🌏 全球直连 # 个人网站-直连

# 中国IP地址 - 直连
GEOIP,CN,🌏 全球直连

# 内网IP地址 - 直连
RULE-SET,LAN,🌏 全球直连

# 国内
RULE-SET,https://ruleset.skk.moe/List/ip/china_ip.conf,🌏 全球直连 # 中国 IP 规则集 - 直连
RULE-SET,https://ruleset.skk.moe/List/ip/domestic.conf,🌏 全球直连 # 腾讯云 AIA Anycast 业务的 IP 段和阿里云 Anycast 业务的 IP 段 - 直连

# 国内流媒体
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/ChinaMedia/ChinaMedia.list,🌏 全球直连 # 中国流媒体域名 - 直连

# 海外流媒体 - 代理
RULE-SET,https://ruleset.skk.moe/List/non_ip/stream_us.conf,🎃 Proxy # 北美相关流媒体非 IP 规则集 - 代理
RULE-SET,https://ruleset.skk.moe/List/ip/stream_us.conf,🎃 Proxy # 北美相关流媒体 IP 规则集 - 代理
RULE-SET,https://ruleset.skk.moe/List/non_ip/stream_eu.conf,🎃 Proxy # 欧洲相关流媒体非 IP 规则集 - 代理
RULE-SET,https://ruleset.skk.moe/List/ip/stream_eu.conf,🎃 Proxy # 欧洲相关流媒体 IP 规则集 - 代理
RULE-SET,https://ruleset.skk.moe/List/non_ip/stream_jp.conf,🎃 Proxy # 日本相关流媒体非 IP 规则集 - 代理
RULE-SET,https://ruleset.skk.moe/List/ip/stream_jp.conf,🎃 Proxy # 日本相关流媒体 IP 规则集 - 代理
RULE-SET,https://ruleset.skk.moe/List/non_ip/stream_kr.conf,🎃 Proxy # 韩国相关流媒体非 IP 规则集 - 代理
RULE-SET,https://ruleset.skk.moe/List/ip/stream_kr.conf,🎃 Proxy # 韩国相关流媒体 IP 规则集 - 代理
RULE-SET,https://ruleset.skk.moe/List/non_ip/stream_hk.conf,🎃 Proxy # 香港相关流媒体非 IP 规则集 - 代理
RULE-SET,https://ruleset.skk.moe/List/ip/stream_hk.conf,🎃 Proxy # 香港相关流媒体 IP 规则集 - 代理
RULE-SET,https://ruleset.skk.moe/List/non_ip/stream_tw.conf,🎃 Proxy # 台湾相关流媒体非 IP 规则集 - 代理
RULE-SET,https://ruleset.skk.moe/List/ip/stream_tw.conf,🎃 Proxy # 台湾相关流媒体 IP 规则集 - 代理

# Telegram - 代理
RULE-SET,https://ruleset.skk.moe/List/non_ip/telegram.conf,✈️ Telegram # 非 IP 规则集 - 代理
RULE-SET,https://ruleset.skk.moe/List/ip/telegram.conf,✈️ Telegram # IP 规则集 - 代理
RULE-SET,https://ruleset.skk.moe/List/ip/telegram_asn.conf,✈️ Telegram # ASN 规则集 - 代理

# 海外
RULE-SET,https://ruleset.skk.moe/List/non_ip/global.conf,🎃 Proxy # 常见海外服务和互联网公司的域名 - 代理

# 测速
DOMAIN-SET,https://ruleset.skk.moe/List/domainset/speedtest.conf,🌏 全球直连 # Speedtest 测速域名 - 直连

# Ai
RULE-SET,https://ruleset.skk.moe/List/non_ip/ai.conf,📟 Ai # AI相关域名(包含 OpenAI、Google Gemini、Claude、Perplexity 等) - 代理

# Apple
DOMAIN-SET,https://ruleset.skk.moe/List/domainset/apple_cdn.conf,🌏 全球直连 # Apple国内CDN域名 域名规则集 - 直连
RULE-SET,https://ruleset.skk.moe/List/non_ip/apple_cn.conf,🌏 全球直连 # 云上贵州（icloud.com.cn）和苹果地图国内版等服务的域名 - 直连
RULE-SET,https://ruleset.skk.moe/List/non_ip/apple_services.conf,🍎 Apple # 排除了有国内 CDN 节点的域名和国区专用域名的 Apple 服务域名 - 代理

# Microsoft
DOMAIN-SET,https://ruleset.skk.moe/List/non_ip/microsoft_cdn.conf,🌏 全球直连 # Microsoft Cdn 域名规则集 - 直连
RULE-SET,https://ruleset.skk.moe/List/non_ip/microsoft.conf,🎃 Proxy # 排除了有国内 CDN 节点的域名和国区专用域名以后的 Microsoft 服务域名 - 代理

# TikTok
RULE-SET,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/TikTok/TikTok.list,📺 TikTok # TikTok 相关域名 - 代理
RULE-SET, https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/TikTok.list, 📺 TikTok # TikTok 相关域名 - 代理

# Cdn - 必须放最后,因为很多规则集会包含 Cdn 域名
DOMAIN-SET,https://ruleset.skk.moe/List/domainset/cdn.conf,🎃 Proxy # Cdn 域名规则集 - 代理
RULE-SET,https://ruleset.skk.moe/List/non_ip/cdn.conf,🎃 Proxy # Cdn 非 IP 规则集 - 代理

# 广告拦截
# DOMAIN-SET,https://ruleset.skk.moe/List/domainset/reject.conf,🔴 广告拦截 # 基础的 12 万拦截域名 - 拒绝

# DOMAIN-SET,https://ruleset.skk.moe/List/domainset/reject_extra.conf,🔴 广告拦截 # 额外 9 万拦截域名 - 拒绝

# RULE-SET,https://ruleset.skk.moe/List/ip/reject.conf,⛔ 静默丢弃 # 拒绝 IP 规则集 - 拒绝

# RULE-SET,https://ruleset.skk.moe/List/non_ip/reject-no-drop.conf,🚫 立即拒绝 # YouTube、Bilibili 和斗鱼的视频CDN - 拒绝

# RULE-SET,https://ruleset.skk.moe/List/non_ip/reject-drop.conf,⛔ 静默丢弃 # Adobe 系列软件内部的跟踪打点域名的数据包 - 拒绝

# RULE-SET,https://raw.githubusercontent.com/Centralmatrix3/Matrix-io/master/Surge/Ruleset/AdBlock.list,🔴 广告拦截 # 广告拦截规则集(Lucky) - 拒绝  注释原因-拦截javdb等站

# 最终规则
FINAL,🎃 Proxy,dns-failed # 其他所有流量走代理,DNS解析失败时也走代理

[MITM]
ca-passphrase = 29E92F21
ca-p12 = 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

```
