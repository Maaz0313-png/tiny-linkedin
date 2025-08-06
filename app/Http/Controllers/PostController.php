<?php
namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('user')->latest()->get();
        return Inertia::render('Feed', [
            'posts' => $posts
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'body' => 'required|string|max:1000',
        ]);
        $post = Post::create([
            'user_id' => Auth::id(),
            'body' => $request->body,
        ]);
        return redirect()->back();
    }

    public function update(Request $request, Post $post)
    {
        // Ensure only the post author can update
        if ($post->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        $request->validate([
            'body' => 'required|string|max:1000',
        ]);

        $post->update([
            'body' => $request->body,
        ]);

        return redirect()->back();
    }

    public function destroy(Post $post)
    {
        // Ensure only the post author can delete
        if ($post->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        $post->delete();

        return redirect()->back();
    }
}
