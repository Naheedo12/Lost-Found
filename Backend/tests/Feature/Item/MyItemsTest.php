<?php

namespace Tests\Feature\Item;

use Tests\TestCase;
use App\Models\User;
use App\Models\Item;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MyItemsTest extends TestCase
{
    use RefreshDatabase;

    public function test_my_items_returns_only_user_items()
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

        Item::factory()->count(2)->create(['user_id' => $user->id]);
        Item::factory()->count(1)->create(['user_id' => $otherUser->id]);

        $response = $this->actingAs($user, 'sanctum')->getJson('/api/my-items');

        $response->assertStatus(200)
                 ->assertJsonCount(2, 'items');
    }
}