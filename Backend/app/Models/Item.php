<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Item extends Model
{
    use HasFactory;

    // Fillable fields
    protected $fillable = [
        'title',
        'description',
        'type',      // lost / found
        'location',
        'date',
        'image',
        'status',    // in_progress / resolved
        'user_id',
    ];

    // Casts
    protected $casts = [
        'date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function isLost()
    {
        return $this->type === 'lost';
    }

    public function isFound()
    {
        return $this->type === 'found';
    }

    public function isResolved()
    {
        return $this->status === 'resolved';
    }

    public function isInProgress()
    {
        return $this->status === 'in_progress';
    }
}
