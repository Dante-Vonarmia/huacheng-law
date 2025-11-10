import DOMPurify from 'isomorphic-dompurify';

/**
 * 清理 HTML 内容，防止 XSS 攻击
 */
export function sanitizeHtml(dirty: string): string {
	return DOMPurify.sanitize(dirty, {
		ALLOWED_TAGS: [
			'p',
			'br',
			'strong',
			'em',
			'u',
			'a',
			'ul',
			'ol',
			'li',
			'h1',
			'h2',
			'h3',
			'h4',
			'h5',
			'h6',
			'blockquote',
			'img',
			'div',
			'span'
		],
		ALLOWED_ATTR: ['href', 'target', 'src', 'alt', 'title', 'class']
	});
}

/**
 * 提取纯文本（去除所有 HTML 标签）
 */
export function stripHtml(html: string): string {
	return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
}
