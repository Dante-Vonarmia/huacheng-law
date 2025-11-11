# Adapter Layer

**Purpose**: Bridge between backend CMS and frontend Schema-Driven Architecture

---

## Overview

The Adapter Layer is responsible for:
1. **Field Mapping**: Transform backend API fields to frontend Schema fields
2. **Rich Text Processing**: Extract HTML from backend WYSIWYG editor
3. **Multi-language Handling**: Separate nested locale objects into `_zh`/`_en` suffixed fields
4. **Data Validation**: Ensure required Schema fields exist and have correct types

---

## Directory Structure

```
adapter/
├── README.md              # This file
├── schema-map.json        # Field mapping configuration
├── api-client.ts          # API client with field transformation
├── utils.ts               # Transformation utilities
├── types.ts               # Backend API types
├── schema/                # Frontend Schema definitions
│   ├── base.ts            # BaseSchema interface
│   ├── practice.ts        # PracticeSchema
│   ├── lawyer.ts          # LawyerSchema
│   ├── news.ts            # NewsSchema
│   └── event.ts           # EventSchema
└── mock-data/             # Mock data for development
    ├── practices.json
    ├── lawyers.json
    ├── news.json
    └── events.json
```

---

## Schema Definition

### BaseSchema

All Schema interfaces must extend `BaseSchema`:

```typescript
// adapter/schema/base.ts
export interface BaseSchema {
  id: string;           // Unique identifier
  slug: string;         // URL-friendly identifier
  createdAt: string;    // ISO 8601 timestamp
  updatedAt: string;    // ISO 8601 timestamp
}
```

### Multi-language Fields

Use `_zh` and `_en` suffixes, NOT nested objects:

✅ **Good**:
```typescript
interface PracticeSchema extends BaseSchema {
  name_zh: string;
  name_en: string;
  description_zh: string;
  description_en: string;
}
```

❌ **Bad**:
```typescript
interface PracticeSchema extends BaseSchema {
  name: {
    zh: string;
    en: string;
  };
  description: {
    zh: string;
    en: string;
  };
}
```

**Why**: Flat structure simplifies language switching and reduces nesting complexity.

### Rich Text Fields

Use `richContent` (camelCase) for HTML content from backend editor:

```typescript
interface PracticeSchema extends BaseSchema {
  richContent?: string;  // Optional HTML string
}
```

**Important**: Always sanitize HTML in production using DOMPurify.

---

## schema-map.json

Defines field mapping from backend API to frontend Schema.

### Format

```json
{
  "resource_name": {
    "backend_field_path": "frontend_field_name"
  }
}
```

### Example

```json
{
  "practice": {
    "id": "id",
    "slug": "slug",
    "category": "category",
    "name.zh": "name_zh",
    "name.en": "name_en",
    "description.zh": "description_zh",
    "description.en": "description_en",
    "rich_content": "richContent",
    "created_at": "createdAt",
    "updated_at": "updatedAt"
  }
}
```

### Path Notation

- **Nested fields**: Use dot notation (`name.zh` → `name_zh`)
- **Snake case to camel case**: `rich_content` → `richContent`
- **Direct mapping**: `id` → `id`

---

## API Client

### fetchPractices Example

```typescript
// adapter/api-client.ts
import type { PracticeSchema } from './schema/practice';
import schemaMap from './schema-map.json';
import { transformFields } from './utils';

export async function fetchPractices(): Promise<PracticeSchema[]> {
  try {
    const response = await fetch('/api/v1/practices');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const rawData = await response.json();

    // Transform backend fields to frontend Schema
    return rawData.map((item: any) =>
      transformFields(item, schemaMap.practice)
    );
  } catch (error) {
    console.error('[Adapter] Failed to fetch practices:', error);
    return [];  // Return empty array to avoid breaking page render
  }
}
```

### Error Handling Strategy

1. **Network errors**: Return empty array `[]` or `null`
2. **Missing fields**: Use default values (empty string, empty array)
3. **Type errors**: Log warning and skip that data item
4. **HTTP errors**: Log status code and return fallback data

```typescript
export async function fetchPractices(): Promise<PracticeSchema[]> {
  try {
    const response = await fetch('/api/v1/practices');

    // Handle HTTP errors
    if (!response.ok) {
      console.error(`[Adapter] HTTP ${response.status}: ${response.statusText}`);
      return [];
    }

    const rawData = await response.json();

    // Handle missing data
    if (!Array.isArray(rawData)) {
      console.error('[Adapter] Expected array, got:', typeof rawData);
      return [];
    }

    // Transform and validate
    return rawData
      .map((item: any) => {
        try {
          return transformFields(item, schemaMap.practice);
        } catch (error) {
          console.warn('[Adapter] Failed to transform item:', item, error);
          return null;
        }
      })
      .filter((item): item is PracticeSchema => item !== null);

  } catch (error) {
    console.error('[Adapter] Unexpected error:', error);
    return [];
  }
}
```

---

## Rich Text HTML Processing

### Backend Output

Backend WYSIWYG editor outputs HTML like:

```html
<h3>知识产权法律服务</h3>
<p>华诚知识产权团队在专利、商标、著作权...</p>
<img src="https://example.com/image.jpg" alt="知识产权" />
<ul>
  <li><strong>专利服务</strong>：专利申请、专利无效...</li>
  <li><strong>商标服务</strong>：商标申请注册...</li>
</ul>
```

### Adapter Processing

1. **Extract HTML string**: `item.rich_content` or `item.richContent`
2. **Store in Schema**: `richContent?: string`
3. **No transformation**: Keep original HTML (sanitization happens in frontend)

```typescript
function transformFields(raw: any, mapping: Record<string, string>): any {
  const result: any = {};

  for (const [backendPath, frontendField] of Object.entries(mapping)) {
    const value = getNestedValue(raw, backendPath);

    // Special handling for rich content
    if (frontendField === 'richContent' && value) {
      result[frontendField] = String(value);  // Ensure string type
    } else {
      result[frontendField] = value ?? getDefaultValue(frontendField);
    }
  }

  return result;
}
```

### Frontend Rendering

```svelte
<div class="rich-content">
  {@html practice.richContent}
</div>
```

With unified styles in `.rich-content` class (see `ui-kit/styles/rich-content.scss`).

---

## Multi-language Field Mapping

### Backend Nested Structure

```json
{
  "id": "ip",
  "name": {
    "zh": "知识产权",
    "en": "Intellectual Property"
  },
  "description": {
    "zh": "专注于专利、商标...",
    "en": "Focus on patent, trademark..."
  }
}
```

### Mapping Configuration

```json
{
  "practice": {
    "name.zh": "name_zh",
    "name.en": "name_en",
    "description.zh": "description_zh",
    "description.en": "description_en"
  }
}
```

### Frontend Schema

```typescript
{
  id: "ip",
  name_zh: "知识产权",
  name_en: "Intellectual Property",
  description_zh: "专注于专利、商标...",
  description_en: "Focus on patent, trademark..."
}
```

### Utility Function

```typescript
// adapter/utils.ts
function getNestedValue(obj: any, path: string): any {
  const parts = path.split('.');
  let current = obj;

  for (const part of parts) {
    if (current === null || current === undefined) {
      return undefined;
    }
    current = current[part];
  }

  return current;
}

// Example usage:
getNestedValue({ name: { zh: '知识产权' } }, 'name.zh');  // => '知识产权'
```

---

## Default Values

Provide sensible defaults for missing fields:

```typescript
function getDefaultValue(fieldName: string): any {
  if (fieldName.endsWith('_zh') || fieldName.endsWith('_en')) {
    return '';  // Empty string for text fields
  }

  if (fieldName === 'services') {
    return [];  // Empty array for services
  }

  if (fieldName === 'richContent') {
    return undefined;  // Optional field
  }

  if (fieldName === 'createdAt' || fieldName === 'updatedAt') {
    return new Date().toISOString();  // Current timestamp
  }

  return null;
}
```

---

## Mock Data

Use mock data during development when backend is not available.

### File Structure

```
adapter/mock-data/
├── practices.json        # Business practices
├── lawyers.json          # Lawyer profiles
├── news.json             # News articles
└── events.json           # Events
```

### Example: practices.json

```json
[
  {
    "id": "ip",
    "slug": "intellectual-property",
    "category": "核心业务",
    "name_zh": "知识产权",
    "name_en": "Intellectual Property",
    "description_zh": "专注于专利、商标、著作权等知识产权领域",
    "description_en": "Focus on IP protection including patents, trademarks, copyrights",
    "services": ["专利申请", "商标注册", "著作权登记"],
    "cases": "成功代理500+知识产权案件",
    "richContent": "<h3>知识产权法律服务</h3><p>...</p>",
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-11-11T00:00:00Z"
  }
]
```

### Using Mock Data

```typescript
// adapter/api-client.ts
const USE_MOCK = import.meta.env.DEV && !import.meta.env.VITE_API_URL;

export async function fetchPractices(): Promise<PracticeSchema[]> {
  if (USE_MOCK) {
    const mockData = await import('./mock-data/practices.json');
    return mockData.default;
  }

  // Real API call
  const response = await fetch('/api/v1/practices');
  // ...
}
```

---

## Type Safety

### Backend Types

Define types for raw backend API responses:

```typescript
// adapter/types.ts
export interface BackendPracticeRaw {
  id: string;
  slug: string;
  category: string;
  name: {
    zh: string;
    en: string;
  };
  description: {
    zh: string;
    en: string;
  };
  services: string[];
  cases?: string;
  rich_content?: string;
  created_at: string;
  updated_at: string;
}
```

### Frontend Schema Types

```typescript
// adapter/schema/practice.ts
import type { BaseSchema } from './base';

export interface PracticeSchema extends BaseSchema {
  category: '核心业务' | '行业专长' | '专业服务';
  name_zh: string;
  name_en: string;
  description_zh: string;
  description_en: string;
  services: string[];
  cases?: string;
  richContent?: string;
}
```

### Transformation with Type Safety

```typescript
export async function fetchPractices(): Promise<PracticeSchema[]> {
  const response = await fetch('/api/v1/practices');
  const rawData: BackendPracticeRaw[] = await response.json();

  return rawData.map((item) => ({
    id: item.id,
    slug: item.slug,
    category: item.category as PracticeSchema['category'],
    name_zh: item.name.zh,
    name_en: item.name.en,
    description_zh: item.description.zh,
    description_en: item.description.en,
    services: item.services,
    cases: item.cases,
    richContent: item.rich_content,
    createdAt: item.created_at,
    updatedAt: item.updated_at
  }));
}
```

---

## Testing

### Unit Tests

Test field transformation logic:

```typescript
// adapter/utils.test.ts
import { transformFields } from './utils';
import schemaMap from './schema-map.json';

describe('transformFields', () => {
  it('should transform nested locale fields to flat suffixed fields', () => {
    const raw = {
      id: 'ip',
      name: { zh: '知识产权', en: 'IP' }
    };

    const result = transformFields(raw, schemaMap.practice);

    expect(result.name_zh).toBe('知识产权');
    expect(result.name_en).toBe('IP');
    expect(result.name).toBeUndefined();
  });

  it('should handle missing optional fields', () => {
    const raw = {
      id: 'ip',
      name: { zh: '知识产权', en: 'IP' }
      // richContent missing
    };

    const result = transformFields(raw, schemaMap.practice);

    expect(result.richContent).toBeUndefined();
  });
});
```

### Integration Tests

Test API client with mock server:

```typescript
// adapter/api-client.spec.ts
import { fetchPractices } from './api-client';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer(
  rest.get('/api/v1/practices', (req, res, ctx) => {
    return res(ctx.json([
      {
        id: 'ip',
        name: { zh: '知识产权', en: 'IP' },
        // ...
      }
    ]));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());

test('fetchPractices should transform backend data to Schema', async () => {
  const practices = await fetchPractices();

  expect(practices).toHaveLength(1);
  expect(practices[0].name_zh).toBe('知识产权');
  expect(practices[0].name_en).toBe('IP');
});
```

---

## Best Practices

1. **Schema First**: Define Schema interface before implementing adapter
2. **Type Safety**: Always type backend and frontend data structures
3. **Error Handling**: Return empty arrays/null, don't throw errors that break page rendering
4. **Logging**: Use `console.error` with `[Adapter]` prefix for debugging
5. **Default Values**: Provide sensible defaults for missing fields
6. **Mock Data**: Match production data structure exactly
7. **Field Mapping**: Update `schema-map.json` before code
8. **Rich Text**: Don't transform HTML, keep original (sanitize in frontend)
9. **Multi-language**: Always use flat `_zh`/`_en` suffixes
10. **Documentation**: Update this README when adding new Schema types

---

## Troubleshooting

### "Field is undefined"

**Problem**: Frontend shows `undefined` for a field.

**Solution**:
1. Check `schema-map.json` has correct mapping
2. Verify backend API returns the field
3. Check field path in `transformFields` function
4. Add default value in `getDefaultValue`

### "Type error: string is not assignable to X"

**Problem**: TypeScript type mismatch.

**Solution**:
1. Check backend type definition matches actual API response
2. Add type assertion if backend data is inconsistent
3. Validate data before transformation

### "HTML not rendering"

**Problem**: Rich text content shows as plain text.

**Solution**:
1. Ensure using `{@html richContent}` not `{richContent}`
2. Check `richContent` field exists in Schema
3. Verify backend returns HTML string not escaped text

### "Multi-language not working"

**Problem**: Language switch doesn't update content.

**Solution**:
1. Check Schema has both `_zh` and `_en` fields
2. Verify language switcher updates field reference
3. Ensure mock data has both languages

---

## Migration Checklist

When adding a new Schema type (e.g., CaseStudy):

- [ ] Create `adapter/schema/case-study.ts` interface
- [ ] Add field mapping in `schema-map.json`
- [ ] Create `adapter/types.ts` backend type
- [ ] Implement API client function in `api-client.ts`
- [ ] Create mock data in `mock-data/case-studies.json`
- [ ] Write unit tests for transformation
- [ ] Update this README with example
- [ ] Document in `docs/architecture.md` §12

---

**Last Updated**: 2025-11-11
**Maintained By**: Product Manager Agent
