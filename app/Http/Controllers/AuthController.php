<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showRegister()
    {
        return Inertia::render('Auth/Register');
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);
        // Create user without mass assignment
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->bio = $request->bio;
        $user->save();
        // Send verification email
        $user->sendEmailVerificationNotification();
        Auth::login($user);
        return redirect()->route('verification.notice');    // Use standard redirect instead of Inertia::location
    }

    public function showLogin()
    {
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $credentials['email'])->first();
        $now = now();
        if ($user) {
            // Check if account is locked
            if ($user->lockout_until && $user->lockout_until->isFuture()) {
                $minutes = $now->diffInMinutes($user->lockout_until);
                return back()->withErrors(['email' => "Account locked due to too many failed login attempts. Please try again in $minutes minute(s)."]);
            }
        }

        if (Auth::attempt($credentials)) {
            // Successful login: reset failed attempts and lockout
            if ($user) {
                $user->failed_logins = 0;
                $user->lockout_until = null;
                $user->save();
            }
            $request->session()->regenerate();
            return redirect('/');
        }

        // Failed login: increment failed_logins and lock if needed
        if ($user) {
            $user->failed_logins = ($user->failed_logins ?? 0) + 1;
            if ($user->failed_logins >= 3) {
                $user->lockout_until = $now->copy()->addMinutes(5);
                $user->failed_logins = 0; // Optionally reset after lock
                $user->save();
                return back()->withErrors(['email' => 'Account locked due to too many failed login attempts. Please try again in 5 minutes.']);
            }
            $user->save();
        }
        return back()->withErrors(['email' => 'Invalid credentials.']);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    }
}
