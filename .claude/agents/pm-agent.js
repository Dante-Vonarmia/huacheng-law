#!/usr/bin/env node

/**
 * PM Agent (项目管理 Agent)
 * 职责：任务规划、进度追踪、文档管理
 *
 * 实现 MCP (Model Context Protocol) 服务器
 */

const fs = require('fs');
const path = require('path');

// MCP 服务器基础类
class PMAgent {
  constructor() {
    this.name = 'PM Agent';
    this.version = '1.0.0';
    this.capabilities = {
      tools: [
        'create_task',
        'update_task',
        'get_progress',
        'update_progress',
        'create_page_map',
        'create_entity_map'
      ]
    };
  }

  // 初始化 Agent
  async initialize() {
    console.log(`[${this.name}] 初始化完成`);
    return {
      protocolVersion: '2024-11-05',
      capabilities: this.capabilities,
      serverInfo: {
        name: this.name,
        version: this.version
      }
    };
  }

  // 创建任务
  async createTask(params) {
    const { taskId, title, description, priority, phase } = params;

    console.log(`[${this.name}] 创建任务: ${taskId} - ${title}`);

    const tasksFile = path.join(process.cwd(), 'TASKS.md');
    let content = fs.readFileSync(tasksFile, 'utf-8');

    // 在对应的 Phase 下添加任务
    const taskEntry = `| ${taskId} | ${title} | PM Agent | ⏳ 待启动 | ${priority} |\n`;
    content = content.replace(
      new RegExp(`(## ${phase}:.*?\\n\\n\\| ID \\| 任务.*?\\n\\|.*?\\n)`, 's'),
      `$1${taskEntry}`
    );

    fs.writeFileSync(tasksFile, content);

    return {
      success: true,
      taskId,
      message: `任务 ${taskId} 已添加到 ${phase}`
    };
  }

  // 更新任务状态
  async updateTask(params) {
    const { taskId, status } = params;

    console.log(`[${this.name}] 更新任务状态: ${taskId} -> ${status}`);

    const tasksFile = path.join(process.cwd(), 'TASKS.md');
    let content = fs.readFileSync(tasksFile, 'utf-8');

    // 更新任务状态
    const statusMap = {
      'pending': '⏳ 待启动',
      'in_progress': '🔄 进行中',
      'completed': '✅ 完成',
      'blocked': '❌ 已阻塞'
    };

    content = content.replace(
      new RegExp(`(\\| ${taskId} \\|.*?\\|.*?\\|) [⏳🔄✅❌].*? (\\|)`, 'g'),
      `$1 ${statusMap[status]} $2`
    );

    fs.writeFileSync(tasksFile, content);

    return {
      success: true,
      taskId,
      status,
      message: `任务 ${taskId} 状态已更新为 ${status}`
    };
  }

  // 获取项目进度
  async getProgress() {
    console.log(`[${this.name}] 获取项目进度`);

    const progressFile = path.join(process.cwd(), 'docs/project-progress.md');

    if (!fs.existsSync(progressFile)) {
      return {
        success: false,
        message: '项目进度文件不存在'
      };
    }

    const content = fs.readFileSync(progressFile, 'utf-8');

    return {
      success: true,
      content,
      message: '项目进度获取成功'
    };
  }

  // 更新项目进度
  async updateProgress(params) {
    const { phase, milestone, notes } = params;

    console.log(`[${this.name}] 更新项目进度: ${phase} - ${milestone}`);

    const progressFile = path.join(process.cwd(), 'docs/project-progress.md');
    let content = fs.readFileSync(progressFile, 'utf-8');

    // 添加进度记录
    const timestamp = new Date().toISOString().split('T')[0];
    const entry = `\n### ${timestamp} - ${phase}\n**里程碑**: ${milestone}\n**备注**: ${notes}\n`;

    // 在文档末尾添加
    content += entry;

    fs.writeFileSync(progressFile, content);

    return {
      success: true,
      phase,
      milestone,
      message: `项目进度已更新`
    };
  }

  // 创建页面映射文件
  async createPageMap(params) {
    const { pages } = params;

    console.log(`[${this.name}] 创建页面映射文件`);

    const pageMapFile = path.join(process.cwd(), 'docs/page-map.json');

    fs.writeFileSync(pageMapFile, JSON.stringify(pages, null, 2));

    return {
      success: true,
      file: pageMapFile,
      message: '页面映射文件已创建'
    };
  }

  // 创建实体关系映射
  async createEntityMap(params) {
    const { entities } = params;

    console.log(`[${this.name}] 创建实体关系映射文件`);

    const entityMapFile = path.join(process.cwd(), 'docs/entity-relations.json');

    fs.writeFileSync(entityMapFile, JSON.stringify(entities, null, 2));

    return {
      success: true,
      file: entityMapFile,
      message: '实体关系映射文件已创建'
    };
  }

  // 处理工具调用
  async handleToolCall(toolName, params) {
    switch (toolName) {
      case 'create_task':
        return await this.createTask(params);
      case 'update_task':
        return await this.updateTask(params);
      case 'get_progress':
        return await this.getProgress();
      case 'update_progress':
        return await this.updateProgress(params);
      case 'create_page_map':
        return await this.createPageMap(params);
      case 'create_entity_map':
        return await this.createEntityMap(params);
      default:
        return {
          success: false,
          error: `未知工具: ${toolName}`
        };
    }
  }

  // 启动 MCP 服务器
  async start() {
    console.log(`[${this.name}] MCP 服务器启动中...`);

    // 监听 stdin 接收 MCP 消息
    process.stdin.setEncoding('utf-8');

    let buffer = '';

    process.stdin.on('data', async (chunk) => {
      buffer += chunk;

      // 处理完整的 JSON-RPC 消息
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line.trim()) continue;

        try {
          const message = JSON.parse(line);
          const response = await this.handleMessage(message);

          // 发送响应
          console.log(JSON.stringify(response));
        } catch (error) {
          console.error(`[${this.name}] 错误:`, error.message);
        }
      }
    });

    console.log(`[${this.name}] MCP 服务器已启动`);
  }

  // 处理 MCP 消息
  async handleMessage(message) {
    const { method, params, id } = message;

    switch (method) {
      case 'initialize':
        return {
          jsonrpc: '2.0',
          id,
          result: await this.initialize()
        };

      case 'tools/call':
        const result = await this.handleToolCall(params.name, params.arguments);
        return {
          jsonrpc: '2.0',
          id,
          result
        };

      default:
        return {
          jsonrpc: '2.0',
          id,
          error: {
            code: -32601,
            message: `方法未找到: ${method}`
          }
        };
    }
  }
}

// 启动 PM Agent
if (require.main === module) {
  const agent = new PMAgent();
  agent.start().catch(error => {
    console.error('PM Agent 启动失败:', error);
    process.exit(1);
  });
}

module.exports = PMAgent;
