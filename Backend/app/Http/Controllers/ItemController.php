<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ItemController extends Controller
{
    public function index()
    {
        $items = Item::with('user:id,name')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['items' => $items]);
    }

    public function filter(Request $request)
    {
        $query = Item::with('user:id,name');

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('location')) {
            $query->where('location', 'like', '%' . $request->location . '%');
        }

        $items = $query->orderBy('created_at', 'desc')->get();

        return response()->json(['items' => $items]);
    }

    public function myItems(Request $request)
    {
        $items = $request->user()
            ->items()
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['items' => $items]);
    }

    public function store(StoreItemRequest $request)
    {
        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('items', 'public');
        }

        $item = Item::create([
            'title'       => $request->title,
            'description' => $request->description,
            'type'        => $request->type,
            'location'    => $request->location,
            'date'        => $request->date,
            'image'       => $imagePath,
            'status'      => 'in_progress',
            'user_id'     => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Item created',
            'item' => $item->load('user:id,name')
        ], 201);
    }

    public function show(Item $item)
    {
        return response()->json([
            'item' => $item->load('user:id,name')
        ]);
    }

    public function update(UpdateItemRequest $request, Item $item)
    {
        if ($item->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Access denied'], 403);
        }

        $data = [];

        foreach (['title', 'description', 'type', 'location', 'date'] as $field) {
            if ($request->filled($field)) {
                $data[$field] = $request->$field;
            }
        }

        if ($request->hasFile('image')) {
            if ($item->image) {
                Storage::disk('public')->delete($item->image);
            }
            $data['image'] = $request->file('image')->store('items', 'public');
        }

        if (!empty($data)) {
            $item->update($data);
        }

        return response()->json([
            'message' => 'Item updated',
            'item' => $item->fresh()->load('user:id,name') 
        ]);
    }

    public function destroy(Request $request, Item $item)
    {
        if ($item->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Access denied'], 403);
        }

        if ($item->image) {
            Storage::disk('public')->delete($item->image);
        }

        $item->delete();

        return response()->json(['message' => 'Item deleted']);
    }

    public function adminUpdate(Request $request, Item $item)
    {
        $data = [];

        foreach (['title', 'description', 'type', 'location', 'date', 'status'] as $field) {
            if ($request->filled($field)) {
                $data[$field] = $request->$field;
            }
        }

        if ($request->hasFile('image')) {
            if ($item->image) {
                Storage::disk('public')->delete($item->image);
            }
            $data['image'] = $request->file('image')->store('items', 'public');
        }

        if (!empty($data)) {
            $item->update($data);
        }

        return response()->json([
            'message' => 'Item updated by admin',
            'item' => $item->fresh()->load('user:id,name')
        ]);
    }

    public function adminDestroy(Item $item)
    {   
        if ($item->image) {
            Storage::disk('public')->delete($item->image);
        }

        $item->delete();

        return response()->json([
            'message' => 'Item deleted by admin'
        ]);
    }
}