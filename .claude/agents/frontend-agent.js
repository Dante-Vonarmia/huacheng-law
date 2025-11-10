#!/usr/bin/env node

/**
 * Frontend Agent (前端开发 Agent)
 * 职责：页面模板、路由、后台适配
 *
 * 实现 MCP (Model Context Protocol) 服务器
 */

const fs = require('fs');
const path = require('path');

class FrontendAgent {
  constructor() {
    this.name = 'Frontend Agent';
    this.version = '1.0.0';
    this.capabilities = {
      tools: [
        'create_page_template',
        'create_route',
        'create_schema_map',
        'create_api_client',
        'create_mock_data',
        'create_i18n_file'
      ]
    };
  }

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

  // 创建页面模板
  async createPageTemplate(params) {
    const { name, route, template } = params;

    console.log(`[${this.name}] 创建页面模板: ${name} at ${route}`);

    const routeFile = path.join(process.cwd(), `src/routes${route}/+page.svelte`);

    // 确保目录存在
    fs.mkdirSync(path.dirname(routeFile), { recursive: true });

    fs.writeFileSync(routeFile, template);

    return {
      success: true,
      file: routeFile,
      message: `页面模板 ${name} 已创建`
    };
  }

  // 创建路由配置
  async createRoute(params) {
    const { route, loadFunction } = params;

    console.log(`[${this.name}] 创建路由: ${route}`);

    const routeFile = path.join(process.cwd(), `src/routes${route}/+page.ts`);

    // 确保目录存在
    fs.mkdirSync(path.dirname(routeFile), { recursive: true });

    fs.writeFileSync(routeFile, loadFunction);

    return {
      success: true,
      file: routeFile,
      message: `路由 ${route} 已创建`
    };
  }

  // 创建 schema-map.json
  async createSchemaMap(params) {
    const { mappings } = params;

    console.log(`[${this.name}] 创建 schema-map.json`);

    const schemaMapFile = path.join(process.cwd(), 'adapter/schema-map.json');

    // 确保目录存在
    fs.mkdirSync(path.dirname(schemaMapFile), { recursive: true });

    fs.writeFileSync(schemaMapFile, JSON.stringify(mappings, null, 2));

    return {
      success: true,
      file: schemaMapFile,
      message: 'schema-map.json 已创建'
    };
  }

  // 创建 API 客户端
  async createApiClient(params) {
    const { code } = params;

    console.log(`[${this.name}] 创建 API 客户端`);

    const apiClientFile = path.join(process.cwd(), 'adapter/api-client.ts');

    fs.writeFileSync(apiClientFile, code);

    return {
      success: true,
      file: apiClientFile,
      message: 'API 客户端已创建'
    };
  }

  // 创建 Mock 数据
  async createMockData(params) {
    const { entity, data } = params;

    console.log(`[${this.name}] 创建 Mock 数据: ${entity}`);

    const mockDataFile = path.join(process.cwd(), `adapter/mock-data/${entity}.json`);

    // 确保目录存在
    fs.mkdirSync(path.dirname(mockDataFile), { recursive: true });

    fs.writeFileSync(mockDataFile, JSON.stringify(data, null, 2));

    return {
      success: true,
      file: mockDataFile,
      message: `Mock 数据 ${entity} 已创建`
    };
  }

  // 创建多语言文件
  async createI18nFile(params) {
    const { locale, translations } = params;

    console.log(`[${this.name}] 创建多语言文件: ${locale}`);

    const i18nFile = path.join(process.cwd(), `locales/${locale}.json`);

    // 确保目录存在
    fs.mkdirSync(path.dirname(i18nFile), { recursive: true });

    fs.writeFileSync(i18nFile, JSON.stringify(translations, null, 2));

    return {
      success: true,
      file: i18nFile,
      message: `多语言文件 ${locale}.json 已创建`
    };
  }

  async handleToolCall(toolName, params) {
    switch (toolName) {
      case 'create_page_template':
        return await this.createPageTemplate(params);
      case 'create_route':
        return await this.createRoute(params);
      case 'create_schema_map':
        return await this.createSchemaMap(params);
      case 'create_api_client':
        return await this.createApiClient(params);
      case 'create_mock_data':
        return await this.createMockData(params);
      case 'create_i18n_file':
        return await this.createI18nFile(params);
      default:
        return {
          success: false,
          error: `未知工具: ${toolName}`
        };
    }
  }

  async start() {
    console.log(`[${this.name}] MCP 服务器启动中...`);

    process.stdin.setEncoding('utf-8');
    let buffer = '';

    process.stdin.on('data', async (chunk) => {
      buffer += chunk;
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line.trim()) continue;

        try {
          const message = JSON.parse(line);
          const response = await this.handleMessage(message);
          console.log(JSON.stringify(response));
        } catch (error) {
          console.error(`[${this.name}] 错误:`, error.message);
        }
      }
    });

    console.log(`[${this.name}] MCP 服务器已启动`);
  }

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

if (require.main === module) {
  const agent = new FrontendAgent();
  agent.start().catch(error => {
    console.error('Frontend Agent 启动失败:', error);
    process.exit(1);
  });
}

module.exports = FrontendAgent;
