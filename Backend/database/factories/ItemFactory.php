<?php

namespace Database\Factories;

use App\Models\Item;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ItemFactory extends Factory
{
    protected $model = Item::class;

    public function definition(): array
    {
        $samples = [
            'lost' => [
                ['title' => 'iPhone 14 Pro', 'description' => 'iPhone 14 Pro noir perdu dans le métro ligne 1'],
                ['title' => 'Portefeuille en cuir', 'description' => 'Portefeuille marron avec cartes d\'identité'],
                ['title' => 'Clés de voiture', 'description' => 'Trousseau avec clés BMW et badge d\'accès'],
                ['title' => 'Sac à dos Nike', 'description' => 'Sac à dos noir avec ordinateur portable à l\'intérieur'],
                ['title' => 'Montre Apple Watch', 'description' => 'Apple Watch Series 8 avec bracelet sport blanc'],
            ],
            'found' => [
                ['title' => 'Lunettes de soleil', 'description' => 'Lunettes Ray-Ban trouvées sur un banc du parc'],
                ['title' => 'Parapluie rouge', 'description' => 'Parapluie rouge oublié dans le bus'],
                ['title' => 'Écharpe en laine', 'description' => 'Écharpe bleue tricotée trouvée dans la rue'],
                ['title' => 'Livre "Le Petit Prince"', 'description' => 'Livre avec dédicace trouvé dans un café'],
                ['title' => 'Casque audio Sony', 'description' => 'Casque sans fil trouvé dans la bibliothèque'],
            ]
        ];

        $type = fake()->randomElement(['lost', 'found']);
        $item = fake()->randomElement($samples[$type]);

        return [
            'title' => $item['title'],
            'description' => $item['description'],
            'type' => $type,
            'location' => fake()->randomElement([
                'Gare du Nord', 'Châtelet-Les Halles', 'République', 'Bastille',
                'Université Paris 7', 'Bibliothèque François Mitterrand',
                'Parc des Buttes-Chaumont', 'Place de la République'
            ]),
            'date' => fake()->dateTimeBetween('-30 days', 'now')->format('Y-m-d'),
            'image' => null, 
            'status' => fake()->randomElement(['in_progress', 'resolved']),
            'user_id' => User::factory(), 
        ];
    }
}
