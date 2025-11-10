<script lang="ts">
    import { Card, Badge, Typography } from '$ui/components';
  import { _ } from 'svelte-i18n';

  // 奖项数据
  const awards = [
    {
      year: 2024,
      items: [
        {
          id: '1',
          title_zh: 'ALB中国法律大奖 - 年度最佳知识产权律所',
          title_en: 'ALB China Law Awards - IP Law Firm of the Year',
          organization: 'ALB (Asian Legal Business)',
          date: '2024-09',
          image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&h=600&fit=crop',
          description_zh: '凭借在知识产权领域的卓越表现，荣获2024年度最佳知识产权律所奖项',
          category: 'firm'
        },
        {
          id: '2',
          title_zh: '钱伯斯亚太法律指南 - 一级推荐律所',
          title_en: 'Chambers Asia-Pacific - Band 1 Ranking',
          organization: 'Chambers and Partners',
          date: '2024-06',
          image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop',
          description_zh: '在公司并购、知识产权、诉讼仲裁等领域获得一级推荐',
          category: 'firm'
        },
        {
          id: '3',
          title_zh: '张明华 - 年度杰出知识产权律师',
          title_en: 'Zhang Minghua - IP Lawyer of the Year',
          organization: 'China Business Law Journal',
          date: '2024-11',
          image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&h=600&fit=crop',
          description_zh: '张明华合伙人因在专利诉讼领域的突出贡献荣获年度杰出知识产权律师称号',
          category: 'individual'
        }
      ]
    },
    {
      year: 2023,
      items: [
        {
          id: '4',
          title_zh: 'The Legal 500 - 顶级推荐律所',
          title_en: 'The Legal 500 - Tier 1 Ranking',
          organization: 'The Legal 500',
          date: '2023-10',
          image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop',
          description_zh: '在多个业务领域获得顶级推荐，客户满意度位列前茅',
          category: 'firm'
        },
        {
          id: '5',
          title_zh: 'IAM Patent 1000 - 金牌推荐',
          title_en: 'IAM Patent 1000 - Gold Tier',
          organization: 'IAM (Intellectual Asset Management)',
          date: '2023-07',
          image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop',
          description_zh: '知识产权诉讼及战略咨询领域获得金牌推荐',
          category: 'firm'
        },
        {
          id: '6',
          title_zh: '王建国 - 年度并购交易律师',
          title_en: 'Wang Jianguo - M&A Lawyer of the Year',
          organization: 'China Law & Practice Awards',
          date: '2023-12',
          image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop',
          description_zh: '王建国合伙人主导完成多起重大跨境并购交易，获业界高度认可',
          category: 'individual'
        },
        {
          id: '7',
          title_zh: '陈莉 - 杰出女性律师奖',
          title_en: 'Chen Li - Outstanding Female Lawyer Award',
          organization: 'IFLR Women in Business Law Awards',
          date: '2023-08',
          image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
          description_zh: '陈莉合伙人在跨境投资领域的卓越表现获得国际认可',
          category: 'individual'
        }
      ]
    },
    {
      year: 2022,
      items: [
        {
          id: '8',
          title_zh: 'Asian Legal Business中国十大律所',
          title_en: 'ALB China Top 10 Law Firms',
          organization: 'Asian Legal Business',
          date: '2022-12',
          image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
          description_zh: '综合实力位列中国十大律师事务所',
          category: 'firm'
        },
        {
          id: '9',
          title_zh: 'WTR 1000 - 商标代理顶级推荐',
          title_en: 'WTR 1000 - Trademark Prosecution Top Tier',
          organization: 'World Trademark Review',
          date: '2022-09',
          image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop',
          description_zh: '在商标申请及保护领域获得全球权威机构顶级推荐',
          category: 'firm'
        },
        {
          id: '10',
          title_zh: '刘敏 - 劳动法领域领先律师',
          title_en: 'Liu Min - Leading Lawyer in Labour & Employment',
          organization: 'Chambers Asia-Pacific',
          date: '2022-06',
          image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=800&h=600&fit=crop',
          description_zh: '刘敏合伙人在劳动法领域的专业能力获得钱伯斯认可',
          category: 'individual'
        }
      ]
    },
    {
      year: 2021,
      items: [
        {
          id: '11',
          title_zh: 'LEGALBAND中国法律卓越大奖',
          title_en: 'LEGALBAND China Law Excellence Awards',
          organization: 'LEGALBAND',
          date: '2021-11',
          image: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800&h=600&fit=crop',
          description_zh: '荣获公司法律服务卓越奖',
          category: 'firm'
        },
        {
          id: '12',
          title_zh: 'Benchmark Litigation - 诉讼明星律所',
          title_en: 'Benchmark Litigation - Litigation Star Firm',
          organization: 'Benchmark Litigation',
          date: '2021-08',
          image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&h=600&fit=crop',
          description_zh: '在商事诉讼领域表现突出，获评诉讼明星律所',
          category: 'firm'
        }
      ]
    }
  ];

  // 统计数据
  const stats = [
    { value: '30+', label: '年度荣誉', sublabel: 'Annual Awards' },
    { value: '15+', label: '国际认可', sublabel: 'International Recognition' },
    { value: '20+', label: '个人奖项', sublabel: 'Individual Awards' },
    { value: 'Top 10', label: '行业排名', sublabel: 'Industry Ranking' }
  ];

  let selectedYear = 'all';
  let selectedCategory = 'all';

  const years = $derived(awards.map(a => a.year));

  const filteredAwards = $derived(awards.map(yearGroup => ({
    ...yearGroup,
    items: yearGroup.items.filter(award => {
      const categoryMatch = selectedCategory === 'all' || award.category === selectedCategory;
      return categoryMatch;
    })
  })).filter(yearGroup => {
    const yearMatch = selectedYear === 'all' || yearGroup.year === parseInt(selectedYear);
    return yearMatch && yearGroup.items.length > 0;
  }));
</script>


<Hero
  title="荣誉与奖项"
  subtitle="AWARDS & RECOGNITION"
  height="md"
  align="center"
  backgroundImage="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=1920&q=80"
>
  <svelte:fragment slot="description">
    <Typography tag="p" variant="lg" color="white" align="center" style="font-weight: 300; margin-top: 24px;">
      业界认可 · 专业荣誉 · 卓越成就
    </Typography>
  </svelte:fragment>
</Hero>

<!-- Stats Section -->
<Section variant="primary" padding="xl">
  <div class="stats-grid">
    {#each stats as stat}
      <div class="stat-item">
        <Typography tag="div" variant="4xl" color="white" weight="300" style="margin-bottom: 8px;">
          {stat.value}
        </Typography>
        <Typography tag="div" variant="base" color="white" weight="500">
          {stat.label}
        </Typography>
        <Typography tag="div" variant="sm" color="white" style="opacity: 0.9; margin-top: 4px;">
          {stat.sublabel}
        </Typography>
      </div>
    {/each}
  </div>
</Section>

<!-- Filter Section -->
<Section variant="light" padding="lg">
  <div class="filter-bar">
    <div class="filter-group">
      <Typography tag="span" variant="sm" weight="500" style="margin-right: 12px;">年份:</Typography>
      <button
        class="filter-btn {selectedYear === 'all' ? 'active' : ''}"
        on:click={() => selectedYear = 'all'}
      >
        全部
      </button>
      {#each years as year}
        <button
          class="filter-btn {selectedYear === year.toString() ? 'active' : ''}"
          on:click={() => selectedYear = year.toString()}
        >
          {year}
        </button>
      {/each}
    </div>

    <div class="filter-group">
      <Typography tag="span" variant="sm" weight="500" style="margin-right: 12px;">类型:</Typography>
      <button
        class="filter-btn {selectedCategory === 'all' ? 'active' : ''}"
        on:click={() => selectedCategory = 'all'}
      >
        全部
      </button>
      <button
        class="filter-btn {selectedCategory === 'firm' ? 'active' : ''}"
        on:click={() => selectedCategory = 'firm'}
      >
        机构荣誉
      </button>
      <button
        class="filter-btn {selectedCategory === 'individual' ? 'active' : ''}"
        on:click={() => selectedCategory = 'individual'}
      >
        个人荣誉
      </button>
    </div>
  </div>
</Section>

<!-- Awards Timeline -->
<Section variant="white" padding="xl">
  <div class="timeline">
    {#each filteredAwards as yearGroup}
      <div class="year-section">
        <div class="year-header">
          <Typography tag="h2" variant="4xl" weight="300" color="primary">
            {yearGroup.year}
          </Typography>
          <div class="year-line"></div>
        </div>

        <div class="awards-grid">
          {#each yearGroup.items as award}
            <Card variant="elevated" hoverable={true}>
              <div class="award-card">
                <div class="award-image">
                  <img src={award.image} alt={award.title_zh} />
                  <div class="award-badge">
                    <Badge variant={award.category === 'firm' ? 'primary' : 'secondary'}>
                      {award.category === 'firm' ? '机构' : '个人'}
                    </Badge>
                  </div>
                </div>

                <div class="award-content">
                  <Typography tag="p" variant="xs" color="secondary" style="margin-bottom: 8px;">
                    {award.date}
                  </Typography>

                  <Typography tag="h3" variant="lg" weight="500" style="margin-bottom: 8px;">
                    {award.title_zh}
                  </Typography>

                  <Typography tag="p" variant="sm" color="light" style="margin-bottom: 12px;">
                    {award.title_en}
                  </Typography>

                  <div class="award-meta">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2L10 6L14 7L11 10L12 14L8 12L4 14L5 10L2 7L6 6L8 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <Typography tag="span" variant="sm" weight="500" color="secondary">
                      {award.organization}
                    </Typography>
                  </div>

                  <Typography tag="p" variant="sm" style="margin-top: 12px; line-height: 1.6;">
                    {award.description_zh}
                  </Typography>
                </div>
              </div>
            </Card>
          {/each}
        </div>
      </div>
    {/each}
  </div>

  {#if filteredAwards.length === 0}
    <div class="empty-state">
      <Typography tag="p" variant="lg" color="light" align="center">
        暂无符合条件的荣誉奖项
      </Typography>
    </div>
  {/if}
</Section>

<!-- CTA Section -->
<Section variant="primary" padding="xl">
  <div style="text-align: center; max-width: 800px; margin: 0 auto;">
    <Typography tag="h2" variant="3xl" color="white" align="center" style="margin-bottom: 24px;">
      选择华诚，选择卓越
    </Typography>
    <Typography tag="p" variant="lg" color="white" align="center" style="margin-bottom: 32px; font-weight: 300;">
      30年专业积淀，值得信赖的法律服务伙伴
    </Typography>
  </div>
</Section>


<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 48px;
    max-width: 1200px;
    margin: 0 auto;

    @include respond-to(tablet) {
      grid-template-columns: repeat(2, 1fr);
      gap: 32px;
    }

    @include respond-to(mobile) {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }

  .stat-item {
    text-align: center;
  }

  .filter-bar {
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  .filter-group {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
  }

  .filter-btn {
    padding: 8px 16px;
    border: 1px solid $color-border;
    background: white;
    color: $color-text-primary;
    border-radius: $radius-sm;
    font-size: 14px;
    font-family: inherit;
    cursor: pointer;
    transition: all $transition-base;

    &:hover {
      border-color: $color-primary;
      color: $color-primary;
    }

    &.active {
      background: $color-primary;
      border-color: $color-primary;
      color: white;
    }
  }

  .timeline {
    max-width: 1400px;
    margin: 0 auto;
  }

  .year-section {
    margin-bottom: 80px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .year-header {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 48px;

    @include respond-to(mobile) {
      margin-bottom: 32px;
    }
  }

  .year-line {
    flex: 1;
    height: 2px;
    background: linear-gradient(to right, $color-accent, transparent);
  }

  .awards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 32px;

    @include respond-to(tablet) {
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }

    @include respond-to(mobile) {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }

  .award-card {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .award-image {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    overflow: hidden;
    background: $color-background-light;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform $transition-base $transition-ease;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  .award-badge {
    position: absolute;
    top: 12px;
    right: 12px;
  }

  .award-content {
    padding: 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .award-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    background: $color-background-light;
    border-radius: $radius-sm;
    width: fit-content;

    svg {
      color: $color-accent;
    }
  }

  .empty-state {
    padding: 80px 20px;
    text-align: center;
  }
</style>
