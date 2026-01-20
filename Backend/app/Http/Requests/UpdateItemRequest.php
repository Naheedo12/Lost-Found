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
            'title'       => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'type'        => 'sometimes|required|in:lost,found',
            'location'    => 'sometimes|required|string|max:255',
            'date'        => 'sometimes|required|date',
            'image'       => 'nullable|image|max:2048',
        ];
    }
}
