<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->admin()->create([
            'name' => 'salma',
            'email' => 'salma@gmail.com',
        ]);

        $users = User::factory(9)->create();

        Item::factory(10)->create([
            'user_id' => function () {
                return User::all()->random()->id; 
            }
        ]);
    }
}
