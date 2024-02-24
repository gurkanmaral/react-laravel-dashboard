<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'User successfully registered',
            'token' => $token,
        ],201);
    }

    public function login(LoginRequest $request) 
    {


        $request->authenticate();

        $user = User::where('email',$request->email)->first();
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'token'=>$token
        ]);

    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => "Successfully logged out"
        ]);
    }
}
