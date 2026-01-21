<?php

namespace Tests\Feature\Item;

use Tests\TestCase;
use App\Models\User;
use App\Models\Item;
use Illuminate\Foundation\Testing\RefreshDatabase;

class FilterTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_filter_items_by_type()
    {
        $user = User::factory()->create();

        Item::factory()->create(['type' => 'lost', 'user_id' => $user->id]);
        Item::factory()->create(['type' => 'found', 'user_id' => $user->id]);

        $response = $this->getJson('/api/items/filter?type=lost');

        $response->assertStatus(200)
                 ->assertJsonCount(1, 'items')
                 ->assertJsonFragment(['type' => 'lost']);
    }

    public function test_can_filter_items_by_location()
    {
        $user = User::factory()->create();

        Item::factory()->create(['location' => 'Casa', 'user_id' => $user->id]);
        Item::factory()->create(['location' => 'Rabat', 'user_id' => $user->id]);

        $response = $this->getJson('/api/items/filter?location=Casa');

        $response->assertStatus(200)
                 ->assertJsonCount(1, 'items')
                 ->assertJsonFragment(['location' => 'Casa']);
    }
}