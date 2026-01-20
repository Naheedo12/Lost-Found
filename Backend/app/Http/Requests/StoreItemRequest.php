<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'type'        => 'required|in:lost,found',
            'location'    => 'required|string|max:255',
            'date'        => 'required|date',
            'image'       => 'nullable|image|max:2048',
        ];
    }
}