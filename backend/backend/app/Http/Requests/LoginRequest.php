<?php

namespace App\Http\Requests;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
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
            'email'=>'required|email',
            'password' => 'required',
        ];
    }

    public function authenticate()
    {
        $this->ensureIsNotRateLimited();

        if ( !Auth::attempt($this->only('email','password'), $this->filled('remember'))) {

            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect'],
            ]);

        }
        RateLimiter::clear($this->throttleKey());
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited()
    {   
        if(!RateLimiter::tooManyAttempts($this->throttleKey(),5))
        {
            return;
        }
        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => trans('auth failed',[
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ])
        ]);
    }


    public function throttleKey()
    {
        return Str::lower($this->input('email')).'|'.$this->ip();
    }
}
