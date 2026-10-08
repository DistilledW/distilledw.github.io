// 个人资料集中在此维护。zh / en 分别为中文、英文；空链接不会显示。
window.PROFILE = {
  name: { zh: '刘峥', en: 'Zheng Liu' },
  initials: 'ZL',
  github: 'https://github.com/DistilledW',
  email: 'distilledw@sjtu.edu.cn',
  portrait: 'assets/portrait.png',
  role: { zh: '硕士研究生', en: 'Master’s Student' },
  affiliation: { zh: '上海交通大学\n计算机科学与技术', en: 'Shanghai Jiao Tong University\nComputer Science' },
  intro: {
    zh: '我是上海交通大学计算机科学与技术专业的硕士研究生。研究方向包括计算机体系结构、AI 系统与软硬件协同设计，关注 GPU 算子优化、大模型推理加速及具身智能的高效计算。',
    en: 'I am a master’s student in Computer Science at Shanghai Jiao Tong University. My research spans computer architecture, AI systems, and hardware–software co-design, with a focus on GPU kernel optimization, efficient LLM inference, and embodied AI.'
  },
  introSecondary: {
    zh: '曾在阿里巴巴控股平台技术 TRE 团队从事 AI Infrastructure 实习，参与 GPU 微架构分析与大模型推理优化。',
    en: 'Previously, I was an AI Infrastructure intern with Alibaba’s Platform Technology TRE team, working on GPU microarchitecture analysis and LLM inference optimization.'
  },
  interests: ['AI Systems', 'GPU Computing', 'Computer Architecture'],
  research: [
    {
      id: 'deltoris', category: 'embodied', year: '2026', name: 'Deltoris', venue: 'MICRO 2026',
      featured: true,
      authors: ['Zheng Liu', 'Zeyu Guo', 'Zihan Liu', 'Anbang Wu', 'Han Zhao', 'Fangxin Liu', 'Zhezhi He', 'Yinhe Han', 'Jingwen Leng', 'Minyi Guo', 'Yiming Gan', 'Yu Feng'],
      equalAuthors: ['Zheng Liu', 'Zeyu Guo'],
      role: { zh: '第一作者（共同第一）', en: 'First-listed co-first author' },
      title: 'Enabling Real-time VLA Inference in Embodied AI via Bit-level Sparsity and Speculative Inference',
      subtitle: { zh: '面向具身智能的实时 VLA 推理', en: 'Real-time VLA inference for embodied AI' },
      description: { zh: '利用连续帧之间的相似性，将比特级差分、推测推理与 Bit-Slicing 阵列相结合，降低视觉—语言—动作模型的推理延迟与计算开销。', en: 'Combines bit-level differences across frames, speculative inference, and a bit-slicing architecture to reduce the latency and computational cost of vision–language–action models.' },
      metrics: [{ value: '34.87×', label: { zh: '相对 Orin AGX GPU 加速', en: 'speedup over Orin AGX GPU' } }, { value: '70.09', label: { zh: '推理帧率 · FPS', en: 'inference throughput · FPS' } }],
      paper: 'https://arxiv.org/abs/2608.04428', code: ''
    },
    {
      id: 'nebula', category: 'architecture', year: '2026', name: 'Nebula', venue: 'ASPLOS 2026',
      authors: ['He Zhu', 'Zheng Liu', 'Xingyang Li', 'Anbang Wu', 'Jieru Zhao', 'Fangxin Liu', 'Yiming Gan', 'Jingwen Leng', 'Yu Feng'],
      equalAuthors: [],
      role: { zh: '', en: '' },
      title: 'Infinite-Scale 3D Gaussian Splatting in VR via Collaborative Rendering and Accelerated Stereo Rasterization',
      subtitle: { zh: '城市级 3D Gaussian Splatting 的 VR 协同渲染', en: 'Collaborative 3D Gaussian Splatting for VR' },
      description: { zh: '通过端云协同渲染与帧间增量传输，缓解大场景的端侧显存和网络带宽约束；结合加速立体光栅化，实现流畅的城市级 VR 渲染。', en: 'Addresses device memory and bandwidth constraints through cloud–device collaborative rendering, incremental Gaussian transmission, and accelerated stereo rasterization for large-scale VR scenes.' },
      metrics: [{ value: '12.1×', label: { zh: '端到端加速', en: 'end-to-end speedup' } }, { value: '19.25×', label: { zh: '传输带宽降低', en: 'bandwidth reduction' } }],
      paper: 'https://arxiv.org/abs/2512.20495', project: 'https://stonesix16.github.io/Nebula/', code: 'https://github.com/SJTU-MVCLab/Nebula'
    },
    {
      id: 'streamgrid', category: 'architecture', year: '2025', name: 'StreamGrid', venue: 'ASPLOS 2025',
      authors: ['Yu Feng', 'Zheng Liu', 'Weikai Lin', 'Zihan Liu', 'Jingwen Leng', 'Minyi Guo', 'Zhezhi He', 'Jieru Zhao', 'Yuhao Zhu'],
      equalAuthors: ['Yu Feng', 'Zheng Liu', 'Weikai Lin'],
      role: { zh: '共同第一作者', en: 'Co-first author' },
      title: 'Streaming Point Cloud Analytics via Compulsory Splitting and Deterministic Termination',
      subtitle: { zh: '面向不规则点云计算的流式加速架构', en: 'A streaming architecture for point cloud analytics' },
      description: { zh: '利用空间局部性分块与确定性终止，将不规则搜索转化为可流水的数据流，并通过 ILP 优化片上存储配置，提升点云分析的性能和能效。', en: 'Turns irregular point cloud searches into a streaming dataflow through locality-aware partitioning and deterministic termination, with ILP-based on-chip memory optimization.' },
      metrics: [{ value: '10.0×', label: { zh: '端到端加速', en: 'end-to-end speedup' } }, { value: '61.3%', label: { zh: '片上 SRAM 面积降低', en: 'less on-chip SRAM area' } }],
      paper: 'https://arxiv.org/abs/2503.05197', code: ''
    }
  ],
  experience: [
    {
      company: { zh: '阿里巴巴', en: 'Alibaba' },
      team: { zh: '控股平台技术 TRE', en: 'Holding Platform Technology · TRE' },
      role: { zh: 'AI Infrastructure 实习生', en: 'AI Infrastructure Intern' },
      period: '2026.05 — 2026.08',
      description: { zh: '围绕大模型推理加速，开展 GPU 微架构分析、算子优化与模型级性能验证。', en: 'Worked on GPU microarchitecture analysis, kernel optimization, and model-level performance validation for large language model inference.' },
      bullets: [
        { zh: '构建 GPU 指令与存储层级微基准，通过 Nsight Compute 分析性能瓶颈。', en: 'Built microbenchmarks for GPU instructions and memory hierarchies, and analyzed bottlenecks with Nsight Compute.' },
        { zh: '使用 CUDA 重写与融合 MoE 算子，优化计算、访存及流水排布。', en: 'Rewrote and fused MoE kernels in CUDA, optimizing computation, memory access, and pipelining.' },
        { zh: '探索 Agent 驱动的算子优化流程，并在长上下文推理中验证正确性与端到端收益。', en: 'Explored agent-driven kernel optimization and validated correctness and end-to-end gains in long-context inference.' }
      ],
      tags: ['CUDA / PTX', 'Tensor Core', 'Nsight Compute', 'LLM Inference']
    }
  ],
  education: [
    { school: { zh: '上海交通大学', en: 'Shanghai Jiao Tong University' }, degree: { zh: '硕士 · 计算机科学与技术', en: 'Master’s · Computer Science and Technology' }, period: '2024.09 — 2027.03', note: { zh: '', en: '' }, abbreviation: 'SJTU' },
    { school: { zh: '国防科技大学', en: 'National University of Defense Technology' }, degree: { zh: '本科 · 计算机体系结构', en: 'Undergraduate · Computer Architecture' }, period: '2020.09 — 2024.06', note: { zh: '', en: '' }, abbreviation: 'NUDT' }
  ],
  skills: [
    { title: { zh: 'GPU 与算子优化', en: 'GPU & kernel optimization' }, items: ['CUDA', 'PTX', 'Tensor Core', 'Nsight Compute', 'Kernel Fusion'] },
    { title: { zh: '系统与架构', en: 'Systems & architecture' }, items: ['C / C++', 'Python', 'PyTorch', 'Accelerator Design', 'ILP'] },
    { title: { zh: '开发工具', en: 'Engineering tools' }, items: ['Linux', 'Git', 'Docker', 'Conda', 'Shell'] }
  ],
  honors: [
    { year: '2026', title: { zh: '上海交通大学硕士生国家奖学金', en: 'National Scholarship for Master’s Students · Shanghai Jiao Tong University' } },
    { year: '2023', title: { zh: 'CCF CSP 认证 · 300 分', en: 'CCF CSP Certification · 300 points' } },
    { year: '2022', title: { zh: '美国大学生数学建模竞赛 · S 奖', en: 'Mathematical Contest in Modeling · Successful Participant' } },
    { year: '2021', title: { zh: '蓝桥杯 · 省赛三等奖', en: 'Lanqiao Cup · Provincial Third Prize' } }
  ]
};
