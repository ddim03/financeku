<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$role): Response
    {
        if (is_array($role)) {
            if (! in_array(Auth::user()->role, $role)) {
                abort(403);
            }
        } else {
            if (Auth::user()->role != $role) {
                abort(403);
            }
        }

        return $next($request);
    }
}
