<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function show()
    {
        $user = Auth::user()->load('posts');
        return Inertia::render('Profile', [
            'user' => $user,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'bio' => 'nullable|string|max:1000',
        ]);
        $user = Auth::user();
        $user->update($request->only('name', 'bio'));
        return redirect()->back();
    }

    public function view(User $user)
    {
        $user->load('posts');
        return Inertia::render('Profile', [
            'user' => $user,
        ]);
    }
}
