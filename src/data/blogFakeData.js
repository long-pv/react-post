export const blogFakeData = Array.from({ length: 27 }).map((_, index) => ({
	id: index + 1,
	slug: `bai-viet-wordpress-${index + 1}`,
	title: `Bài viết WordPress số ${index + 1}`,
	thumbnail: `https://picsum.photos/seed/blog-${index}/600/400`,
	content: `
    <p>Đây là nội dung chi tiết của bài viết WordPress số ${index + 1}.</p>
    <p>Bài viết này chia sẻ kinh nghiệm làm WordPress, React và tối ưu hiệu năng.</p>
    <p><strong>React + WP Headless</strong> là một hướng rất đáng để học.</p>
  `,
}));
