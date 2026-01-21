<?php

namespace Tests\Feature\Item;

use Tests\TestCase;
use App\Models\User;
use App\Models\Item;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DestroyTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_delete_own_item()
    {
        $user = User::factory()->create();
        $item = Item::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user, 'sanctum')
                         ->deleteJson("/api/items/{$item->id}");

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Item deleted']);
    }
}