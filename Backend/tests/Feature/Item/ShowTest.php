<?php

namespace Tests\Feature\Item;

use Tests\TestCase;
use App\Models\User;
use App\Models\Item;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ShowTest extends TestCase
{
    use RefreshDatabase;

    public function test_show_returns_item_details()
    {
        $user = User::factory()->create();
        $item = Item::factory()->create(['user_id' => $user->id]);

        $response = $this->getJson("/api/items/{$item->id}");

        $response->assertStatus(200)
                 ->assertJsonFragment(['id' => $item->id, 'title' => $item->title]);
    }
}