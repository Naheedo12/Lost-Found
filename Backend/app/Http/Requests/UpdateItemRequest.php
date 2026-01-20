<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'       => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'type'        => 'sometimes|in:lost,found',
            'location'    => 'sometimes|string|max:255',
            'date'        => 'sometimes|date',
            'image'       => 'sometimes|image|mimes:jpg,jpeg,png|max:2048',
        ];
    }
}
