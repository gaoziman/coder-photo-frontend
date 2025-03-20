<template>
  <a-layout-footer class="app-footer">
    <div class="footer-divider"></div>
    <div class="footer-main">
      <div class="footer-section brand-section">
        <div class="footer-logo">
          <cloud-outlined class="footer-logo-icon" />
          <span class="footer-logo-text">智能云图库</span>
        </div>
        <p class="footer-slogan">发现、创作、分享，让创意无限流动</p>
        <div class="social-links">
          <a href="#" aria-label="微信"><wechat-outlined /></a>
          <a href="#" aria-label="微博"><weibo-outlined /></a>
          <a href="#" aria-label="QQ"><qq-outlined /></a>
          <a href="#" aria-label="GitHub"><github-outlined /></a>
        </div>
      </div>

      <div class="footer-section">
        <h4>关于我们</h4>
        <ul>
          <li><a href="#">公司介绍</a></li>
          <li><a href="#">团队成员</a></li>
          <li><a href="#">加入我们</a></li>
          <li><a href="#">合作伙伴</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>产品服务</h4>
        <ul>
          <li><a href="#">功能特性</a></li>
          <li><a href="#">定价方案</a></li>
          <li><a href="#">企业服务</a></li>
          <li><a href="#">API文档</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>支持与帮助</h4>
        <ul>
          <li><a href="#">帮助中心</a></li>
          <li><a href="#">常见问题</a></li>
          <li><a href="#">反馈建议</a></li>
          <li><a href="#">联系我们</a></li>
        </ul>
      </div>

      <div class="footer-section contact-section">
        <h4>联系我们</h4>
        <p><mail-outlined /> support@cloudgallery.com</p>
        <p><phone-outlined /> 400-888-8888</p>
        <p><environment-outlined /> 北京市海淀区科技园区</p>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="copyright-section">
        <span class="copyright">© {{ currentYear }} 智能云图库. 版权所有</span>
        <span class="icp">京ICP备12345678号-1</span>
      </div>
      <div class="bottom-links">
        <a href="#">关于我们</a>
        <a href="#">使用条款</a>
        <a href="#">隐私政策</a>
        <a href="#">帮助中心</a>
        <a href="#">联系我们</a>
      </div>
    </div>
  </a-layout-footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  CloudOutlined,
  WechatOutlined,
  WeiboOutlined,
  QqOutlined,
  GithubOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined
} from '@ant-design/icons-vue';

// 计算当前年份
const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.app-footer {
  background: white;
  padding: 0;
  color: var(--text-secondary);
  font-size: 14px;
}

.footer-divider {
  height: 1px;
  background: linear-gradient(90deg, rgba(229, 231, 235, 0.5), rgba(229, 231, 235, 1) 50%, rgba(229, 231, 235, 0.5) 100%);
  width: 100%;
}

.footer-main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 40px 60px;
  gap: 40px;
}

.footer-section {
  min-width: 160px;
}

.brand-section {
  flex: 2;
  max-width: 300px;
}

.contact-section {
  flex: 1.5;
}

.footer-logo {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.footer-logo-icon {
  font-size: 24px;
  color: var(--primary-color);
}

.footer-logo-text {
  font-size: 18px;
  font-weight: 600;
  margin-left: 10px;
  color: var(--text-primary);
}

.footer-slogan {
  color: var(--text-secondary);
  margin-bottom: 16px;
  line-height: 1.5;
}

.social-links {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}

.social-links a {
  color: var(--text-secondary);
  font-size: 20px;
  transition: all 0.3s;
}

.social-links a:hover {
  color: var(--primary-color);
  transform: translateY(-2px);
}

.footer-section h4 {
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section li {
  margin-bottom: 8px;
}

.footer-section a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
  display: inline-block;
}

.footer-section a:hover {
  color: var(--primary-color);
}

.contact-section p {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-bottom {
  border-top: 1px solid var(--border-color-light);
  padding: 20px 60px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background-color: #f9fafb;
}

.copyright-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.copyright, .icp {
  color: var(--text-secondary);
  margin: 0;
  white-space: nowrap;
}

.bottom-links {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
}

.bottom-links a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
  white-space: nowrap;
}

.bottom-links a:hover {
  color: var(--primary-color);
}

@media (max-width: 1200px) {
  .footer-main {
    padding: 30px 40px;
    gap: 30px;
  }

  .footer-bottom {
    padding: 16px 40px;
  }
}

@media (max-width: 768px) {
  .footer-main {
    flex-direction: column;
    padding: 30px 20px;
    gap: 24px;
  }

  .footer-section {
    width: 100%;
  }

  .brand-section, .contact-section {
    max-width: 100%;
  }

  .footer-bottom {
    flex-direction: column;
    padding: 16px 20px;
    text-align: center;
    gap: 16px;
  }

  .copyright-section {
    flex-direction: column;
    gap: 8px;
  }

  .bottom-links {
    justify-content: center;
  }
}
</style>