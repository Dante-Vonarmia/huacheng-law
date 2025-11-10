<script lang="ts">
  import { page } from '$app/stores';
    import { Card, Badge, Button, Typography } from '$ui/components';

  // 业务领域数据（与列表页保持一致）
  const practicesData = {
    'intellectual-property': {
      id: 'ip',
      slug: 'intellectual-property',
      name_zh: '知识产权法',
      name_en: 'Intellectual Property Law',
      description_zh: '专注于专利、商标、著作权等知识产权领域，为企业提供全方位的IP保护和商业化策略',
      detail_zh: '我们的知识产权团队在专利申请、商标注册、著作权保护、商业秘密维护等领域拥有丰富经验，为客户提供从知识产权创造、运用到保护的全链条法律服务。',
      services: ['专利申请与维权', '商标注册与保护', '著作权登记', '商业秘密保护', '知识产权诉讼', 'IP尽职调查'],
      cases: '成功代理500+知识产权案件，涉及高科技、医药、互联网等多个行业',
      cover_image: 'https://images.unsplash.com/photo-1524633712235-22da046738b4?w=1920&q=80',
      detailed_services: [
        {
          title: '专利服务',
          description: '提供专利申请、审查、无效、侵权分析等全方位服务',
          items: ['发明专利申请', '实用新型专利', '外观设计专利', '专利无效宣告', '专利侵权诉讼', '专利许可与转让']
        },
        {
          title: '商标服务',
          description: '协助企业建立完善的商标保护体系',
          items: ['商标查询与检索', '商标注册申请', '商标异议与争议', '商标侵权维权', '驰名商标认定', '商标续展与变更']
        },
        {
          title: '著作权服务',
          description: '保护文学、艺术和科学作品的合法权益',
          items: ['作品著作权登记', '软件著作权登记', '著作权侵权诉讼', '著作权许可合同', '网络版权保护', '影视版权代理']
        }
      ],
      team_members: [
        { name: '张明华', title: '合伙人', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop' },
        { name: '李娜', title: '高级律师', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop' }
      ],
      success_cases: [
        {
          title: '某科技公司专利侵权案',
          description: '成功代理某科技公司专利侵权案件，获赔金额达2亿元，创下行业记录',
          outcome: '胜诉',
          amount: '2亿元'
        },
        {
          title: '某互联网企业商标保护',
          description: '协助某互联网企业在全球60多个国家完成商标布局，有效保护品牌权益',
          outcome: '成功',
          coverage: '60+国家'
        }
      ]
    },
    'corporate-law': {
      id: 'corporate',
      slug: 'corporate-law',
      name_zh: '公司法务',
      name_en: 'Corporate Law',
      description_zh: '为企业提供全生命周期法律服务，包括公司设立、股权架构、并购重组、合规管理等',
      detail_zh: '从公司设立到上市融资，从日常运营到并购重组，我们为企业提供全方位、一站式的法律服务，助力企业健康发展。',
      services: ['公司设立与治理', '股权架构设计', '并购重组', '投融资服务', '合规管理', '公司清算'],
      cases: '协助完成100+并购交易，累计交易金额超过500亿元',
      cover_image: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=1920&q=80',
      detailed_services: [
        {
          title: '公司设立与治理',
          description: '协助企业完成工商登记，建立规范的公司治理结构',
          items: ['公司注册登记', '章程起草', '股东协议', '董事会运作', '公司治理制度', '三会规范']
        },
        {
          title: '并购重组',
          description: '为企业并购重组提供全流程法律服务',
          items: ['尽职调查', '交易架构设计', '协议谈判', '反垄断申报', '交割管理', '整合支持']
        },
        {
          title: '投融资服务',
          description: '协助企业完成各轮融资及上市',
          items: ['天使轮融资', 'A/B/C轮融资', 'IPO上市', '债券发行', '股权激励', '对赌协议']
        }
      ],
      team_members: [
        { name: '王建国', title: '合伙人', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop' },
        { name: '李静', title: '高级合伙人', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop' }
      ],
      success_cases: [
        {
          title: '某集团跨境并购',
          description: '成功协助某集团完成对美国公司的收购，交易金额达30亿美元',
          outcome: '完成',
          amount: '30亿美元'
        },
        {
          title: '某企业香港上市',
          description: '协助某企业在香港主板成功上市，融资额达50亿港币',
          outcome: '成功上市',
          amount: '50亿港币'
        }
      ]
    },
    'litigation': {
      id: 'litigation',
      slug: 'litigation',
      name_zh: '诉讼仲裁',
      name_en: 'Litigation & Arbitration',
      description_zh: '经验丰富的诉讼团队，专注商事诉讼、国际仲裁，为客户争取最大利益',
      detail_zh: '我们的诉讼团队在商事争议、合同纠纷、公司纠纷等领域拥有丰富的诉讼和仲裁经验，胜诉率高达98%。',
      services: ['商事诉讼', '合同纠纷', '公司纠纷', '国际仲裁', '执行程序', '诉讼策略咨询'],
      cases: '代理重大商事诉讼300+案件，标的额累计超过100亿元',
      cover_image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1920&q=80',
      detailed_services: [
        {
          title: '商事诉讼',
          description: '代理各类商事争议案件',
          items: ['合同纠纷', '股权纠纷', '侵权责任', '不正当竞争', '公司解散', '破产清算']
        },
        {
          title: '国际仲裁',
          description: '处理跨境商事争议',
          items: ['ICC仲裁', 'HKIAC仲裁', 'SIAC仲裁', 'CIETAC仲裁', '临时仲裁', '仲裁裁决执行']
        }
      ],
      team_members: [
        { name: '赵强', title: '合伙人', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop' }
      ],
      success_cases: [
        {
          title: '某建设工程纠纷',
          description: '代理某建设工程纠纷案件，标的额5亿元，成功为客户追回全部款项',
          outcome: '胜诉',
          amount: '5亿元'
        }
      ]
    }
  };

  const slug = $derived($page.params.slug);
  const practice = $derived(practicesData[slug]);

  // 如果找不到对应的业务领域，显示404（这里简化处理）
  $effect(() => {
    if (!practice) {
      console.error('Practice not found:', slug);
    }
  });
</script>

{#if practice}
  
  <Hero
    title={practice.name_zh}
    subtitle={practice.name_en}
    height="md"
    align="center"
    backgroundImage={practice.cover_image}
  >
    <svelte:fragment slot="description">
      <Typography tag="p" variant="lg" color="white" align="center" style="font-weight: 300; margin-top: 24px; max-width: 800px; margin-left: auto; margin-right: auto;">
        {practice.description_zh}
      </Typography>
    </svelte:fragment>
  </Hero>

  <!-- Overview Section -->
  <Section variant="white" padding="xl">
    <div class="overview">
      <div class="overview-content">
        <Typography tag="h2" variant="3xl" weight="500" style="margin-bottom: 24px;">
          服务概述
        </Typography>
        <Typography tag="p" variant="lg" style="line-height: 1.8; color: #475569; margin-bottom: 32px;">
          {practice.detail_zh}
        </Typography>
        <div class="stats-highlight">
          <div class="stat-highlight">
            <Typography tag="div" variant="4xl" color="primary" weight="300">
              {practice.cases.match(/\d+/)?.[0]}+
            </Typography>
            <Typography tag="div" variant="sm" color="secondary">
              成功案例
            </Typography>
          </div>
        </div>
      </div>
    </div>
  </Section>

  <!-- Detailed Services Section -->
  <Section variant="light" padding="xl">
    <Typography tag="h2" variant="3xl" weight="500" align="center" style="margin-bottom: 64px;">
      服务内容
    </Typography>

    <div class="services-grid">
      {#each practice.detailed_services as service}
        <Card variant="elevated" hoverable={true}>
          <div class="service-detail-card">
            <Typography tag="h3" variant="xl" weight="500" style="margin-bottom: 12px;">
              {service.title}
            </Typography>
            <Typography tag="p" variant="sm" color="secondary" style="margin-bottom: 20px;">
              {service.description}
            </Typography>
            <div class="service-items">
              {#each service.items as item}
                <div class="service-item">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fill="currentColor"/>
                  </svg>
                  <Typography tag="span" variant="sm">{item}</Typography>
                </div>
              {/each}
            </div>
          </div>
        </Card>
      {/each}
    </div>
  </Section>

  <!-- Team Section -->
  <Section variant="white" padding="xl">
    <Typography tag="h2" variant="3xl" weight="500" align="center" style="margin-bottom: 64px;">
      专业团队
    </Typography>

    <div class="team-grid">
      {#each practice.team_members as member}
        <Card variant="default" hoverable={true}>
          <div class="team-member-card">
            <div class="member-photo">
              <img src={member.photo} alt={member.name} />
            </div>
            <Typography tag="h4" variant="lg" weight="500" style="margin-top: 20px;">
              {member.name}
            </Typography>
            <Typography tag="p" variant="sm" color="secondary" style="margin-top: 8px;">
              {member.title}
            </Typography>
            <Button variant="outline" size="sm" style="margin-top: 20px;">
              查看详情
            </Button>
          </div>
        </Card>
      {/each}
    </div>
  </Section>

  <!-- Success Cases Section -->
  {#if practice.success_cases && practice.success_cases.length > 0}
    <Section variant="light" padding="xl">
      <Typography tag="h2" variant="3xl" weight="500" align="center" style="margin-bottom: 64px;">
        成功案例
      </Typography>

      <div class="cases-list">
        {#each practice.success_cases as case_item}
          <Card variant="elevated">
            <div class="case-card">
              <div class="case-header">
                <Typography tag="h3" variant="xl" weight="500">
                  {case_item.title}
                </Typography>
                <Badge variant="success">{case_item.outcome}</Badge>
              </div>
              <Typography tag="p" variant="base" style="line-height: 1.8; margin: 20px 0;">
                {case_item.description}
              </Typography>
              {#if case_item.amount}
                <div class="case-meta">
                  <Typography tag="span" variant="sm" color="secondary">
                    标的额/金额:
                  </Typography>
                  <Typography tag="span" variant="lg" color="primary" weight="500">
                    {case_item.amount}
                  </Typography>
                </div>
              {/if}
              {#if case_item.coverage}
                <div class="case-meta">
                  <Typography tag="span" variant="sm" color="secondary">
                    覆盖范围:
                  </Typography>
                  <Typography tag="span" variant="lg" color="primary" weight="500">
                    {case_item.coverage}
                  </Typography>
                </div>
              {/if}
            </div>
          </Card>
        {/each}
      </div>
    </Section>
  {/if}

  <!-- CTA Section -->
  <Section variant="primary" padding="xl">
    <div style="text-align: center; max-width: 800px; margin: 0 auto;">
      <Typography tag="h2" variant="3xl" color="white" align="center" style="margin-bottom: 24px;">
        需要专业法律咨询？
      </Typography>
      <Typography tag="p" variant="lg" color="white" align="center" style="margin-bottom: 32px; font-weight: 300;">
        我们的专业团队随时为您提供服务
      </Typography>
      <Button variant="secondary" size="lg">
        联系我们
      </Button>
    </div>
  </Section>

  
{:else}
    <Section variant="white" padding="xl">
    <div style="text-align: center; padding: 100px 20px;">
      <Typography tag="h1" variant="4xl" style="margin-bottom: 20px;">
        页面未找到
      </Typography>
      <Typography tag="p" variant="lg" color="secondary">
        抱歉，您访问的业务领域不存在
      </Typography>
      <Button variant="primary" size="lg" style="margin-top: 40px;">
        返回业务领域列表
      </Button>
    </div>
  </Section>
  
{/if}

<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .overview {
    max-width: 1000px;
    margin: 0 auto;
  }

  .overview-content {
    text-align: center;
  }

  .stats-highlight {
    display: flex;
    justify-content: center;
    gap: 60px;
    margin-top: 40px;

    @include respond-to(mobile) {
      gap: 40px;
    }
  }

  .stat-highlight {
    text-align: center;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 32px;
    max-width: 1400px;
    margin: 0 auto;

    @include respond-to(mobile) {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }

  .service-detail-card {
    padding: 32px;
  }

  .service-items {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .service-item {
    display: flex;
    align-items: center;
    gap: 12px;

    svg {
      flex-shrink: 0;
      color: $color-primary;
    }
  }

  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 32px;
    max-width: 1000px;
    margin: 0 auto;

    @include respond-to(mobile) {
      grid-template-columns: 1fr;
    }
  }

  .team-member-card {
    padding: 32px;
    text-align: center;
  }

  .member-photo {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .cases-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 1000px;
    margin: 0 auto;
  }

  .case-card {
    padding: 32px;
  }

  .case-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    gap: 16px;

    @include respond-to(mobile) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .case-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 12px;
  }
</style>
