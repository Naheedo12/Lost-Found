<?php

namespace Tests\Feature\Item;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class StoreTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_store_item_with_fake_image()
    {
        Storage::fake('public');

        $user = User::factory()->create();

        $fakeImage = UploadedFile::fake()->create('laptop.jpg', 100); 

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/items', [
                'title' => 'Laptop',
                'description' => 'Lost in class',
                'type' => 'lost',
                'location' => 'Casa',
                'date' => '2026-01-20',
                'image' => $fakeImage,
            ]);

        $response->assertStatus(201)
                 ->assertJsonStructure(['message', 'item' => ['id', 'title', 'image']]);

        Storage::disk('public')->assertExists($response->json('item.image'));
    }
}