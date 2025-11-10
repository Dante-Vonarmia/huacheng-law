import * as yup from 'yup';

// 邮箱验证
export const emailSchema = yup.string().email('请输入有效的邮箱地址').required('邮箱为必填项');

// 手机号验证（中国大陆）
export const phoneSchema = yup
	.string()
	.matches(/^1[3-9]\d{9}$/, '请输入有效的手机号')
	.required('手机号为必填项');

// 姓名验证
export const nameSchema = yup
	.string()
	.min(2, '姓名至少2个字符')
	.max(50, '姓名最多50个字符')
	.required('姓名为必填项');

// 联系表单验证
export const contactFormSchema = yup.object({
	name: nameSchema,
	email: emailSchema,
	phone: phoneSchema.optional(),
	message: yup.string().min(10, '留言至少10个字符').required('留言为必填项')
});

// 招聘表单验证
export const careerFormSchema = yup.object({
	name: nameSchema,
	email: emailSchema,
	phone: phoneSchema,
	position: yup.string().required('应聘职位为必填项'),
	resume: yup.mixed().required('请上传简历')
});
