<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminUpdateItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
        'title'       => 'sometimes|string|max:255',
        'description' => 'sometimes|string',
        'type'        => 'sometimes|in:lost,found',
        'location'    => 'sometimes|string|max:255',
        'date'        => 'sometimes|date',
        'status'      => 'sometimes|in:in_progress,resolved',
        'image'       => 'sometimes|image|mimes:jpg,jpeg,png|max:2048',
     ];
    }
}
