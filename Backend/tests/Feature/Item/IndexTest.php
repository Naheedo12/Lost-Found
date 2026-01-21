<?php

namespace Tests\Feature\Item;

use Tests\TestCase;
use App\Models\User;
use App\Models\Item;
use Illuminate\Foundation\Testing\RefreshDatabase;

class IndexTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_returns_all_items()
    {
        $user = User::factory()->create();
        Item::factory()->count(3)->create(['user_id' => $user->id]);

        $response = $this->getJson('/api/items');

        $response->assertStatus(200)
                 ->assertJsonCount(3, 'items');
    }
}
