<script lang="ts">
    import { Card, Badge, Button, Typography, Input, Textarea, Modal } from '$ui/components';
  import { _ } from 'svelte-i18n';

  // 职位数据
  const jobOpenings = [
    {
      id: '1',
      title_zh: '知识产权律师',
      title_en: 'Intellectual Property Attorney',
      department: '知识产权部',
      location: '上海',
      type: 'full-time',
      experience: '3-5年',
      education: '法学硕士及以上',
      salary: '面议',
      deadline: '2025-12-31',
      description_zh: '负责知识产权相关法律事务，包括专利、商标、著作权等领域的诉讼及非诉业务',
      requirements: [
        '法学硕士及以上学历，通过司法考试',
        '3-5年知识产权法律工作经验',
        '熟悉知识产权法律法规及司法实践',
        '具备良好的法律文书写作能力',
        '英语听说读写流利者优先'
      ],
      responsibilities: [
        '处理知识产权诉讼及非诉法律事务',
        '为客户提供知识产权战略咨询',
        '起草、审查相关法律文件',
        '参与商业谈判及项目协调'
      ],
      benefits: [
        { icon: '💰', title: '有竞争力的薪酬', desc: '行业领先的薪资待遇' },
        { icon: '🏥', title: '完善的福利', desc: '五险一金+商业保险' },
        { icon: '📚', title: '持续培训', desc: '专业培训和发展机会' },
        { icon: '🏖️', title: '带薪假期', desc: '年假+病假+各类法定假期' },
        { icon: '🎯', title: '晋升通道', desc: '清晰的职业发展路径' },
        { icon: '🤝', title: '团队氛围', desc: '专业友好的工作环境' }
      ],
      process: [
        { step: '1', title: '投递简历', desc: '通过邮箱或在线系统提交' },
        { step: '2', title: '简历筛选', desc: '3-5个工作日内完成初筛' },
        { step: '3', title: '初次面试', desc: '人力资源部门面试' },
        { step: '4', title: '专业面试', desc: '业务部门负责人面试' },
        { step: '5', title: '合伙人面试', desc: '最终轮面试' },
        { step: '6', title: 'Offer发放', desc: '确定入职时间和待遇' }
      ]
    },
    {
      id: '2',
      title_zh: '公司业务律师',
      title_en: 'Corporate Attorney',
      department: '公司业务部',
      location: '上海',
      type: 'full-time',
      experience: '2-4年',
      education: '法学本科及以上',
      description_zh: '从事公司法律事务，包括公司设立、股权架构、并购重组等',
      requirements: [
        '法学本科及以上学历，通过司法考试',
        '2-4年公司法律工作经验',
        '熟悉《公司法》及相关法律法规',
        '具备较强的商务谈判能力',
        '有海外留学背景或外语优势者优先'
      ],
      responsibilities: [
        '处理公司设立、变更等常规业务',
        '参与并购重组项目',
        '提供公司治理法律咨询',
        '起草审查各类商业合同'
      ]
    },
    {
      id: '3',
      title_zh: '诉讼律师',
      title_en: 'Litigation Attorney',
      department: '诉讼仲裁部',
      location: '北京',
      type: 'full-time',
      experience: '3年以上',
      education: '法学本科及以上',
      description_zh: '代理各类民商事诉讼及仲裁案件，为客户提供争议解决服务',
      requirements: [
        '法学本科及以上学历，通过司法考试',
        '3年以上诉讼或仲裁工作经验',
        '熟悉民事诉讼程序及相关法律',
        '具备优秀的法庭辩论能力',
        '有涉外案件经验者优先'
      ],
      responsibilities: [
        '代理民商事诉讼及仲裁案件',
        '进行案件分析及诉讼策略规划',
        '出庭参加诉讼及仲裁活动',
        '维护客户关系并拓展业务'
      ]
    },
    {
      id: '4',
      title_zh: '实习律师',
      title_en: 'Legal Intern',
      department: '各部门',
      location: '上海/北京',
      type: 'internship',
      experience: '应届毕业生',
      education: '法学本科及以上在读',
      description_zh: '协助执业律师处理各类法律事务，积累实务经验',
      requirements: [
        '法学本科及以上在读（大三以上）',
        '对法律工作有浓厚兴趣',
        '学习能力强，责任心强',
        '能保证每周至少3天实习时间',
        '通过司法考试者优先'
      ],
      responsibilities: [
        '协助律师进行法律研究',
        '参与起草法律文件',
        '整理案件资料',
        '参加内部培训和学习'
      ]
    },
    {
      id: '5',
      title_zh: '法务助理',
      title_en: 'Legal Assistant',
      department: '行政部',
      location: '上海',
      type: 'full-time',
      experience: '1-2年',
      education: '法学本科',
      description_zh: '协助律师团队处理日常法律事务，提供行政支持',
      requirements: [
        '法学本科学历',
        '1-2年法律相关工作经验',
        '熟练使用Office办公软件',
        '具备良好的沟通协调能力',
        '细心负责，具有团队精神'
      ],
      responsibilities: [
        '协助律师处理日常法律事务',
        '文件整理及档案管理',
        '客户接待及沟通',
        '会议安排及记录'
      ]
    }
  ];

  // 福利待遇
  const benefits = [
    { icon: '💰', title: '有竞争力的薪酬', description: '根据能力和经验提供具有市场竞争力的薪酬待遇' },
    { icon: '📈', title: '职业发展', description: '完善的培训体系和明确的职业发展路径' },
    { icon: '🏥', title: '五险一金', description: '按照国家规定缴纳社会保险和住房公积金' },
    { icon: '🎓', title: '专业培训', description: '定期组织专业培训和交流活动' },
    { icon: '🌴', title: '带薪年假', description: '享受国家法定节假日及带薪年假' },
    { icon: '🎯', title: '项目奖金', description: '根据项目贡献发放绩效奖金' },
    { icon: '🏢', title: '优质办公环境', description: '位于市中心商务区，交通便利' },
    { icon: '🤝', title: '团队氛围', description: '开放包容的团队文化，良好的工作氛围' }
  ];

  let selectedJob = $state(null);
  let showApplicationForm = $state(false);
  let showJobDetail = $state(false);
  let selectedJobDetail = $state(null);

  // 申请表单数据
  let applicationData = $state({
    name: '',
    gender: '',
    email: '',
    phone: '',
    education: '',
    university: '',
    major: '',
    experience: '',
    resume: '',
    coverLetter: ''
  });

  function openJobDetail(job) {
    selectedJobDetail = job;
    showJobDetail = true;
  }

  function openApplicationForm(job) {
    selectedJob = job;
    showApplicationForm = true;
    showJobDetail = false; // 关闭详情模态框
  }

  function closeApplicationForm() {
    showApplicationForm = false;
    selectedJob = null;
    applicationData = {
      name: '',
      gender: '',
      email: '',
      phone: '',
      education: '',
      university: '',
      major: '',
      experience: '',
      resume: '',
      coverLetter: ''
    };
  }

  function handleSubmit() {
    console.log('Application submitted:', applicationData, selectedJob);
    alert('申请已提交！我们会尽快与您联系。');
    closeApplicationForm();
  }
</script>


<Hero
  title="加入我们"
  subtitle="JOIN US"
  height="md"
  align="center"
  backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
>
  <svelte:fragment slot="description">
    <Typography tag="p" variant="lg" color="white" align="center" style="font-weight: 300; margin-top: 24px;">
      与优秀的团队一起 · 成就卓越的职业生涯
    </Typography>
  </svelte:fragment>
</Hero>

<!-- Why Join Us Section -->
<Section variant="white" padding="xl">
  <Typography tag="h2" variant="3xl" weight="500" align="center" style="margin-bottom: 24px;">
    为什么选择华诚
  </Typography>
  <Typography tag="p" variant="base" color="secondary" align="center" style="max-width: 800px; margin: 0 auto 48px;">
    华诚律师事务所致力于为每一位员工提供广阔的职业发展平台和良好的工作环境。我们相信，优秀的人才是事务所发展的核心动力。
  </Typography>

  <div class="benefits-grid">
    {#each benefits as benefit}
      <Card variant="default" hoverable={true}>
        <div class="benefit-card">
          <div class="benefit-icon">{benefit.icon}</div>
          <Typography tag="h4" variant="base" weight="500" style="margin-bottom: 8px;">
            {benefit.title}
          </Typography>
          <Typography tag="p" variant="sm" color="secondary" style="line-height: 1.6;">
            {benefit.description}
          </Typography>
        </div>
      </Card>
    {/each}
  </div>
</Section>

<!-- Job Openings Section -->
<Section variant="light" padding="xl">
  <Typography tag="h2" variant="3xl" weight="500" align="center" style="margin-bottom: 48px;">
    职位招聘
  </Typography>

  <div class="jobs-list">
    {#each jobOpenings as job}
      <Card variant="elevated" hoverable={true}>
        <div class="job-card">
          <div class="job-header">
            <div>
              <div class="job-title-row">
                <Typography tag="h3" variant="xl" weight="500">
                  {job.title_zh}
                </Typography>
                <Badge variant={job.type === 'full-time' ? 'primary' : 'secondary'}>
                  {job.type === 'full-time' ? '全职' : '实习'}
                </Badge>
              </div>
              <Typography tag="p" variant="sm" color="light" style="margin-top: 4px;">
                {job.title_en}
              </Typography>
            </div>
          </div>

          <div class="job-meta">
            <div class="meta-item">
              <span class="meta-label">部门:</span>
              <Typography tag="span" variant="sm">{job.department}</Typography>
            </div>
            <div class="meta-item">
              <span class="meta-label">地点:</span>
              <Typography tag="span" variant="sm">{job.location}</Typography>
            </div>
            <div class="meta-item">
              <span class="meta-label">经验:</span>
              <Typography tag="span" variant="sm">{job.experience}</Typography>
            </div>
            <div class="meta-item">
              <span class="meta-label">学历:</span>
              <Typography tag="span" variant="sm">{job.education}</Typography>
            </div>
          </div>

          <Typography tag="p" variant="sm" style="margin: 16px 0; line-height: 1.6;">
            {job.description_zh}
          </Typography>

          <div class="job-details">
            <div class="detail-section">
              <Typography tag="h5" variant="sm" weight="500" style="margin-bottom: 8px;">
                岗位职责:
              </Typography>
              <ul class="detail-list">
                {#each job.responsibilities as item}
                  <li>
                    <Typography tag="span" variant="sm" color="secondary">{item}</Typography>
                  </li>
                {/each}
              </ul>
            </div>

            <div class="detail-section">
              <Typography tag="h5" variant="sm" weight="500" style="margin-bottom: 8px;">
                任职要求:
              </Typography>
              <ul class="detail-list">
                {#each job.requirements as item}
                  <li>
                    <Typography tag="span" variant="sm" color="secondary">{item}</Typography>
                  </li>
                {/each}
              </ul>
            </div>
          </div>

          <div class="job-actions">
            <Button variant="outline" size="md" onclick={() => openJobDetail(job)}>
              查看详情
            </Button>
            <Button variant="primary" size="md" onclick={() => openApplicationForm(job)}>
              立即申请
            </Button>
          </div>
        </div>
      </Card>
    {/each}
  </div>
</Section>

<!-- Application Form Modal -->
{#if showApplicationForm && selectedJob}
  <div class="modal-overlay" on:click={closeApplicationForm}>
    <div class="modal-content" on:click|stopPropagation>
      <button class="modal-close" on:click={closeApplicationForm}>×</button>

      <Typography tag="h3" variant="2xl" weight="500" style="margin-bottom: 12px;">
        职位申请
      </Typography>

      <Typography tag="p" variant="base" style="margin-bottom: 24px; color: #666;">
        {selectedJob.title_zh} - {selectedJob.department}
      </Typography>

      <form on:submit|preventDefault={handleSubmit}>
        <div class="form-row-group">
          <div class="form-row">
            <Input
              type="text"
              placeholder="姓名 *"
              bind:value={applicationData.name}
              required
            />
          </div>

          <div class="form-row">
            <select bind:value={applicationData.gender} required class="form-select">
              <option value="" disabled selected>性别 *</option>
              <option value="male">男</option>
              <option value="female">女</option>
            </select>
          </div>
        </div>

        <div class="form-row-group">
          <div class="form-row">
            <Input
              type="email"
              placeholder="邮箱 *"
              bind:value={applicationData.email}
              required
            />
          </div>

          <div class="form-row">
            <Input
              type="tel"
              placeholder="电话 *"
              bind:value={applicationData.phone}
              required
            />
          </div>
        </div>

        <div class="form-row-group">
          <div class="form-row">
            <Input
              type="text"
              placeholder="最高学历 *"
              bind:value={applicationData.education}
              required
            />
          </div>

          <div class="form-row">
            <Input
              type="text"
              placeholder="毕业院校 *"
              bind:value={applicationData.university}
              required
            />
          </div>
        </div>

        <div class="form-row-group">
          <div class="form-row">
            <Input
              type="text"
              placeholder="专业"
              bind:value={applicationData.major}
            />
          </div>

          <div class="form-row">
            <Input
              type="text"
              placeholder="工作年限"
              bind:value={applicationData.experience}
            />
          </div>
        </div>

        <div class="form-row">
          <Input
            type="text"
            placeholder="简历链接 (网盘链接或在线简历)"
            bind:value={applicationData.resume}
          />
        </div>

        <div class="form-row">
          <Textarea
            placeholder="求职信 / 自我介绍"
            bind:value={applicationData.coverLetter}
            rows={6}
          />
        </div>

        <div class="form-actions">
          <Button type="button" variant="ghost" on:click={closeApplicationForm}>
            取消
          </Button>
          <Button type="submit" variant="primary">
            提交申请
          </Button>
        </div>
      </form>
    </div>
  </div>
{/if}

<!-- Job Detail Modal -->
{#if selectedJobDetail}
  <Modal bind:open={showJobDetail} size="xl" title="">
    <div class="job-detail">
      <!-- Job Header -->
      <div class="job-detail__header">
        <div>
          <h2>{selectedJobDetail.title_zh}</h2>
          <p class="title-en">{selectedJobDetail.title_en}</p>
        </div>
        <Badge variant="primary" style="align-self: flex-start;">{selectedJobDetail.type === 'full-time' ? '全职' : '实习'}</Badge>
      </div>

      <!-- Job Meta -->
      <div class="job-detail__meta">
        <div class="meta-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke-width="2"/>
          </svg>
          <span>{selectedJobDetail.department}</span>
        </div>
        <div class="meta-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke-width="2"/>
            <circle cx="12" cy="10" r="3" stroke-width="2"/>
          </svg>
          <span>{selectedJobDetail.location}</span>
        </div>
        {#if selectedJobDetail.deadline}
          <div class="meta-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke-width="2"/>
              <line x1="16" y1="2" x2="16" y2="6" stroke-width="2"/>
              <line x1="8" y1="2" x2="8" y2="6" stroke-width="2"/>
              <line x1="3" y1="10" x2="21" y2="10" stroke-width="2"/>
            </svg>
            <span>截止: {selectedJobDetail.deadline}</span>
          </div>
        {/if}
      </div>

      <!-- Quick Info -->
      <div class="job-detail__quick-info">
        <div class="quick-info-item">
          <span class="label">工作经验</span>
          <span class="value">{selectedJobDetail.experience}</span>
        </div>
        <div class="quick-info-item">
          <span class="label">学历要求</span>
          <span class="value">{selectedJobDetail.education}</span>
        </div>
        {#if selectedJobDetail.salary}
          <div class="quick-info-item">
            <span class="label">薪资待遇</span>
            <span class="value">{selectedJobDetail.salary}</span>
          </div>
        {/if}
      </div>

      <!-- Description -->
      <div class="job-detail__section">
        <h3>职位描述</h3>
        <p>{selectedJobDetail.description_zh}</p>
      </div>

      <!-- Responsibilities -->
      <div class="job-detail__section">
        <h3>工作职责</h3>
        <ul>
          {#each selectedJobDetail.responsibilities as item}
            <li>{item}</li>
          {/each}
        </ul>
      </div>

      <!-- Requirements -->
      <div class="job-detail__section">
        <h3>任职要求</h3>
        <ul>
          {#each selectedJobDetail.requirements as item}
            <li>{item}</li>
          {/each}
        </ul>
      </div>

      <!-- Benefits -->
      {#if selectedJobDetail.benefits}
        <div class="job-detail__section">
          <h3>福利待遇</h3>
          <div class="benefits-grid-modal">
            {#each selectedJobDetail.benefits as benefit}
              <div class="benefit-item">
                <span class="benefit-icon">{benefit.icon}</span>
                <div>
                  <h4>{benefit.title}</h4>
                  <p>{benefit.desc}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Process -->
      {#if selectedJobDetail.process}
        <div class="job-detail__section">
          <h3>招聘流程</h3>
          <div class="process-steps">
            {#each selectedJobDetail.process as step}
              <div class="process-step">
                <div class="step-number">{step.step}</div>
                <div class="step-content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Actions -->
      <div class="job-detail__actions">
        <Button variant="primary" size="lg" onclick={() => openApplicationForm(selectedJobDetail)}>
          立即申请此职位
        </Button>
      </div>
    </div>
  </Modal>
{/if}


<style lang="scss">
  @use '$ui/styles/variables.scss' as *;
  @use '$ui/styles/mixins.scss' as *;

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;

    @include respond-to(tablet) {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }

    @include respond-to(mobile) {
      grid-template-columns: 1fr;
    }
  }

  .benefit-card {
    padding: 24px;
    text-align: center;
  }

  .benefit-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  .jobs-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .job-card {
    padding: 32px;

    @include respond-to(mobile) {
      padding: 20px;
    }
  }

  .job-header {
    margin-bottom: 20px;
  }

  .job-title-row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .job-meta {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
    padding: 16px;
    background: $color-background-light;
    border-radius: $radius-sm;
    margin-bottom: 16px;

    @include respond-to(mobile) {
      grid-template-columns: 1fr;
      gap: 8px;
    }
  }

  .meta-item {
    display: flex;
    gap: 8px;
  }

  .meta-label {
    font-weight: 500;
    color: $color-text-secondary;
    font-size: 14px;
  }

  .job-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid $color-border;

    @include respond-to(tablet) {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }

  .detail-section {
    h5 {
      color: $color-text-primary;
    }
  }

  .detail-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 6px 0 6px 20px;
      position: relative;
      line-height: 1.6;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: $color-primary;
        font-weight: bold;
      }
    }
  }

  .job-actions {
    margin-top: 24px;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
  }

  .modal-content {
    background: white;
    border-radius: $radius-md;
    padding: 32px;
    max-width: 700px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;

    @include respond-to(mobile) {
      padding: 24px;
    }
  }

  .modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    font-size: 32px;
    cursor: pointer;
    color: $color-text-secondary;
    line-height: 1;
    padding: 0;
    width: 32px;
    height: 32px;

    &:hover {
      color: $color-text-primary;
    }
  }

  .form-row-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;

    @include respond-to(mobile) {
      grid-template-columns: 1fr;
    }
  }

  .form-row {
    margin-bottom: 16px;
  }

  .form-select {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid $color-border;
    border-radius: $radius-sm;
    font-size: 14px;
    font-family: inherit;
    background: white;
    cursor: pointer;
    transition: border-color $transition-base;

    &:focus {
      outline: none;
      border-color: $color-primary;
    }

    &:required:invalid {
      color: #999;
    }

    option {
      color: $color-text-primary;
    }
  }

  .form-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 24px;
  }

  // Job Detail Modal Styles
  .job-detail {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
      padding-bottom: 24px;
      border-bottom: 2px solid #e2e8f0;

      h2 {
        font-size: 32px;
        font-weight: 500;
        color: $color-text-primary;
        margin-bottom: 8px;
      }

      .title-en {
        font-size: 16px;
        color: $color-text-tertiary;
        font-weight: 300;
      }
    }

    &__meta {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      margin-bottom: 24px;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 15px;
        color: $color-text-secondary;

        svg {
          color: $color-accent;
          flex-shrink: 0;
        }
      }
    }

    &__quick-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
      padding: 20px;
      background: #f8fafc;
      border-radius: 12px;

      .quick-info-item {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .label {
          font-size: 13px;
          color: $color-text-tertiary;
          font-weight: 500;
        }

        .value {
          font-size: 16px;
          color: $color-text-primary;
          font-weight: 600;
        }
      }
    }

    &__section {
      margin-bottom: 32px;

      h3 {
        font-size: 20px;
        font-weight: 600;
        color: $color-text-primary;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        gap: 8px;

        &::before {
          content: '';
          width: 4px;
          height: 20px;
          background: linear-gradient(135deg, $color-primary 0%, $color-accent 100%);
          border-radius: 2px;
        }
      }

      p {
        font-size: 16px;
        line-height: 1.8;
        color: $color-text-secondary;
      }

      ul {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;

        li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 15px;
          line-height: 1.7;
          color: $color-text-secondary;

          &::before {
            content: '•';
            color: $color-primary;
            font-weight: 700;
            font-size: 20px;
            line-height: 1.4;
            flex-shrink: 0;
          }
        }
      }
    }

    &__actions {
      margin-top: 40px;
      padding-top: 24px;
      border-top: 2px solid #e2e8f0;
      display: flex;
      justify-content: center;
    }
  }

  .benefits-grid-modal {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;

    @include respond-to(mobile) {
      grid-template-columns: 1fr;
    }
  }

  .benefit-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 16px;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;

    .benefit-icon {
      font-size: 32px;
      flex-shrink: 0;
    }

    h4 {
      font-size: 16px;
      font-weight: 600;
      color: $color-text-primary;
      margin-bottom: 4px;
    }

    p {
      font-size: 14px;
      color: $color-text-tertiary;
      margin: 0;
    }
  }

  .process-steps {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .process-step {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 20px;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    transition: all 0.3s ease;

    &:hover {
      border-color: $color-primary;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }

    .step-number {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, $color-primary 0%, $color-accent 100%);
      color: white;
      font-size: 18px;
      font-weight: 700;
      border-radius: 50%;
    }

    .step-content {
      flex: 1;

      h4 {
        font-size: 16px;
        font-weight: 600;
        color: $color-text-primary;
        margin-bottom: 4px;
      }

      p {
        font-size: 14px;
        color: $color-text-tertiary;
        margin: 0;
      }
    }
  }
</style>
