<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_login_with_correct_credentials()
    {
        $user = User::create([
            'name' => 'Salma',
            'email' => 'salma@gmail.com',
            'password' => Hash::make('12345678'),
            'role' => 'user',
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'salma@gmail.com',
            'password' => '12345678',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'message',
                     'user',
                     'token',
                 ]);
    }

    public function test_login_fails_with_wrong_credentials()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'wrong@gmail.com',
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(401)
                 ->assertJson([
                     'message' => 'Invalid credentials',
                 ]);
    }
}