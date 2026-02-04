export const coursesFakeData = Array.from({ length: 14 }).map((_, index) => ({
	id: index + 1,
	title: `Khóa học WordPress ${index + 1}`,
	thumbnail: `https://picsum.photos/seed/course-${index}/600/400`,
	shortDescription: "Học WordPress từ cơ bản đến nâng cao, làm được dự án thực tế.",
	level: index % 2 === 0 ? "Beginner" : "Advanced",
	duration: "20 giờ",
	price: index % 2 === 0 ? "Miễn phí" : "1.500.000đ",
}));
