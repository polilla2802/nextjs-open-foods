export interface Product {
	product_name: string;
	brands: string;
	nutriscore_grade: string;
	nutriments: {
		"energy-kcal_100g": number;
		fat_100g: number;
	};
	image_front_url: string;
	image_nutrition_url: string;
}