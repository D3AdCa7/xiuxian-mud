import type { Context, Next } from 'hono';
import { eq } from 'drizzle-orm';
import { agents } from '../db/schema';
import type { Database } from '../db/client';

// 生成 API Key
export function generateApiKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = 'xm_'; // xiuxian-mud prefix
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// 验证中间件
export function authMiddleware(db: Database) {
  return async (c: Context, next: Next) => {
    const authHeader = c.req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({
        success: false,
        error: 'unauthorized',
        message: '请提供有效的 API Key',
      }, 401);
    }

    const apiKey = authHeader.substring(7);

    const agent = await db.query.agents.findFirst({
      where: eq(agents.apiKey, apiKey),
    });

    if (!agent) {
      return c.json({
        success: false,
        error: 'invalid_api_key',
        message: 'API Key 无效',
      }, 401);
    }

    // 将 agent 信息存储到 context 中
    c.set('agent', agent);

    await next();
  };
}
